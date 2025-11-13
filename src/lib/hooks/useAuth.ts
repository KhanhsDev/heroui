import useSWR from "swr";
import { useAuthStore, User } from "@/lib/stores/authStore";
import axiosClient from "@/lib/api/axiosClient";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Authentication Hook Response Types
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

/**
 * useAuth Hook
 *
 * Comprehensive authentication hook that provides:
 * - User authentication status
 * - Login/logout/register functions
 * - Auto-refresh user data
 * - Token management
 *
 * Features:
 * - Integrates with Zustand auth store
 * - Uses SWR for user data fetching
 * - Automatic revalidation
 * - Error handling
 *
 * Usage:
 * ```typescript
 * const { user, isAuthenticated, login, logout, isLoading } = useAuth();
 *
 * // Login
 * await login({ email: 'user@example.com', password: 'password' });
 *
 * // Logout
 * logout();
 *
 * // Check authentication
 * if (isAuthenticated) {
 *   // Show protected content
 * }
 * ```
 */
export function useAuth() {
  const {
    token,
    user,
    isAuthenticated,
    login: storeLogin,
    logout: storeLogout,
    setUser,
    setLoading,
  } = useAuthStore();

  /**
   * Fetch current user data
   * Only runs if user is authenticated
   */
  const {
    data: userData,
    error: userError,
    mutate: mutateUser,
    isValidating,
  } = useSWR<User>(
    // Only fetch if token exists
    token ? API_ENDPOINTS.AUTH.ME : null,
    (url: string) => axiosClient.get<User>(url),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      onSuccess: (data) => {
        // Update store with fresh user data
        setUser(data);
      },
      onError: (error) => {
        console.error("Failed to fetch user data:", error);
        // If fetching user fails with 401, logout
        if (error.response?.status === 401) {
          storeLogout();
        }
      },
    }
  );

  /**
   * Login function
   * Authenticates user and stores token/user data
   */
  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setLoading(true);

      const response = await axiosClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const { token, refreshToken, user } = response;

      // Store auth data in Zustand store
      storeLogin(token, user, refreshToken);

      // Revalidate user data
      await mutateUser(user);

      return user;
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register function
   * Creates new user account
   */
  const register = async (credentials: RegisterCredentials): Promise<User> => {
    try {
      setLoading(true);

      const response = await axiosClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );

      const { token, refreshToken, user } = response;

      // Store auth data in Zustand store
      storeLogin(token, user, refreshToken);

      // Revalidate user data
      await mutateUser(user);

      return user;
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   * Clears authentication state and optionally calls logout API
   */
  const logout = async (callApi: boolean = true): Promise<void> => {
    try {
      if (callApi && token) {
        // Call logout API (optional - for token invalidation)
        await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local state
      storeLogout();
      // Clear SWR cache
      mutateUser(undefined, false);
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async (): Promise<void> => {
    await mutateUser();
  };

  return {
    // State
    user: userData || user,
    token,
    isAuthenticated,
    isLoading: isValidating,
    error: userError,

    // Actions
    login,
    register,
    logout,
    refreshUser,
    mutateUser,
  };
}
