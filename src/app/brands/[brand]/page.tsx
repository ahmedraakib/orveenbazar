"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { orgBySlug } from "@/data/organizations";
import { BrandHero, BrandContact, Banner } from "@/components/brand/bits";
import { CatalogCard, CategoryCard } from "@/components/catalog/cards";
import { Breadcrumb, EmptyState, SectionHeading } from "@/components/ui/core";
import { ErrorState } from "@/components/ui/feedback";
import { PackageSearch } from "lucide-react";

export default function BrandPage() {
  const { t, pick } = useLanguage();
  const params = useParams<{ brand: string }>();
  const org = orgBySlug(params.brand);
  const { publishedItems, settingsFor, state } = useAdminStore();
  usePageTitle(org ? org.name : t("errors.missingBrand"), org?.name ?? "Brand");

  if (!org) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <ErrorState
          title={t("errors.missingBrand")}
          description={t("errors.missingBrandDesc")}
        />
        <div className="mt-4 flex justify-center gap-2">
          <Link
            href="/"
            className="rounded-xl bg-[#075ED1] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0346A5]"
          >
            {t("errors.backHome")}
          </Link>
          <Link
            href="/brands"
            className="rounded-xl border border-[#E2E8EA] bg-white px-5 py-2.5 text-sm font-semibold text-[#17242A] transition hover:bg-[#F7F9FA]"
          >
            {t("nav2.brands")}
          </Link>
        </div>
      </div>
    );
  }

  const settings = settingsFor(org.slug);
  const items = publishedItems(org.slug);
  const cats = state.categories.filter((c) => c.orgSlug === org.slug && c.active);
  const orgBanners = state.banners.filter((b) => b.orgSlug === org.slug && b.active);

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 lg:px-8 lg:py-8">
      <Breadcrumb
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("nav2.brands"), href: "/brands" },
          { label: org.name },
        ]}
      />

      <div className="mt-4">
        <BrandHero org={org} settings={settings} itemCount={items.length} />
      </div>

      {orgBanners.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {orgBanners.slice(0, 2).map((banner) => (
            <Banner key={banner.id} banner={banner} />
          ))}
        </div>
      ) : null}

      <section className="mt-10">
        <SectionHeading title={t("nav.categories")} />
        {cats.length === 0 ? (
          <EmptyState icon={PackageSearch} title={t("catalog.empty")} description={t("catalog.emptyDesc")} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map((cat) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                count={items.filter((i) => i.categorySlug === cat.slug).length}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <SectionHeading
          title={t("home.featuredItems")}
          action={
            <Link
              href={`/catalog?brand=${org.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#075ED1] hover:underline"
            >
              {t("item.viewCatalog")}
            </Link>
          }
        />
        {items.length === 0 ? (
          <EmptyState icon={PackageSearch} title={t("catalog.empty")} description={t("catalog.emptyDesc")} />
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <CatalogCard
                key={item.id}
                item={item}
                orgName={org.name}
                categoryName={pick(
                  state.categories.find((c) => c.slug === item.categorySlug)?.name ?? { bn: "", en: "" },
                )}
              />
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-[#E2E8EA] bg-white p-5 sm:p-6">
          <h2 className="text-[16px] font-bold text-[#0346A5]">{t("about.introHeading")}</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#66777D]">
            {pick(settings.intro) || pick(org.intro)}
          </p>
        </div>
        <BrandContact org={org} />
      </div>
    </div>
  );
}
