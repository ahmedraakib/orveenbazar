"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Save } from "lucide-react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { useAdminStore } from "@/providers/AdminStoreProvider";
import { useToast } from "@/providers/StoreProvider";
import { AdminShell, ImageUploader } from "@/components/admin/AdminKit";
import { BrandLogo } from "@/components/brand/bits";
import { Field, TextArea, TextInput } from "@/components/ui/core";
import { orgBySlug } from "@/data/organizations";

export default function AdminSettingsPage() {
  const { t, pick } = useLanguage();
  const params = useParams<{ org: string }>();
  const org = orgBySlug(params.org);
  const { settingsFor, saveSettings } = useAdminStore();
  const { push } = useToast();
  usePageTitle(t("admin.settings"), "Brand Settings");

  const current = org ? settingsFor(org.slug) : null;
  const [form, setForm] = useState(current ? { ...current } : null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!org || !form) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brandName.trim()) {
      setError(t("admin.required"));
      push(t("admin.saveError"), "error");
      return;
    }
    setError("");
    setSaving(true);
    window.setTimeout(() => {
      saveSettings(org.slug, form);
      setSaving(false);
      push(t("admin.settingsSaved"));
    }, 500);
  };

  return (
    <AdminShell org={org.slug} title={t("admin.settings")}>
      <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-[#E2E8EA] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8EA] bg-[#F7F9FA]">
            {form.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.logoDataUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <BrandLogo org={org} className="h-10 w-10" />
            )}
          </span>
          <ImageUploader
            label={t("admin.logo")}
            hint={t("admin.uploadHint")}
            value={form.logoDataUrl}
            onChange={(url) => setForm({ ...form, logoDataUrl: url })}
            onError={(kind) =>
              push(kind === "type" ? t("admin.invalidImageType") : t("admin.invalidImageSize"), "error")
            }
          />
        </div>

        <Field label={t("admin.brandName")} htmlFor="st-name" required error={error}>
          <TextInput id="st-name" value={form.brandName} invalid={!!error} onChange={(e) => { setForm({ ...form, brandName: e.target.value }); setError(""); }} />
        </Field>

        <Field label={`${t("admin.introduction")} (বাংলা)`} htmlFor="st-ibn">
          <TextArea id="st-ibn" value={form.intro.bn} onChange={(e) => setForm({ ...form, intro: { ...form.intro, bn: e.target.value } })} />
        </Field>
        <Field label={`${t("admin.introduction")} (English)`} htmlFor="st-ien">
          <TextArea id="st-ien" value={form.intro.en} onChange={(e) => setForm({ ...form, intro: { ...form.intro, en: e.target.value } })} />
        </Field>
        <Field label={`${t("admin.contactText")} (বাংলা)`} htmlFor="st-cbn">
          <TextArea id="st-cbn" value={form.contactText.bn} onChange={(e) => setForm({ ...form, contactText: { ...form.contactText, bn: e.target.value } })} />
        </Field>
        <Field label={`${t("admin.contactText")} (English)`} htmlFor="st-cen">
          <TextArea id="st-cen" value={form.contactText.en} onChange={(e) => setForm({ ...form, contactText: { ...form.contactText, en: e.target.value } })} />
        </Field>

        <p className="text-[12px] text-[#66777D]">
          {t("footer.contact")}: {org.email} • {org.whatsapp} • {pick(org.address)}
        </p>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#075ED1] px-5 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-[#0346A5] disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? t("auth.working") : t("account.save")}
        </button>
      </form>
    </AdminShell>
  );
}
