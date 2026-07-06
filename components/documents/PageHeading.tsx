import { Plus } from "lucide-react";

export default function PageHeading() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          Document Management
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Manage medical certificates, reports, and compliance documents
          securely
        </p>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        <Plus size={16} />
        Upload Document
      </button>
    </div>
  );
}
