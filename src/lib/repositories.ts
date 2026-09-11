/**
 * Repository / service seams for future backend integration.
 *
 * The UI talks to these interfaces only through the providers
 * (AuthProvider / StoreProvider / AdminStoreProvider), which currently use the
 * Local* implementations below (TypeScript mock data + localStorage).
 *
 * PRODUCTION NOTE: replace each Local* implementation with a remote
 * implementation (Supabase/REST/GraphQL). Client-side role checks are UI
 * simulation only — real authorization MUST be enforced server-side.
 */
import type { CatalogItem } from "@/data/items";
import type { CatalogCategory } from "@/data/categories";
import type { Banner } from "@/data/banners";
import type { AdminUser } from "@/data/users";
import type { SessionUser } from "@/providers/AuthProvider";

export interface CatalogRepository {
  listPublished(org?: string): CatalogItem[];
  bySlug(slug: string): CatalogItem | undefined;
  categories(org?: string): CatalogCategory[];
  banners(org?: string, activeOnly?: boolean): Banner[];
}

export interface WishlistRepository {
  list(): string[];
  add(itemId: string): void;
  remove(itemId: string): void;
}

export interface AuthService {
  current(): SessionUser | null;
  login(email: string, password: string): Promise<{ ok: boolean; user?: SessionUser }>;
  register(name: string, email: string, password: string): Promise<{ ok: boolean; user?: SessionUser }>;
  logout(): void;
}

export interface AdminContentRepository {
  items(org: string): CatalogItem[];
  saveItem(item: CatalogItem): void;
  setItemStatus(id: string, status: CatalogItem["status"]): void;
  saveCategory(category: CatalogCategory): void;
  saveBanner(banner: Banner): void;
  users(): AdminUser[];
  setUserStatus(id: string, status: AdminUser["status"]): void;
  setUserOrgs(id: string, orgs: AdminUser["orgs"]): void;
  resetDemoData(): void;
}

/**
 * Local implementations (mock). Kept intentionally thin so swapping in a
 * database-backed implementation later does not touch UI code.
 */
export const localRepositories = {
  catalog: "LocalCatalogRepository (see AdminStoreProvider.publishedItems)",
  wishlist: "LocalWishlistRepository (see StoreProvider wishlist + localStorage)",
  auth: "LocalAuthService (see AuthProvider + localStorage demo session)",
  admin: "LocalAdminContentRepository (see AdminStoreProvider + localStorage)",
} as const;
