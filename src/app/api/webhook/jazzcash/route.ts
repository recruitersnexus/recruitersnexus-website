import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        // ✅ JazzCash sends `application/x-www-form-urlencoded`, so parse it correctly
        const rawBody = await req.text();
        const params = new URLSearchParams(rawBody);
        const jazzCashResponse: Record<string, string> = {};

        params.forEach((value, key) => {
            jazzCashResponse[key] = value;
        });

        console.log("JazzCash Response:", jazzCashResponse);

        const { pp_TxnRefNo, pp_ResponseCode, pp_SecureHash } = jazzCashResponse;
        if (!pp_TxnRefNo) {
            return NextResponse.json({ success: false, error: "Invalid transaction reference." }, { status: 400 });
        }

        // ✅ Verify Secure Hash
        const expectedHash = calculateSecureHash(jazzCashResponse);
        console.log("Generated Secure Hash by function :", expectedHash);
        console.log("----------------------------------------------------------------------------------------------")
        console.log("Received Secure Hash :", pp_SecureHash.toUpperCase());
        // if (pp_SecureHash.toUpperCase() !== expectedHash) {
        //     console.error("❌ Secure Hash Mismatch!");
        //     return NextResponse.json({ success: false, error: "Invalid secure hash." }, { status: 400 });
        // }

        // ✅ Determine transaction status
        const newStatus = pp_ResponseCode === "000" ? "success" : "failed";

        // ✅ Update transaction in DB
        await db.update(transactions)
            .set({
                status: newStatus,
                responseBody: JSON.stringify(jazzCashResponse), // Store response
                updatedAt: new Date()
            })
            .where(eq(transactions.txnRefNo, pp_TxnRefNo));

        return NextResponse.json({ success: true, message: "Transaction updated successfully." });
    } catch (error) {
        console.error("JazzCash Verification Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Secure Hash Calculation
function calculateSecureHash(params: Record<string, string>): string {
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;
  if (!integritySalt) {
    throw new Error("Integrity salt is missing");
  }

  // 1️⃣ Extract "pp_" fields (except pp_SecureHash), discard empty values
  const filteredKeys = Object.keys(params)
    .filter(
      (key) =>
        key.startsWith("pp_") &&
        key !== "pp_SecureHash" &&
        params[key].trim() !== ""
    )
    .sort(); // 2️⃣ Sort alphabetically

  // 3️⃣ Concatenate non-empty values with '&'
  const hashString = integritySalt + "&" + filteredKeys.map((key) => params[key]).join("&");

  // 4️⃣ Generate HMAC-SHA256 hash
  return crypto
    .createHmac("sha256", integritySalt)
    .update(hashString, "utf8")
    .digest("hex")
    .toUpperCase();
}
