
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'yetkili' | 'personel';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage when component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // For demonstration purposes, we're using mock data
      // In a real app, this would be an API call
      if (username === 'admin' && password === 'admin') {
        const userData: User = {
          id: '1',
          username: 'admin',
          fullName: 'Admin User',
          role: 'yetkili',
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else if (username === 'personel' && password === 'personel') {
        const userData: User = {
          id: '2',
          username: 'personel',
          fullName: 'Personel User',
          role: 'personel',
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Kullanıcı adı veya şifre hatalı');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
