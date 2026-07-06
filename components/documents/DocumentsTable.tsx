"use client";

import { useState } from "react";
import { FileText, Eye, Pencil, Download } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

const columns = [
  "Document Name",
  "Type",
  "Issued Date",
  "Expiry Date",
  "Uploaded By",
  "Status",
  "Action",
];

/** The documents data table, including header, rows, and footer pagination. */
export default function DocumentsTable({
  documents,
}: {
  documents: DocumentRecord[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const total = documents.length;
  const totalPages = Math.ceil(total / perPage);

  // Ensure current page is valid when dataset or perPage changes
  const activePage = Math.min(currentPage, totalPages || 1);

  const startIndex = (activePage - 1) * perPage;
  const paginatedDocuments = documents.slice(startIndex, startIndex + perPage);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    // Recalculate target page to prevent landing on an out-of-bounds page
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
                      className="text-text-secondary"
                      title={doc.description}
                    >
                      {doc.name}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary">{doc.type}</td>
                <td className="px-6 py-4 text-text-secondary">
                  {doc.issuedDate}
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  {doc.expiryDate ?? "-"}
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  {doc.uploadedBy}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <a
                      href={doc.uploadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View"
                      className="hover:text-primary"
                    >
                      <Eye size={18} />
                    </a>
                    <button
                      type="button"
                      aria-label="Edit"
                      className="hover:text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <a
                      href={doc.uploadUrl}
                      download
                      aria-label="Download"
                      className="hover:text-primary"
                    >
                      <Download size={16} />
                    </a>
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
