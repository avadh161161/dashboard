"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption<T = string | number> {
  label: string;
  value: T;
}

interface SelectProps<T = string | number> {
  options: SelectOption<T>[] | string[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  icon?: React.ReactNode;
  renderTrigger?: (selectedOption?: SelectOption<T>) => React.ReactNode;
}

/** Reusable, accessible custom Select dropdown component. */
export default function Select<T extends string | number = string | number>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  triggerClassName = "",
  menuClassName = "",
  icon,
  renderTrigger,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to SelectOption format
  const normalizedOptions: SelectOption<T>[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt as unknown as T } : opt,
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerContent = renderTrigger ? (
    renderTrigger(selectedOption)
  ) : (
    <>
      {icon}
      <span>{displayLabel}</span>
    </>
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary transition-colors hover:bg-surface active:scale-95 ${triggerClassName}`}
      >
        {triggerContent}
        <ChevronDown
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-1.5 min-w-[10rem] rounded-md border border-border bg-white py-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${menuClassName}`}
        >
          {normalizedOptions.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
