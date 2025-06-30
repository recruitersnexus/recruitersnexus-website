import { NextResponse } from "next/server";

const SECRET_KEY = "mySecretKey123"; // Replace with your own

function encryptParams(params: Record<string, string>): string {
  const json = JSON.stringify(params);
  const base64 = Buffer.from(json).toString("base64");
  const obfuscated = Buffer.from(base64 + SECRET_KEY).toString("base64");
  return encodeURIComponent(obfuscated);
}

// Handle both GET and POST
export async function GET(req: Request) {
  return handleCallback(req);
}

export async function POST(req: Request) {
  return handleCallback(req);
}

async function handleCallback(req: Request) {
  try {
    let params: Record<string, string> = {};

    if (req.method === "GET") {
      const url = new URL(req.url);
      params = Object.fromEntries(url.searchParams.entries());
    } else if (req.method === "POST") {
      const formData = await req.formData();
      params = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
      );
    }

    const encryptedParams = encryptParams(params);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Redirecting...</title>
        </head>
        <body>
          <form id="redirectForm" action="/payment-status" method="GET">
            <input type="hidden" name="data" value="${encryptedParams}" />
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
    return NextResponse.json({ error: "Failed to process payment callback" }, { status: 500 });
  }
}
