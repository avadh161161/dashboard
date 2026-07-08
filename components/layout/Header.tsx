"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="flex h-[64px] shrink-0 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6 lg:px-8">
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface"
        >
          <Bell size={20} />
        </button>

        <span className="h-8 w-px bg-border" aria-hidden />

        <div className="flex items-center gap-3">
          <div className="flex">
            <Image
              src="/person.png"
              alt="user"
              width={36}
              height={36}
              className="items-center justify-center rounded-full"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-text-primary">
              Rohan Sharma
            </p>
            <p className="text-xs text-text-secondary">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
