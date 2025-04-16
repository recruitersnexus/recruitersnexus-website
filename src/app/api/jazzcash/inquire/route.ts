import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { txnRefNo } = await req.json();
    if (!txnRefNo) {
      return NextResponse.json({ error: "Transaction reference is required" }, { status: 400 });
    }

    const requestBody = new URLSearchParams({
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID!,
      pp_Password: process.env.JAZZCASH_PASSWORD!,
      pp_TxnRefNo: txnRefNo,
      pp_Version: "1.1",
    });

    // ✅ Generate Secure Hash
    const secureHash = calculateSecureHash(Object.fromEntries(requestBody));
    requestBody.append("pp_SecureHash", secureHash);

    if (!process.env.JAZZCASH_INQUIRY_URL) {
      return NextResponse.json({ error: "JazzCash Inquiry URL is missing" }, { status: 500 });
    }

    const response = await fetch(process.env.JAZZCASH_INQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: requestBody.toString(),
    });

    const responseData = await response.json();

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("JazzCash Inquiry Error:", error);
    return NextResponse.json({ error: "Failed to inquire transaction" }, { status: 500 });
  }
}

// ✅ Secure Hash Calculation
function calculateSecureHash(params: Record<string, string>): string {
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT!;
  if (!integritySalt) {
    throw new Error("Integrity salt is missing");
  }

  // 1️⃣ Extract "pp_" fields (except pp_SecureHash)
  const filteredKeys = Object.keys(params)
    .filter(key => key.startsWith("pp_") && key !== "pp_SecureHash")
    .sort(); // 2️⃣ Sort alphabetically

  // 3️⃣ Concatenate values with '&'
  const hashString = integritySalt + "&" + filteredKeys.map(key => params[key]).join("&");

  // 4️⃣ Generate HMAC-SHA256 hash
  return crypto.createHmac("sha256", integritySalt).update(hashString).digest("hex").toUpperCase();
}
