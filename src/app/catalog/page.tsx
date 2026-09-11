"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { ProductCardSkeleton } from "@/components/ui/core";
import { usePageTitle, useLanguage } from "@/providers/LanguageProvider";

function CatalogInner() {
  const { t } = useLanguage();
  usePageTitle(t("nav2.catalog"), "Catalog");
  return <CatalogView />;
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <CatalogInner />
    </Suspense>
  );
}
