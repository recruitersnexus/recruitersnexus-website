import { NextResponse } from "next/server";

// Handle both GET and POST methods
export async function GET(req: Request) {
  return handleCallback(req);
}

export async function POST(req: Request) {
  return handleCallback(req);
}

async function handleCallback(req: Request) {
  try {
    let params: Record<string, string> = {};

    // Handle both GET and POST requests
    if (req.method === "GET") {
      const url = new URL(req.url);
      params = Object.fromEntries(url.searchParams.entries());
    } else if (req.method === "POST") {
      const formData = await req.formData();
      // Convert FormDataEntryValue to string
      params = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          value.toString()
        ])
      );
    }

    console.log("JazzCash Callback Params:", params);

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
