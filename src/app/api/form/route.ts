import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  //console.log("from api", data);
  return NextResponse.json("Data Arrived");
}