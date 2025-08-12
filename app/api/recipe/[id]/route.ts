import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  // Extract 'id' from pathname or search params depending on your route
  // For dynamic route [id], you can parse pathname:

  const pathname = url.pathname; // e.g. /api/recipe/123
  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // last segment is the id

  // Now use id to get recipe from cache
  if (recipeCache[id]) {
    return NextResponse.json(recipeCache[id]);
  }

  return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
}

// Your recipeCache and POST stay as before:
interface Recipe {
  id: string;
  [key: string]: unknown;
}

const recipeCache: Record<string, Recipe> = {};

export async function POST(request: Request) {
  const data: Recipe = await request.json();

  if (!data.id) {
    return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
  }

  recipeCache[data.id] = data;
  return NextResponse.json({ success: true });
}
