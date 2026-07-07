"use client";

import { CalendarRange, FileText, XCircle, Search } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import Select from "../ui/Select";
import SetExpiryDialog from "./dialogs/SetExpiryDialog";
import ReviewActionDialog from "./dialogs/ReviewActionDialog";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string;
  onTypeSelect: (type: string) => void;
  selectedStatus: string;
  onStatusSelect: (status: string) => void;
  onClearAll: () => void;
  reviewDocument?: DocumentRecord;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeSelect,
  selectedStatus,
  onStatusSelect,
  onClearAll,
  reviewDocument,
}: FilterBarProps) {
  const documentTypes = [
    "All",
    "Medical",
    "Lab Report",
    "Policy",
    "Credential",
  ];
  const statusOptions = [
    { label: "All", value: "All" },
    { label: "Verified", value: "verified" },
    { label: "Pending", value: "pending" },
    { label: "Expiring Soon", value: "expiry" },
  ];

  const hasActiveFilters =
    searchQuery !== "" || selectedType !== "All" || selectedStatus !== "All";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-white p-4">
      {/* Document Type Select Dropdown */}
      <Select
        options={documentTypes}
        value={selectedType}
        onChange={onTypeSelect}
        renderTrigger={() => <span>Document Type</span>}
      />

      {/* Status Select Dropdown */}
      <Select
        options={statusOptions}
        value={selectedStatus}
        onChange={onStatusSelect}
        renderTrigger={() => <span>Status</span>}
      />

      {/* Set Expiry */}
      <SetExpiryDialog>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary transition-colors hover:bg-surface"
        >
          <CalendarRange size={16} className="text-text-secondary" />
          Set Expiry
        </button>
      </SetExpiryDialog>

      {/* Review & Take Action */}
      <ReviewActionDialog document={reviewDocument}>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary transition-colors hover:bg-surface"
        >
          <FileText size={16} className="text-text-secondary" />
          Review &amp; Take Action
        </button>
      </ReviewActionDialog>

      {/* Clear All Trigger */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-critical active:scale-95"
        >
          <XCircle size={16} />
          Clear all
        </button>
      )}

      {/* Search pushed to the far right */}
      <div className="relative ml-auto">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Document...."
          className="w-64 rounded-md border border-border bg-white py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary transition-colors"
        />
      </div>
    </div>
  );
}
