import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get the form data from JazzCash
    const formData = await req.formData();
    const params = Object.fromEntries(formData.entries());

    // console.log("JazzCash Callback Params:", params);

    // Construct the URL with query parameters
    const redirectUrl = new URL("/payment-status", process.env.NEXT_PUBLIC_URL);

    // Add all parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      redirectUrl.searchParams.append(key, value.toString());
    });

    // Redirect to the payment-status page
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Payment Callback Error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
}
