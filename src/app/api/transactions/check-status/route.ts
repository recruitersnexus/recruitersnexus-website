import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get the latest transaction for the user
    const latestTransaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(1);

    if (!latestTransaction.length) {
      return NextResponse.json({
        success: true,
        hasTransaction: false,
        message: "No transactions found for this user"
      });
    }

    const transaction = latestTransaction[0];

    // Return transaction details with appropriate message
    return NextResponse.json({
      success: true,
      hasTransaction: true,
      transaction: {
        id: transaction.id,
        txnRefNo: transaction.txnRefNo,
        plan: transaction.plan,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt
      },
      message: getStatusMessage(transaction.status || "unknown")
    });
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getStatusMessage(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "You have a pending transaction. Please complete it first.";
    case "success":
      return "You have already purchased a plan.";
    case "failed":
      return "Your last transaction failed. You can try again.";
    case "refunded":
      return "Your last transaction was refunded. You can try again.";
    default:
      return "Transaction status unknown.";
  }
}
