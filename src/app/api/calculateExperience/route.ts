import { NextRequest, NextResponse } from "next/server";
import {db, experienceTable, hrTableNew } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";







export async function PUT(req: NextRequest)
{
    const data = await req.json();

        try {  

        await db.update(hrTableNew).set({calculate_experience:data.calculate_experience}).where(eq(hrTableNew.user_id,data.user_id));
        return NextResponse.json({"message":"Success","Data: ":data});
            
        } catch (error) {
            return NextResponse.json({"message":"Error","Data: ":data, "Error: ":error});
        }
        

    // //console.log(data);
    return NextResponse.json({"Data: ":data});
}

