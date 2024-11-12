import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

const db = drizzle(sql, { schema });


export async function POST(request: Request) {
  try {

  const reqBody = await request.json();
  // await db.insert(userTable).values(reqBody);
  const { username, email, password, role} = reqBody;
  // //console.log(reqBody);

  // //check if user already exists
  const checkUser = await db.query.userTable2.findFirst({
    where: eq(schema.userTable2.email, reqBody.email),
  });

  if (checkUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  //hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpReg = Math.floor(100000 + Math.random() * 900000);
  const hashedForgotPassword = await bcryptjs.hash(otp.toString(), salt);
  const hashedRegistrationCode = await bcryptjs.hash(otpReg.toString(), salt);
  // unique userId Generation 
  const id = uuidv4(); 

  // try {

    await db.insert(schema.userTable2).values({
      id : id,
      username: reqBody.username,
      email: reqBody.email,
      password: hashedPassword,
      role: role,
    });

    await db.insert(schema.hrTableNew).values({
      fname: reqBody.fname,
      lname: reqBody.lname,
      user_id: id
    })

    await db.insert(schema.verifyTable).values({
      forgot_pass: otp.toString(),
      reg_code: otpReg.toString(),
      user_id: id,
    })

    // //console.log("User Registered");
    return NextResponse.json("User Registered");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
