"use client";

import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { organizations } from "@/data/organizations";
import { BrandCard } from "@/components/catalog/cards";
import { Breadcrumb } from "@/components/ui/core";

export default function BrandsPage() {
  const { t, pick } = useLanguage();
  const { settingsFor } = useAdminStore();
  usePageTitle(t("nav2.brands"), "Brands");

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 lg:px-8 lg:py-8">
      <Breadcrumb items={[{ label: t("common.home"), href: "/" }, { label: t("nav2.brands") }]} />
      <h1 className="mt-3 text-[22px] font-bold text-[#0346A5] sm:text-[28px]">{t("home.brandsTitle")}</h1>
      <p className="mt-1 text-[13px] text-[#66777D]">{t("home.brandsSub")}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {organizations.map((org) => (
          <BrandCard key={org.slug} org={org} intro={pick(settingsFor(org.slug).intro)} />
        ))}
      </div>
    </div>
  );
}
