import { NextRequest, NextResponse } from "next/server";
import {db, jobTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import moment from "moment-timezone";

export async function GET (req: NextRequest) {
const jobs = await db.select().from(jobTable);

return NextResponse.json(jobs);

}


export async function POST(req: NextRequest)
{
    const data = await req.json();

    try {
        const jobs = await db.insert(jobTable).values(data);
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({"message":error});
    }
}

export async function PUT(req: NextRequest)
{
    const data = await req.json();
    // const {id} = data;   
    // const {slot} = data;
    // const formattedSlot = moment(slot).format();
    // const feedback = await db.select().from(jobTable).where(and(eq(jobTable.hr_id,data.hr_id),eq(feedbackTable.user_id,data.user_id),eq(feedbackTable.slot,formattedSlot)));
    
    // return NextResponse.json(interview);
    // const filteredInterview = interview.filter((item) => item.slot === data.slot);
    // return NextResponse.json(filteredInterview);
    try {
        const job = await db.update(jobTable).set(data).where(and(eq(jobTable.user_id,data.user_id),eq(jobTable.id,data.id)));
        return NextResponse.json({"message":"Successfully Updated","data":job});
    } catch (error) {
        return NextResponse.json({"message":"Error Updating","ERROR: ":error});
    }
    
    

    // return NextResponse.json({"rating one":feedback[0].rating_one, "candidate name":feedback[0].candidate_name, "slot":feedback[0].slot});   
}


export async function DELETE(req: NextRequest)
{
    const data = await req.json();

    try{
        const job = await db.delete(jobTable).where(and(eq(jobTable.user_id,data.user_id),eq(jobTable.id,data.id)));
        return NextResponse.json({"message":"Successfully Deleted","data":job});   
    }catch(error)
    {
        return NextResponse.json({"message":"Error Deleting","ERROR: ":error});
    }
}
