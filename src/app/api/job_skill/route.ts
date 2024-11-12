import { NextRequest, NextResponse } from "next/server";
import {db, JobSkillTable, qualificationTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import moment from "moment-timezone";

export async function GET (req: NextRequest) {
    try {
        const jobs = await db.select().from(JobSkillTable);
        return NextResponse.json(jobs);
    } catch (error:any) {
        return NextResponse.json({"status":"Cannot Fetch Data","message":error.message});
    }




}


export async function POST(req: NextRequest)
{
    const data = await req.json();

    try {
        const jobs = await db.insert(JobSkillTable).values(data);
        return NextResponse.json(jobs);
    } catch (error:any) {
        return NextResponse.json({"Status":"Error Submitting Data","message":error.message});
    }
}

// export async function PUT(req: NextRequest)
// {
//     const data = await req.json();
   
//     try {
//         const job = await db.update(JobSkillTable).set(data).where(and(eq(jobTable.user_id,data.user_id),eq(jobTable.id,data.id)));
//         return NextResponse.json({"message":"Successfully Updated","data":job});
//     } catch (error) {
//         return NextResponse.json({"message":"Error Updating","ERROR: ":error});
//     }
    
    

// }


export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    const {id,user_id} = data;   


    
    if(!id)
    {
        const job_skill = await db.delete(JobSkillTable).where(eq(JobSkillTable.user_id,user_id));
        return NextResponse.json({"message":"Successfully Deleted","data":job_skill.rows});

    }
    else if(id)
    {
        const job_skill = await db.delete(JobSkillTable).where(eq(JobSkillTable.sid,id));
        return NextResponse.json({"message":"Successfully Deleted","data":job_skill.rows});

    }

    

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
}
