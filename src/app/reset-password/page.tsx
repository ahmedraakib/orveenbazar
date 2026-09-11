"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useLanguage, usePageTitle } from "@/providers/LanguageProvider";
import { Field } from "@/components/ui/core";
import { PasswordInput } from "@/components/ui/feedback";
import { LogoMark } from "@/components/layout/Logo";

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  usePageTitle(t("auth.resetTitle"), "Reset Password");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (password.length < 6) next.password = t("validation.minLength", { count: 6 });
    if (confirm !== password) next.confirm = t("validation.passwordMismatch");
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 700);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10">
      <div className="rounded-3xl border border-[#E2E8EA] bg-white p-6 sm:p-8">
        <LogoMark className="mx-auto h-12 w-12 text-[#075ED1]" />
        <h1 className="mt-3 text-center text-[22px] font-black text-[#0346A5]">{t("auth.resetTitle")}</h1>
        <p className="mt-1 text-center text-[12.5px] text-[#66777D]">{t("auth.resetSub")}</p>

        {done ? (
          <div className="mt-6 rounded-2xl border border-[#16A34A]/30 bg-[#16A34A]/5 p-5 text-center">
            <CheckCircle2 className="mx-auto h-9 w-9 text-[#16A34A]" />
            <p className="mt-2 text-[13.5px] font-semibold text-[#14532D]">{t("auth.resetSuccess")}</p>
            <Link
              href="/login"
              className="mt-3 inline-block rounded-xl bg-[#075ED1] px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#0346A5]"
            >
              {t("auth.loginTitle")}
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-5 space-y-4">
            <Field label={t("auth.password")} htmlFor="rs-pass" required error={errors.password}>
              <PasswordInput
                id="rs-pass"
                autoComplete="new-password"
                value={password}
                invalid={!!errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: undefined }));
                }}
              />
            </Field>
            <Field label={t("auth.confirmPassword")} htmlFor="rs-confirm" required error={errors.confirm}>
              <PasswordInput
                id="rs-confirm"
                autoComplete="new-password"
                value={confirm}
                invalid={!!errors.confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setErrors((p) => ({ ...p, confirm: undefined }));
                }}
              />
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#075ED1] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#0346A5] disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {loading ? t("auth.working") : t("auth.submitReset")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
