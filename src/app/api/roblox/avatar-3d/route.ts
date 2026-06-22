import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  try {
    // 1. Fetch the 3D avatar config URL
    const avatar3dUrl = `https://thumbnails.roblox.com/v1/users/avatar-3d?userId=${userId}`;
    const headers: Record<string, string> = {};
    if (process.env.ROBLOX_API_KEY) {
      headers["x-api-key"] = process.env.ROBLOX_API_KEY;
    }
    const response = await fetch(avatar3dUrl, { headers });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch 3D avatar status: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (data.state !== "Completed" || !data.imageUrl) {
      return NextResponse.json({
        state: data.state, // Pending / Failed etc
        userId: parseInt(userId, 10),
      });
    }

    // 2. Fetch the secondary JSON configuration file that Roblox returns in imageUrl
    const configResponse = await fetch(data.imageUrl);
    if (!configResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch 3D model configuration from Roblox CDN" },
        { status: 500 }
      );
    }

    const configData = await configResponse.json();

    // 3. Rewrite all Roblox CDN URLs inside the config to use our CORS proxy
    const proxyUrl = (url: string) => `/api/roblox/proxy?url=${encodeURIComponent(url)}`;

    const rewrittenConfig = {
      state: "Completed",
      userId: parseInt(userId, 10),
      obj: configData.obj ? proxyUrl(configData.obj) : null,
      mtl: configData.mtl ? proxyUrl(configData.mtl) : null,
      textures: Array.isArray(configData.textures)
        ? configData.textures.map((tex: string) => proxyUrl(tex))
        : [],
      camera: configData.camera || null,
      aabb: configData.aabb || null,
    };

    return NextResponse.json(rewrittenConfig);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
