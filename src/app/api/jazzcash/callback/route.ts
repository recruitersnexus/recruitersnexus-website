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

    // Prepare HTML form for POST redirect
    const formFields = Object.entries(params)
      .map(
        ([key, value]) =>
          `<input type="hidden" name="${key}" value="${String(value).replace(/"/g, "&quot;")}" />`
      )
      .join("\n");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Redirecting...</title>
        </head>
        <body>
          <form id="redirectForm" action="/payment-status" method="POST">
            ${formFields}
          </form>
          <script>
            document.getElementById('redirectForm').submit();
          </script>
          <noscript>
            <p>JavaScript is required for automatic redirection. Please click the button below:</p>
            <button type="submit" form="redirectForm">Continue</button>
          </noscript>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html"
      }
    });
  } catch (error) {
    console.error("Payment Callback Error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
}
