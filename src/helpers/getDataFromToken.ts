import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("JwtToken")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //console.log(decodedToken);
    //console.log(decodedToken.id);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};