"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { useToast } from "@/providers/StoreProvider";
import { AdminShell, ImageUploader, StatusBadge } from "@/components/admin/AdminKit";
import { Banner } from "@/components/brand/bits";
import { Field, Modal, TextInput } from "@/components/ui/core";
import type { Banner as BannerType } from "@/data/banners";
import type { OrgSlug } from "@/data/organizations";

export default function AdminBannersPage() {
  const { t, pick } = useLanguage();
  const params = useParams<{ org: string }>();
  const org = params.org as OrgSlug;
  const { state, saveBanner } = useAdminStore();
  const { push } = useToast();
  usePageTitle(t("admin.banners"), "Banners");

  const [editing, setEditing] = useState<BannerType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rows = state.banners
    .filter((b) => b.orgSlug === org)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const move = (banner: BannerType, dir: -1 | 1) => {
    const target = rows[rows.indexOf(banner) + dir];
    if (!target) return;
    saveBanner({ ...banner, sortOrder: target.sortOrder });
    saveBanner({ ...target, sortOrder: banner.sortOrder });
  };

  const openNew = () =>
    setEditing({
      id: `ban-${Date.now()}`,
      orgSlug: org,
      title: { bn: "", en: "" },
      subtitle: { bn: "", en: "" },
      alt: { bn: "", en: "" },
      targetUrl: "/catalog",
      sortOrder: rows.length + 1,
      active: true,
      style: "blue",
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const next: Record<string, string> = {};
    if (!editing.title.en.trim()) next.titleEn = t("admin.required");
    if (!editing.alt.en.trim()) next.altEn = t("admin.required");
    if (!/^https?:\/\/.+|^\/.+/.test(editing.targetUrl.trim())) next.url = t("admin.invalidUrl");
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      push(t("admin.saveError"), "error");
      return;
    }
    saveBanner(editing);
    push(t("admin.bannerSaved"));
    setEditing(null);
  };

  return (
    <AdminShell org={org} title={t("admin.banners")}>
      <button
        type="button"
        onClick={openNew}
        className="mb-4 inline-flex items-center gap-2 rounded-xl bg-[#075ED1] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#0346A5]"
      >
        <Plus className="h-4 w-4" />
        {t("admin.addBanner")}
      </button>

      <ul className="space-y-4">
        {rows.map((banner) => (
          <li key={banner.id} className="rounded-2xl border border-[#E2E8EA] bg-white p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_260px] lg:items-center">
              <Banner banner={banner} />
              <div className="space-y-1.5 text-[12.5px] text-[#66777D]">
                <p className="font-semibold text-[#17242A]">{pick(banner.title)}</p>
                <p>
                  {t("admin.bannerAlt")}: {pick(banner.alt)}
                </p>
                <p>
                  {t("admin.bannerUrl")}: <span className="break-all">{banner.targetUrl}</span>
                </p>
                <p>
                  {t("admin.sortOrder")}: {banner.sortOrder}
                </p>
                <StatusBadge status={banner.active ? "active" : "inactive"} />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => move(banner, -1)}
                    aria-label={t("admin.moveUp")}
                    className="rounded-lg border border-[#E2E8EA] p-2 text-[#66777D] transition hover:bg-[#F7F9FA]"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(banner, 1)}
                    aria-label={t("admin.moveDown")}
                    className="rounded-lg border border-[#E2E8EA] p-2 text-[#66777D] transition hover:bg-[#F7F9FA]"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      saveBanner({ ...banner, active: !banner.active });
                      push(banner.active ? t("admin.inactive") : t("admin.active"), "info");
                    }}
                    className="rounded-lg border border-[#E2E8EA] px-3 py-1.5 text-[11.5px] font-semibold text-[#075ED1] transition hover:bg-[#EAF3FE]"
                  >
                    {banner.active ? t("admin.deactivate") : t("admin.activate")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing({ ...banner })}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8EA] px-3 py-1.5 text-[12px] font-semibold text-[#075ED1] transition hover:bg-[#EAF3FE]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {t("admin.edit")}
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} label={t("admin.editBanner")} size="lg">
        {editing ? (
          <form onSubmit={submit} noValidate className="space-y-4 p-5 sm:p-6">
            <h2 className="pr-8 text-[17px] font-bold text-[#17242A]">
              {rows.some((r) => r.id === editing.id) ? t("admin.editBanner") : t("admin.addBanner")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`${t("admin.colTitle")} (বাংলা)`} htmlFor="ban-tbn">
                <TextInput id="ban-tbn" value={editing.title.bn} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, bn: e.target.value } })} />
              </Field>
              <Field label={`${t("admin.colTitle")} (English)`} htmlFor="ban-ten" required error={errors.titleEn}>
                <TextInput id="ban-ten" value={editing.title.en} invalid={!!errors.titleEn} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} />
              </Field>
              <Field label={`${t("admin.bannerAlt")} (বাংলা)`} htmlFor="ban-abn">
                <TextInput id="ban-abn" value={editing.alt.bn} onChange={(e) => setEditing({ ...editing, alt: { ...editing.alt, bn: e.target.value } })} />
              </Field>
              <Field label={`${t("admin.bannerAlt")} (English)`} htmlFor="ban-aen" required error={errors.altEn}>
                <TextInput id="ban-aen" value={editing.alt.en} invalid={!!errors.altEn} onChange={(e) => setEditing({ ...editing, alt: { ...editing.alt, en: e.target.value } })} />
              </Field>
              <Field label={t("admin.bannerUrl")} htmlFor="ban-url" required error={errors.url}>
                <TextInput id="ban-url" value={editing.targetUrl} invalid={!!errors.url} onChange={(e) => setEditing({ ...editing, targetUrl: e.target.value })} />
              </Field>
              <Field label={t("admin.sortOrder")} htmlFor="ban-sort">
                <TextInput id="ban-sort" type="number" value={String(editing.sortOrder)} onChange={(e) => setEditing({ ...editing, sortOrder: parseInt(e.target.value, 10) || 1 })} />
              </Field>
              <Field label={t("admin.status")} htmlFor="ban-active">
                <select
                  id="ban-active"
                  value={editing.active ? "1" : "0"}
                  onChange={(e) => setEditing({ ...editing, active: e.target.value === "1" })}
                  className="w-full rounded-xl border border-[#E2E8EA] bg-white px-3.5 py-2.5 text-[14px]"
                >
                  <option value="1">{t("admin.active")}</option>
                  <option value="0">{t("admin.inactive")}</option>
                </select>
              </Field>
              <Field label={t("catalog.type")} htmlFor="ban-style">
                <select
                  id="ban-style"
                  value={editing.style}
                  onChange={(e) => setEditing({ ...editing, style: e.target.value as BannerType["style"] })}
                  className="w-full rounded-xl border border-[#E2E8EA] bg-white px-3.5 py-2.5 text-[14px]"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="navy">Navy</option>
                  <option value="yellow">Yellow</option>
                </select>
              </Field>
            </div>
            <ImageUploader
              label={t("admin.uploadImage")}
              hint={t("admin.uploadHint")}
              value={editing.image}
              onChange={(url) => setEditing({ ...editing, image: url })}
              onError={(kind) =>
                push(kind === "type" ? t("admin.invalidImageType") : t("admin.invalidImageSize"), "error")
              }
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-[#E2E8EA] px-4 py-2.5 text-[13px] font-semibold text-[#17242A] hover:bg-[#F7F9FA]">
                {t("admin.cancel")}
              </button>
              <button type="submit" className="rounded-xl bg-[#075ED1] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#0346A5]">
                {t("account.save")}
              </button>
            </div>
          </form>
        ) : null}
      </Modal>
    </AdminShell>
  );
}
