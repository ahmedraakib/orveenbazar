"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { ItemVisual } from "@/components/catalog/cards";
import { cn } from "@/lib/utils";

export function SearchBar({
  autoFocus = false,
  onSubmitted,
  className,
}: {
  autoFocus?: boolean;
  onSubmitted?: () => void;
  className?: string;
}) {
  const { t, pick } = useLanguage();
  const { publishedItems } = useAdminStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const suggestions = q
    ? publishedItems().filter((i) => i.title.bn.toLowerCase().includes(q) || i.title.en.toLowerCase().includes(q)).slice(0, 6)
    : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (value: string) => {
    const term = value.trim();
    setOpen(false);
    onSubmitted?.();
    router.push(term ? `/catalog?search=${encodeURIComponent(term)}` : "/catalog");
  };

  return (
    <div ref={boxRef} className={cn("relative min-w-0", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <label htmlFor="site-search" className="sr-only">
          {t("catalog.search")}
        </label>
        <div className="flex items-center overflow-hidden rounded-xl border border-[#E2E8EA] bg-[#F7F9FA] transition focus-within:border-[#075ED1] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#075ED1]/15">
          <Search className="ml-3 h-4 w-4 shrink-0 text-[#66777D]" aria-hidden="true" />
          <input
            id="site-search"
            ref={inputRef}
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={t("catalog.searchPlaceholder")}
            className="w-full bg-transparent px-2.5 py-2.5 text-[14px] text-[#17242A] placeholder:text-[#66777D]/70 focus:outline-none sm:text-[15px]"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label={t("common.close")}
              className="mr-1 rounded-full p-1.5 text-[#66777D] transition hover:bg-[#E2E8EA]/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
          <button
            type="submit"
            className="hidden shrink-0 bg-[#075ED1] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#0346A5] sm:block"
          >
            {t("catalog.search")}
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 ? (
        <div className="anim-fade absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[#E2E8EA] bg-white shadow-xl shadow-[#0346A5]/10">
          <ul>
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    onSubmitted?.();
                    router.push(`/brands/${item.orgSlug}/${item.slug}`);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-[#EAF3FE]"
                >
                  <ItemVisual item={item} className="h-10 w-10 shrink-0 rounded-lg" label={false} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-[#17242A]">
                      {pick(item.title)}
                    </span>
                    <span className="block text-[11px] text-[#66777D]">
                      {item.type === "product" ? t("catalog.product") : t("catalog.service")}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
