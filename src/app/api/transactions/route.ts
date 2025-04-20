import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { transactions } from "@/lib/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const offset = (page - 1) * limit;

    // Define filtering condition based on role
    const whereCondition = 
      role === "admin" || role === "hr" ? undefined : eq(transactions.userId, userId?.trim() ?? "");

    // Fetch paginated transactions
    const results = await db
      .select()
      .from(transactions)
      .where(whereCondition)
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset)
      .execute(); // Ensure execution

    // Fetch total transaction count
    const [{ count: totalTransactions }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(transactions)
      .where(whereCondition)
      .execute();

    // Fetch summary counts and amounts grouped by status
    const summary = await db
      .select({
        status: transactions.status,
        count: sql<number>`COUNT(*)`,
        totalAmount: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`,
      })
      .from(transactions)
      .where(whereCondition)
      .groupBy(transactions.status)
      .execute();

    return NextResponse.json({
      success: true,
      transactions: results,
      summary,
      totalTransactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
    });
  } catch (error) {
    console.error("Fetch Transactions Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
