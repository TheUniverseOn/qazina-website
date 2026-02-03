"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, authenticate here
    router.push("/broker");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Dark */}
      <div className="w-[600px] bg-[#1A1A1A] p-[60px] flex flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#E5F550] rounded-lg flex items-center justify-center">
            <span className="text-[#1A1A1A] font-bold text-lg">Q</span>
          </div>
          <span className="text-white text-2xl font-semibold">Qazina</span>
          <span className="px-2 py-1 bg-[#333333] rounded text-xs text-[#999999]">BROKER</span>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-white text-[32px] font-semibold leading-[1.3] max-w-[480px]">
            Streamline your insurance brokerage operations
          </h1>
          <p className="text-[#999999] text-base leading-relaxed max-w-[440px]">
            Manage proposals, policies, claims, and billing all in one place. Built for Ethiopian insurance brokers.
          </p>
          <div className="space-y-4">
            {[
              "Real-time policy tracking",
              "Automated certificate generation",
              "Multi-insurer management",
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
      <div className="flex-1 bg-white flex items-center justify-center p-[60px]">
        <div className="w-[400px] space-y-8">
          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">Welcome back</h2>
            <p className="text-[#666666] text-sm">Sign in to your Qazina Broker account</p>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-[#1A1A1A]">Password</label>
                <Link href="/forgot-password" className="text-sm text-[#666666] hover:text-[#1A1A1A]">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border border-[#E5E5E5] rounded accent-[#E5F550]"
              />
              <label htmlFor="remember" className="text-sm text-[#666666]">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#E5F550] hover:bg-[#D4E440] text-[#1A1A1A] font-medium rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-sm text-[#999999]">Or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          {/* Google Button */}
          <button className="w-full h-11 border border-[#E5E5E5] rounded-lg flex items-center justify-center gap-2.5 hover:bg-[#FAFAFA] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3-4.5 3-7.3z" fill="#4285F4"/>
              <path d="M10 20c2.9 0 5.3-1 7.1-2.5l-3.4-2.6c-1 .7-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H.5v2.6C2.2 17.8 5.8 20 10 20z" fill="#34A853"/>
              <path d="M3.9 11.9c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V5H.5C-.2 6.5-.5 8.2-.5 10s.3 3.5 1 5l3.4-3.1z" fill="#FBBC05"/>
              <path d="M10 4c1.6 0 3 .5 4.1 1.6l3.1-3.1C15.3.9 12.9 0 10 0 5.8 0 2.2 2.2.5 5.6l3.4 2.6c.9-2.6 3.3-4.2 6.1-4.2z" fill="#EA4335"/>
            </svg>
            <span className="text-[#1A1A1A] font-medium">Continue with Google</span>
          </button>

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
