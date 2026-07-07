import { promises as fs } from "fs";
import path from "path";
import type { DocumentRecord } from "./types";

const DB_PATH = path.join(process.cwd(), "database", "documents.json");

export type DocumentInput = Partial<Omit<DocumentRecord, "id">>;

export async function readDocuments(): Promise<DocumentRecord[]> {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as DocumentRecord[];
}

async function writeDocuments(documents: DocumentRecord[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(documents, null, 2) + "\n", "utf-8");
}

export async function getDocument(id: string): Promise<DocumentRecord | null> {
  const documents = await readDocuments();
  return documents.find((doc) => doc.id === id) ?? null;
}

/** Placeholder preview image derived from a document name. */
function placeholderUrl(name: string): string {
  return `https://dummyjson.com/image/400x200/1e3a8a/ffffff?text=${encodeURIComponent(
    name || "Document",
  ).replace(/%20/g, "+")}&fontSize=16&fontFamily=poppins`;
}

export async function createDocument(
  input: DocumentInput,
): Promise<DocumentRecord> {
  const documents = await readDocuments();

  // Next incremental id (max existing numeric id + 1).
  const nextId =
    documents.reduce((max, doc) => Math.max(max, Number(doc.id) || 0), 0) + 1;

  const name = input.name?.trim() || "Untitled Document";
  const record: DocumentRecord = {
    id: String(nextId),
    name,
    type: input.type || "Medical",
    issuedDate: input.issuedDate || "",
    expiryDate: input.expiryDate ? input.expiryDate : null,
    uploadedBy: input.uploadedBy || "You",
    status: input.status || "pending",
    description: input.description || "",
    uploadUrl: input.uploadUrl || placeholderUrl(name),
  };

  await writeDocuments([record, ...documents]);
  return record;
}

export async function updateDocument(
  id: string,
  input: DocumentInput,
): Promise<DocumentRecord | null> {
  const documents = await readDocuments();
  const index = documents.findIndex((doc) => doc.id === id);
  if (index === -1) return null;

  const current = documents[index];
  const updated: DocumentRecord = {
    ...current,
    ...input,
    // Never allow the id to be overwritten; normalise empty expiry to null.
    id: current.id,
    expiryDate:
      input.expiryDate === undefined
        ? current.expiryDate
        : input.expiryDate || null,
  };

  documents[index] = updated;
  await writeDocuments(documents);
  return updated;
}

export async function deleteDocument(id: string): Promise<boolean> {
  const documents = await readDocuments();
  const next = documents.filter((doc) => doc.id !== id);
  if (next.length === documents.length) return false;
  await writeDocuments(next);
  return true;
}
