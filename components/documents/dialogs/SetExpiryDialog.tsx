"use client";

import { useState, type ReactNode } from "react";
import { CalendarDays, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SetExpiryDialogProps {
  children: ReactNode;
  defaultDate?: string;
  onUpdate?: (date: string) => void;
}

export default function SetExpiryDialog({
  children,
  defaultDate = "",
  onUpdate,
}: SetExpiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(defaultDate);

  const handleUpdate = () => {
    onUpdate?.(date);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[382px] gap-0 p-0 font-heading"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Set Expiry Date
          </DialogTitle>
          <DialogClose className="text-text-primary opacity-80 transition-opacity hover:opacity-100">
            <X size={22} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <div className="rounded-lg border border-border p-4">
            <p className="text-lg font-semibold text-primary">Select Date</p>
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="expiry-date"
                className="text-sm text-text-primary"
              >
                Date
              </label>
              <div className="relative">
                <input
                  id="expiry-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <CalendarDays
                  size={20}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <DialogClose className="flex h-10 w-[121px] items-center justify-center rounded-[5px] border border-primary text-xs font-medium text-primary transition-colors hover:bg-primary/5">
              Cancel
            </DialogClose>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex h-10 w-[121px] items-center justify-center rounded-[5px] bg-primary text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Update
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
