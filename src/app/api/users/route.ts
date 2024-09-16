import {  db, userTable2 } from "@/lib/db/schema";
import { NextResponse, NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  // try {
  
  const users = await db.select().from(userTable2);
  // //console.log(users)
  return NextResponse.json(users);
  // return NextResponse.json({ users }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }
}

export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    // const {id} = data;   



    const users = await db.delete(userTable2).where(eq(userTable2.id,data.user_id));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":users.rows});
}
