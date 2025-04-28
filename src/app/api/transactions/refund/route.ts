import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const { transactionId, action, role } = await req.json();

    const transaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, transactionId))
      .limit(1);

    if (!transaction.length) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    const currentStatus = transaction[0].status;
    const pp_TxnRefNo = transaction[0].txnRefNo;
    // const amount = transaction[0].amount;
    const amount = Number(transaction[0].amount); // Convert amount to number
    // const formattedAmount = (amount * 100).toFixed(0); // Convert PKR to paisa

    // ✅ User Request: Only successful transactions can be refunded
    if (role === "user") {
      if (currentStatus !== "success") {
        return NextResponse.json(
          { error: "Only successful transactions can be refunded" },
          { status: 400 }
        );
      }
      await db
        .update(transactions)
        .set({ status: "refund_requested" })
        .where(eq(transactions.id, transactionId));
      return NextResponse.json({
        success: true,
        message: "Refund request submitted"
      });
    }

    // ✅ Admin Request: Handle refund approval or rejection
    if (role === "admin") {
      if (action === "approve") {
        // console.log("My amount to request refund :", amount);
        // return
        // ✅ Call JazzCash Refund API
        const refundResponse = await initiateJazzCashRefund(
          pp_TxnRefNo,
          amount
        );

        if (refundResponse.success) {
          await db
            .update(transactions)
            .set({ status: "refunded" })
            .where(eq(transactions.id, transactionId));
          return NextResponse.json({
            success: true,
            message:
              refundResponse.response.pp_ResponseMessage ||
              "Refund approved and processed successfully"
          });
        } else {
          return NextResponse.json({
            success: false,
            error:
              refundResponse.response.pp_ResponseMessage ||
              "JazzCash refund failed",
            details: refundResponse
          });
        }
      } else {
        await db
          .update(transactions)
          .set({ status: "refund_rejected" })
          .where(eq(transactions.id, transactionId));
        return NextResponse.json({ success: true, message: "Refund rejected" });
      }
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Refund Process Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Function to Initiate JazzCash Refund Request
async function initiateJazzCashRefund(pp_TxnRefNo: string, amount: number) {
  try {
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;
    const refundTxnRefNo = `R${Date.now()}`; // Generate unique refund txn ref
    const formattedAmount = (amount * 100).toFixed(0); // Convert to paisa

    // const params: Record<string, string> = {
    //   pp_Version: "1.1",
    //   pp_TxnType: "RFND",
    //   pp_Language: "EN",
    //   pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID!,
    //   pp_Password: process.env.JAZZCASH_PASSWORD!,
    //   pp_TxnRefNo: refundTxnRefNo,
    //   pp_RefundAmount: formattedAmount,
    //   pp_RefundTxnRefNo: pp_TxnRefNo,
    //   pp_TxnDateTime: new Date().toISOString().replace(/\D/g, "").slice(0, 14),
    //   pp_TxnCurrency: "PKR",
    //   pp_ReturnURL: `${process.env.NEXT_PUBLIC_URL}/api/webhook/jazzcash`
    // };
    const params: Record<string, string> = {
      pp_Amount: formattedAmount,
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID!,
      pp_Password: process.env.JAZZCASH_PASSWORD!,
      pp_TxnCurrency: "PKR",
      pp_TxnRefNo: pp_TxnRefNo
    };

    // ✅ Generate Secure Hash
    const secureHash = calculateSecureHash(params);
    params.pp_SecureHash = secureHash;
    //  console.log("params :", params);
    //  return;
    // ✅ Make Refund Request
    const response = await fetch(process.env.JAZZCASH_REFUND_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });

    const responseData = await response.json();
    // console.log("JazzCash Refund Response:", responseData);

    return {
      success: responseData.pp_ResponseCode === "000" ? true : false,
      response: responseData
    };
  } catch (error) {
    console.error("JazzCash Refund Request Error:", error);
    return { success: false, error: "JazzCash API request failed" };
  }
}

// ✅ Secure Hash Calculation for Refund API
function calculateSecureHash(params: Record<string, string>): string {
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;

  // 1️⃣ Extract "pp_" fields (except pp_SecureHash)
  const filteredKeys = Object.keys(params)
    .filter((key) => key.startsWith("pp_") && key !== "pp_SecureHash")
    .sort(); // 2️⃣ Sort alphabetically

  // 3️⃣ Concatenate values with '&'
  const hashString =
    integritySalt + "&" + filteredKeys.map((key) => params[key]).join("&");

  // 4️⃣ Generate HMAC-SHA256 hash
  return crypto
    .createHmac("sha256", integritySalt)
    .update(hashString)
    .digest("hex")
    .toUpperCase();
}
