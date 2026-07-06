"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navSections } from "@/lib/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-white">
      {/* Brand */}
      <div className="flex h-[64px] shrink-0 items-center px-6">
        <Image
          src="/logo-mark.png"
          alt="OHC Technodha"
          width={830}
          height={345}
          priority
          className="h-12 w-auto object-contain object-left"
        />
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
  );
}
