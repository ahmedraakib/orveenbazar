/**
 * Global frontend configuration.
 *
 * showPrice: the brief does not confirm public price text, so prices are
 * hidden by default. If ever enabled, prices are DISPLAY TEXT ONLY —
 * no totals, discounts or calculations are performed anywhere.
 */
export const catalogConfig = {
  showPrice: false,
  pageSize: 8,
} as const;

/**
 * LocalStorage / sessionStorage keys used by the frontend prototype.
 * Production must move wishlist/session/CMS data to a backend database.
 */
export const STORAGE_KEYS = {
  language: "orveen-language",
  wishlist: "orveen-demo-wishlist",
  pendingWishlist: "orveen-demo-wishlist-pending",
  session: "orveen-demo-session",
  demoUsers: "orveen-demo-users",
  adminData: "orveen-demo-admin-data",
} as const;
