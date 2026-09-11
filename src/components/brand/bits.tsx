"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { Organization } from "@/data/organizations";
import type { Banner } from "@/data/banners";
import type { OrgSettings } from "@/providers/AdminStoreProvider";
import { LogoMark } from "@/components/layout/Logo";
import { WhatsAppIcon } from "@/components/ui/core";
import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/* -------------------------------- Brand logo ------------------------------- */

export function BrandLogo({ org, className }: { org: Organization; className?: string }) {
  const [assetFailed, setAssetFailed] = useState(false);

  /*
   * ORVEEN: render the exact uploaded official asset unmodified.
   * If the asset file is not present yet, fall back to a faithful vector of
   * the same mark geometry (ring + leaves). Dropping the official file at
   * org.logoSrc swaps it in without any component change.
   */
  if (org.logo === "asset" && org.logoSrc && !assetFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={org.logoSrc}
        alt={`${org.name} logo`}
        className={cn("object-contain", className)}
        onError={() => setAssetFailed(true)}
      />
    );
  }
  if (org.logo === "asset") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={`${org.name} logo`} fill="none">
        <circle cx="27" cy="37" r="19" stroke={org.primary} strokeWidth="8" />
        <path d="M43 24c3-9 11-15 19-16-1 9-6 16-14 18-2 .5-4-1-5-2Z" fill={org.accent} />
        <path d="M40 27c-1-5 0-10 3-13 2 3 3 8 1 12-.8 1.6-2.6 1.6-4 1Z" fill={org.accent} opacity="0.85" />
        <path d="M46 30c4-2 9-2 13 0-3 3-8 5-12 4-1.6-.4-1.6-2.6-1-4Z" fill={org.accent} opacity="0.85" />
      </svg>
    );
  }
  if (org.logo === "leaf") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={`${org.name} logo`} fill="none">
        <circle cx="32" cy="32" r="24" stroke={org.primary} strokeWidth="6" />
        <path d="M22 40c0-12 9-20 20-21-1 12-8 20-17 21-1.5.2-3 0-3 0Z" fill={org.accent} />
        <path d="M24 40c4-6 10-10 16-12" stroke={org.deep} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  /* ECO FAST BD: no official artwork supplied — typography-only placeholder. */
  return (
    <svg viewBox="0 0 120 48" className={className} role="img" aria-label={`${org.name} logo (placeholder)`}>
      <rect x="2" y="2" width="116" height="44" rx="10" fill="none" stroke={org.primary} strokeWidth="2.5" />
      <text x="60" y="22" textAnchor="middle" fontSize="15" fontWeight="800" fill={org.deep} fontFamily="inherit">
        ECO FAST
      </text>
      <text x="60" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill={org.primary} fontFamily="inherit">
        BD
      </text>
    </svg>
  );
}

/* -------------------------------- Brand hero ------------------------------- */

export function BrandHero({
  org,
  settings,
  itemCount,
}: {
  org: Organization;
  settings: OrgSettings;
  itemCount: number;
}) {
  const { t, pick, language } = useLanguage();
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-10"
      style={{ background: `linear-gradient(135deg, ${org.deep} 0%, ${org.primary} 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 85% 20%, ${org.accent} 0, transparent 40%), radial-gradient(circle at 10% 90%, #ffffff 0, transparent 35%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
          <BrandLogo org={org} className="h-12 w-12 [&_circle]:stroke-white [&_path]:fill-white [&_path]:stroke-white" />
        </span>
        <div className="min-w-0">
          <h1 className="text-[24px] font-black leading-snug sm:text-[32px]">
            {settings.brandName || org.name}
          </h1>
          <p className="mt-1 text-[13px] font-semibold" style={{ color: org.accent }}>
            {pick(org.tagline)}
          </p>
          <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-white/85">
            {pick(settings.intro) || pick(org.intro)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link
              href={`/catalog?brand=${org.slug}`}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13.5px] font-bold text-[#0346A5] transition hover:brightness-95"
              style={{ backgroundColor: org.accent }}
            >
              {t("item.viewCatalog")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white/90">
              {t("catalog.results", {
                count: itemCount.toLocaleString(language === "bn" ? "bn-BD" : "en-US"),
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Banner --------------------------------- */

const bannerStyles: Record<Banner["style"], string> = {
  blue: "from-[#0346A5] to-[#075ED1]",
  green: "from-[#14532D] to-[#2D9819]",
  navy: "from-[#0F2470] to-[#0346A5]",
  yellow: "from-[#B45309] to-[#FFC800]",
};

export function Banner({ banner }: { banner: Banner }) {
  const { pick } = useLanguage();
  return (
    <Link
      href={banner.targetUrl}
      className={cn(
        "group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white transition hover:-translate-y-0.5 hover:shadow-lg sm:min-h-[200px] sm:p-7",
        bannerStyles[banner.style],
      )}
    >
      {banner.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={banner.image}
          alt={pick(banner.alt)}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition group-hover:opacity-35"
        />
      ) : null}
      <div className="relative">
        <h3 className="text-[18px] font-bold leading-snug sm:text-[22px]">{pick(banner.title)}</h3>
        <p className="mt-1 text-[12.5px] text-white/85 sm:text-[13.5px]">{pick(banner.subtitle)}</p>
      </div>
    </Link>
  );
}

/* ------------------------------ Brand contact ------------------------------ */

export function BrandContact({ org }: { org: Organization }) {
  const { t, pick } = useLanguage();
  return (
    <div className="rounded-3xl border border-[#E2E8EA] bg-white p-5 sm:p-6">
      <h2 className="text-[16px] font-bold text-[#0346A5]">{t("footer.contact")}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[#66777D]">{pick(org.contactText)}</p>
      <ul className="mt-4 space-y-2.5 text-[13px] text-[#17242A]">
        <li>
          <a
            href={`https://wa.me/8801335189426`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-[#075ED1]"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#2D9819]" />
            {org.whatsapp}
          </a>
        </li>
        <li>
          <a href={`mailto:${org.email}`} className="flex items-center gap-2 transition hover:text-[#075ED1]">
            <Mail className="h-4 w-4 text-[#075ED1]" />
            {org.email}
          </a>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#075ED1]" />
          {pick(org.address)}
        </li>
      </ul>
    </div>
  );
}
