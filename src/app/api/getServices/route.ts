import { db, serviceTable } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
    
    const services = await db.select().from(serviceTable);
    return NextResponse.json(services)
}

export async function POST(req: NextRequest)
{
    const data = await req.json();
    // const {id,username} = hrData;    
    const {service,slot,user_id,category} = data;
    // const hrData:any = await db.select().from(hrTableNew).where(eq(hrTableNew.user_id,user_id));
    // const {id} = hrData[0];
        
        try {  
        if(user_id && service && slot){

        await db.insert(serviceTable).values({service:service,slot:slot,user_id:user_id,category:category});
            
        }
        } catch (error:any) {
            return NextResponse.json( {"message":"ERROR","error":error.message , "id":user_id,"service": service, "slot": slot});
        }
        
        


   

    // //console.log(data);
    return NextResponse.json({"id":user_id,"service": service, "slot": slot});
}


export async function DELETE(req: NextRequest)
{
    const data = await req.json();
    const {id} = data;   

    // const formattedSlot = moment(slot).format();

    const service = await db.delete(serviceTable).where(and(eq(serviceTable.user_id,data.user_id),eq(serviceTable.id,data.id)));

    

    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
    return NextResponse.json({"message":"Successfully Deleted","data":service.rows});
}