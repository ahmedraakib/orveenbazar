import type { LocalizedText, PackageVisual } from "@/lib/types";
import type { OrgSlug } from "./organizations";

export interface ItemVariant {
  id: string;
  label: string;
  value: string;
  sortOrder: number;
}

export interface CatalogItem {
  id: string;
  slug: string;
  orgSlug: OrgSlug;
  title: LocalizedText;
  description: LocalizedText;
  type: "product" | "service";
  categorySlug: string;
  variants: ItemVariant[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  /** optional uploaded image (data URL) — simulated upload */
  image?: string;
  /** optional DISPLAY-ONLY price text, rendered only when catalogConfig.showPrice */
  priceText?: string;
  visual: PackageVisual;
  tint: string;
  pack: string;
  accent: string;
}

/** Seed shape before generated fields (variant ids, createdAt) are applied. */
type ItemSeed = Omit<CatalogItem, "createdAt" | "variants"> & {
  variants: { label: string; value: string }[];
};

const L = (bn: string, en: string): LocalizedText => ({ bn, en });

const seedItems: ItemSeed[] = [
  {
    id: "itm-01",
    slug: "orveen-soybean-oil-1l",
    orgSlug: "orveen",
    title: L("ORVEEN সয়াবিন তেল ১ লিটার", "ORVEEN Soybean Oil 1L"),
    description: L(
      "প্রতিদিনের রান্নার জন্য খাঁটি সয়াবিন তেল। পরিবারের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য পছন্দ।",
      "Pure soybean oil for everyday cooking. A reliable choice for family essentials.",
    ),
    type: "product",
    categorySlug: "edible-oil",
    variants: [
      { label: "Size", value: "1L" },
      { label: "Pack", value: "Bottle" },
    ],
    status: "published",
    updatedAt: "2025-11-02",
    featured: true,
    visual: "bottle",
    tint: "#FFF7E6",
    pack: "#F59E0B",
    accent: "#075ED1",
  },
  {
    id: "itm-02",
    slug: "orveen-mustard-oil-500ml",
    orgSlug: "orveen",
    title: L("ORVEEN সরিষার তেল ৫০০ মি.লি.", "ORVEEN Mustard Oil 500ml"),
    description: L(
      "ঝাল ও ঘ্রাণে ভরপুর সরিষার তেল — রান্না, ভাজি ও আচারের জন্য উপযুক্ত।",
      "Pungent, aromatic mustard oil suited for cooking, frying and pickles.",
    ),
    type: "product",
    categorySlug: "edible-oil",
    variants: [
      { label: "Size", value: "500ml" },
      { label: "Pack", value: "Bottle" },
    ],
    status: "published",
    updatedAt: "2025-10-21",
    featured: false,
    visual: "bottle",
    tint: "#FFF4E0",
    pack: "#D97706",
    accent: "#075ED1",
  },
  {
    id: "itm-03",
    slug: "premium-miniket-rice-5kg",
    orgSlug: "orveen",
    title: L("প্রিমিয়াম মিনিকেট চাল ৫ কেজি", "Premium Miniket Rice 5kg"),
    description: L(
      "ঝরঝরে ভাতের জন্য বাছাই করা প্রিমিয়াম মিনিকেট চাল।",
      "Sorted premium miniket rice for fluffy everyday meals.",
    ),
    type: "product",
    categorySlug: "food-staples",
    variants: [
      { label: "Weight", value: "5kg" },
      { label: "Pack", value: "Bag" },
    ],
    status: "published",
    updatedAt: "2025-11-10",
    featured: true,
    visual: "bag",
    tint: "#F7F3EA",
    pack: "#E0C690",
    accent: "#2D9819",
  },
  {
    id: "itm-04",
    slug: "premium-atta-5kg",
    orgSlug: "orveen",
    title: L("প্রিমিয়াম আটা ৫ কেজি", "Premium Atta 5kg"),
    description: L(
      "নরম রুটি ও পরোটার জন্য মানসম্মত গম থেকে চাকিত প্রিমিয়াম আটা।",
      "Premium atta milled from quality wheat for soft roti and paratha.",
    ),
    type: "product",
    categorySlug: "food-staples",
    variants: [
      { label: "Weight", value: "5kg" },
      { label: "Grind", value: "Fine" },
    ],
    status: "published",
    updatedAt: "2025-09-30",
    featured: false,
    visual: "bag",
    tint: "#F8F1E4",
    pack: "#D9B87C",
    accent: "#075ED1",
  },
  {
    id: "itm-05",
    slug: "refined-sugar-1kg",
    orgSlug: "orveen",
    title: L("পরিশোধিত চিনি ১ কেজি", "Refined Sugar 1kg"),
    description: L(
      "চা, মিষ্টি ও রান্নার জন্য পরিষ্কার দানাদার চিনি।",
      "Clean granulated sugar for tea, desserts and cooking.",
    ),
    type: "product",
    categorySlug: "food-staples",
    variants: [{ label: "Weight", value: "1kg" }],
    status: "published",
    updatedAt: "2025-08-14",
    featured: false,
    visual: "pouch",
    tint: "#FDF3F1",
    pack: "#E7CFC7",
    accent: "#075ED1",
  },
  {
    id: "itm-06",
    slug: "masoor-dal-1kg",
    orgSlug: "orveen",
    title: L("মসুর ডাল ১ কেজি", "Masoor Dal 1kg"),
    description: L(
      "প্রতিদিনের ডালের জন্য পরিষ্কার ও বাছাই করা মসুর ডাল।",
      "Clean sorted masoor dal for everyday cooking.",
    ),
    type: "product",
    categorySlug: "food-staples",
    variants: [{ label: "Weight", value: "1kg" }],
    status: "published",
    updatedAt: "2025-10-05",
    featured: false,
    visual: "pouch",
    tint: "#FBEFE6",
    pack: "#C46A3A",
    accent: "#2D9819",
  },
  {
    id: "itm-07",
    slug: "turmeric-powder-200g",
    orgSlug: "orveen",
    title: L("হলুদ গুঁড়া ২০০ গ্রাম", "Turmeric Powder 200g"),
    description: L(
      "উজ্জ্বল রঙের বাছাই করা হলুদ গুঁড়া।",
      "Brightly coloured turmeric powder from selected roots.",
    ),
    type: "product",
    categorySlug: "food-staples",
    variants: [{ label: "Weight", value: "200g" }],
    status: "published",
    updatedAt: "2025-07-19",
    featured: false,
    visual: "pouch",
    tint: "#FDEFE3",
    pack: "#B45309",
    accent: "#FFC800",
  },
  {
    id: "itm-08",
    slug: "orveen-mango-juice-1l",
    orgSlug: "orveen",
    title: L("ORVEEN ম্যাংগো জুস ১ লিটার", "ORVEEN Mango Juice 1L"),
    description: L(
      "সব বয়সীদের জন্য আমের ফ্লেভারের রিফ্রেশিং জুস।",
      "Refreshing mango flavoured juice for all ages.",
    ),
    type: "product",
    categorySlug: "beverages",
    variants: [
      { label: "Size", value: "1L" },
      { label: "Flavour", value: "Mango" },
    ],
    status: "published",
    updatedAt: "2025-11-01",
    featured: true,
    visual: "bottle",
    tint: "#FFF1E8",
    pack: "#EA8A3A",
    accent: "#2D9819",
  },
  {
    id: "itm-09",
    slug: "orveen-energy-drink-250ml",
    orgSlug: "orveen",
    title: L("ORVEEN এনার্জি ড্রিংক ২৫০ মি.লি.", "ORVEEN Energy Drink 250ml"),
    description: L(
      "ব্যস্ত দিনে শক্তির জোগান দিতে এনার্জি ড্রিংক ক্যান।",
      "Energy drink can to power busy days.",
    ),
    type: "product",
    categorySlug: "beverages",
    variants: [{ label: "Size", value: "250ml" }],
    status: "published",
    updatedAt: "2025-06-22",
    featured: false,
    visual: "can",
    tint: "#EAF7EE",
    pack: "#16A34A",
    accent: "#0346A5",
  },
  {
    id: "itm-10",
    slug: "orveen-drinking-water-1l",
    orgSlug: "orveen",
    title: L("ORVEEN পানীয় জল ১ লিটার", "ORVEEN Drinking Water 1L"),
    description: L(
      "যাত্রা ও প্রতিদিনের ব্যবহারের জন্য প্যাকেটজাত পানীয় জল।",
      "Packaged drinking water for travel and daily use.",
    ),
    type: "product",
    categorySlug: "beverages",
    variants: [{ label: "Size", value: "1L" }],
    status: "published",
    updatedAt: "2025-05-11",
    featured: false,
    visual: "bottle",
    tint: "#E8F4FB",
    pack: "#4A90B8",
    accent: "#075ED1",
  },
  {
    id: "itm-11",
    slug: "ecofast-detergent-powder-1kg",
    orgSlug: "ecofast",
    title: L("ECO FAST ডিটারজেন্ট পাউডার ১ কেজি", "ECO FAST Detergent Powder 1kg"),
    description: L(
      "দৈনন্দিন লন্ড্রির জন্য শক্তিশালী ডিটারজেন্ট পাউডার।",
      "Powerful detergent powder for daily laundry.",
    ),
    type: "product",
    categorySlug: "laundry-care",
    variants: [
      { label: "Weight", value: "1kg" },
      { label: "Fragrance", value: "Fresh Bloom" },
    ],
    status: "published",
    updatedAt: "2025-10-18",
    featured: true,
    visual: "box",
    tint: "#EAF3F8",
    pack: "#238014",
    accent: "#FFC800",
  },
  {
    id: "itm-12",
    slug: "ecofast-dishwash-liquid-500ml",
    orgSlug: "ecofast",
    title: L("ECO FAST ডিশওয়াশ লিকুইড ৫০০ মি.লি.", "ECO FAST Dishwash Liquid 500ml"),
    description: L(
      "চর্বি সহজে দূর করে এমন ডিশওয়াশ লিকুইড।",
      "Dishwashing liquid that cuts through grease with ease.",
    ),
    type: "product",
    categorySlug: "home-hygiene",
    variants: [
      { label: "Size", value: "500ml" },
      { label: "Scent", value: "Lemon" },
    ],
    status: "published",
    updatedAt: "2025-11-05",
    featured: true,
    visual: "spray",
    tint: "#E6F6F2",
    pack: "#2D9819",
    accent: "#0346A5",
  },
  {
    id: "itm-13",
    slug: "ecofast-floor-cleaner-1l",
    orgSlug: "ecofast",
    title: L("ECO FAST ফ্লোর ক্লিনার ১ লিটার", "ECO FAST Floor Cleaner 1L"),
    description: L(
      "ঘরের মেঝে ঝকঝকে রাখতে ফ্লোর ক্লিনার।",
      "Floor cleaner to keep floors sparkling.",
    ),
    type: "product",
    categorySlug: "home-hygiene",
    variants: [{ label: "Size", value: "1L" }],
    status: "published",
    updatedAt: "2025-09-09",
    featured: false,
    visual: "spray",
    tint: "#EDF4F6",
    pack: "#14532D",
    accent: "#7DC242",
  },
  {
    id: "itm-14",
    slug: "ecofast-mosquito-coil-10pack",
    orgSlug: "ecofast",
    title: L("ECO FAST মশার কয়েল ১০ প্যাক", "ECO FAST Mosquito Coil 10 Pack"),
    description: L(
      "সন্ধ্যা-রাতের আরামের জন্য মশার কয়েল।",
      "Mosquito coils for comfortable evenings.",
    ),
    type: "product",
    categorySlug: "home-hygiene",
    variants: [{ label: "Pack", value: "10 coils" }],
    status: "published",
    updatedAt: "2025-08-01",
    featured: false,
    visual: "coil",
    tint: "#EEF7EC",
    pack: "#2D9819",
    accent: "#0346A5",
  },
  {
    id: "itm-15",
    slug: "ecofast-laundry-liquid-1l",
    orgSlug: "ecofast",
    title: L("ECO FAST লন্ড্রি লিকুইড ১ লিটার", "ECO FAST Laundry Liquid 1L"),
    description: L(
      "মেশিন ও হাত দুই ধরনের ধোয়ার জন্য লন্ড্রি লিকুইড।",
      "Laundry liquid for machine and hand wash.",
    ),
    type: "product",
    categorySlug: "laundry-care",
    variants: [{ label: "Size", value: "1L" }],
    status: "draft",
    updatedAt: "2025-11-12",
    featured: false,
    visual: "spray",
    tint: "#EAF3F8",
    pack: "#238014",
    accent: "#7DC242",
  },
  {
    id: "itm-16",
    slug: "reliable-dealer-onboarding",
    orgSlug: "reliable",
    title: L("ডিলার অনবোর্ডিং সেবা", "Dealer Onboarding Service"),
    description: L(
      "নতুন ডিলার ও ডিস্ট্রিবিউটরদের জন্য নিবন্ধন, প্রশিক্ষণ ও প্রারম্ভিক সহায়তা সেবা।",
      "Registration, training and starter support service for new dealers and distributors.",
    ),
    type: "service",
    categorySlug: "distribution",
    variants: [
      { label: "Level", value: "Upazila" },
      { label: "Support", value: "Dedicated manager" },
    ],
    status: "published",
    updatedAt: "2025-10-25",
    featured: true,
    visual: "box",
    tint: "#EAF3FE",
    pack: "#0346A5",
    accent: "#FFC800",
  },
  {
    id: "itm-17",
    slug: "reliable-district-distribution",
    orgSlug: "reliable",
    title: L("জেলা পর্যায়ের ডিস্ট্রিবিউশন", "District Level Distribution"),
    description: L(
      "জেলা পর্যায়ে পণ্য সরবরাহ ও ডিস্ট্রিবিউশন নেটওয়ার্ক ব্যবস্থাপনা সেবা।",
      "District level supply and distribution network management service.",
    ),
    type: "service",
    categorySlug: "distribution",
    variants: [{ label: "Coverage", value: "District" }],
    status: "published",
    updatedAt: "2025-09-15",
    featured: false,
    visual: "box",
    tint: "#EAF3FE",
    pack: "#075ED1",
    accent: "#FFC800",
  },
  {
    id: "itm-18",
    slug: "reliable-corporate-essentials",
    orgSlug: "reliable",
    title: L("কর্পোরেট এসেনশিয়ালস সাপ্লাই", "Corporate Essentials Supply"),
    description: L(
      "অফিস, স্কুল, রেস্টুরেন্ট ও হোটেলের জন্য নিত্যপ্রয়োজনীয় পণ্যের নিয়মিত সাপ্লাই সেবা।",
      "Regular essentials supply service for offices, schools, restaurants and hotels.",
    ),
    type: "service",
    categorySlug: "corporate-supply",
    variants: [
      { label: "Plan", value: "Monthly" },
      { label: "Communication", value: "Dedicated channel" },
    ],
    status: "published",
    updatedAt: "2025-11-08",
    featured: true,
    visual: "bag",
    tint: "#EAF3FE",
    pack: "#0346A5",
    accent: "#2D9819",
  },
  {
    id: "itm-19",
    slug: "reliable-brand-partnership-program",
    orgSlug: "reliable",
    title: L("ব্র্যান্ড পার্টনারশিপ প্রোগ্রাম", "Brand Partnership Program"),
    description: L(
      "ব্যবসায়িক অংশীদারদের জন্য দীর্ঘমেয়াদি সহযোগিতা ও ব্র্যান্ডিং সাপোর্ট প্রোগ্রাম।",
      "Long-term cooperation and branding support program for business partners.",
    ),
    type: "service",
    categorySlug: "brand-partnership",
    variants: [{ label: "Term", value: "Long-term" }],
    status: "published",
    updatedAt: "2025-07-30",
    featured: false,
    visual: "box",
    tint: "#EAF3FE",
    pack: "#0F2470",
    accent: "#FFC800",
  },
  {
    id: "itm-20",
    slug: "reliable-market-campaign-support",
    orgSlug: "reliable",
    title: L("লোকাল মার্কেট ক্যাম্পেইন সাপোর্ট", "Local Market Campaign Support"),
    description: L(
      "লোকাল মার্কেটে পোস্টার, বিলবোর্ড ও প্রমোশন ক্যাম্পেইন সহায়তা সেবা।",
      "Poster, billboard and promotion campaign assistance in local markets.",
    ),
    type: "service",
    categorySlug: "brand-partnership",
    variants: [{ label: "Material", value: "Poster & billboard" }],
    status: "archived",
    updatedAt: "2025-04-12",
    featured: false,
    visual: "box",
    tint: "#EDF1F2",
    pack: "#66777D",
    accent: "#0346A5",
  },
];

/** Demo seed → runtime catalog items (variant ids + createdAt generated). */
export const items: CatalogItem[] = seedItems.map((seed) => ({
  ...seed,
  createdAt: seed.updatedAt,
  variants: seed.variants.map((v, i) => ({
    id: `${seed.id}-v${i + 1}`,
    sortOrder: i + 1,
    label: v.label,
    value: v.value,
  })),
}));

export function itemBySlug(slug: string): CatalogItem | undefined {
  return items.find((i) => i.slug === slug);
}

/** Case-insensitive title match (no fuzzy search). */
export function searchItems(list: CatalogItem[], query: string): CatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (i) => i.title.bn.toLowerCase().includes(q) || i.title.en.toLowerCase().includes(q),
  );
}
