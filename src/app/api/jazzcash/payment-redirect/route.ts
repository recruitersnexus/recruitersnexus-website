import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Get the URL parameters
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    console.log("Payment Redirect Params:", params);

    // Construct the URL with query parameters
    const redirectUrl = new URL("/payment-status", process.env.NEXT_PUBLIC_URL);

    // Add all parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      redirectUrl.searchParams.append(key, value.toString());
    });

    // Redirect to the payment-status page
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Payment Redirect Error:", error);
    return NextResponse.json(
      { error: "Failed to process payment redirect" },
      { status: 500 }
    );
  }
}
