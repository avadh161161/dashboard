"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PageHeading from "@/components/documents/PageHeading";
import StatsBar from "@/components/documents/StatsBar";
import FilterBar from "@/components/documents/FilterBar";
import ExpiringBanner from "@/components/documents/ExpiringBanner";
import DocumentsTable from "@/components/documents/DocumentsTable";
import { documents } from "@/lib/documents";

/**
 * Document Management dashboard page. Section components are composed here;
 * data is passed in from `lib/` so the UI stays presentational.
 */
export default function DocumentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Dynamically compute filtered documents
  const filteredDocuments = documents.filter((doc) => {
    // 1. Search Query Filter (name or uploadedBy)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = doc.name.toLowerCase().includes(q);
      const uploaderMatch = doc.uploadedBy.toLowerCase().includes(q);
      if (!nameMatch && !uploaderMatch) return false;
    }

    // 2. Document Type Filter
    if (selectedType !== "All") {
      if (selectedType === "Lab Report") {
        if (!doc.name.toLowerCase().includes("lab report")) return false;
      } else {
        if (doc.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      }
    }

    // 3. Status Filter
    if (selectedStatus !== "All") {
      if (doc.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    }

    return true;
  });

  // Calculate dynamic stats based on all documents (unfiltered)
  const totalStats = {
    credential: documents.filter((doc) => doc.type === "Credential").length,
    verified: documents.filter((doc) => doc.status === "verified").length,
    pending: documents.filter((doc) => doc.status === "pending").length,
    expiringSoon: documents.filter((doc) => doc.status === "expiry").length,
  };

  const handleStatsClick = (filterType: "type" | "status", value: string) => {
    // Toggle filter off if clicked again, otherwise set it
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

  const isFiltered = searchQuery !== "" || selectedType !== "All" || selectedStatus !== "All";

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 p-8">
      <PageHeading />
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
      />
      <ExpiringBanner
        count={totalStats.expiringSoon}
        onViewExpiring={handleViewExpiring}
      />
      <DocumentsTable documents={filteredDocuments} />
      
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
