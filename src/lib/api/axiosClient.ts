import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Axios Client Configuration
 *
 * A centralized HTTP client with automatic JWT token handling,
 * error interceptors, and simplified request methods.
 *
 * Features:
 * - Automatic JWT token attachment from store
 * - 401 error handling (auto-logout)
 * - Base URL from environment variables
 * - Request/Response interceptors
 * - Type-safe helper methods
 */

// Get base URL from environment variable
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches JWT token to requests if available
 */
axiosInstance.interceptors.request.use(
  config => {
    // Get token from localStorage (compatible with Zustand persist)
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handles 401 errors and other common error scenarios
 */
axiosInstance.interceptors.response.use(
  response => {
    // Return response data directly for successful requests
    return response;
  },
  error => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear authentication state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-storage');

        // Redirect to login page
        window.location.href = '/login';
      }
    }

    // Handle other error status codes
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  },
);

/**
 * Axios Client Helper Methods
 * Simplified methods for making HTTP requests
 */
class AxiosClient {
  /**
   * GET request
   * @param url - Request URL
   * @param config - Optional axios config
   * @returns Promise with response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * POST request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional axios config
   * @returns Promise with response data
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * PUT request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional axios config
   * @returns Promise with response data
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * PATCH request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional axios config
   * @returns Promise with response data
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * DELETE request
   * @param url - Request URL
   * @param config - Optional axios config
   * @returns Promise with response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  }

  /**
   * Get the raw axios instance for advanced usage
   */
  get instance(): AxiosInstance {
    return axiosInstance;
  }
}

// Export singleton instance
const axiosClient = new AxiosClient();
export default axiosClient;

// Export axios instance for direct access if needed
export { axiosInstance };
