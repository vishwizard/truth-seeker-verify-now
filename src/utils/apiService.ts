import { verifyText, VerificationResult } from './verificationService';

/**
 * Makes a POST request to the API
 * @param endpoint The API endpoint
 * @param data The data to send
 * @returns The response from the API
 */
export const postAPI = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    // Special case for verification endpoint
    if (endpoint === 'verify') {
      const result = await verifyText(data.text);
      return result as unknown as T;
    }

    console.log(`API call to ${endpoint} with:`, data);
    throw new Error('API not implemented yet');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Makes a GET request to the API
 * @param endpoint The API endpoint
 * @param params Optional query parameters
 * @returns The response from the API
 */
export const getAPI = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
  try {
    // Build query string
    const queryString = params 
      ? `?${Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')}`
      : '';

    console.log(`API call to ${endpoint}${queryString}`);
    throw new Error('API not implemented yet');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
