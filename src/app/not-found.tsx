"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF3FE] text-[#075ED1]">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-[26px] font-black text-[#0346A5] sm:text-[32px]">
        {t("errors.notFoundTitle")}
      </h1>
      <p className="mt-2 max-w-md text-[14px] text-[#66777D]">{t("errors.notFoundDesc")}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link
          href="/"
          className="rounded-xl bg-[#075ED1] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#0346A5]"
        >
          {t("errors.backHome")}
        </Link>
        <Link
          href="/catalog"
          className="rounded-xl border border-[#E2E8EA] bg-white px-5 py-3 text-[14px] font-semibold text-[#17242A] transition hover:bg-[#F7F9FA]"
        >
          {t("errors.browseCatalog")}
        </Link>
      </div>
    </div>
  );
}
