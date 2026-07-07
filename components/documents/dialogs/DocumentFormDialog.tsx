"use client";

import { useState, type ReactNode } from "react";
import { X, Loader2 } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Select from "../../ui/Select";
import FileUploadField, { type UploadedMedia } from "./FileUploadField";

const DOCUMENT_TYPES = [
  "All",
  "Medical",
  "Lab Report",
  "Fitness Certificate",
  "Policy",
  "Compliance Document",
];

interface DocumentFormDialogProps {
  children: ReactNode;
  mode: "upload" | "edit";
  document?: DocumentRecord;
  onSaved?: (document: DocumentRecord) => void;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="mb-4 text-lg font-semibold text-primary">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-sm text-text-primary">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary";
export default function DocumentFormDialog({
  children,
  mode,
  document,
  onSaved,
}: DocumentFormDialogProps) {
  const isEdit = mode === "edit";
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(document?.name ?? "");
  const [type, setType] = useState(document?.type ?? "All");
  const [description, setDescription] = useState(document?.description ?? "");
  const [issuedDate, setIssuedDate] = useState(document?.issuedDate ?? "");
  const [expiryDate, setExpiryDate] = useState(document?.expiryDate ?? "");
  const [media, setMedia] = useState<UploadedMedia | null>(
    isEdit && document
      ? { url: document.uploadUrl, name: document.name, source: "existing" }
      : null,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Document name is required.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      type,
      description,
      issuedDate,
      expiryDate,
      ...(media ? { uploadUrl: media.url } : {}),
    };

    try {
      const res = await fetch(
        isEdit && document ? `/api/documents/${document.id}` : "/api/documents",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Request failed");
      }
      const saved = (await res.json()) as DocumentRecord;
      onSaved?.(saved);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[710px] gap-0 p-0 font-heading"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-lg font-semibold text-text-primary">
              {isEdit ? "Edit Document" : "Upload Document"}
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Upload and manage secure medical and compliance documents
            </DialogDescription>
          </div>
          <DialogClose className="text-text-primary opacity-80 transition-opacity hover:opacity-100">
            <X size={22} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="no-scrollbar flex max-h-[75vh] flex-col gap-6 overflow-y-auto px-7 pb-7">
          {/* Document Information */}
          <SectionCard title="Document Information">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Field label="Document Name *">
                  <input
                    className={inputClass}
                    placeholder="Enter document title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field label="Document Type">
                  <Select
                    options={DOCUMENT_TYPES}
                    value={type}
                    onChange={setType}
                    className="w-full"
                    triggerClassName="w-full justify-between !py-2.5"
                    menuClassName="w-full"
                    renderTrigger={(opt) => (
                      <span className="text-text-primary">
                        {opt?.label ?? "Select"}
                      </span>
                    )}
                  />
                </Field>
              </div>
              <Field label="Description(Optional)">
                <textarea
                  className={`${inputClass} h-[92px] resize-none`}
                  placeholder="Add additional details about this document...."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          {/* File Upload — auto-generate a file URL from the name, or upload */}
          <SectionCard title="File Upload">
            <FileUploadField name={name} media={media} onChange={setMedia} />
          </SectionCard>

          {/* Document Dates */}
          <SectionCard title="Document Dates">
            <div className="flex gap-4">
              <Field label="Issued Date">
                <input
                  type="date"
                  className={inputClass}
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                />
              </Field>
              <Field label="Expiry Date">
                <input
                  type="date"
                  className={inputClass}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4">
            {error && <p className="mr-auto text-xs text-critical">{error}</p>}
            <DialogClose className="flex h-10 w-[121px] items-center justify-center rounded-[5px] border border-primary text-xs font-medium text-primary transition-colors hover:bg-primary/5">
              Cancel
            </DialogClose>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex h-10 min-w-[190px] items-center justify-center gap-2 rounded-[5px] bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Upload Document"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
