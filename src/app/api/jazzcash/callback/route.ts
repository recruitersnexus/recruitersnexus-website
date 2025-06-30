import { NextResponse } from "next/server";

// Handle both GET and POST methods
export async function GET(req: Request) {
  console.log("🔵 Received GET request at /payment-status-callback");
  debugger;
  return handleCallback(req);
}

export async function POST(req: Request) {
  console.log("🟢 Received POST request at /payment-status-callback");
  debugger;
  return handleCallback(req);
}

async function handleCallback(req: Request) {
  try {
    let params: Record<string, string> = {};

    if (req.method === "GET") {
      console.log("🔵 Handling GET request");
      const url = new URL(req.url);
      params = Object.fromEntries(url.searchParams.entries());
      console.log("🔵 Extracted GET params:", params);
      debugger;
    } else if (req.method === "POST") {
      console.log("🟢 Handling POST request");
      const formData = await req.formData();
      params = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          value.toString(),
        ])
      );
      console.log("🟢 Extracted POST params:", params);
      debugger;
    } else {
      console.warn(`⚠️ Unexpected method received: ${req.method}`);
    }

    // Prepare HTML form for POST redirect
    const formFields = Object.entries(params)
      .map(
        ([key, value]) =>
          `<input type="hidden" name="${key}" value="${String(value).replace(/"/g, "&quot;")}" />`
      )
      .join("\n");

    console.log("⚪ Preparing redirect form with fields:", params);
    debugger;

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
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("⛔ Payment Callback Error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
}
