import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "pdf",
  "ai",
  "eps",
  "svg",
  "png",
  "jpg",
  "jpeg",
  "tif",
  "tiff",
  "psd",
  "cdr",
  "zip",
]);

const MAX_BYTES = 50 * 1024 * 1024;

function ext(name: string): string {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "No file was received." }, { status: 400 });
  }
  const file = form.get("file");
  const orderRef = String(form.get("orderRef") || "guest").slice(0, 60);
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose an artwork file." }, { status: 400 });
  }
  const extension = ext(file.name);
  if (!ALLOWED.has(extension)) {
    return NextResponse.json(
      {
        error:
          "That file type is not accepted. Please send PDF, AI, EPS, SVG, PNG, JPG, TIFF, PSD, CDR or a ZIP of your artwork.",
      },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "That file is larger than 50MB. For very large files, send us a download link on WhatsApp instead." },
      { status: 413 },
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const pathname = `artwork/${orderRef}/${Date.now()}-${safeName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(pathname, file, { access: "public" });
      return NextResponse.json({
        url: blob.url,
        pathname: blob.pathname,
        stored: "vercel-blob",
        size: file.size,
      });
    } catch {
      return NextResponse.json(
        { error: "Upload storage is unavailable right now. Please try again or send the file on WhatsApp." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    url: `preview-upload://${pathname}`,
    pathname,
    stored: "preview-only",
    size: file.size,
    note: "Blob storage is not configured in this preview. Set BLOB_READ_WRITE_TOKEN to store files in Vercel Blob. The quote flow continues with this file name recorded.",
  });
}
