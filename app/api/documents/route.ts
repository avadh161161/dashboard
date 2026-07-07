import { NextResponse } from "next/server";
import { readDocuments, createDocument, type DocumentInput } from "@/lib/db";


export async function GET() {
  const documents = await readDocuments();
  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  let body: DocumentInput;
  try {
    body = (await request.json()) as DocumentInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || !body.name.trim()) {
    return NextResponse.json(
      { error: "Document name is required" },
      { status: 400 },
    );
  }

  const created = await createDocument(body);
  return NextResponse.json(created, { status: 201 });
}
