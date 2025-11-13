import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import axiosClient from "@/lib/api/axiosClient";
import { API_ENDPOINTS, buildUrl } from "@/lib/api/endpoints";

/**
 * Generic API Hook Response
 */
export interface UseApiResponse<T>
  extends Omit<SWRResponse<T, any>, "data" | "isLoading"> {
  data: T | undefined;
  isLoading: boolean;
}

/**
 * useApi Hook
 *
 * Generic SWR hook for GET requests with automatic data fetching,
 * caching, and revalidation.
 *
 * Features:
 * - Automatic data fetching
 * - Built-in caching
 * - Revalidation on focus/reconnect
 * - Loading and error states
 * - Type-safe responses
 *
 * Usage:
 * ```typescript
 * const { data, isLoading, error, mutate } = useApi<User[]>('/users');
 *
 * // With query params
 * const { data } = useApi<User[]>('/users', { page: 1, limit: 10 });
 * ```
 */
export function useApi<T = any>(
  endpoint: string | null,
  params?: Record<string, any>,
  config?: SWRConfiguration<T>
): UseApiResponse<T> {
  const url = endpoint && params ? buildUrl(endpoint, params) : endpoint;

  const {
    data,
    error,
    mutate,
    isValidating,
    isLoading: swrIsLoading,
    ...rest
  } = useSWR<T>(url, (url: string) => axiosClient.get<T>(url), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    ...config,
  });

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !error && !data && isValidating,
    ...rest,
  };
}

/**
 * useUsers Hook
 *
 * Fetch list of users with optional filtering and pagination
 */
export function useUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const { data, error, mutate, isLoading } = useApi<any[]>(
    API_ENDPOINTS.USERS.LIST,
    params
  );

  return {
    users: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useUser Hook
 *
 * Fetch single user by ID
 */
export function useUser(userId: string | null) {
  const { data, error, mutate, isLoading } = useApi<any>(
    userId ? API_ENDPOINTS.USERS.DETAIL(userId) : null
  );

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useMarketSymbols Hook
 *
 * Fetch available market symbols
 */
export function useMarketSymbols() {
  const { data, error, mutate, isLoading } = useApi<any[]>(
    API_ENDPOINTS.MARKET.SYMBOLS
  );

  return {
    symbols: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useMarketQuote Hook
 *
 * Fetch real-time quote for a symbol
 */
export function useMarketQuote(
  symbol: string | null,
  refreshInterval?: number
) {
  const { data, error, mutate, isLoading } = useApi<any>(
    symbol ? API_ENDPOINTS.MARKET.QUOTE(symbol) : null,
    undefined,
    {
      refreshInterval: refreshInterval || 5000, // Auto-refresh every 5 seconds
    }
  );

  return {
    quote: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useTradingPositions Hook
 *
 * Fetch user's trading positions
 */
export function useTradingPositions() {
  const { data, error, mutate, isLoading } = useApi<any[]>(
    API_ENDPOINTS.TRADING.POSITIONS
  );

  return {
    positions: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useTradingOrders Hook
 *
 * Fetch user's trading orders
 */
export function useTradingOrders(params?: { status?: string; limit?: number }) {
  const { data, error, mutate, isLoading } = useApi<any[]>(
    API_ENDPOINTS.TRADING.ORDERS,
    params
  );

  return {
    orders: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useNotifications Hook
 *
 * Fetch user notifications with unread count
 */
export function useNotifications() {
  const { data, error, mutate, isLoading } = useApi<any[]>(
    API_ENDPOINTS.NOTIFICATIONS.LIST
  );

  return {
    notifications: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * useApiMutation Hook
 *
 * Generic hook for POST/PUT/PATCH/DELETE requests with SWR mutation
 *
 * Features:
 * - Optimistic updates
 * - Automatic cache revalidation
 * - Loading and error states
 * - Type-safe mutations
 *
 * Usage:
 * ```typescript
 * const { trigger, isMutating } = useApiMutation<User>(
 *   '/users',
 *   'POST'
 * );
 *
 * // Execute mutation
 * const newUser = await trigger({ name: 'John', email: 'john@example.com' });
 * ```
 */
export function useApiMutation<T = any, A = any>(
  endpoint: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  config?: SWRMutationConfiguration<T, any, string, A>
) {
  const fetcher = async (url: string, { arg }: { arg: A }) => {
    switch (method) {
      case "POST":
        return axiosClient.post<T>(url, arg);
      case "PUT":
        return axiosClient.put<T>(url, arg);
      case "PATCH":
        return axiosClient.patch<T>(url, arg);
      case "DELETE":
        return axiosClient.delete<T>(url);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };

  const { trigger, isMutating, error, data } = useSWRMutation<
    T,
    any,
    string,
    A
  >(endpoint, fetcher, config);

  return {
    trigger,
    isMutating,
    error,
    data,
  };
}

/**
 * useCreateUser Hook
 *
 * Create new user mutation
 */
export function useCreateUser() {
  return useApiMutation<any>(API_ENDPOINTS.USERS.CREATE, "POST");
}

/**
 * useUpdateUser Hook
 *
 * Update user mutation
 */
export function useUpdateUser(userId: string) {
  return useApiMutation<any>(API_ENDPOINTS.USERS.UPDATE(userId), "PUT");
}

/**
 * useDeleteUser Hook
 *
 * Delete user mutation
 */
export function useDeleteUser(userId: string) {
  return useApiMutation<void>(API_ENDPOINTS.USERS.DELETE(userId), "DELETE");
}

/**
 * useCreateOrder Hook
 *
 * Create trading order mutation
 */
export function useCreateOrder() {
  return useApiMutation<any>(API_ENDPOINTS.TRADING.CREATE_ORDER, "POST");
}

/**
 * useCancelOrder Hook
 *
 * Cancel trading order mutation
 */
export function useCancelOrder(orderId: string) {
  return useApiMutation<void>(
    API_ENDPOINTS.TRADING.CANCEL_ORDER(orderId),
    "POST"
  );
}
