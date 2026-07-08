import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Select from "../ui/Select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

/** Table footer */
export default function Pagination({
  currentPage,
  totalPages,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const rangeEnd = Math.min(currentPage * perPage, total);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const iconBtn =
    "flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent";

  const perPageOptions = [
    { label: "5", value: 5 },
    { label: "8", value: 8 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-4 text-sm text-text-secondary sm:justify-start sm:px-6">
      <span>
        {rangeStart}-{rangeEnd} of {total} Documents
      </span>

      <div className="mx-auto flex items-center gap-1.5">
        <button
          type="button"
          className={iconBtn}
          aria-label="First page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          type="button"
          className={iconBtn}
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`flex h-7 w-7 items-center justify-center rounded-md border text-sm transition-colors ${
              page === currentPage
                ? "border-primary font-medium text-primary"
                : "border-border text-text-primary hover:bg-surface"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className={iconBtn}
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
        <button
          type="button"
          className={iconBtn}
          aria-label="Last page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          options={perPageOptions}
          value={perPage}
          onChange={onPerPageChange}
          triggerClassName="px-2.5 py-1.5"
          menuClassName="bottom-full mb-1.5 min-w-[5rem]"
        />
        <span>Requests per Page</span>
      </div>
    </div>
  );
}
