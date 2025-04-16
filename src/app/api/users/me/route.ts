import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
// import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth/next";
import * as schema from "@/lib/db/schema";
import { transactions, userTable2 } from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
// import { sql } from "@vercel/postgres";
import { desc, eq, sql } from "drizzle-orm";

// const db = drizzle(sql, { schema });
import { db } from "@/lib/db/db"; // ✅ Import from the common file

export async function GET(request: NextRequest) {
  // const token = await request.headers.get('authorization')
  const session = await getServerSession(authOptions);

  try {
    if (session) {
    const sessionUser = await session?.user;
    const userEmail = sessionUser?.email;
    // const user = await db.query.userTable2.findFirst({
    //   where: eq(schema.userTable2.email, userEmail?? ""),
    // });  
    const userWithPlan = await db
    .select({
        id: userTable2.id,
        username: userTable2.username,
        email: userTable2.email,
        password: userTable2.password,
        image: userTable2.image,
        role: userTable2.role,
        createdAt: userTable2.createdAt,
        plan: sql<string>`COALESCE(${transactions.plan}, 'free')`.as("plan"), // Most recent plan
    })
    .from(userTable2)
    .leftJoin(transactions, eq(userTable2.id, transactions.userId)) // Join with transactions
    .where(eq(userTable2.email, userEmail ?? ""))
    .orderBy(desc(transactions.id)) // Get the latest transaction
    .limit(1); // Only return the most recent one
    // console.log(userWithPlan);
      return NextResponse.json(
      // message: "Success",
      {user:userWithPlan[0]}
    );

    } else {
    const token = request.cookies.get("JwtToken")?.value || "";
    // //console.log("token",token)
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    // //console.log(decodedToken)

    const userEmail = decodedToken.email;
    // const user = await db.query.userTable2.findFirst({
    //   where: eq(schema.userTable2.email, userEmail),
    // });
    const userWithPlan = await db
    .select({
        id: userTable2.id,
        username: userTable2.username,
        email: userTable2.email,
        password: userTable2.password,
        image: userTable2.image,
        role: userTable2.role,
        createdAt: userTable2.createdAt,
        plan: sql<string>`COALESCE(${transactions.plan}, 'free')`.as("plan"), // Most recent plan
    })
    .from(userTable2)
    .leftJoin(transactions, eq(userTable2.id, transactions.userId)) // Join with transactions
    .where(eq(userTable2.email, userEmail ?? ""))
    .orderBy(desc(transactions.id)) // Get the latest transaction
    .limit(1); // Only return the most recent one
    // console.log("Else part : ",userWithPlan);
      return NextResponse.json(
      // message: "Success",
      {user:userWithPlan[0]}
    );

    // return NextResponse.json({ user });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
