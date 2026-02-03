"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, register here
    router.push("/broker");
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
            Join Ethiopia&apos;s leading<br />insurance platform
          </h1>
          <p className="text-[#999999] text-base leading-relaxed max-w-[384px]">
            Create your broker account and start managing policies, claims, and clients efficiently.
          </p>
          <div className="space-y-4">
            {[
              "Manage unlimited policies",
              "Process claims efficiently",
              "Insurer partnerships",
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
        <div className="w-[400px] space-y-6">
          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">Create your account</h2>
            <p className="text-[#666666] text-sm">Start your 14-day free trial</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-[#1A1A1A]">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-[#1A1A1A]">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#1A1A1A]">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#1A1A1A]">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your insurance brokerage name"
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#1A1A1A]">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+251 9XX XXX XXXX"
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#1A1A1A]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password"
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:border-[#E5F550] focus:ring-1 focus:ring-[#E5F550]"
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 border border-[#E5E5E5] rounded accent-[#E5F550]"
                required
              />
              <label htmlFor="agreeTerms" className="text-sm text-[#666666]">
                I agree to the{" "}
                <Link href="/terms" className="text-[#1A1A1A] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#1A1A1A] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#E5F550] hover:bg-[#D4E440] text-[#1A1A1A] font-medium rounded-lg transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-sm text-[#999999]">Or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          {/* Google Button */}
          <button className="w-full h-11 border border-[#E5E5E5] rounded-lg flex items-center justify-center gap-2 hover:bg-[#FAFAFA] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3-4.5 3-7.3z" fill="#4285F4"/>
              <path d="M10 20c2.9 0 5.3-1 7.1-2.5l-3.4-2.6c-1 .7-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H.5v2.6C2.2 17.8 5.8 20 10 20z" fill="#34A853"/>
              <path d="M3.9 11.9c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V5H.5C-.2 6.5-.5 8.2-.5 10s.3 3.5 1 5l3.4-3.1z" fill="#FBBC05"/>
              <path d="M10 4c1.6 0 3 .5 4.1 1.6l3.1-3.1C15.3.9 12.9 0 10 0 5.8 0 2.2 2.2.5 5.6l3.4 2.6c.9-2.6 3.3-4.2 6.1-4.2z" fill="#EA4335"/>
            </svg>
            <span className="text-[#1A1A1A] font-medium">Continue with Google</span>
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#666666]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1A1A1A] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
