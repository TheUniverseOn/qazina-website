"use client";

import { NavBar, Footer } from "@/components";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-4 px-[120px] py-[80px] pb-[40px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <h1 className="text-[48px] font-semibold text-[var(--text-primary)] text-center">
          Get in touch
        </h1>
        <p className="text-[18px] text-[var(--text-secondary)] text-center">
          Have a question? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Content Section */}
      <section className="flex gap-16 px-[120px] py-[40px] pb-[80px] w-full">
        {/* Form Container */}
        <div className="flex flex-col gap-6 p-10 flex-1 bg-white rounded-[24px] border border-[var(--border-default)]">
          <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">
            Send us a message
          </h2>

          {/* Name Row */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[14px] font-medium text-[var(--text-primary)]">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[14px] font-medium text-[var(--text-primary)]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-medium text-[var(--text-primary)]">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
            />
          </div>

          {/* Company Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-medium text-[var(--text-primary)]">
              Company
            </label>
            <input
              type="text"
              placeholder="Your Company Name"
              className="h-12 px-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)]"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-medium text-[var(--text-primary)]">
              Message
            </label>
            <textarea
              placeholder="How can we help you?"
              rows={5}
              className="p-4 border border-[var(--border-default)] rounded-[8px] text-[14px] outline-none focus:border-[var(--lime)] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--lime)] rounded-[12px] text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors">
            Send Message
            <Send className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Info Container */}
        <div className="flex flex-col gap-8 w-[400px]">
          {/* Email Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Mail className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Email</h3>
            <a href="mailto:hello@theqazina.com" className="text-[16px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              hello@theqazina.com
            </a>
          </div>

          {/* Phone Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Phone className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Phone</h3>
            <a href="tel:+251111234567" className="text-[16px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              +251 11 123 4567
            </a>
          </div>

          {/* Address Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <MapPin className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Address</h3>
            <span className="text-[16px] text-[var(--text-secondary)]">
              Addis Ababa, Ethiopia
            </span>
          </div>

          {/* Social Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Follow us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
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
