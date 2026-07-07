"use client";

import { useState } from "react";
import { Eye, Pencil, Download } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import DocumentPreviewDialog from "./dialogs/DocumentPreviewDialog";
import DocumentFormDialog from "./dialogs/DocumentFormDialog";

const columns = [
  "Document Name",
  "Type",
  "Issued Date",
  "Expiry Date",
  "Uploaded By",
  "Status",
  "Action",
];

export default function DocumentsTable({
  documents,
  onSaved,
}: {
  documents: DocumentRecord[];
  onSaved?: (document: DocumentRecord) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const total = documents.length;
  const totalPages = Math.ceil(total / perPage);

  const activePage = Math.min(currentPage, totalPages || 1);

  const startIndex = (activePage - 1) * perPage;
  const paginatedDocuments = documents.slice(startIndex, startIndex + perPage);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    const newTotalPages = Math.ceil(total / newPerPage);
    if (activePage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              {columns.map((col, i) => (
                <th key={col} className="px-6 py-4 font-medium">
                  {i === 0 ? (
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border"
                      />
                      {col}
                    </span>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedDocuments.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-surface/60"
              >
                <td className="px-6 py-4">
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-primary"
                    />
                    <span
                      className="text-text-primary font-normal text-[11px]"
                      title={doc.description}
                    >
                      {doc.name}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 text-text-primary font-normal text-[11px]">
                  {doc.type}
                </td>
                <td className="px-6 py-4 text-text-primary font-normal text-[11px]">
                  {doc.issuedDate}
                </td>
                <td className="px-6 py-4 text-text-primary font-normal text-[11px]">
                  {doc.expiryDate ?? "-"}
                </td>
                <td className="px-6 py-4 text-text-primary font-normal text-[11px]">
                  {doc.uploadedBy}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <DocumentPreviewDialog document={doc}>
                      <div className="relative inline-block group">
                        <button type="button" aria-label="View">
                          <Eye size={18} />
                        </button>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#eff6ff] px-2 py-1 text-xs text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                          View
                        </span>
                      </div>
                    </DocumentPreviewDialog>
                    <DocumentFormDialog
                      mode="edit"
                      document={doc}
                      onSaved={onSaved}
                    >
                      <div className="relative inline-block group">
                        <button type="button" aria-label="Edit">
                          <Pencil size={16} />
                        </button>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#eff6ff] px-2 py-1 text-xs text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                          Edit
                        </span>
                      </div>
                    </DocumentFormDialog>
                    <div className="relative inline-block group">
                      <a href={doc.uploadUrl} download aria-label="Download">
                        <Download size={16} />
                      </a>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#eff6ff] px-2 py-1 text-xs text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                        Download
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedDocuments.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-text-secondary"
                >
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border">
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          perPage={perPage}
          total={total}
          onPageChange={setCurrentPage}
          onPerPageChange={handlePerPageChange}
        />
      </div>
    </div>
  );
}
