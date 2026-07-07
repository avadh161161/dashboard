import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// A titled group of navigation links 
export interface NavSection {
  title?: string;
  items: NavItem[];
}

// Verification status of a document. 
export type DocumentStatus = "verified" | "pending" | "expiry";

// A row in the documents table. 
export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  issuedDate: string;
  expiryDate: string | null;
  uploadedBy: string;
  status: DocumentStatus;
  description: string;
  uploadUrl: string;
}

