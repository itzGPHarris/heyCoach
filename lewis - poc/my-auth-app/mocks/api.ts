/* eslint-disable @typescript-eslint/no-explicit-any */
// src/mocks/api.ts

// Define interfaces for the API responses
export interface UserCheckResponse {
    exists: boolean;
    userId?: string;
  }
  
  export interface UserRegistrationData {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  }
  
  export interface UserRegistrationResponse {
    success: boolean;
    userId?: string;
    error?: string;
  }
  
  /**
   * Simulates checking if a user exists in the system
   * @param email - The email address to check
   * @returns Promise resolving to a UserCheckResponse
   */
  export const checkUser = async (email: string): Promise<UserCheckResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Deterministic check based on email
    // In this mock implementation, any email containing 'existing' is considered an existing user
    const exists = email.includes('existing');
    
    return { 
      exists,
      ...(exists && { userId: `user-${Math.floor(Math.random() * 9000) + 1000}` })
    };
  };
  
  /**
   * Simulates registering a new user
   * @param userData - The user data for registration
   * @returns Promise resolving to a UserRegistrationResponse
   */
  export const registerUser = async (userData: UserRegistrationData): Promise<UserRegistrationResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate required fields
    if (!userData.email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }
    
    // Check for "forbidden" emails (for testing error states)
    if (userData.email.includes('error')) {
      return {
        success: false,
        error: 'Registration failed. Please try again later.'
      };
    }
    
    // Simulate successful registration
    return {
      success: true,
      userId: `user-${Math.floor(Math.random() * 9000) + 1000}`
    };
  };
  
  /**
   * Simulates syncing a user to Okta after Auth0 registration
   * @param userId - The Auth0 user ID to sync
   * @param userData - Additional user data
   * @returns Promise resolving to a success/failure response
   */
  export const syncUserToOkta = async (
    userId: string, 
    userData: { email: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate error for specific test cases
    if (userData.email.includes('sync-error')) {
      return {
        success: false,
        error: 'Failed to sync user to Okta'
      };
    }
    
    // Simulate successful sync
    return {
      success: true
    };
  };
  
  /**
   * Simulates fetching user profile data
   * @param userId - The user ID to fetch
   * @returns Promise resolving to user profile data
   */
  export const getUserProfile = async (userId: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock user data
    return {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        notifications: true,
        theme: 'light'
      }
    };
  };