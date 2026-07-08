"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import PageHeading from "@/components/documents/PageHeading";
import StatsBar from "@/components/documents/StatsBar";
import FilterBar from "@/components/documents/FilterBar";
import ExpiringBanner from "@/components/documents/ExpiringBanner";
import DocumentsTable from "@/components/documents/DocumentsTable";
import type { DocumentRecord } from "@/lib/types";

export default function DocumentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = useCallback(async () => {
    try {
      const res = await fetch("/api/documents");
      if (res.ok) setDocuments((await res.json()) as DocumentRecord[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Dynamically compute filtered documents
  const filteredDocuments = documents.filter((doc) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = doc.name.toLowerCase().includes(q);
      const uploaderMatch = doc.uploadedBy.toLowerCase().includes(q);
      if (!nameMatch && !uploaderMatch) return false;
    }

    if (selectedType !== "All") {
      if (selectedType === "Lab Report") {
        if (!doc.name.toLowerCase().includes("lab report")) return false;
      } else {
        if (doc.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      }
    }

    if (selectedStatus !== "All") {
      if (doc.status.toLowerCase() !== selectedStatus.toLowerCase())
        return false;
    }

    return true;
  });

  // Calculate dynamic stats based on all documents
  const totalStats = {
    credential: documents.filter((doc) => doc.type === "Credential").length,
    verified: documents.filter((doc) => doc.status === "verified").length,
    pending: documents.filter((doc) => doc.status === "pending").length,
    expiringSoon: documents.filter((doc) => doc.status === "expiry").length,
  };

  // Most recent pending document
  const reviewDocument = [...documents]
    .reverse()
    .find((doc) => doc.status === "pending");

  const handleStatsClick = (filterType: "type" | "status", value: string) => {
    setSearchQuery("");
    if (filterType === "type") {
      if (selectedType === value) {
        setSelectedType("All");
      } else {
        setSelectedType(value);
        setSelectedStatus("All");
      }
    } else {
      if (selectedStatus === value) {
        setSelectedStatus("All");
      } else {
        setSelectedStatus(value);
        setSelectedType("All");
      }
    }
  };

  const handleViewExpiring = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("expiry");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("All");
  };

  const isFiltered =
    searchQuery !== "" || selectedType !== "All" || selectedStatus !== "All";

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <PageHeading onSaved={loadDocuments} />
      <StatsBar
        stats={totalStats}
        activeType={selectedType}
        activeStatus={selectedStatus}
        onSelectFilter={handleStatsClick}
      />
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusSelect={setSelectedStatus}
        onClearAll={handleResetFilters}
        reviewDocument={reviewDocument}
      />
      <ExpiringBanner
        count={totalStats.expiringSoon}
        onViewExpiring={handleViewExpiring}
      />
      {loading ? (
        <div className="rounded-lg border border-border bg-white p-10 text-center text-sm text-text-secondary">
          Loading documents…
        </div>
      ) : (
        <DocumentsTable documents={filteredDocuments} onSaved={loadDocuments} />
      )}

      {isFiltered && (
        <div className="mt-4 flex">
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Documents
          </button>
        </div>
      )}
    </div>
  );
}
