/**
 * API Endpoints Configuration
 *
 * Centralized definition of all API routes used throughout the application.
 * This provides type-safe endpoint references and reduces hardcoded URLs.
 *
 * Usage:
 * ```typescript
 * import { API_ENDPOINTS } from '@/lib/api/endpoints';
 *
 * // Simple endpoint
 * axiosClient.get(API_ENDPOINTS.AUTH.LOGIN);
 *
 * // Parameterized endpoint
 * axiosClient.get(API_ENDPOINTS.USERS.DETAIL('123'));
 * ```
 */

export const API_ENDPOINTS = {
  /**
   * Authentication Endpoints
   */
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    ME: "/auth/me",
  },

  /**
   * User Management Endpoints
   */
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
    AVATAR: (id: string) => `/users/${id}/avatar`,
  },

  /**
   * Trading Endpoints
   */
  TRADING: {
    ACCOUNTS: "/trading/accounts",
    ACCOUNT_DETAIL: (id: string) => `/trading/accounts/${id}`,
    POSITIONS: "/trading/positions",
    POSITION_DETAIL: (id: string) => `/trading/positions/${id}`,
    ORDERS: "/trading/orders",
    ORDER_DETAIL: (id: string) => `/trading/orders/${id}`,
    CREATE_ORDER: "/trading/orders",
    CANCEL_ORDER: (id: string) => `/trading/orders/${id}/cancel`,
    HISTORY: "/trading/history",
    BALANCE: "/trading/balance",
  },

  /**
   * Market Data Endpoints
   */
  MARKET: {
    SYMBOLS: "/market/symbols",
    SYMBOL_DETAIL: (symbol: string) => `/market/symbols/${symbol}`,
    QUOTES: "/market/quotes",
    QUOTE: (symbol: string) => `/market/quotes/${symbol}`,
    CHART: (symbol: string) => `/market/chart/${symbol}`,
    HISTORICAL: (symbol: string) => `/market/historical/${symbol}`,
    WATCHLIST: "/market/watchlist",
    ADD_TO_WATCHLIST: "/market/watchlist",
    REMOVE_FROM_WATCHLIST: (id: string) => `/market/watchlist/${id}`,
  },

  /**
   * Analytics Endpoints
   */
  ANALYTICS: {
    PORTFOLIO: "/analytics/portfolio",
    PERFORMANCE: "/analytics/performance",
    RISK: "/analytics/risk",
    REPORTS: "/analytics/reports",
    REPORT_DETAIL: (id: string) => `/analytics/reports/${id}`,
    GENERATE_REPORT: "/analytics/reports/generate",
  },

  /**
   * Notification Endpoints
   */
  NOTIFICATIONS: {
    LIST: "/notifications",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_AS_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: "/notifications/mark-all-read",
    DELETE: (id: string) => `/notifications/${id}`,
    SETTINGS: "/notifications/settings",
    UPDATE_SETTINGS: "/notifications/settings",
  },

  /**
   * Settings Endpoints
   */
  SETTINGS: {
    GENERAL: "/settings/general",
    UPDATE_GENERAL: "/settings/general",
    SECURITY: "/settings/security",
    UPDATE_SECURITY: "/settings/security",
    PREFERENCES: "/settings/preferences",
    UPDATE_PREFERENCES: "/settings/preferences",
    API_KEYS: "/settings/api-keys",
    CREATE_API_KEY: "/settings/api-keys",
    REVOKE_API_KEY: (id: string) => `/settings/api-keys/${id}/revoke`,
  },

  /**
   * Support & Help Endpoints
   */
  SUPPORT: {
    TICKETS: "/support/tickets",
    TICKET_DETAIL: (id: string) => `/support/tickets/${id}`,
    CREATE_TICKET: "/support/tickets",
    UPDATE_TICKET: (id: string) => `/support/tickets/${id}`,
    CLOSE_TICKET: (id: string) => `/support/tickets/${id}/close`,
    MESSAGES: (ticketId: string) => `/support/tickets/${ticketId}/messages`,
    SEND_MESSAGE: (ticketId: string) => `/support/tickets/${ticketId}/messages`,
    FAQ: "/support/faq",
    FAQ_CATEGORY: (category: string) => `/support/faq/${category}`,
  },

  /**
   * Admin Endpoints
   */
  ADMIN: {
    USERS: "/admin/users",
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    SUSPEND_USER: (id: string) => `/admin/users/${id}/suspend`,
    ACTIVATE_USER: (id: string) => `/admin/users/${id}/activate`,
    DASHBOARD: "/admin/dashboard",
    STATS: "/admin/stats",
    LOGS: "/admin/logs",
    AUDIT: "/admin/audit",
  },
} as const;

/**
 * Type helper to extract endpoint types
 */
export type EndpointFunction = (...args: any[]) => string;
export type Endpoint = string | EndpointFunction;

/**
 * Helper function to build query string from params object
 * @param params - Object with query parameters
 * @returns Query string (e.g., "?key1=value1&key2=value2")
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Helper function to build URL with query parameters
 * @param endpoint - Base endpoint URL
 * @param params - Query parameters object
 * @returns Complete URL with query string
 */
export function buildUrl(
  endpoint: string,
  params?: Record<string, any>
): string {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }
  return `${endpoint}${buildQueryString(params)}`;
}
