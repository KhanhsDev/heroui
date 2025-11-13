import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * UI Store Types
 */
export type ThemeMode = "light" | "dark" | "system";
export type SidebarState = "expanded" | "collapsed" | "hidden";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export interface Modal {
  id: string;
  component: string;
  props?: Record<string, any>;
  onClose?: () => void;
}

export interface UIState {
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Sidebar
  sidebarState: SidebarState;
  setSidebarState: (state: SidebarState) => void;
  toggleSidebar: () => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Modals
  modals: Modal[];
  openModal: (modal: Omit<Modal, "id">) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  // Layout preferences
  isCompactMode: boolean;
  setCompactMode: (isCompact: boolean) => void;

  // Notifications panel
  isNotificationsPanelOpen: boolean;
  setNotificationsPanelOpen: (isOpen: boolean) => void;
  toggleNotificationsPanel: () => void;
}

/**
 * UI Store
 *
 * Manages application UI state including:
 * - Theme preferences
 * - Sidebar state
 * - Mobile menu
 * - Toast notifications
 * - Modal dialogs
 * - Loading states
 * - Layout preferences
 *
 * Features:
 * - Persistent storage for user preferences
 * - Automatic rehydration
 * - Type-safe state management
 *
 * Usage:
 * ```typescript
 * const { theme, setTheme, addToast, openModal } = useUIStore();
 *
 * // Change theme
 * setTheme('dark');
 *
 * // Show toast
 * addToast({ type: 'success', title: 'Success!', message: 'Operation completed' });
 *
 * // Open modal
 * openModal({ component: 'ConfirmDialog', props: { title: 'Confirm' } });
 * ```
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "dark",
      setTheme: (theme: ThemeMode) => set({ theme }),

      // Sidebar
      sidebarState: "expanded",
      setSidebarState: (sidebarState: SidebarState) => set({ sidebarState }),
      toggleSidebar: () => {
        const current = get().sidebarState;
        const newState: SidebarState =
          current === "expanded" ? "collapsed" : "expanded";
        set({ sidebarState: newState });
      },

      // Mobile menu
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isMobileMenuOpen: boolean) =>
        set({ isMobileMenuOpen }),
      toggleMobileMenu: () =>
        set({ isMobileMenuOpen: !get().isMobileMenuOpen }),

      // Loading
      globalLoading: false,
      setGlobalLoading: (globalLoading: boolean) => set({ globalLoading }),

      // Toasts
      toasts: [],
      addToast: (toast: Omit<Toast, "id">) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = { id, ...toast };

        set({ toasts: [...get().toasts, newToast] });

        // Auto-remove toast after duration (default 5 seconds)
        const duration = toast.duration || 5000;
        setTimeout(() => {
          get().removeToast(id);
        }, duration);
      },
      removeToast: (id: string) => {
        set({ toasts: get().toasts.filter((toast) => toast.id !== id) });
      },
      clearToasts: () => set({ toasts: [] }),

      // Modals
      modals: [],
      openModal: (modal: Omit<Modal, "id">) => {
        const id = `modal-${Date.now()}-${Math.random()}`;
        const newModal: Modal = { id, ...modal };
        set({ modals: [...get().modals, newModal] });
      },
      closeModal: (id: string) => {
        const modal = get().modals.find((m) => m.id === id);
        if (modal?.onClose) {
          modal.onClose();
        }
        set({ modals: get().modals.filter((m) => m.id !== id) });
      },
      closeAllModals: () => {
        get().modals.forEach((modal) => {
          if (modal.onClose) {
            modal.onClose();
          }
        });
        set({ modals: [] });
      },

      // Layout preferences
      isCompactMode: false,
      setCompactMode: (isCompactMode: boolean) => set({ isCompactMode }),

      // Notifications panel
      isNotificationsPanelOpen: false,
      setNotificationsPanelOpen: (isNotificationsPanelOpen: boolean) =>
        set({ isNotificationsPanelOpen }),
      toggleNotificationsPanel: () =>
        set({ isNotificationsPanelOpen: !get().isNotificationsPanelOpen }),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        theme: state.theme,
        sidebarState: state.sidebarState,
        isCompactMode: state.isCompactMode,
      }),
    }
  )
);

/**
 * Selectors for optimized re-renders
 */
export const selectTheme = (state: UIState) => state.theme;
export const selectSidebarState = (state: UIState) => state.sidebarState;
export const selectToasts = (state: UIState) => state.toasts;
export const selectModals = (state: UIState) => state.modals;
export const selectGlobalLoading = (state: UIState) => state.globalLoading;
