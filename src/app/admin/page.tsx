"use client";

import Link from "next/link";
import { Image as ImageIcon, LayoutGrid, Package, SquareStack } from "lucide-react";
import { useState } from "react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/StoreProvider";
import { AdminShell } from "@/components/admin/AdminKit";
import { ConfirmDialog } from "@/components/ui/feedback";

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const { state, selectedOrg, resetDemoData } = useAdminStore();
  const { user } = useAuth();
  const { push } = useToast();
  const [resetOpen, setResetOpen] = useState(false);
  usePageTitle(t("admin.dashboard"), "Admin Dashboard");

  const orgItems = state.items.filter((i) => i.orgSlug === selectedOrg);
  const counts = [
    { label: t("admin.products"), value: orgItems.filter((i) => i.type === "product").length, icon: Package, href: `/admin/${selectedOrg}/items?type=product` },
    { label: t("admin.services"), value: orgItems.filter((i) => i.type === "service").length, icon: SquareStack, href: `/admin/${selectedOrg}/items?type=service` },
    { label: t("admin.categories"), value: state.categories.filter((c) => c.orgSlug === selectedOrg).length, icon: LayoutGrid, href: `/admin/${selectedOrg}/categories` },
    { label: t("admin.banners"), value: state.banners.filter((b) => b.orgSlug === selectedOrg).length, icon: ImageIcon, href: `/admin/${selectedOrg}/banners` },
  ];

  return (
    <AdminShell title={t("admin.dashboard")}>
      <p className="mb-4 text-[13px] text-[#66777D]">{t("admin.countsSub")}</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {counts.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-[#E2E8EA] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#075ED1]/40 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FE] text-[#075ED1]">
              <card.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 text-[24px] font-extrabold text-[#0346A5]">{card.value}</p>
            <p className="text-[12px] font-semibold text-[#66777D]">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-[#E2E8EA] bg-white p-5">
        <h2 className="text-[15px] font-bold text-[#0346A5]">{t("admin.quickActions")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { href: `/admin/${selectedOrg}/items`, label: t("admin.items") },
            { href: `/admin/${selectedOrg}/categories`, label: t("admin.categories") },
            { href: `/admin/${selectedOrg}/banners`, label: t("admin.banners") },
            { href: `/admin/${selectedOrg}/settings`, label: t("admin.settings") },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-xl border border-[#E2E8EA] px-4 py-2 text-[12.5px] font-semibold text-[#075ED1] transition hover:bg-[#EAF3FE]"
            >
              {action.label}
            </Link>
          ))}
          {user?.role === "admin" ? (
            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className="rounded-xl border border-[#DC2626]/40 px-4 py-2 text-[12.5px] font-semibold text-[#DC2626] transition hover:bg-[#DC2626]/10"
            >
              {t("admin.resetDemo")}
            </button>
          ) : null}
        </div>
      </div>

      <ConfirmDialog
        open={resetOpen}
        title={t("admin.resetDemo")}
        body={t("admin.resetDemoBody")}
        confirmLabel={t("admin.confirm")}
        cancelLabel={t("admin.cancel")}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setResetOpen(false);
          push(t("admin.resetDone"), "info");
        }}
      />

      <div className="mt-6 rounded-2xl border border-[#E2E8EA] bg-white p-5">
        <h2 className="text-[15px] font-bold text-[#0346A5]">{t("admin.items")}</h2>
        <ul className="mt-3 space-y-2">
          {orgItems.slice(0, 6).map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8EA] px-3.5 py-2.5">
              <Link href={`/admin/${selectedOrg}/items/${item.id}`} className="min-w-0 truncate text-[13px] font-semibold text-[#17242A] hover:text-[#075ED1]">
                {item.title.en}
              </Link>
              <span className="shrink-0 text-[11.5px] text-[#66777D]">{item.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}
