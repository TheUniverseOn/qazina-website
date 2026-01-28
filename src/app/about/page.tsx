import { NavBar, Footer, Button, FeatureCard } from "@/components";
import { Eye, ShieldCheck, Sparkles, Heart, Wallet, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[100px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-[var(--text-primary)] text-center leading-[1.15] max-w-[800px]">
          Making financial services work for Ethiopian businesses
        </h1>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We&apos;re building the marketplace that connects businesses with the financial products they need to grow.
        </p>
      </section>

      {/* Story Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Story
        </h2>
        <p className="text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.8] text-center max-w-[800px]">
          Qazina was founded with a simple observation: Ethiopian businesses spend too much time searching for financing and insurance. They fill out dozens of applications, visit multiple offices, and often settle for suboptimal terms because comparing options is so difficult.
        </p>
        <p className="text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.8] text-center max-w-[800px]">
          We built Qazina to change that. Our platform lets businesses apply once and receive offers from multiple financial institutions. Whether you need a loan to expand your operations or insurance to protect your assets, Qazina makes it simple to compare and choose the best option.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What We Do
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-[900px]">
          {/* Loan Card */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-[16px] md:rounded-[20px] border border-[var(--border-light)] flex-1">
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[var(--bg-lime-tint)] rounded-[12px] md:rounded-[14px]">
              <Wallet className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">Business Loans</h3>
            <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              We connect businesses with 52+ microfinance institutions. Apply once, get multiple offers, choose the best terms.
            </p>
          </div>

          {/* Insurance Card */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-[16px] md:rounded-[20px] border border-[var(--border-light)] flex-1">
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[var(--bg-lime-tint)] rounded-[12px] md:rounded-[14px]">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">Business Insurance</h3>
            <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Get quotes from top Ethiopian insurers for motor, property, liability, and more. Compare coverage, buy online, manage policies.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-6">
          <FeatureCard
            icon={Eye}
            title="Transparency"
            description="Clear terms, no hidden fees. You see exactly what you're getting."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Trust"
            description="We only work with licensed, reputable financial institutions."
          />
          <FeatureCard
            icon={Sparkles}
            title="Simplicity"
            description="We make complex financial decisions easy to understand."
          />
          <FeatureCard
            icon={Heart}
            title="Customer First"
            description="Your success is our success. We're here to help you grow."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Built in Addis Ababa
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          Our team combines deep expertise in fintech, insurance, and lending with a passion for serving Ethiopian businesses.
        </p>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Network
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We work with licensed financial institutions across Ethiopia to bring you the best options.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 pt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">52+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">MFI Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">12+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Insurance Partners</span>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-lime-tint)] w-full">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Have questions? Talk to us
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center">
          We&apos;d love to hear from you. Reach out to learn more about Qazina.
        </p>
        <Button href="/contact">Contact Us</Button>
      </section>

      <Footer />
    </div>
  );
}
