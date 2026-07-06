"use client";

import { AlertTriangle } from "lucide-react";

interface ExpiringBannerProps {
  count?: number;
  onViewExpiring?: () => void;
}

/** Attention banner prompting the user to review soon-to-expire documents. */
export default function ExpiringBanner({
  count,
  onViewExpiring,
}: ExpiringBannerProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-critical/10 px-4 py-3">
      <AlertTriangle size={18} className="text-critical" />
      <p className="text-sm text-text-primary">
        <span className="font-semibold">{count} Documents</span> Expiring within
        the next 30 days
      </p>
      <button
        type="button"
        onClick={onViewExpiring}
        className="ml-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 active:scale-95"
      >
        View Expiring
      </button>
    </div>
  );
}
