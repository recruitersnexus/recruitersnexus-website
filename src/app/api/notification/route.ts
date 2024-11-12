import { NextRequest, NextResponse } from 'next/server';
import {db, interviewTable } from "@/lib/db/schema";
import { and, eq } from 'drizzle-orm';  // Adjust the path to your ORM module

export async function DELETE(req: NextRequest) {
    const dataArray = await req.json();

    const currentDateTime = new Date();

    for (const data of dataArray) {
        const { slot, hr_id } = data;

        const slotDateTime = new Date(slot);

        if (slotDateTime < currentDateTime) {
            await db.delete(interviewTable).where(and(
                eq(interviewTable.hr_id, hr_id),
                eq(interviewTable.slot, slot),
                eq(interviewTable.is_confirmed, "unConfirmed")
            ));
        }
    }

    return NextResponse.json({ message: "Expired slots deleted successfully" });
}