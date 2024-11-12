import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
// import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth/next";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

const db = drizzle(sql, { schema });

export async function GET(request: NextRequest) {
  // const token = await request.headers.get('authorization')
  const session = await getServerSession(authOptions);

  try {
    if (session) {
    const sessionUser = await session?.user;
    const userEmail = sessionUser?.email;
    const user = await db.query.userTable2.findFirst({
      where: eq(schema.userTable2.email, userEmail?? ""),
    });  
      return NextResponse.json(
      // message: "Success",
      {user}
    );

    } else {
    const token = request.cookies.get("JwtToken")?.value || "";
    // //console.log("token",token)
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    // //console.log(decodedToken)

    const userEmail = decodedToken.email;
    const user = await db.query.userTable2.findFirst({
      where: eq(schema.userTable2.email, userEmail),
    });

    return NextResponse.json({ user });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
