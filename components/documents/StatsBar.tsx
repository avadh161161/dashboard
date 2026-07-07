"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Hourglass,
  CalendarRange,
} from "lucide-react";

interface StatsBarProps {
  stats: {
    credential: number;
    verified: number;
    pending: number;
    expiringSoon: number;
  };
  activeType: string;
  activeStatus: string;
  onSelectFilter: (filterType: "type" | "status", value: string) => void;
}

/** Row of summary chips above the filter bar. Clickable for filtering. */
export default function StatsBar({
  stats,
  activeType,
  activeStatus,
  onSelectFilter,
}: StatsBarProps) {
  const statItems = [
    {
      label: "Credential",
      value: stats.credential,
      icon: ShieldCheck,
      bgClass: "bg-[#fef3c7]",
      iconClass: "text-attention",
      textClass: "text-black",
      isSelected: activeType === "Credential",
      onClick: () => onSelectFilter("type", "Credential"),
    },
    {
      label: "Verified",
      value: stats.verified,
      icon: BadgeCheck,
      bgClass: "bg-success/10",
      iconClass: "text-success",
      textClass: "text-text-primary",
      isSelected: activeStatus === "verified",
      onClick: () => onSelectFilter("status", "verified"),
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Hourglass,
      bgClass: "bg-attention/10",
      iconClass: "text-attention",
      textClass: "text-text-primary",
      isSelected: activeStatus === "pending",
      onClick: () => onSelectFilter("status", "pending"),
    },
    {
      label: "Expiring Soon",
      value: stats.expiringSoon,
      icon: CalendarRange,
      bgClass: "bg-critical/10",
      iconClass: "text-critical",
      textClass: "text-black",
      isSelected: activeStatus === "expiry",
      onClick: () => onSelectFilter("status", "expiry"),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-[13px] rounded-[5px] border-[0.9px] border-border bg-white px-3 py-2.5">
      {statItems.map(
        ({
          label,
          value,
          icon: Icon,
          bgClass,
          iconClass,
          textClass,
          onClick,
        }) => (
          <button
            type="button"
            key={label}
            onClick={onClick}
            className={`flex h-[30px] items-center justify-center gap-1 rounded-[5px] px-3 cursor-pointer hover:opacity-90 active:scale-95 transition-all select-none ${bgClass}`}
          >
            <Icon size={18} className={iconClass} />
            <span className={`font-heading text-[12px] ${textClass}`}>
              {label} : {value}
            </span>
          </button>
        ),
      )}
    </div>
  );
}
