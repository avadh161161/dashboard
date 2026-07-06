import type { LucideIcon } from "lucide-react";

/** A single navigation link rendered in the sidebar. */
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** A titled group of navigation links (e.g. "CORE", "HEALTH"). */
export interface NavSection {
  /** Optional section heading. The top "Dashboard" group has none. */
  title?: string;
  items: NavItem[];
}

/** Verification/lifecycle status of a document. */
export type DocumentStatus = "verified" | "pending" | "expiry";

/** A row in the documents table. */
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

