import { Bell } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex h-[64px] shrink-0 items-center justify-end gap-4 border-b border-border bg-white px-8">
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
    </header>
  );
}
