import { NextRequest, NextResponse } from "next/server";
import {db, interviewTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import moment from "moment-timezone";

export async function GET (req: NextRequest) {
const interview = await db.select().from(interviewTable);

return NextResponse.json(interview);

}


export async function POST(req: NextRequest)
{
    const data = await req.json();

    await db.insert(interviewTable).values({id:data.id,slot:data.slot,hr_id:data.hr_id,user_id:data.user_id}); 

    // //console.log(data);
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest)
{
    const data = await req.json();
    // const {id} = data;   
    const {slot} = data;
    // const formattedSlot = moment(slot).format();
    const formattedSlot = slot;
    const formattedSlotUTC = moment.utc(slot).format();

    const interview = await db.select().from(interviewTable).where(and(eq(interviewTable.hr_id,data.hr_id),eq(interviewTable.user_id,data.user_id),eq(interviewTable.slot,formattedSlotUTC)));
    
    // return NextResponse.json(interview);
    // const filteredInterview = interview.filter((item) => item.slot === data.slot);
    // return NextResponse.json(filteredInterview);
    try {
        if(data.is_confirmed === "confirmed" && interview[0]?.is_confirmed === "unConfirmed")
    {
        const updateResult = await db.update(interviewTable).set({is_confirmed:data.is_confirmed}).where(and(eq(interviewTable.hr_id,data.hr_id),eq(interviewTable.user_id,data.user_id),eq(interviewTable.slot,formattedSlot),eq(interviewTable.id,data.id)));
        return  NextResponse.json({"is_confirmed":updateResult.rows});
    }
    else if(data.is_conducted === "conducted" && interview[0]?.is_conducted === "notConducted")
    {
        const updateResult = await db.update(interviewTable).set({is_conducted:data.is_conducted}).where(and(eq(interviewTable.hr_id,data.hr_id),eq(interviewTable.user_id,data.user_id),eq(interviewTable.slot,formattedSlot)));
        return  NextResponse.json({"is_confirmed":updateResult.rows});
    }
    } catch (error) {
        return NextResponse.json({"message":error,"is_confirmed":interview[0]?.is_confirmed, "is_conducted":interview[0]?.is_conducted, "slot":interview[0]?.slot});
    }
    
    

    return NextResponse.json({"is_confirmed":interview[0]?.is_confirmed, "is_conducted":interview[0]?.is_conducted, "slot":interview[0]?.slot});   
}


export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    const {slot} = data;   

    // const formattedSlot = moment(slot).format();
    const formattedSlot = slot;

    const interview = await db.delete(interviewTable).where(and(eq(interviewTable.hr_id,data.hr_id),eq(interviewTable.user_id,data.user_id),eq(interviewTable.slot,formattedSlot),eq(interviewTable.is_confirmed,data.is_confirmed),eq(interviewTable.id,data.id)));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":interview.rows});
}