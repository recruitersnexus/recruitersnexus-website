import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const txnRefNo = url.searchParams.get("txnRefNo");

    if (!txnRefNo) {
        return NextResponse.json({ success: false, error: "Missing transaction reference." }, { status: 400 });
    }

    const transaction = await db.select().from(transactions).where(eq(transactions.txnRefNo, txnRefNo)).limit(1);
    if (!transaction.length) {
        return NextResponse.json({ success: false, error: "Transaction not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, status: transaction[0].status, details: transaction[0] });
}
