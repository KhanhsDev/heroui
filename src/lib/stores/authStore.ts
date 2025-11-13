import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Authentication Store Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin" | "trader";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  // State
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setToken: (token: string, refreshToken?: string) => void;
  setUser: (user: User | null) => void;
  login: (token: string, user: User, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
}

/**
 * Authentication Store
 *
 * Manages authentication state including:
 * - JWT tokens (access & refresh)
 * - User information
 * - Authentication status
 * - Login/logout actions
 *
 * Features:
 * - Persistent storage (localStorage)
 * - Automatic rehydration on page load
 * - Type-safe state management
 *
 * Usage:
 * ```typescript
 * const { token, user, login, logout } = useAuthStore();
 *
 * // Login
 * login('jwt-token', userData, 'refresh-token');
 *
 * // Logout
 * logout();
 *
 * // Access user data
 * console.log(user?.email);
 * ```
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      /**
       * Set authentication token
       */
      setToken: (token: string, refreshToken?: string) => {
        set({
          token,
          refreshToken: refreshToken || get().refreshToken,
          isAuthenticated: !!token,
        });

        // Store token separately for axios interceptor
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", token);
        }
      },

      /**
       * Set user information
       */
      setUser: (user: User | null) => {
        set({ user });
      },

      /**
       * Login user (set token and user data)
       */
      login: (token: string, user: User, refreshToken?: string) => {
        set({
          token,
          refreshToken,
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Store token separately for axios interceptor
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", token);
        }
      },

      /**
       * Logout user (clear all auth data)
       */
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
        }
      },

      /**
       * Update user information partially
       */
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      /**
       * Set loading state
       */
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Selectors for optimized re-renders
 * Use these to subscribe to specific parts of the store
 */
export const selectToken = (state: AuthState) => state.token;
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
