"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navSections } from "@/lib/navigation";
import Image from "next/image";
import { X } from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop — mobile only */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[64px] shrink-0 items-center justify-between px-6">
          <Image
            src="/logo-mark.png"
            alt="OHC Technodha"
            width={830}
            height={345}
            priority
            className="h-12 w-auto object-contain object-left"
          />
          {/* Close button — mobile only */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 pb-8 pt-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navSections.map((section, i) => (
            <div key={section.title ?? `section-${i}`} className="mb-4">
              {section.title && (
                <p className="mb-2 mt-4 font-heading text-[13px] font-medium leading-none text-text-secondary">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-md border-l-4 px-3 py-2 font-heading text-[13px] font-medium leading-none transition-colors ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-transparent text-text-secondary hover:bg-surface"
                        }`}
                      >
                        <Icon size={18} className="shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
