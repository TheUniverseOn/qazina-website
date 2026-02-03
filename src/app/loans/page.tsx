import { NavBar, Footer, Button, StepCard, FaqItem } from "@/components";
import { ArrowRight, Check, FileText, Building2, Coins } from "lucide-react";
import Image from "next/image";

export default function LoansPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[560px]">
          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-[var(--text-primary)] leading-[1.15]">
            Apply once. Compare offers from lenders.
          </h1>
          <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] leading-[1.6] max-w-[500px]">
            One application gets you offers from multiple microfinance institutions. Compare terms, choose the best, get funded.
          </p>
          <Button href="/contact" className="w-fit">Start Your Application</Button>
        </div>
        <div className="relative w-full lg:w-[500px] h-[240px] md:h-[360px] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-lg border border-[var(--border-default)]">
          <Image
            src="/dashboard-screenshot.png"
            alt="Qazina Loan Dashboard"
            fill
            className="object-cover object-left-top"
            priority
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works
        </h2>
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6 lg:gap-8 w-full md:w-auto">
          <StepCard number="1" title="Apply" description="Fill out one simple application in 5 minutes." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="2" title="Review" description="Lenders review your application and send offers within hours." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="3" title="Compare" description="See all offers side by side with clear terms." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="4" title="Accept" description="Accept the best terms and receive funding." />
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Is this right for you?
        </h2>
        <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-white rounded-[16px] md:rounded-[24px] border border-[var(--border-light)] w-full max-w-[700px]">
          <div className="flex flex-col gap-3 md:gap-4">
            {[
              "Your business is registered in Ethiopia",
              "You have been operating for at least 6 months",
              "You have a valid business license",
              "You can provide basic financial documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-[var(--success)] flex-shrink-0" />
                <span className="text-[14px] md:text-[16px] text-[var(--text-primary)]">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 md:gap-2 pt-4">
            <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">
              Loan amounts from ETB 50,000 to ETB 10,000,000
            </span>
            <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">
              Terms from 3 to 36 months
            </span>
          </div>
        </div>
        <Button href="/contact">Check My Eligibility</Button>
      </section>

      {/* Documents Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What you&apos;ll need to apply
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1120px]">
          {/* Doc Card 1 */}
          <div className="flex flex-col gap-4 md:gap-5 p-6 md:p-8 border border-[var(--border-default)] rounded-[12px] md:rounded-[16px]">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Business Docs</h3>
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Business license</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Trade registration</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• TIN certificate</span>
            </div>
          </div>

          {/* Doc Card 2 */}
          <div className="flex flex-col gap-4 md:gap-5 p-6 md:p-8 border border-[var(--border-default)] rounded-[12px] md:rounded-[16px]">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Company Info</h3>
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Company address</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Contact details</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Ownership information</span>
            </div>
          </div>

          {/* Doc Card 3 */}
          <div className="flex flex-col gap-4 md:gap-5 p-6 md:p-8 border border-[var(--border-default)] rounded-[12px] md:rounded-[16px]">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
              <Coins className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)]">Financial Info</h3>
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Bank statements</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Revenue estimates</span>
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">• Loan amount needed</span>
            </div>
          </div>
        </div>
        <p className="text-[13px] md:text-[14px] text-[var(--text-tertiary)] text-center max-w-[500px]">
          Your data is encrypted and shared only with lenders you choose to receive offers from.
        </p>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Access to Ethiopia&apos;s lending network
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We partner with licensed microfinance institutions across Ethiopia to bring you competitive loan offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 pt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">52+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Lending Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">ETB 10M+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Max Loan Amount</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">24hrs</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Avg. First Offer</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[800px]">
          <FaqItem
            question="How long does it take to get offers?"
            answer="Most applicants receive their first offers within 24-48 hours."
            defaultOpen
          />
          <FaqItem
            question="Does applying affect my credit score?"
            answer="No, checking your eligibility does not impact your credit score."
          />
          <FaqItem
            question="What interest rates can I expect?"
            answer="Rates vary by lender and your business profile. You'll see exact rates in your offers."
          />
          <FaqItem
            question="Can I negotiate the terms?"
            answer="Yes, you can communicate directly with lenders about terms."
          />
          <FaqItem
            question="Is Qazina a lender?"
            answer="No, Qazina is a marketplace that connects businesses with multiple lenders."
          />
        </div>
        <Button href="/contact" variant="ghost">View All FAQs</Button>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-lime-tint)] w-full">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Ready to see what offers you qualify for?
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center">
          Start your application in 5 minutes. No commitment required.
        </p>
        <Button href="/contact">Start Your Application</Button>
      </section>

      <Footer />
    </div>
  );
}
