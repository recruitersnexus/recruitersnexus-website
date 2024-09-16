import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set Cache-Control and Pragma headers to prevent caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");

    response.cookies.set("JwtToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // response.cookies.set("next-auth.session-token", "", {
    //   httpOnly: true,
    //   expires: new Date(0),
    // });
    // response.cookies.set("__Secure-next-auth.session-token", "", {
    //   httpOnly: true,
    //   expires: new Date(0),
    // });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
