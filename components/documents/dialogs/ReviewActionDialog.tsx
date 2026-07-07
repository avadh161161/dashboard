"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DocumentThumb from "./DocumentThumb";

interface ReviewActionDialogProps {
  children: ReactNode;
  document?: DocumentRecord;
  onSubmit?: (action: string) => void;
}

const ACTIONS = [
  {
    value: "verify",
    label: "Verify",
    hint: "Document is correct and meets all requirements",
  },
  {
    value: "reject",
    label: "Reject",
    hint: "Wrong document, inappropriate content, or invalid",
  },
  {
    value: "query",
    label: "Raise Query",
    hint: "Missing information, unclear, or needs updates",
  },
];

const SAMPLE: DocumentRecord = {
  id: "sample",
  name: "Fitness Medical Certificate",
  type: "Medical",
  issuedDate: "10-01-2026",
  expiryDate: "12-01-2026",
  uploadedBy: "Nurse Megha",
  status: "pending",
  description: "Fitness medical certificate pending review.",
  uploadUrl: "/documents/fitness-certificate.jpg",
};

const STATUS_LABEL: Record<string, { text: string; className: string }> = {
  verified: { text: "Verified", className: "text-success" },
  pending: { text: "Pending", className: "text-attention" },
  expiry: { text: "Expiring Soon", className: "text-critical" },
};

/** "Review Document" / take-action dialog — Figma node 42:2064. */
export default function ReviewActionDialog({
  children,
  document = SAMPLE,
  onSubmit,
}: ReviewActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("verify");

  const status = STATUS_LABEL[document.status] ?? STATUS_LABEL.pending;

  const info: [string, ReactNode][] = [
    ["Document Name:", document.name],
    ["Type:", document.type],
    ["Uploaded By:", document.uploadedBy],
    [
      "Current Status:",
      <span key="s" className={`font-semibold ${status.className}`}>
        {status.text}
      </span>,
    ],
    ["Expiry Date:", document.expiryDate ?? "—"],
  ];

  const handleSubmit = () => {
    onSubmit?.(action);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[710px] gap-0 p-0 font-heading"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5">
          <DialogTitle className="text-lg font-semibold text-primary">
            Review Document
          </DialogTitle>
          <DialogClose className="text-text-primary opacity-80 transition-opacity hover:opacity-100">
            <X size={22} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="no-scrollbar flex max-h-[75vh] flex-col gap-6 overflow-y-auto px-7 pb-7">
          {/* Document Information */}
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-primary">
              Document Information
            </p>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-surface p-5">
              <div className="flex flex-col gap-2 text-xs text-text-primary">
                {info.map(([label, value]) => (
                  <p key={label} className="flex gap-2">
                    <span className="inline-block w-[110px] shrink-0">
                      {label}
                    </span>
                    <span className="font-medium text-primary">{value}</span>
                  </p>
                ))}
              </div>
              <DocumentThumb
                url={document.uploadUrl}
                name={document.name}
                className="h-[101px] w-[131px] shrink-0 rounded-md border border-border"
              />
            </div>
          </div>

          {/* Select Action */}
          <div className="flex flex-col gap-4">
            <p className="text-base font-medium text-primary">Select Action</p>
            {ACTIONS.map((opt) => {
              const active = action === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2.5 transition-colors ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="review-action"
                    value={opt.value}
                    checked={active}
                    onChange={() => setAction(opt.value)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs text-text-primary">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {opt.hint}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4">
            <DialogClose className="flex h-10 w-[121px] items-center justify-center rounded-[5px] border border-primary text-xs font-medium text-primary transition-colors hover:bg-primary/5">
              Cancel
            </DialogClose>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-10 w-[162px] items-center justify-center rounded-[5px] bg-primary text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
