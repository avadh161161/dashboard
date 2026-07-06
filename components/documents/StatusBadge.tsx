import { BadgeCheck, Hourglass, CalendarClock, type LucideIcon } from "lucide-react";
import type { DocumentStatus } from "@/lib/types";

const config: Record<
  DocumentStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  verified: {
    label: "Verified",
    icon: BadgeCheck,
    className: "bg-success/10 text-success",
  },
  pending: {
    label: "Pending",
    icon: Hourglass,
    className: "bg-attention/10 text-attention",
  },
  expiry: {
    label: "Expiry",
    icon: CalendarClock,
    className: "bg-critical/10 text-critical",
  },
};

/** Coloured pill communicating a document's status. */
export default function StatusBadge({ status }: { status: DocumentStatus }) {
  const { label, icon: Icon, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${className}`}
    >
      <Icon size={14} />
      {label}
    </span>
  );
}
