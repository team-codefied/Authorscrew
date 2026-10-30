import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formSchema } from "@/lib/schemas";

// Best-effort per-instance rate limit; Turnstile is the real spam gate.
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 600_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  return ++h.n > 8;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  return ((await res.json()) as { success?: boolean }).success === true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const parsed = formSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { turnstileToken, website, ...data } = parsed.data;
  void website;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Spam check failed. Please try again." }, { status: 400 });
  }

  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`)
    .join("");
  const subject = `New ${data.kind} submission${data.page ? ` - ${data.page}` : ""}`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "Email service is not configured." }, { status: 500 });
    }
    console.log("[forms:dev]", subject, data);
    return NextResponse.json({ ok: true });
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.FORM_FROM_EMAIL ?? "Authors Crew <onboarding@resend.dev>",
    to: (process.env.FORM_TO_EMAIL ?? "info@authorscrew.com").split(","),
    replyTo: "email" in data && data.email ? data.email : undefined,
    subject,
    html: `<table cellpadding="6">${rows}</table>`,
  });
  if (error) {
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
