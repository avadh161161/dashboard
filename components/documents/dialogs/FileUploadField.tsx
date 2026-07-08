"use client";

import { useRef, useState } from "react";
import { Upload, FileText, X, Link2 } from "lucide-react";

export interface UploadedMedia {
  url: string;
  name: string;
  source: "generated" | "uploaded" | "existing";
}

interface FileUploadFieldProps {
  name: string;
  media: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
}

/** Builds the stored file URL from the document name. */
function buildUploadUrl(name: string) {
  return `https://dummyjson.com/image/400x200/1e3a8a/ffffff?text=${encodeURIComponent(
    name.trim(),
  ).replace(/%20/g, "+")}&fontSize=16&fontFamily=poppins`;
}

export default function FileUploadField({
  name,
  media,
  onChange,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleGenerate = () => {
    if (!name.trim()) {
      setError("Enter a document name first to auto-generate the file.");
      return;
    }
    setError(null);
    onChange({
      url: buildUploadUrl(name),
      name: `${name.trim()}.png`,
      source: "generated",
    });
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setError(null);
    onChange({
      url: URL.createObjectURL(file),
      name: file.name,
      source: "uploaded",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Auto upload — generates the stored file URL from the document name */}
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5">
        <div className="leading-tight">
          <p className="text-[13px] font-medium text-text-primary">
            Auto upload
          </p>
          <p className="text-[11px] text-text-secondary">
            Generates a file URL from the document name
          </p>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90"
        >
          Generate
        </button>
      </div>

      {media ? (
        /* Preview of the attached*/
        <div className="flex gap-3 rounded-lg border border-border bg-white p-3">
          <img
            src={media.url}
            alt={media.name}
            className="h-[88px] w-[132px] shrink-0 rounded-md border border-border object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <div className="flex items-center gap-2">
              <FileText size={14} className="shrink-0 text-primary" />
              <span className="truncate text-[13px] font-medium text-text-primary">
                {media.name}
              </span>
              <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium capitalize text-text-secondary">
                {media.source}
              </span>
            </div>
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 truncate text-[11px] text-text-secondary hover:text-primary"
            >
              <Link2 size={12} className="shrink-0" />
              <span className="truncate">{media.url}</span>
            </a>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="mt-0.5 inline-flex w-fit items-center gap-1 text-[11px] text-critical hover:underline"
            >
              <X size={12} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Upload document */
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-surface"
          }`}
        >
          <Upload size={28} className="text-primary" />
          <p className="text-[15px] font-medium text-primary">
            Drag and drop file here or Browse Files
          </p>
          <p className="text-xs text-text-secondary">
            PDF, DOCX, JPG (Max 10MB)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {error && <p className="text-[11px] text-critical">{error}</p>}
    </div>
  );
}
