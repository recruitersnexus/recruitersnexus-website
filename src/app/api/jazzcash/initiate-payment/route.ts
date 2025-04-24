import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db/db";
import { transactions, transactionHistory } from "@/lib/db/schema";
import * as dotenv from "dotenv";
import { and, eq } from "drizzle-orm";

dotenv.config();

export async function POST(req: Request) {
  try {
    const { amount, userId, plan, isRetry, txnRefNo } = await req.json();
    console.log("Received request:", {
      amount,
      userId,
      plan,
      isRetry,
      txnRefNo
    });

    if (!amount || !userId || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If this is a retry and txnRefNo is provided, check the original transaction
    if (isRetry && txnRefNo) {
      console.log("Processing retry for transaction:", txnRefNo);
      const originalTransaction = await db.query.transactions.findFirst({
        where: eq(transactions.txnRefNo, txnRefNo)
      });

      if (!originalTransaction) {
        console.log("Original transaction not found:", txnRefNo);
        return NextResponse.json(
          { success: false, error: "Original transaction not found" },
          { status: 404 }
        );
      }

      // Verify the transaction belongs to the user
      if (originalTransaction.userId !== userId) {
        console.log("Unauthorized access attempt:", {
          userId,
          transactionUserId: originalTransaction.userId
        });
        return NextResponse.json(
          { success: false, error: "Unauthorized access to transaction" },
          { status: 403 }
        );
      }
    }

    // Check if the user already purchased the plan (only for new transactions)
    if (!isRetry) {
      const existingTransaction = await db.query.transactions.findFirst({
        where: and(
          eq(transactions.userId, userId),
          eq(transactions.plan, plan),
          eq(transactions.status, "success")
        )
      });

      if (existingTransaction) {
        return NextResponse.json(
          { success: false, error: `User already purchased '${plan}' Plan.` },
          { status: 400 }
        );
      }
    }

    const newTxnRefNo = `T${Date.now()}`;
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;
    const formattedAmount = (amount * 100).toFixed(0); // Convert to paisa

    const params: Record<string, string> = {
      pp_Amount: formattedAmount,
      pp_BankID: "",
      pp_BillReference: `purchase${plan}`,
      pp_Description: "Before underscore is User ID then at last is Plan name.",
      pp_Language: "EN",
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID!,
      pp_Password: process.env.JAZZCASH_PASSWORD!,
      pp_ReturnURL: `${process.env.NEXT_PUBLIC_URL}/payment-status`,
      pp_SubMerchantID: "",
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: new Date().toISOString().replace(/\D/g, "").slice(0, 14),
      pp_TxnExpiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .replace(/\D/g, "")
        .slice(0, 14),
      pp_TxnRefNo: newTxnRefNo,
      pp_TxnType: "MIGS",
      pp_Version: "1.1",
      ppmpf_1: "1",
      ppmpf_2: "2",
      ppmpf_3: "3",
      ppmpf_4: "4",
      ppmpf_5: "5"
    };

    // ✅ Sort parameters alphabetically by key (ASCII order)
    const sortedKeys = Object.keys(params).sort();

    // ✅ Construct Secure Hash String: Shared Secret + sorted params (key=value format)
    const sortedString =
      integritySalt +
      "&" +
      sortedKeys.map((key) => `${key}=${params[key]}`).join("&");

    // ✅ Generate Secure Hash (HMAC-SHA256)
    const secureHash = crypto
      .createHmac("sha256", integritySalt)
      .update(sortedString, "utf8")
      .digest("hex")
      .toUpperCase();

    // Add pp_SecureHash to request body
    const paramsWithHash = { ...params, pp_SecureHash: secureHash };

    try {
      if (isRetry && txnRefNo) {
        console.log("Updating existing transaction:", txnRefNo);

        // First, update the transaction history
        await db
          .update(transactionHistory)
          .set({
            txnRefNo: newTxnRefNo,
            updatedAt: new Date()
          })
          .where(eq(transactionHistory.txnRefNo, txnRefNo));

        console.log("Transaction history updated successfully");

        // Then update the main transaction
        await db
          .update(transactions)
          .set({
            txnRefNo: newTxnRefNo,
            status: "pending",
            requestBody: paramsWithHash,
            responseBody: {},
            updatedAt: new Date()
          })
          .where(eq(transactions.txnRefNo, txnRefNo));

        console.log("Main transaction updated successfully");
      } else {
        console.log("Inserting new transaction");
        // Insert new transaction for first attempt
        await db.insert(transactions).values({
          userId,
          plan,
          txnRefNo: newTxnRefNo,
          amount,
          status: "pending",
          requestBody: paramsWithHash,
          responseBody: {}
        });
        console.log("New transaction inserted successfully");
      }

      return NextResponse.json({
        success: true,
        paymentUrl: process.env.JAZZCASH_ENDPOINT,
        params: paramsWithHash
      });
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return NextResponse.json(
        { error: "Failed to process transaction", details: dbError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
