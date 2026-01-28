"use client";

import { useState } from "react";
import { NavBar, Footer, Button, ProductCard, FeatureCard, StepCard } from "@/components";
import { Wallet, Shield, Zap, PiggyBank, FileText, Handshake, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"loans" | "insurance">("loans");

  const loanSteps = [
    { number: "1", title: "Apply Once", description: "Fill out one simple form in 5 minutes." },
    { number: "2", title: "Get Offers", description: "Lenders compete to fund you." },
    { number: "3", title: "Compare Terms", description: "See all offers side by side." },
    { number: "4", title: "Accept & Fund", description: "Choose the best offer. Get funded." },
  ];

  const insuranceSteps = [
    { number: "1", title: "Tell Us About Your Business", description: "Answer simple questions about your coverage needs." },
    { number: "2", title: "Get Quotes", description: "Multiple insurers compete to offer you quotes." },
    { number: "3", title: "Compare Coverage", description: "See coverage and pricing side by side." },
    { number: "4", title: "Buy & Manage", description: "Purchase online and manage policies." },
  ];

  const steps = activeTab === "loans" ? loanSteps : insuranceSteps;

  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] pb-16 md:pb-[100px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <div className="flex flex-col items-center gap-4 md:gap-6 max-w-[900px]">
          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-[var(--text-primary)] text-center leading-[1.15] md:leading-[1.1]">
            Compare business loan offers and insurance quotes — in one place.
          </h1>
          <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[500px]">
            Apply once. Get offers from partners. Choose the best deal.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <Button href="/loans" className="w-full sm:w-auto">Get Loan Offers</Button>
            <Button href="/insurance" variant="secondary" className="w-full sm:w-auto">Get Insurance Quotes</Button>
          </div>
          <Button href="/contact" variant="ghost">or Talk to us</Button>
        </div>
      </section>

      {/* Product Cards Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What are you looking for?
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
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
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works
        </h2>

        {/* Tabs */}
        <div className="flex border border-[var(--border-default)] rounded-[10px] md:rounded-[12px]">
          <button
            onClick={() => setActiveTab("loans")}
            className={`flex items-center justify-center px-5 md:px-8 py-2.5 md:py-3 rounded-[10px] md:rounded-[12px] transition-colors ${
              activeTab === "loans"
                ? "bg-[var(--lime)]"
                : "bg-transparent hover:bg-[var(--bg-cream)]"
            }`}
          >
            <span className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">Loans</span>
          </button>
          <button
            onClick={() => setActiveTab("insurance")}
            className={`flex items-center justify-center px-5 md:px-8 py-2.5 md:py-3 rounded-[10px] md:rounded-[12px] transition-colors ${
              activeTab === "insurance"
                ? "bg-[var(--lime)]"
                : "bg-transparent hover:bg-[var(--bg-cream)]"
            }`}
          >
            <span className="text-[13px] md:text-[14px] font-medium text-[var(--text-primary)]">Insurance</span>
          </button>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6 lg:gap-8 w-full md:w-auto">
          <StepCard number={steps[0].number} title={steps[0].title} description={steps[0].description} />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number={steps[1].number} title={steps[1].title} description={steps[1].description} />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number={steps[2].number} title={steps[2].title} description={steps[2].description} />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number={steps[3].number} title={steps[3].title} description={steps[3].description} />
        </div>

        <Button href={activeTab === "loans" ? "/loans" : "/insurance"}>
          {activeTab === "loans" ? "Get Loan Offers" : "Get Insurance Quotes"}
        </Button>
      </section>

      {/* Why Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Why businesses choose Qazina
        </h2>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 lg:gap-6">
          <FeatureCard icon={Zap} title="Faster Decisions" description="Get offers in hours, not weeks." />
          <FeatureCard icon={PiggyBank} title="Better Pricing" description="Competition means you get better rates." />
          <FeatureCard icon={FileText} title="Fewer Forms" description="One app for multiple offers." />
          <FeatureCard icon={Handshake} title="Trusted Partners" description="Vetted MFIs and top insurers." />
        </div>
      </section>

      {/* Trust Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Access to Ethiopia&apos;s financial network
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We connect you with 52+ microfinance institutions and multiple licensed insurers across Ethiopia — all through one simple application.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 pt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">52+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Lending Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">12+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Insurance Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">5K+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Businesses Served</span>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col md:flex-row w-full">
        {/* Left CTA */}
        <div className="flex flex-col gap-4 md:gap-6 flex-1 px-4 sm:px-8 lg:px-[80px] py-12 md:py-16 bg-[var(--bg-lime-tint)]">
          <h3 className="text-[22px] md:text-[28px] font-semibold text-[var(--text-primary)]">
            Ready to get funded?
          </h3>
          <p className="text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6] max-w-[400px]">
            Compare loan offers from multiple lenders in minutes.
          </p>
          <Button href="/loans" className="w-fit">Get Loan Offers</Button>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col gap-4 md:gap-6 flex-1 px-4 sm:px-8 lg:px-[80px] py-12 md:py-16 bg-white">
          <h3 className="text-[22px] md:text-[28px] font-semibold text-[var(--text-primary)]">
            Need business insurance?
          </h3>
          <p className="text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6] max-w-[400px]">
            Get quotes from top insurers and buy coverage online.
          </p>
          <Button href="/insurance" className="w-fit">Get Insurance Quotes</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
