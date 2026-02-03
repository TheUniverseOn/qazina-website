"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send reset email here
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Dark */}
      <div className="w-[480px] bg-[#1A1A1A] p-12 flex flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E5F550] rounded-md flex items-center justify-center">
            <span className="text-[#1A1A1A] font-bold">Q</span>
          </div>
          <span className="text-white text-xl font-semibold">Qazina</span>
          <span className="px-2 py-1 bg-[#333333] rounded text-xs text-[#999999]">BROKER</span>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-white text-[32px] font-semibold leading-[1.2]">
            Reset your<br />password
          </h1>
          <p className="text-[#999999] text-base leading-relaxed max-w-[384px]">
            No worries! Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          <div className="space-y-4">
            {[
              "Secure password reset",
              "Link expires in 24 hours",
              "Support available 24/7",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#E5F550]" />
                <span className="text-[#CCCCCC] text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-[#666666] text-xs">© 2026 Qazina. All rights reserved.</p>
      </div>

      {/* Right Panel - Light */}
      <div className="flex-1 bg-white flex items-center justify-center py-16 px-20">
        <div className="w-[400px] space-y-8">
          {/* Back Link */}
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#1A1A1A]">
            <ArrowLeft size={16} />
            Back to login
          </Link>

          {!submitted ? (
            <>
              {/* Form Header */}
              <div className="space-y-2">
                <h2 className="text-[#1A1A1A] text-2xl font-semibold">Forgot password?</h2>
                <p className="text-[#666666] text-sm">Enter your email and we&apos;ll send you a reset link</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm text-[#1A1A1A]">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#E5F550] hover:bg-[#D4E440] text-[#1A1A1A] font-medium rounded-lg transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-[#E5F550] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-[#1A1A1A]" />
                </div>
                <h2 className="text-[#1A1A1A] text-2xl font-semibold">Check your email</h2>
                <p className="text-[#666666] text-sm">
                  We&apos;ve sent a password reset link to<br />
                  <span className="text-[#1A1A1A] font-medium">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full h-11 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] font-medium hover:bg-[#FAFAFA] transition-colors"
                >
                  Resend Email
                </button>
                <p className="text-center text-sm text-[#666666]">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#1A1A1A] font-medium hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#666666]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1A1A1A] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
