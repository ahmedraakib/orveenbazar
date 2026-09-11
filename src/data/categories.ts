import type { LocalizedText } from "@/lib/types";
import type { OrgSlug } from "./organizations";

export interface CatalogCategory {
  slug: string;
  orgSlug: OrgSlug;
  name: LocalizedText;
  description: LocalizedText;
  sortOrder: number;
  active: boolean;
  icon: string;
}

const L = (bn: string, en: string): LocalizedText => ({ bn, en });

export const categories: CatalogCategory[] = [
  {
    slug: "edible-oil",
    orgSlug: "orveen",
    name: L("ভোজ্য তেল", "Edible Oil"),
    description: L("সয়াবিন ও সরিষার তেল", "Soybean and mustard oil"),
    sortOrder: 1,
    active: true,
    icon: "droplet",
  },
  {
    slug: "food-staples",
    orgSlug: "orveen",
    name: L("খাদ্য সামগ্রী", "Food Staples"),
    description: L("চাল, আটা, চিনি, ডাল ও মসলা", "Rice, flour, sugar, lentils and spices"),
    sortOrder: 2,
    active: true,
    icon: "wheat",
  },
  {
    slug: "beverages",
    orgSlug: "orveen",
    name: L("পানীয়", "Beverages"),
    description: L("জুস, এনার্জি ড্রিংক ও পানীয় জল", "Juice, energy drinks and drinking water"),
    sortOrder: 3,
    active: true,
    icon: "citrus",
  },
  {
    slug: "laundry-care",
    orgSlug: "ecofast",
    name: L("লন্ড্রি কেয়ার", "Laundry Care"),
    description: L("ডিটারজেন্ট পাউডার ও লিকুইড", "Detergent powder and liquid"),
    sortOrder: 1,
    active: true,
    icon: "sparkles",
  },
  {
    slug: "home-hygiene",
    orgSlug: "ecofast",
    name: L("হোম হাইজিন", "Home Hygiene"),
    description: L("ডিশওয়াশ, ফ্লোর ক্লিনার ও মশার কয়েল", "Dishwash, floor cleaner and mosquito coil"),
    sortOrder: 2,
    active: true,
    icon: "home",
  },
  {
    slug: "distribution",
    orgSlug: "reliable",
    name: L("ডিস্ট্রিবিউশন সেবা", "Distribution Services"),
    description: L("ডিলার ও ডিস্ট্রিবিউটর নেটওয়ার্ক সেবা", "Dealer and distributor network services"),
    sortOrder: 1,
    active: true,
    icon: "truck",
  },
  {
    slug: "corporate-supply",
    orgSlug: "reliable",
    name: L("কর্পোরেট সাপ্লাই", "Corporate Supply"),
    description: L("প্রাতিষ্ঠানিক নিত্যপ্রয়োজনীয় সাপ্লাই", "Institutional essentials supply"),
    sortOrder: 2,
    active: true,
    icon: "building",
  },
  {
    slug: "brand-partnership",
    orgSlug: "reliable",
    name: L("ব্র্যান্ড পার্টনারশিপ", "Brand Partnership"),
    description: L("ব্যবসায়িক অংশীদারিত্ব ও সাপোর্ট", "Business partnership and support"),
    sortOrder: 3,
    active: true,
    icon: "handshake",
  },
];

export function categoriesByOrg(orgSlug: string, activeOnly = false): CatalogCategory[] {
  return categories
    .filter((c) => c.orgSlug === orgSlug && (!activeOnly || c.active))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function categoryBySlug(slug: string): CatalogCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
