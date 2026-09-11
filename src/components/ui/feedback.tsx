"use client";

import { useState, type InputHTMLAttributes } from "react";
import { AlertOctagon, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Modal, inputClass } from "./core";
import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/* ------------------------------- Error state ------------------------------ */

export function ErrorState({
  title,
  description,
  onRetry,
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DC2626]/40 bg-[#DC2626]/5 px-6 py-12 text-center"
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DC2626]/10 text-[#DC2626]">
        <AlertOctagon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-[#17242A]">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-sm text-[#66777D]">{description}</p> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#075ED1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0346A5]"
        >
          <RefreshCw className="h-4 w-4" />
          {t("errors.retry")}
        </button>
      ) : null}
    </div>
  );
}

/* ------------------------------ Confirm dialog ----------------------------- */

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  tone = "danger",
}: {
  open: boolean;
  title: string;
  body?: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  tone?: "danger" | "primary";
}) {
  return (
    <Modal open={open} onClose={onCancel} label={title} size="sm">
      <div className="p-5 sm:p-6">
        <h2 className="pr-8 text-[17px] font-bold text-[#17242A]">{title}</h2>
        {body ? <p className="mt-2 text-[13.5px] leading-relaxed text-[#66777D]">{body}</p> : null}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#E2E8EA] px-4 py-2.5 text-[13.5px] font-semibold text-[#17242A] transition hover:bg-[#F7F9FA]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white transition",
              tone === "danger" ? "bg-[#DC2626] hover:bg-[#B91C1C]" : "bg-[#075ED1] hover:bg-[#0346A5]",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------ Password input ----------------------------- */

export function PasswordInput({
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cn(inputClass, "pr-11", invalid && "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t("auth.hidePassword") : t("auth.showPassword")}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#66777D] transition hover:bg-[#EAF3FE] hover:text-[#075ED1]"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
