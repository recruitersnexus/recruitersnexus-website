import { NextRequest, NextResponse } from "next/server";
import { db, jobTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";




export async function PUT(req: NextRequest) {
    const data = await req.json();
    // const {id} = data;   

    try {
        const updateResult = await db.update(jobTable).set({ image: data.image }).where(eq(jobTable.id, data.id))
        return NextResponse.json({ "message": "Successfully updated image", "updateResult": updateResult });
    } catch (error) {
        return NextResponse.json({ "message": "Error", "error": error });
    }
    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    // return NextResponse.json(data);
}