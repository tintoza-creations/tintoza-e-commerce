'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Phone, KeyRound, CheckCircle, ArrowRight, ShieldCheck, User as UserIcon, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/lib/utils';

export default function AuthModal() {
  const router = useRouter();
  const {
    user,
    isLoggedIn,
    isOwner,
    isAuthModalOpen,
    setIsAuthModalOpen,
    requestOtp,
    verifyOtp,
    logout,
    userOrders,
    fetchUserOrders,
  } = useAuth();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isAuthModalOpen && isLoggedIn) {
      fetchUserOrders();
    }
  }, [isAuthModalOpen, isLoggedIn]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '').slice(-10);
    if (!clean || clean.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await requestOtp(clean);
      if (res.success) {
        setStep('otp');
        setSuccessMsg(`Verification code sent to +91 ${clean}`);
      } else {
        setErrorMsg(res.error || 'Failed to send verification code');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit verification code');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await verifyOtp(phoneNumber, cleanOtp);
      if (res.success && res.user) {
        // Smart routing based on verified role
        if (res.user.role === 'owner') {
          setSuccessMsg('Atelier Director verified. Loading Owner Desk...');
          setTimeout(() => {
            setIsAuthModalOpen(false);
            resetForm();
            router.push('/owner');
          }, 800);
        } else {
          setSuccessMsg(`Welcome, ${res.user.name}!`);
          setTimeout(() => {
            setIsAuthModalOpen(false);
            resetForm();
          }, 1000);
        }
      } else {
        setErrorMsg(res.error || 'Invalid verification code');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtpCode('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#DEC49E] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#DEC49E] bg-[#F8F1E6] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              TINTOZA
            </span>
            <h3 className="font-serif text-lg font-bold text-[#4B2E1E]">
              {isLoggedIn ? (isOwner ? 'Owner Atelier Account' : 'Collector Account') : 'Sign In'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#4B2E1E] hover:bg-[#E6D5C1] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* VIEW A: LOGGED IN USER PROFILE */}
          {isLoggedIn && user ? (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-[#F8F1E6] border border-[#DEC49E] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6D5C1] text-[#4B2E1E] font-serif font-bold text-lg flex items-center justify-center border border-[#DEC49E]">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-[#4B2E1E]">{user.name}</h4>
                    {isOwner ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#4B2E1E] text-[#D4AF7A] text-[9.5px] font-bold uppercase tracking-wider">
                        ✦ Owner
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#E6D5C1] text-[#4B2E1E] text-[9.5px] font-semibold uppercase tracking-wider">
                        Collector
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8C6F54] mt-0.5">+91 {user.phone}</p>
                </div>
              </div>

              {/* Owner Action Shortcut (Only visible when verified as owner) */}
              {isOwner ? (
                <div className="p-4 rounded-2xl bg-[#E6D5C1]/50 border border-[#DEC49E] space-y-3">
                  <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
                    Access your studio desk to add artworks, manage client orders, review expenses, and monitor financial revenue.
                  </p>
                  <Link
                    href="/owner"
                    onClick={() => setIsAuthModalOpen(false)}
                    className="w-full py-3 px-4 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-luxury hover:bg-[#382216] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D4AF7A]" />
                    <span>Open Owner Studio Portal</span>
                  </Link>
                </div>
              ) : (
                /* Customer Orders */
                <div>
                  <h5 className="font-serif text-sm font-bold text-[#4B2E1E] mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C9A67A]" />
                    <span>My Artworks &amp; Orders</span>
                  </h5>

                  {userOrders.length === 0 ? (
                    <p className="text-xs text-[#8C6F54] py-4 text-center bg-[#F8F1E6] rounded-xl border border-[#DEC49E]/40">
                      No orders placed yet. Explore our handmade collections!
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {userOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 rounded-xl bg-[#F8F1E6] border border-[#DEC49E]/40 text-xs flex justify-between items-center"
                        >
                          <div>
                            <div className="font-bold text-[#4B2E1E]">{ord.orderNumber}</div>
                            <div className="text-[11px] text-[#8C6F54]">
                              {ord.items.length} artwork(s) • {formatINR(ord.total)}
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#E6D5C1] text-[10px] font-semibold uppercase text-[#4B2E1E]">
                            {ord.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full py-3 px-4 rounded-full border border-[#4B2E1E]/30 text-xs font-semibold text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* VIEW B: NORMAL CLEAN MOBILE + OTP SIGN IN */
            <div className="space-y-5">
              {step === 'phone' ? (
                /* Step 1: Mobile Number Input */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4B2E1E] mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-semibold text-[#8C6F54]">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-12 pr-4 py-3 bg-[#F8F1E6] border border-[#DEC49E] rounded-xl text-sm font-medium text-[#4B2E1E] placeholder:text-[#8C6F54]/50 focus:outline-none focus:border-[#4B2E1E] transition-colors"
                      />
                    </div>
                    <p className="text-[11px] text-[#8C6F54] mt-1.5">
                      We will send a 6-digit one-time verification code to this number.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length < 10}
                    className="w-full py-3.5 px-6 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#382216] transition-all disabled:opacity-50 shadow-md cursor-pointer"
                  >
                    <span>{loading ? 'Sending Code...' : 'Send Verification Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Step 2: 6-Digit OTP Verification */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-medium text-[#4B2E1E]">
                        6-Digit Verification Code
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone');
                          setErrorMsg('');
                        }}
                        className="text-[11px] text-[#C9A67A] hover:underline"
                      >
                        Change Number
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        autoFocus
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • • • •"
                        className="w-full py-3 px-4 text-center tracking-[0.5em] text-lg font-mono bg-[#F8F1E6] border border-[#DEC49E] rounded-xl text-[#4B2E1E] placeholder:text-[#8C6F54]/40 focus:outline-none focus:border-[#4B2E1E] transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#8C6F54] mt-1.5">
                      <span>Code sent to +91 {phoneNumber}</span>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="text-[#4B2E1E] font-medium hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3.5 px-6 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#382216] transition-all disabled:opacity-50 shadow-md cursor-pointer"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
