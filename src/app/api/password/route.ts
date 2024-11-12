import { NextRequest, NextResponse } from "next/server";
import {db,userTable2, hrTableNew } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";


export async function PUT(req: NextRequest)
{
    const data = await req.json();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);
    // const {id} = data;   

    try {
        const updateResult = await db.update(userTable2).set({password:hashedPassword}).where(eq(userTable2.id,data.user_id));
        return NextResponse.json({"message":"Password Updated successfully","result: ":updateResult});
    } catch (error) {
        // //console.log(error);
        
    }
    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"Pass: ":data.password,"hashedPass: ":hashedPassword});
}