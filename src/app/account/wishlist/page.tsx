"use client";

import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useWishlist } from "@/providers/StoreProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { CatalogCard } from "@/components/catalog/cards";
import { Breadcrumb, EmptyState } from "@/components/ui/core";

export default function WishlistPage() {
  const { t, pick } = useLanguage();
  const { user } = useAuth();
  const { ids } = useWishlist();
  const { state } = useAdminStore();
  usePageTitle(t("wishlist.title"), "Wishlist");

  const items = ids
    .map((id) => state.items.find((i) => i.id === id && i.status === "published"))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon={UserRound}
          title={t("wishlist.guestTitle")}
          description={t("wishlist.guestDesc")}
          action={
            <Link
              href="/login?next=/account/wishlist"
              className="rounded-xl bg-[#075ED1] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0346A5]"
            >
              {t("auth.loginTitle")}
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 lg:px-8 lg:py-8">
      <Breadcrumb items={[{ label: t("common.home"), href: "/" }, { label: t("account.title"), href: "/account" }, { label: t("wishlist.title") }]} />
      <h1 className="mt-3 text-[22px] font-bold text-[#0346A5] sm:text-[28px]">{t("wishlist.title")}</h1>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Heart}
            title={t("wishlist.empty")}
            description={t("wishlist.emptyDesc")}
            action={
              <Link
                href="/catalog"
                className="rounded-xl bg-[#075ED1] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0346A5]"
              >
                {t("wishlist.browse")}
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <CatalogCard
              key={item.id}
              item={item}
              orgName={item.orgSlug}
              categoryName={pick(
                state.categories.find((c) => c.slug === item.categorySlug)?.name ?? { bn: "", en: "" },
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
