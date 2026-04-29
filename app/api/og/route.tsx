import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title") || "Note Taking";
    const description =
      searchParams.get("description") || "Note Taking Application";

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
          color: "white",
          padding: "0 120px",
        }}
      >
        <div style={{ marginBottom: 20 }}>{title}</div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            opacity: 0.8,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
