/* eslint-disable @typescript-eslint/no-explicit-any */
// src/mocks/auth0-context.tsx
import React, { useState, ReactNode, createContext, useContext } from 'react';

// Define types for Auth0 Context
export interface Auth0User {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  sub: string;
  [key: string]: any;
}

export interface Auth0ContextInterface {
  isAuthenticated: boolean;
  user: Auth0User | null;
  isLoading: boolean;
  error?: Error;
  loginWithRedirect: (options?: any) => Promise<void>;
  logout: (options?: any) => Promise<void>;
  getAccessTokenSilently: (options?: any) => Promise<string>;
  getAccessTokenWithPopup: (options?: any) => Promise<string>;
  getIdTokenClaims: () => Promise<any>;
  // Additional properties for mock control (not in real Auth0 context)
  setMockUser?: (user: Auth0User | null) => void;
  setMockIsAuthenticated?: (isAuthenticated: boolean) => void;
  setMockIsLoading?: (isLoading: boolean) => void;
}

export interface MockAuth0ProviderProps {
  children: ReactNode;
  user?: Auth0User | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

// Sample user data for testing
const sampleUser: Auth0User = {
  email: 'user@example.com',
  email_verified: true,
  name: 'John Doe',
  picture: 'https://via.placeholder.com/150',
  sub: 'auth0|123456789'
};

// Create mock Auth0 context
export const MockAuth0Context = createContext<Auth0ContextInterface | null>(null);

// Provider component to simulate Auth0Provider
export const MockAuth0Provider: React.FC<MockAuth0ProviderProps> = ({ 
  children, 
  user = null,
  isAuthenticated = false,
  isLoading = false 
}) => {
  const [mockUser, setMockUser] = useState<Auth0User | null>(user);
  const [mockIsAuthenticated, setMockIsAuthenticated] = useState<boolean>(isAuthenticated);
  const [mockIsLoading, setMockIsLoading] = useState<boolean>(isLoading);

  // Mock loginWithRedirect
  const loginWithRedirect = async (options: any = {}): Promise<void> => {
    console.log('loginWithRedirect called with options:', options);
    
    // Simulate successful login if requested
    if (options.simulateSuccessfulLogin) {
      setMockIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMockUser(options.mockUser || sampleUser);
      setMockIsAuthenticated(true);
      setMockIsLoading(false);
    }
    
    return Promise.resolve();
  };

  // Mock logout
  const logout = async (options: any = {}): Promise<void> => {
    console.log('logout called with options:', options);
    
    setMockIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMockUser(null);
    setMockIsAuthenticated(false);
    setMockIsLoading(false);
    
    return Promise.resolve();
  };

  // Create context value
  const contextValue: Auth0ContextInterface = {
    // Auth state
    isAuthenticated: mockIsAuthenticated,
    user: mockUser,
    isLoading: mockIsLoading,
    
    // Methods
    loginWithRedirect,
    logout,
    
    // Other methods
    getAccessTokenSilently: () => Promise.resolve('mock-access-token'),
    getAccessTokenWithPopup: () => Promise.resolve('mock-access-token'),
    getIdTokenClaims: () => Promise.resolve({
      __raw: 'mock-raw-id-token',
      exp: Math.floor(Date.now() / 1000) + 86400,
      ...mockUser
    }),
    
    // Helper methods for story control
    setMockUser,
    setMockIsAuthenticated,
    setMockIsLoading
  };

  return (
    <MockAuth0Context.Provider value={contextValue}>
      {children}
    </MockAuth0Context.Provider>
  );
};

// Custom hook to use mock Auth0 context
export const useMockAuth0 = (): Auth0ContextInterface => {
  const context = useContext(MockAuth0Context);
  if (!context) {
    throw new Error('useMockAuth0 must be used within a MockAuth0Provider');
  }
  return context;
};

// HOC for stories that need to override the real useAuth0 hook
export const withAuth0Mock = (Story: React.FC, contextProps: Partial<MockAuth0ProviderProps>) => {
  return (
    <MockAuth0Provider {...contextProps}>
      <Story />
    </MockAuth0Provider>
  );
};