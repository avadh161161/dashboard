"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { X, Download } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DocumentPreviewDialogProps {
  children: ReactNode;
  document: DocumentRecord;
}

export default function DocumentPreviewDialog({
  children,
  document,
}: DocumentPreviewDialogProps) {
  const [open, setOpen] = useState(false);

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
              Document Preview
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Preview document before downloading
            </DialogDescription>
          </div>
          <DialogClose className="text-text-primary opacity-80 transition-opacity hover:opacity-100">
            <X size={22} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-6 px-7 pb-7">
          {/* Preview surface */}
          <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-border bg-primary/5 p-6">
            <Image
              src={document.uploadUrl}
              alt={document.name}
              width={640}
              height={360}
              unoptimized
              className="max-h-[300px] w-auto max-w-full rounded-md border border-border bg-white object-contain shadow-sm"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4">
            <DialogClose className="flex h-10 w-[121px] items-center justify-center rounded-[5px] border border-primary text-xs font-medium text-primary transition-colors hover:bg-primary/5">
              Cancel
            </DialogClose>
            <a
              href={document.uploadUrl}
              download
              className="flex h-10 w-[135px] items-center justify-center gap-2 rounded-[5px] bg-primary text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <Download size={16} />
              Download
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
