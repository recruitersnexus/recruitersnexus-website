import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("Verifying payment request:", body);

    const { pp_TxnRefNo, pp_ResponseCode, pp_SecureHash } = body;

    if (!pp_TxnRefNo) {
      // console.error("Missing transaction reference");
      return NextResponse.json(
        { success: false, error: "Invalid transaction reference." },
        { status: 400 }
      );
    }

    if (!pp_ResponseCode) {
      console.error("Missing response code");
      return NextResponse.json(
        { success: false, error: "Invalid response code." },
        { status: 400 }
      );
    }

    // Get the transaction from the database
    const transaction = await db.query.transactions.findFirst({
      where: eq(transactions.txnRefNo, pp_TxnRefNo)
    });

    if (!transaction) {
      // console.error("Transaction not found:", pp_TxnRefNo);
      return NextResponse.json(
        { success: false, error: "Transaction not found." },
        { status: 404 }
      );
    }

    // Determine transaction status based on response code
    const newStatus = pp_ResponseCode === "000" ? "success" : "failed";
    // console.log("Transaction status:", newStatus);

    try {
      // Update transaction in DB
      await db
        .update(transactions)
        .set({
          status: newStatus,
          responseBody: JSON.stringify({
            ...body,
            verifiedAt: new Date().toISOString()
          }),
          updatedAt: new Date()
        })
        .where(eq(transactions.txnRefNo, pp_TxnRefNo));

      // console.log("Transaction updated successfully");

      return NextResponse.json({
        success: true,
        message: "Transaction verified successfully.",
        status: newStatus,
        transactionId: transaction.id
      });
    } catch (dbError) {
      // console.error("Database update failed:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to update transaction status." },
        { status: 500 }
      );
    }
  } catch (error) {
    // console.error("JazzCash Verification Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Correct Secure Hash Calculation
function calculateSecureHash(params: Record<string, string>): string {
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;

  // ✅ Sort keys alphabetically, excluding `pp_SecureHash`
  const sortedKeys = Object.keys(params)
    .filter((k) => k !== "pp_SecureHash")
    .sort();

  // ✅ Construct hash string using `key=value` format
  const hashString =
    integritySalt + "&" + sortedKeys.map((k) => `${k}=${params[k]}`).join("&");

  // ✅ Generate HMAC-SHA256 Hash and convert to uppercase
  return crypto
    .createHmac("sha256", integritySalt)
    .update(hashString, "utf8")
    .digest("hex")
    .toUpperCase();
}
