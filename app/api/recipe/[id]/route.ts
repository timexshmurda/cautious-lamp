import { NextResponse } from "next/server";

// Temporary in-memory recipe storage (replace with your DB later)
const recipeCache: Record<string, any> = {};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (recipeCache[id]) {
    return NextResponse.json(recipeCache[id]);
  }

  return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.id) {
    return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
  }

  recipeCache[data.id] = data;
  return NextResponse.json({ success: true });
}
