import { NextResponse } from "next/server";
import bcryptjs, { compare } from "bcryptjs";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const db = drizzle(sql, { schema });
export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    // await db.insert(userTable).values(reqBody);
    const { username, email, image } = reqBody.data;
    // //console.log(username);
    // //console.log(email);
    // //console.log(image);

    // //check if user already exists
    const checkUser = await db.query.userTable2.findFirst({
      where: eq(schema.userTable2.email, email),
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpReg = Math.floor(100000 + Math.random() * 900000);

    if (!checkUser) {
      // unique userId Generation
      const id = uuidv4();

      // try {
      await db.insert(schema.userTable2).values({
        id: id,
        username: username,
        email: email,
        image: image,
      });

      await db.insert(schema.hrTableNew).values({
        fname: "john",
        lname: "Doe",
        user_id: id
      })
  
      await db.insert(schema.verifyTable).values({
        forgot_pass: otp.toString(),
        reg_code: otpReg.toString(),
        user_id: id,
      })



      //console.log("User Registered");
    }

    return NextResponse.json("User Registered");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
