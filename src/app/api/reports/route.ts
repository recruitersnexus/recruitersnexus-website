import { NextRequest, NextResponse } from "next/server";
import {db, reportTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import moment from "moment-timezone";

export async function GET (req: NextRequest) {
const reports = await db.select().from(reportTable);

return NextResponse.json(reports);

}


export async function POST(req: NextRequest)
{
    const data = await req.json();
    const {slot} = data;
    const formattedSlot = moment(slot).format();

    try {
        const reports = await db.insert(reportTable).values(data);
        return NextResponse.json(reports);
    } catch (error) {
        return NextResponse.json({"message":error});
    }
}

// export async function PUT(req: NextRequest)
// {
//     const data = await req.json();
//     // const {id} = data;   
//     const {slot} = data;
//     const formattedSlot = moment(slot).format();
//     const feedback = await db.select().from(feedbackTable).where(and(eq(feedbackTable.hr_id,data.hr_id),eq(feedbackTable.user_id,data.user_id),eq(feedbackTable.slot,formattedSlot)));
    
//     // return NextResponse.json(interview);
//     // const filteredInterview = interview.filter((item) => item.slot === data.slot);
//     // return NextResponse.json(filteredInterview);
//     try {
//         if(data.user_feedback)
//         {
//             const updateResult = await db.update(feedbackTable).set({rating_one:data.rating_one,rating_two:data.rating_two,rating_three:data.rating_three,rating_four:data.rating_four,rating_five:data.rating_five,total_rating:data.total_rating,user_feedback:data.user_feedback}).where(and(eq(feedbackTable.hr_id,data.hr_id),eq(feedbackTable.user_id,data.user_id),eq(feedbackTable.slot,formattedSlot)));
//             return  NextResponse.json({"update Feedback":updateResult.rows});
//         }
//         else if(data.candidate_name)
//         {
//             const updateResult = await db.update(feedbackTable).set({candidate_name:data.candidate_name,strength:data.strength,weakness:data.weakness,description:data.description,user_rating:data.user_rating}).where(and(eq(feedbackTable.hr_id,data.hr_id),eq(feedbackTable.user_id,data.user_id),eq(feedbackTable.slot,formattedSlot)));
//             return  NextResponse.json({"update Feedback":updateResult.rows});
//         }

//     } catch (error) {
//         return NextResponse.json({"message":error,"feedback Data":feedback, "Rating_one":feedback[0].rating_one, "slot":feedback[0].slot});
//     }
    
    

//     return NextResponse.json({"rating one":feedback[0].rating_one, "candidate name":feedback[0].candidate_name, "slot":feedback[0].slot});   
// }


export async function DELETE(req: NextRequest)
{
    const data = await req.json();
   

    

    const reports = await db.delete(reportTable).where(eq(reportTable.user_id,data.user_id));
    return NextResponse.json({"message":"Successfully Deleted","data":reports});
    
}
//     // await db.insert(hrTableNew).values(data)

//     // //console.log(data);
//     return NextResponse.json({"message":"Successfully Deleted","data":feedback});
// }