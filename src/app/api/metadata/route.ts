import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch external website content" }, { status: 500 });
    }

    const html = await res.text();
    
    // Regex matching for Open Graph metadata
    const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
                       html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["']/i) ||
                       html.match(/<title>([^<]*)<\/title>/i);

    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) ||
                       html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:image["']/i);

    const descMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["']/i) ||
                      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);

    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : "";
    const imageUrl = imageMatch ? imageMatch[1].trim() : "";
    const description = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : "";

    // Extract publisher (hostname)
    let publisher = "";
    try {
      const parsedUrl = new URL(url);
      publisher = parsedUrl.hostname.replace("www.", "");
    } catch (e) {}

    return NextResponse.json({ title, imageUrl, description, publisher });
  } catch (error) {
    return NextResponse.json({ error: "Internal parsing error" }, { status: 500 });
  }
}

// Helper to decode basic HTML entities from metadata attributes
function decodeHtmlEntities(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
