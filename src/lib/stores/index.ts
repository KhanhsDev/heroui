/**
 * Stores Module Exports
 *
 * Centralized exports for Zustand stores
 */

// Auth Store
export {
  useAuthStore,
  selectToken,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
} from "./authStore";
export type { User, AuthState } from "./authStore";

// UI Store
export {
  useUIStore,
  selectTheme,
  selectSidebarState,
  selectToasts,
  selectModals,
  selectGlobalLoading,
} from "./uiStore";
export type { UIState, ThemeMode, SidebarState, Toast, Modal } from "./uiStore";
