"use client";
import useUserData from "@/lib/db/userData";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserData from "@/components/userData";
import { verifyData, myDataHr } from "@/data/page-data";
import SkeletonLoader from "@/components/SkeletonLoader";
import bcryptjs from "bcryptjs";
import React, { useState, useEffect } from "react";
// import useUserData from '@/lib/db/userData';
import VerificationData from "@/lib/db/vertificationData";
import HrData from "@/lib/db/hrData";
import toast from "react-hot-toast";
import { ChevronDown, ChevronDownIcon } from "lucide-react";

export function UserNav() {
  const { data: session } = useSession();

  const router = useRouter();
  // const [verification, setVerification] = useState([]);
  const { verification } = VerificationData();
  const { hrTable } = HrData();
  // const [hrTable, setHrTable] = useState([]);
  // const {userData} = useUserData();
  const { userData, UUID } = useUserData();

  const filteredHrTable: myDataHr[] = hrTable?.filter(
    (item: any) => item.user_id === userData?.id
  );

  const filteredVerification: verifyData[] = verification.filter(
    (item: any) => userData?.id === item?.user_id
  );

  async function onClickVerify() {
    const salt = await bcryptjs.genSalt(10);
    const hashedStoredCode = await bcryptjs.hash(
      filteredVerification[0]?.reg_code,
      salt
    );
    const message = `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css2?family=Inter&amp;family=Work+Sans:wght@700&amp;display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        .image_block img+div {
          display: none;
        }
    
        @media (max-width:720px) {
          .mobile_hide {
            display: none;
          }
    
          .row-content {
            width: 100% !important;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
    
          .row-2 .column-1 .block-1.heading_block h2 {
            font-size: 30px !important;
          }
        }
      </style>
    </head>
    
    <body style="background-color: #f7f7f7; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7;">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #201f42; border-bottom: 0 solid #EFEEF4; border-left: 0 solid #EFEEF4; border-right: 0px solid #EFEEF4; border-top: 0 solid #EFEEF4; color: #000000; width: 700px; margin: 0 auto;" width="700">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; padding-top: 35px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="padding-bottom:15px;padding-top:15px;text-align:center;width:100%;">
                                    <h2 style="margin: 0; color: #dcdef1; direction: ltr; font-family: 'Noto Serif', Georgia, serif; font-size: 34px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 40.8px;">Security code for Account Registration</h2>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="color:#ffffff;direction:ltr;font-family:Inter, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:28.8px;">
                                      <p style="margin: 0; margin-bottom: 0px;">Hi ${filteredHrTable[0]?.fname},</p>
                                      <p style="margin: 0;">This is your registration code:</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="padding-bottom:15px;padding-top:30px;text-align:center;">
                                    <div class="alignment" align="center"><!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:58px;width:136px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#201F42" fillcolor="#ffffff">
    <w:anchorlock/>
    <v:textbox inset="0px,0px,0px,0px">
    <center style="color:#201f42; font-family:Georgia, serif; font-size:21px">
    <![endif]-->
                                      <div style="text-decoration:none;display:inline-block;color:#201f42;background-color:#ffffff;border-radius:0px;width:auto;border-top:1px solid #201F42;font-weight:400;border-right:1px solid #201F42;border-bottom:1px solid #201F42;border-left:1px solid #201F42;padding-top:5px;padding-bottom:5px;font-family:'Noto Serif', Georgia, serif;font-size:21px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:21px;display:inline-block;letter-spacing:normal;"><span style="word-break:break-word;"><strong><span class style="line-height: 42px;" data-mce-style>${filteredVerification[0]?.reg_code}</span></strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                               <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="color:#ffffff;direction:ltr;font-family:Inter, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:28.8px;">
                                     <p style="margin: 0; margin-bottom: 16px;"><br>Best regards,<br>Copyright © 2024 Recruiters Nexus, All rights reserved.</p>
                                 <p style="margin: 0; margin-bottom: 16px;"><br>You are receiving this email because you opted in via our website.</p>
                                 <p style="margin: 0;"><br>Our mailing address is:<br>Recruiters Nexus<br>Village Kanate </br> Distt. & Tehsil Mansehra <br/> KPK <br/>Pakistan<br/></p>
                                                                     <p style="margin: 0;">If you didn't send the code, <a href="https://www.recruitersnexus.com/contact" target="_blank">Contact us</a></p>

                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>`;
    try {
      if (filteredVerification[0].verified === "unverified") {
        try {
          // //console.log("Form Data: " , service,experience,certif,aoe);
          // setLoading(true);
          const res = await fetch("/api/mail", {
            method: "POST",
            body: JSON.stringify({
              reg_code: filteredVerification[0]?.reg_code,
              fname: filteredHrTable[0]?.fname,
              userEmail: userData?.email,
              message: message,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });

          router.push(
            `/verifyUser/${filteredVerification[0].user_id}?hashedRegistrationCode=${hashedStoredCode}`
          );
          return res;
        } catch (error) {
          //console.log(error);
        }
        // finally{
        //   setLoading(false);
        // }
      }
    } catch (error) {}
  }

  async function onClickLogout() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_Backend_URL + "/api/users/logout",
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      // const OauthSignout = await (()=> signOut());
      // alert("Logging out!");
      if (!response.data.success) {
        toast.error("Error signing out");
        return;
      }
      toast.success("Thank you for your time. Logging Out!");
      router.push("/");

      // setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // async function signOut() {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_Backend_URL}/api/users/logout`,
  //       {
  //         headers: {
  //           "Cache-Control": "no-cache, no-store, must-revalidate",
  //           Pragma: "no-cache",
  //           Expires: "0",
  //         },
  //       }
  //     );

  //     if (!response.data.success) {
  //       toast.error("Error signing out");
  //       return false; // Return false to indicate failure
  //     }

  //     const OauthSignout = await axios.get(
  //       `${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/signout`
  //     );

  //     toast.success("Thank you for your time. Logging Out!");
  //     return true; // Return true to indicate success
  //   } catch (error) {
  //     console.error("Error during sign out:", error);
  //     return false; // Return false to indicate failure
  //   }
  // }

  // async function onClickLogout() {
  //   const isSignedOut = await signOut();
  //   if (isSignedOut) {
  //     router.push("/login");
  //   }
  // }
  // const { data: session } = useSession();
  // //console.log({ session });

  // if (session && session.user)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex space-x-2 items-center cursor-pointer">
          <Button variant="ghost" className="relative h-8 w-8  rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userData?.image} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>

          <ChevronDownIcon size={24} color="black" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#FFFFFF]  text-black"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/profile?id=${userData?.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          <Link href={`/`}>
            <DropdownMenuItem className="cursor-pointer">
              Home
              {/* <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem className="cursor-pointer">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          {/* <Link  href={"/Settings/userinfo"}>
            <DropdownMenuItem className="cursor-pointer">
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link> */}
          <DropdownMenuItem
            className={`${
              filteredVerification[0]?.verified === "unverified" ? "" : "hidden"
            }`}
          >
            <button className="cursor-pointer" onClick={onClickVerify}>
              Verify Account
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* if (session && session.user) {


        } */}
          <button
            className="cursor-pointer"
            onClick={
              session
                ? () => {
                    signOut({ callbackUrl: "https://www.recruitersnexus.com" });
                    toast.success("Thank you for your time. Logging Out!");
                  }
                : onClickLogout
            }
          >
            {/* <button
            className="cursor-pointer"
            onClick={
              session
                ?  async () => {
                    
                      await signOut();

                      toast.success("Thank you for your time. Logging Out!");
                      router.push("/login");
                    
                  }
                : onClickLogout
            }
          > */}
            Sign Out
          </button>

          {/* Log out */}

          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
