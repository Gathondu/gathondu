import { NextRequest } from "next/server";
import { proxyBackendAsset } from "../../../backend-assets";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyBackendAsset(request, "media", path);
}
