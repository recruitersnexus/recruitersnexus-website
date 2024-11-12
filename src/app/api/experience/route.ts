import { NextRequest, NextResponse } from "next/server";
import {db, experienceTable, hrTableNew } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";




export async function GET (req: NextRequest) {
    const experience = await db.select().from(experienceTable);
    
    return NextResponse.json(experience);
    
    }


export async function POST(req: NextRequest)
{
    const data = await req.json();

        try {  

        await db.insert(experienceTable).values({designation:data.designation,from_date:data.from_date,to_date:data.to_date,aoe:data.aoe,total_experience:data.total_experience,organization:data.organization,user_id:data.user_id,address:data.address,image:data.image});
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

    

    const experience = await db.delete(experienceTable).where(and(eq(experienceTable.user_id,data.user_id),eq(experienceTable.id,id)));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":experience.rows});
}