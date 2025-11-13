/**
 * Hooks Module Exports
 *
 * Centralized exports for custom React hooks
 */

// Authentication Hook
export { useAuth } from "./useAuth";
export type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "./useAuth";

// API Hooks
export {
  useApi,
  useUsers,
  useUser,
  useMarketSymbols,
  useMarketQuote,
  useTradingPositions,
  useTradingOrders,
  useNotifications,
  useApiMutation,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useCreateOrder,
  useCancelOrder,
} from "./useApi";
export type { UseApiResponse } from "./useApi";
