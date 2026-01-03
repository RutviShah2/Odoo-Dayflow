import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types/hrms';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface SignupData {
  employeeId: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('dayflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { success: false, error: 'No account found with this email address' };
    }
    
    // In a real app, verify password here
    if (password.length < 6) {
      return { success: false, error: 'Invalid credentials. Please try again.' };
    }
    
    setUser(foundUser);
    localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
    return { success: true };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const existingUser = mockUsers.find(
      u => u.email.toLowerCase() === data.email.toLowerCase() || u.employeeId === data.employeeId
    );
    
    if (existingUser) {
      return { success: false, error: 'An account with this email or Employee ID already exists' };
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      employeeId: data.employeeId,
      email: data.email,
      name: data.name,
      role: data.role,
      department: 'To be assigned',
      designation: 'To be assigned',
      phone: '',
      address: '',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: {
        basic: 0,
        hra: 0,
        allowances: 0,
        deductions: 0,
        netSalary: 0,
      },
    };
    
    setUser(newUser);
    localStorage.setItem('dayflow_user', JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('dayflow_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
