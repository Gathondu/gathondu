import { NextRequest } from "next/server";

export const runtime = "nodejs";

const SAFE_STATIC_PATH = /^[a-zA-Z0-9/_@.+-]+$/;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const backendOrigin = process.env.PORTFOLIO_BACKEND_ORIGIN;

  if (!backendOrigin) {
    return Response.json({ detail: "PORTFOLIO_BACKEND_ORIGIN is required." }, { status: 500 });
  }

  const { path } = await params;
  const staticPath = path.join("/");

  if (!staticPath || !SAFE_STATIC_PATH.test(staticPath)) {
    return Response.json({ detail: "Invalid static asset path." }, { status: 400 });
  }

  const upstreamUrl = new URL(`/static/${staticPath}`, backendOrigin);
  const upstream = await fetch(upstreamUrl, {
    headers: {
      accept: _request.headers.get("accept") ?? "*/*",
    },
    next: { revalidate: 86400 },
  });

  if (!upstream.ok || !upstream.body) {
    return Response.json({ detail: "Static asset was not found." }, { status: upstream.status });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  const contentLength = upstream.headers.get("content-length");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (contentLength) {
    headers.set("content-length", contentLength);
  }

  headers.set("cache-control", "public, max-age=86400, s-maxage=86400");

  return new Response(upstream.body, {
    headers,
    status: upstream.status,
  });
}
