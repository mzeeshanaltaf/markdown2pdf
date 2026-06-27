import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

type Fields = {
  name: string;
  email: string;
  message: string;
  // Honeypot: a hidden, non-semantic field real users (and browser autofill)
  // never fill. Bots that blindly fill every input populate it, letting us
  // drop the submission silently.
  hpField: string;
};

async function parseBody(req: NextRequest): Promise<Fields> {
  if (isFormSubmission(req)) {
    const fd = await req.formData();
    return {
      name: ((fd.get("name") as string | null) ?? "").trim(),
      email: ((fd.get("email") as string | null) ?? "").trim(),
      message: ((fd.get("message") as string | null) ?? "").trim(),
      hpField: ((fd.get("hp_field") as string | null) ?? "").trim(),
    };
  }
  const body = await req.json();
  return {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    message: String(body.message ?? "").trim(),
    hpField: String(body.hp_field ?? "").trim(),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// On Vercel `x-forwarded-for` is set by the platform edge and is trustworthy
// as a rate-limit key. Behind a different/looser proxy it would be spoofable;
// revisit if this is ever deployed elsewhere.
function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}

function isFormSubmission(req: NextRequest): boolean {
  const ct = req.headers.get("content-type") ?? "";
  return ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data");
}

export async function POST(req: NextRequest) {
  // Mirror parseBody's content-type detection so a no-JS form POST always gets
  // a redirect response (not JSON), regardless of urlencoded vs multipart.
  const isFormPost = isFormSubmission(req);

  const ok = (code = "1") =>
    isFormPost
      ? NextResponse.redirect(new URL(`/contact?sent=${code}`, req.url), 303)
      : NextResponse.json({ success: true });

  const fail = (error: string, status: number, message: string) =>
    isFormPost
      ? NextResponse.redirect(new URL(`/contact?error=${error}`, req.url), 303)
      : NextResponse.json({ success: false, message }, { status });

  let fields: Fields;
  try {
    fields = await parseBody(req);
  } catch {
    return fail("parse", 400, "Invalid submission. Please try again.");
  }

  const { name, email, message, hpField } = fields;

  // Honeypot tripped → pretend success so bots get no signal.
  if (hpField) return ok();

  if (!name || !email || !message) {
    return fail("fields", 400, "Please fill in all fields.");
  }
  if (!EMAIL_RE.test(email)) {
    return fail("email", 400, "Please enter a valid email address.");
  }
  if (message.length > 5000) {
    return fail("length", 400, "Message must be 5000 characters or fewer.");
  }

  const { success: underLimit } = await checkRateLimit(clientIp(req));
  if (!underLimit) {
    return fail("rate", 429, "Too many submissions. Please try again later.");
  }

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  const apiKey = process.env.N8N_API_KEY;
  if (!webhookUrl || !apiKey) {
    console.error("[contact] Missing N8N_CONTACT_WEBHOOK_URL or N8N_API_KEY");
    return fail("server", 500, "Service is not configured. Please try again later.");
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        source: "markdown2pdf",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      console.error(`[contact] Webhook returned ${res.status}`);
      return fail("server", 502, "Could not send your message. Please try again later.");
    }
  } catch (err) {
    console.error("[contact] Webhook request failed:", err);
    return fail("server", 502, "Could not send your message. Please try again later.");
  }

  return ok();
}
