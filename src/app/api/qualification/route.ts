import { NextRequest, NextResponse } from "next/server";
import {db, qualificationTable, hrTableNew } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";



export async function GET (req: NextRequest) {
    const qualification = await db.select().from(qualificationTable);
    
    return NextResponse.json(qualification);
    
    }

export async function POST(req: NextRequest)
{
    const data = await req.json();

        try {  

        await db.insert(qualificationTable).values({degree:data.degree,speciallization:data.speciallization,cgpa:data.cgpa,passing_year:data.passing_year,institute:data.institute,user_id:data.user_id});
        return NextResponse.json({"message":"Success","Data: ":data});
            
        } catch (error) {
            return NextResponse.json({"message":"Error","Data: ":data, "Error: ":error});
        }
        

    // //console.log(data);
    return NextResponse.json({"Data: ":data});
}


export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    const {id} = data;   

    

    const qualification = await db.delete(qualificationTable).where(and(eq(qualificationTable.user_id,data.user_id),eq(qualificationTable.id,id)));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":qualification.rows});
}