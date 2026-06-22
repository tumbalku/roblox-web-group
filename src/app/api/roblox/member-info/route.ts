import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  try {
    // 1. Fetch user detail info
    const infoUrl = `https://users.roblox.com/v1/users/${userId}`;
    const infoResponse = await fetch(infoUrl);
    
    let username = `User_${userId}`;
    let displayName = `Robloxian (${userId})`;

    if (infoResponse.ok) {
      const infoData = await infoResponse.json();
      username = infoData.name;
      displayName = infoData.displayName;
    }

    // 2. Fetch 2D headshot avatar (circular = false to get full card style)
    const thumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`;
    const thumbResponse = await fetch(thumbnailUrl);
    
    let avatar2dUrl = "https://images.rbxcdn.com/265391c4df194f8b965e64817a0b5f58.png"; // Fallback to default Roblox headshot

    if (thumbResponse.ok) {
      const thumbData = await thumbResponse.json();
      if (thumbData.data && thumbData.data.length > 0) {
        avatar2dUrl = thumbData.data[0].imageUrl;
      }
    }

    return NextResponse.json({
      userId: parseInt(userId, 10),
      username,
      displayName,
      avatar2dUrl,
    });
  } catch (error: any) {
    // Graceful fallback to avoid app crash if API is down or rate-limited
    return NextResponse.json({
      userId: parseInt(userId, 10),
      username: `User_${userId}`,
      displayName: `User ${userId}`,
      avatar2dUrl: "https://images.rbxcdn.com/265391c4df194f8b965e64817a0b5f58.png",
      fallback: true,
      error: error.message
    });
  }
}
