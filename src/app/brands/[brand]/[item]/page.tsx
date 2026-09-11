"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { orgBySlug } from "@/data/organizations";
import { ItemVisual, CatalogCard, WishlistButton } from "@/components/catalog/cards";
import { Breadcrumb, Badge, SectionHeading } from "@/components/ui/core";
import { ErrorState } from "@/components/ui/feedback";

export default function ItemDetailsPage() {
  const { t, pick } = useLanguage();
  const params = useParams<{ brand: string; item: string }>();
  const { itemBySlugPublic, state } = useAdminStore();
  const item = itemBySlugPublic(params.item);
  const org = orgBySlug(params.brand);

  usePageTitle(item ? pick(item.title) : t("item.notFound"), item?.title.en ?? "Item");

  if (!item || !org || item.orgSlug !== org.slug) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <ErrorState title={t("item.notFound")} description={t("item.notFoundDesc")} />
        <div className="mt-4 flex justify-center gap-2">
          <Link
            href="/"
            className="rounded-xl bg-[#075ED1] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0346A5]"
          >
            {t("errors.backHome")}
          </Link>
          <Link
            href="/catalog"
            className="rounded-xl border border-[#E2E8EA] bg-white px-5 py-2.5 text-sm font-semibold text-[#17242A] transition hover:bg-[#F7F9FA]"
          >
            {t("errors.browseCatalog")}
          </Link>
        </div>
      </div>
    );
  }

  const category = state.categories.find((c) => c.slug === item.categorySlug);
  const related = state.items
    .filter((i) => i.status === "published" && i.categorySlug === item.categorySlug && i.id !== item.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 lg:px-8 lg:py-8">
      <Breadcrumb
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("nav2.brands"), href: "/brands" },
          { label: org.name, href: `/brands/${org.slug}` },
          { label: pick(item.title) },
        ]}
      />

      <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-3xl border border-[#E2E8EA] bg-white">
          <ItemVisual item={item} className="aspect-square w-full" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={item.type === "product" ? "teal" : "green"}>
              {item.type === "product" ? t("item.typeProduct") : t("item.typeService")}
            </Badge>
            {category ? (
              <Link href={`/catalog?brand=${org.slug}&category=${category.slug}`}>
                <Badge tone="muted">{pick(category.name)}</Badge>
              </Link>
            ) : null}
          </div>
          <h1 className="mt-3 text-[24px] font-black leading-snug text-[#0346A5] sm:text-[30px]">
            {pick(item.title)}
          </h1>
          <p className="mt-1.5 text-[13px] font-semibold text-[#66777D]">
            {t("item.byBrand")}{" "}
            <Link href={`/brands/${org.slug}`} className="text-[#075ED1] hover:underline">
              {org.name}
            </Link>
          </p>

          <h2 className="mt-5 text-[14px] font-bold text-[#0346A5]">{t("item.description")}</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-[#66777D]">{pick(item.description)}</p>

          {item.variants.length > 0 ? (
            <>
              <h2 className="mt-5 text-[14px] font-bold text-[#0346A5]">{t("item.variants")}</h2>
              <ul className="mt-2 space-y-1.5">
                {item.variants.map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13.5px] text-[#17242A]">
                    <span className="rounded-full bg-[#EAF3FE] px-2.5 py-1 text-[12px] font-semibold text-[#075ED1]">
                      {v.label}
                    </span>
                    <span className="font-medium">{v.value}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <WishlistButton itemId={item.id} className="p-3" />
            <Link
              href={`/catalog?brand=${org.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#075ED1] px-5 py-3 text-[13.5px] font-bold text-white transition hover:bg-[#0346A5]"
            >
              {t("item.viewCatalog")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <SectionHeading title={t("item.related")} />
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((rel) => (
              <CatalogCard
                key={rel.id}
                item={rel}
                orgName={org.name}
                categoryName={pick(
                  state.categories.find((c) => c.slug === rel.categorySlug)?.name ?? { bn: "", en: "" },
                )}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
