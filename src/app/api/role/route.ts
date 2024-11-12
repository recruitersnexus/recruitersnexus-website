// import { userTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { hrTableNew, userTable2 } from "@/lib/db/schema";

const db = drizzle(sql, { schema });
export async function PUT(request: Request) {
    const data = await request.json();
    // const {id} = data;   

    try {
        const updateResult = await db.update(schema.userTable2).set({role:data.role}).where(eq(schema.userTable2.email,data.email));
        return NextResponse.json({"message":"Role updated successfully",
            updateResult, "email":updateResult});
    }
    catch (error) {
        //console.log(error);
        return NextResponse.json({"message":"Not Updated","email":data.email});
    }
    
    // await db.insert(hrTableNew).values(data)

    // //console.log(data);
  


}
