import { NextRequest, NextResponse } from "next/server";
import {transporter, info, contactUs} from "@/data/mailer"

export async function POST(req:NextRequest, res: NextResponse)
{   const data = await req.json();

    const {reg_code,forgot_pass,fname,textEmail,userEmail,message,subject, contact } = data;
    
    try {
        if(reg_code)
        {
            await transporter.sendMail({
                ...info,
                to: userEmail, // list of receivers
                subject: "Registration Code for Interview Website", // Subject line
                text: "Security Code", // plain text body
                html: message, // html body
                })
        }
        else if(forgot_pass)
        {
            await transporter.sendMail({
                ...info,
                to: userEmail, // list of receivers
                subject: "Forgot Password Code for Interview Website", // Subject line
                text: "Password Reset Security Code", // plain text body
                html: message, // html body
                })
        }

        else if(userEmail && contact === "contact")
            {
                await transporter.sendMail({
                    ...info, // list of receivers
                    to: userEmail,
                    subject: subject, // Subject line
                    text: "Interview Hub", // plain text body
                    html: message, // html body
                    })
            }

        else if(message && !forgot_pass && !reg_code)
        {
            await transporter.sendMail({
                ...info,
                to: userEmail, // list of receivers
                subject: subject, // Subject line
                text: "Interview Hub", // plain text body
                html: message, // html body
                })
        }
        
        
        return NextResponse.json({textEmail})
    } catch (error:any) {
        return NextResponse.json({"Error":error,"textEmail":textEmail})
    }   

}


