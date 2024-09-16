import { NextRequest, NextResponse } from "next/server";
import {db, skillTable, hrTableNew } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";


export async function GET (req: NextRequest) {
const skills = await db.select().from(skillTable);

return NextResponse.json(skills);

}

export async function POST(req: NextRequest)
{
    const data = await req.json();
    // const {id,username} = hrData;    
    const {user_id,skill} = data;
    const hrData:any = await db.select().from(hrTableNew).where(eq(hrTableNew.user_id,user_id));
    const {id} = hrData[0];
        
        try {  
        if(id && skill){

        await db.insert(skillTable).values({skill:skill,user_id:hrData[0].user_id});
            
        }
        } catch (error) {
            return NextResponse.json({"id":hrData[0].user_id,"skill":skill});
        }
        
        


   

    // //console.log(data);
    return NextResponse.json({"id":hrData[0].user_id,"skill":skill});
}

export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    const {sid} = data;   

    

    const skills = await db.delete(skillTable).where(and(eq(skillTable.user_id,data.user_id),eq(skillTable.sid,sid)));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":skills.rows});
}