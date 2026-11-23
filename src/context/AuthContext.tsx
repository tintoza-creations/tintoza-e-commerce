'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isOwner: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'profile';
  setAuthModalTab: (tab: 'login' | 'profile') => void;
  requestOtp: (phone: string) => Promise<{ success: boolean; hintOtp?: string; role?: string; error?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  userOrders: Order[];
  fetchUserOrders: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'profile'>('login');
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  // Load existing session only if validly authenticated via OTP (purges legacy/Eleanor sessions)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('tintoza_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Automatically purge any stale Eleanor Vance or unauthenticated demo sessions
        if (
          !parsed ||
          !parsed.phone ||
          parsed.name?.toLowerCase().includes('eleanor') ||
          parsed.email?.toLowerCase().includes('eleanor')
        ) {
          localStorage.removeItem('tintoza_user');
          setUser(null);
        } else {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading user session', e);
    }
  }, []);

  const requestOtp = async (phone: string) => {
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_otp', phone }),
      });
      const data = await res.json();
      if (data.success) {
        return { success: true, hintOtp: data.hintOtp, role: data.role };
      }
      return { success: false, error: data.error || 'Failed to send OTP' };
    } catch (err: any) {
      return { success: false, error: 'Network error sending OTP' };
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_otp', phone, otp }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('tintoza_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Invalid OTP' };
    } catch (err: any) {
      return { success: false, error: 'Network error verifying OTP' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tintoza_user');
    setAuthModalTab('login');
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/owner')) {
      window.location.href = '/';
    }
  };

  const fetchUserOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/orders?userId=${user.id}`);
      const data = await res.json();
      if (data.orders) {
        setUserOrders(data.orders);
      }
    } catch (e) {
      console.error('Error fetching orders', e);
    }
  };

  const isOwner = user?.role === 'owner';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isOwner,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        requestOtp,
        verifyOtp,
        logout,
        userOrders,
        fetchUserOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
