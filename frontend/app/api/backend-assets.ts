import { NextRequest } from "next/server";

const SAFE_BACKEND_ASSET_PATH = /^[a-zA-Z0-9/_@.+-]+$/;

type BackendAssetPrefix = "media" | "static";

export async function proxyBackendAsset(
  request: NextRequest,
  prefix: BackendAssetPrefix,
  path: string[],
) {
  const backendOrigin = process.env.PORTFOLIO_BACKEND_ORIGIN;

  if (!backendOrigin) {
    return Response.json({ detail: "PORTFOLIO_BACKEND_ORIGIN is required." }, { status: 500 });
  }

  const assetPath = path.join("/");

  if (!assetPath || !SAFE_BACKEND_ASSET_PATH.test(assetPath)) {
    return Response.json({ detail: "Invalid backend asset path." }, { status: 400 });
  }

  const upstreamUrl = new URL(`/${prefix}/${assetPath}`, backendOrigin);
  const upstreamHeaders = new Headers();
  const accept = request.headers.get("accept");
  const range = request.headers.get("range");

  if (accept) {
    upstreamHeaders.set("accept", accept);
  }

  if (range) {
    upstreamHeaders.set("range", range);
  }

  const upstream = await fetch(upstreamUrl, {
    headers: upstreamHeaders,
    next: { revalidate: range ? 0 : 86400 },
  });

  if (!upstream.ok || !upstream.body) {
    return Response.json({ detail: "Backend asset was not found." }, { status: upstream.status });
  }

  const headers = new Headers();

  for (const header of [
    "accept-ranges",
    "content-length",
    "content-range",
    "content-type",
    "etag",
    "last-modified",
  ]) {
    const value = upstream.headers.get(header);

    if (value) {
      headers.set(header, value);
    }
  }

  headers.set("cache-control", "public, max-age=86400, s-maxage=86400");

  return new Response(upstream.body, {
    headers,
    status: upstream.status,
  });
}
