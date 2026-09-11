"use client";

import {
  HeroSection,
  TrustBar,
  BrandCardsSection,
  FeaturedCategoriesSection,
  FeaturedItemsSection,
  BannerCarousel,
  BrandOverviewSection,
} from "@/components/home/sections";
import { usePageTitle } from "@/providers/LanguageProvider";

export default function HomePage() {
  usePageTitle(
    "ORVEEN BAZZAR | নিত্যপ্রয়োজনীয় ও FMCG পণ্যের অনলাইন ক্যাটালগ",
    "ORVEEN BAZZAR | FMCG & Daily Essentials Catalog",
  );

  return (
    <>
      <HeroSection />
      <BrandCardsSection />
      <FeaturedCategoriesSection />
      <FeaturedItemsSection />
      <BannerCarousel />
      <BrandOverviewSection />
      <TrustBar />
    </>
  );
}
