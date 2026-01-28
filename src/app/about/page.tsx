import { NavBar, Footer, Button, FeatureCard, LogoPlaceholder } from "@/components";
import { Eye, ShieldCheck, Sparkles, Heart, Wallet, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-6 px-[120px] py-[100px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <h1 className="text-[48px] font-semibold text-[var(--text-primary)] text-center leading-[1.15] max-w-[800px]">
          Making financial services work for Ethiopian businesses
        </h1>
        <p className="text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We&apos;re building the marketplace that connects businesses with the financial products they need to grow.
        </p>
      </section>

      {/* Story Section */}
      <section className="flex flex-col items-center gap-8 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Story
        </h2>
        <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] text-center max-w-[800px]">
          Qazina was founded with a simple observation: Ethiopian businesses spend too much time searching for financing and insurance. They fill out dozens of applications, visit multiple offices, and often settle for suboptimal terms because comparing options is so difficult.
        </p>
        <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] text-center max-w-[800px]">
          We built Qazina to change that. Our platform lets businesses apply once and receive offers from multiple financial institutions. Whether you need a loan to expand your operations or insurance to protect your assets, Qazina makes it simple to compare and choose the best option.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What We Do
        </h2>
        <div className="flex gap-8">
          {/* Loan Card */}
          <div className="flex flex-col gap-4 p-8 bg-white rounded-[20px] border border-[var(--border-light)] w-[400px]">
            <div className="flex items-center justify-center w-14 h-14 bg-[var(--bg-lime-tint)] rounded-[14px]">
              <Wallet className="w-7 h-7 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[20px] font-semibold text-[var(--text-primary)]">Business Loans</h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              We connect businesses with 52+ microfinance institutions. Apply once, get multiple offers, choose the best terms.
            </p>
          </div>

          {/* Insurance Card */}
          <div className="flex flex-col gap-4 p-8 bg-white rounded-[20px] border border-[var(--border-light)] w-[400px]">
            <div className="flex items-center justify-center w-14 h-14 bg-[var(--bg-lime-tint)] rounded-[14px]">
              <Shield className="w-7 h-7 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[20px] font-semibold text-[var(--text-primary)]">Business Insurance</h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Get quotes from top Ethiopian insurers for motor, property, liability, and more. Compare coverage, buy online, manage policies.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Values
        </h2>
        <div className="flex gap-6">
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
      <section className="flex flex-col items-center gap-6 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Built in Addis Ababa
        </h2>
        <p className="text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          Our team combines deep expertise in fintech, insurance, and lending with a passion for serving Ethiopian businesses.
        </p>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center gap-8 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our Partners
        </h2>
        <div className="flex items-center gap-8">
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="flex flex-col items-center gap-6 px-[120px] py-[80px] bg-[var(--bg-lime-tint)] w-full">
        <h2 className="text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Have questions? Talk to us
        </h2>
        <p className="text-[18px] text-[var(--text-secondary)] text-center">
          We&apos;d love to hear from you. Reach out to learn more about Qazina.
        </p>
        <Button href="/contact">Contact Us</Button>
      </section>

      <Footer />
    </div>
  );
}
