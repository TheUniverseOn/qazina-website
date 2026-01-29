"use client";

import { NavBar, Footer } from "@/components";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-3 md:gap-4 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] pb-6 md:pb-[40px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-[var(--text-primary)] text-center">
          Get in touch
        </h1>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center">
          Have a question? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Content Section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 sm:px-8 lg:px-[120px] py-6 md:py-[40px] pb-12 md:pb-[80px] w-full">
        {/* Form Container */}
        <div className="flex flex-col gap-5 md:gap-6 p-6 md:p-10 flex-1 bg-white rounded-[16px] md:rounded-[24px] border border-[var(--border-default)]">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-[var(--text-primary)]">
            Send us a message
          </h2>

          {/* Name Row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John"
                required
                className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                required
                className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+251 91 234 5678"
              required
              className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
            />
          </div>

          {/* Inquiry Type Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
              I am contacting because <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)] bg-white"
            >
              <option value="">Select an option</option>
              <option value="buy-insurance">I would like to buy insurance</option>
              <option value="get-loan">I would like to get a loan</option>
              <option value="insurance-partner">I am an insurance partner</option>
              <option value="lending-partner">I am a lending partner</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Company Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Company Name"
              required
              className="h-11 md:h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="How can we help you?"
              rows={5}
              required
              className="p-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-[var(--lime)] rounded-[10px] md:rounded-[12px] text-[15px] md:text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors">
            Send Message
            <Send className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </button>
        </div>

        {/* Info Container */}
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[400px]">
          {/* Email Info */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Email</h3>
            <a href="mailto:hello@theqazina.com" className="text-[14px] md:text-[16px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              hello@theqazina.com
            </a>
          </div>

          {/* Phone Info */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Phone</h3>
            <a href="tel:+251111234567" className="text-[14px] md:text-[16px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              +251 11 123 4567
            </a>
          </div>

          {/* Address Info */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Address</h3>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">
              Addis Ababa, Ethiopia
            </span>
          </div>

          {/* Social Info */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Follow us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[13px] md:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-[13px] md:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-[13px] md:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
