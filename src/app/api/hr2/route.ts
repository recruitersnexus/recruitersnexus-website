import { NextRequest, NextResponse } from "next/server";
import {db, hrTableNew } from "@/lib/db/schema";
import { eq } from "drizzle-orm";


export async function GET (req: NextRequest) {
const hr = await db.select().from(hrTableNew);

return NextResponse.json(hr);

}


export async function POST(req: NextRequest)
{
    const data = await req.json();

    await db.insert(hrTableNew).values(data);

    // //console.log(data);
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest)
{
    const data = await req.json();
    // const {id} = data;   

    if(data.is_approve === "user"){
        const updateResult = await db.update(hrTableNew).set(data).where(eq(hrTableNew.user_id,data.user_id))
    return NextResponse.json({"message":"Successfully Updated for user", "updateResult: ":updateResult});
    }
    else if(data.is_approve === "approved")
    {
        const updateResult = await db.update(hrTableNew).set({is_approve:data.is_approve}).where(eq(hrTableNew.user_id,data.user_id))
     return NextResponse.json({"message":"Account approved", "updateResult: ":updateResult});
    }
    else if(data.is_approve === "pending")
    {
        const updateResult = await db.update(hrTableNew).set({is_approve:data.is_approve}).where(eq(hrTableNew.user_id,data.user_id))
        return NextResponse.json({"message":"Account approval pending", "updateResult: ":updateResult});
    }
    else if(data.is_approve === "unapproved")
    {
        const updateResult = await db.update(hrTableNew).set({is_approve:data.is_approve}).where(eq(hrTableNew.user_id,data.user_id))
     return NextResponse.json({"message":"Account unapproved", "updateResult: ":updateResult});
    }
    else {
    const updateResult = await db.update(hrTableNew).set({fname:data.fname,lname:data.lname,about:data.about,father_name:data.father_name,dob:data.dob,gender:data.gender,martial_status:data.martial_status,phone:data.phone,nic:data.nic,nationality:data.nationality,religion:data.religion,designation:data.designation}).where(eq(hrTableNew.user_id,data.user_id))
    return NextResponse.json({"message":"Successfully Updated for hr", "updateResult: ":updateResult});
}
    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    
}