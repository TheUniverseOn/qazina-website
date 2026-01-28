import { NavBar, Footer, Button, ProductCard, FeatureCard, StepCard, LogoPlaceholder } from "@/components";
import { Wallet, Shield, Zap, PiggyBank, FileText, Handshake, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-8 px-[120px] py-[80px] pb-[100px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <div className="flex flex-col items-center gap-6 w-[900px]">
          <h1 className="text-[56px] font-semibold text-[var(--text-primary)] text-center leading-[1.1]">
            Compare business loan offers and insurance quotes — in one place.
          </h1>
          <p className="text-[18px] text-[var(--text-secondary)] text-center leading-[1.6]">
            Apply once. Get offers from partners. Choose the best deal.
          </p>
          <div className="flex items-center gap-4">
            <Button href="/loans">Get Loan Offers</Button>
            <Button href="/insurance" variant="secondary">Get Insurance Quotes</Button>
          </div>
          <Button href="/contact" variant="ghost">or Talk to us</Button>
        </div>
      </section>

      {/* Product Cards Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What are you looking for?
        </h2>
        <div className="flex gap-6">
          <ProductCard
            icon={Wallet}
            category="Business Loans"
            title="Compare Loan Offers"
            description="Apply once to multiple lenders. Compare offers. Accept the best terms."
            bullets={["One application", "Multiple offers", "You choose"]}
            ctaText="Compare Loan Offers"
            ctaHref="/loans"
          />
          <ProductCard
            icon={Shield}
            category="Business Insurance"
            title="Get Insurance Quotes"
            description="Answer a few questions, compare quotes from top insurers. Buy in minutes."
            bullets={["Multiple quotes", "Easy comparison", "Instant coverage"]}
            ctaText="Get Insurance Quotes"
            ctaHref="/insurance"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works
        </h2>

        {/* Tabs */}
        <div className="flex border border-[var(--border-default)] rounded-[12px]">
          <div className="flex items-center justify-center px-8 py-3 bg-[var(--lime)] rounded-[12px]">
            <span className="text-[14px] font-medium text-[var(--text-primary)]">Loans</span>
          </div>
          <div className="flex items-center justify-center px-8 py-3">
            <span className="text-[14px] font-medium text-[var(--text-primary)]">Insurance</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-8">
          <StepCard number="1" title="Apply Once" description="Fill out one simple form in 5 minutes." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="2" title="Get Offers" description="Lenders compete to fund you." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="3" title="Compare Terms" description="See all offers side by side." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="4" title="Accept & Fund" description="Choose the best offer. Get funded." />
        </div>

        <Button href="/loans">Get Loan Offers</Button>
      </section>

      {/* Why Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Why businesses choose Qazina
        </h2>
        <div className="flex gap-6">
          <FeatureCard icon={Zap} title="Faster Decisions" description="Get offers in hours, not weeks." />
          <FeatureCard icon={PiggyBank} title="Better Pricing" description="Competition means you get better rates." />
          <FeatureCard icon={FileText} title="Fewer Forms" description="One app for multiple offers." />
          <FeatureCard icon={Handshake} title="Trusted Partners" description="Vetted MFIs and top insurers." />
        </div>
      </section>

      {/* Trust Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-white w-full">
        <span className="text-[16px] font-medium text-[var(--text-tertiary)] text-center">
          Trusted by businesses across Ethiopia
        </span>
        <div className="flex items-center gap-8">
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
          <LogoPlaceholder />
        </div>
        <div className="w-[800px] h-[1px] bg-[var(--border-default)]" />
        <span className="text-[16px] font-medium text-[var(--text-tertiary)] text-center">
          Our lending and insurance partners
        </span>
        <div className="flex items-center gap-8">
          <LogoPlaceholder text="MFI 1" />
          <LogoPlaceholder text="MFI 2" />
          <LogoPlaceholder text="INSURER" />
          <LogoPlaceholder text="MFI 3" />
          <LogoPlaceholder text="INSURER" />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex w-full">
        {/* Left CTA */}
        <div className="flex flex-col gap-6 flex-1 px-[80px] py-16 bg-[var(--bg-lime-tint)]">
          <h3 className="text-[28px] font-semibold text-[var(--text-primary)]">
            Ready to get funded?
          </h3>
          <p className="text-[16px] text-[var(--text-secondary)] leading-[1.6] max-w-[400px]">
            Compare loan offers from multiple lenders in minutes.
          </p>
          <Button href="/loans">Get Loan Offers</Button>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col gap-6 flex-1 px-[80px] py-16 bg-white">
          <h3 className="text-[28px] font-semibold text-[var(--text-primary)]">
            Need business insurance?
          </h3>
          <p className="text-[16px] text-[var(--text-secondary)] leading-[1.6] max-w-[400px]">
            Get quotes from top insurers and buy coverage online.
          </p>
          <Button href="/insurance">Get Insurance Quotes</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
