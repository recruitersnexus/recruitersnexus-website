import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { eq, and } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {  db } from "@/lib/db/schema";



// const otp = Math.floor(100000 + Math.random() * 900000);


export async function GET () {
    const verify = await db.select().from(schema.verifyTable);
    
    return NextResponse.json(verify);
    
    }



    export async function PUT(request: Request) {
        const data = await request.json();
        // const {id} = data;   
    
        try {
            if(data.verified === "verified" && data.reg_code){
                const updateResult = await db.update(schema.verifyTable).set({reg_code:data.reg_code,verified:data.verified}).where(eq(schema.verifyTable.user_id,data.user_id));
                return NextResponse.json({"message":"User Verified successfully",
                updateResult, "email":updateResult});
        }
        else if(data.reg_code){
            const updateResult = await db.update(schema.verifyTable).set({reg_code:data.reg_code}).where(and(eq(schema.verifyTable.user_id,data.user_id),eq(schema.verifyTable.verified,"unverified")));
                return NextResponse.json({"message":"User Verified successfully",
                updateResult, "email":updateResult});
        }
        else if(data.forgot_pass && data.user_id){
            const updateResult = await db.update(schema.verifyTable).set({forgot_pass:data.forgot_pass}).where(and(eq(schema.verifyTable.user_id,data.user_id)));
            return NextResponse.json({"message":"Forgot pass Code updated successfully",
            updateResult, "email":updateResult});
        }
            }            
        catch (error) {
            // //console.log(error);
            return NextResponse.json({"message":"Not Updated","email":data.email});
        }
        
        // await db.insert(hrTableNew).values(data)
    
        // //console.log(data);
      
    
    
    }


export async function POST(request: Request) {
    try {
  
    const reqBody = await request.json();
    // await db.insert(userTable).values(reqBody);
    const { username, email, password, role} = reqBody;
    // //console.log(reqBody);
  
    // //check if user already exists

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
  
    // unique userId Generation 
    
  
    // try {
  
    
  
    //   //console.log("User Registered");
      return NextResponse.json("User Registered");
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
  }