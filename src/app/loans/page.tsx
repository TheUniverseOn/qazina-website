import { NavBar, Footer, Button, StepCard, FaqItem, LogoPlaceholder } from "@/components";
import { ArrowRight, Check, FileText, Building2, Coins } from "lucide-react";

export default function LoansPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex items-center gap-16 px-[120px] py-[80px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <div className="flex flex-col gap-6 w-[560px]">
          <h1 className="text-[48px] font-semibold text-[var(--text-primary)] leading-[1.15]">
            Apply once.{"\n"}Compare offers from lenders.
          </h1>
          <p className="text-[18px] text-[var(--text-secondary)] leading-[1.6] max-w-[500px]">
            One application gets you offers from multiple microfinance institutions. Compare terms, choose the best, get funded.
          </p>
          <Button href="#apply">Start Your Application</Button>
        </div>
        <div className="flex items-center justify-center w-[500px] h-[360px] bg-[#F5F5F5] rounded-[24px] border border-[var(--border-default)]">
          <span className="text-[16px] text-[var(--text-tertiary)] text-center leading-[1.5]">
            Product Screenshot{"\n"}Placeholder
          </span>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works
        </h2>
        <div className="flex items-center gap-8">
          <StepCard number="1" title="Apply" description="Fill out one simple application in 5 minutes." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="2" title="Review" description="Lenders review your application and send offers within hours." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="3" title="Compare" description="See all offers side by side with clear terms." />
          <ArrowRight className="w-6 h-6 text-[var(--border-default)]" />
          <StepCard number="4" title="Accept" description="Accept the best terms and receive funding." />
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="flex flex-col items-center gap-8 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Is this right for you?
        </h2>
        <div className="flex flex-col gap-6 p-10 bg-white rounded-[24px] border border-[var(--border-light)] w-[700px]">
          <div className="flex flex-col gap-4">
            {[
              "Your business is registered in Ethiopia",
              "You have been operating for at least 6 months",
              "You have a valid business license",
              "You can provide basic financial documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[var(--success)]" />
                <span className="text-[16px] text-[var(--text-primary)]">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-[14px] text-[var(--text-secondary)]">
              Loan amounts from ETB 50,000 to ETB 10,000,000
            </span>
            <span className="text-[14px] text-[var(--text-secondary)]">
              Terms from 3 to 36 months
            </span>
          </div>
        </div>
        <Button href="#apply">Check My Eligibility</Button>
      </section>

      {/* Documents Section */}
      <section className="flex flex-col items-center gap-12 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What you&apos;ll need to apply
        </h2>
        <div className="flex gap-6">
          {/* Doc Card 1 */}
          <div className="flex flex-col gap-5 p-8 w-[360px] border border-[var(--border-default)] rounded-[16px]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <FileText className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Business Docs</h3>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] text-[var(--text-secondary)]">• Business license</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• Trade registration</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• TIN certificate</span>
            </div>
          </div>

          {/* Doc Card 2 */}
          <div className="flex flex-col gap-5 p-8 w-[360px] border border-[var(--border-default)] rounded-[16px]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Building2 className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Company Info</h3>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] text-[var(--text-secondary)]">• Company address</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• Contact details</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• Ownership information</span>
            </div>
          </div>

          {/* Doc Card 3 */}
          <div className="flex flex-col gap-5 p-8 w-[360px] border border-[var(--border-default)] rounded-[16px]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Coins className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Financial Info</h3>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] text-[var(--text-secondary)]">• Bank statements</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• Revenue estimates</span>
              <span className="text-[14px] text-[var(--text-secondary)]">• Loan amount needed</span>
            </div>
          </div>
        </div>
        <p className="text-[14px] text-[var(--text-tertiary)] text-center">
          Your data is encrypted and shared only with lenders you choose to receive offers from.
        </p>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center gap-8 px-[120px] py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Our lending partners
        </h2>
        <div className="flex items-center gap-8">
          <LogoPlaceholder text="MFI 1" />
          <LogoPlaceholder text="MFI 2" />
          <LogoPlaceholder text="MFI 3" />
          <LogoPlaceholder text="MFI 4" />
        </div>
        <div className="flex items-center gap-8">
          <LogoPlaceholder text="MFI 5" />
          <LogoPlaceholder text="MFI 6" />
          <LogoPlaceholder text="MFI 7" />
          <LogoPlaceholder text="MFI 8" />
        </div>
        <span className="text-[16px] text-[var(--text-secondary)] text-center">
          52+ microfinance institutions across Ethiopia
        </span>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col items-center gap-8 px-[120px] py-[80px] bg-white w-full">
        <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 w-[800px]">
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
        <Button href="#" variant="ghost">View All FAQs</Button>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-6 px-[120px] py-[80px] bg-[var(--bg-lime-tint)] w-full">
        <h2 className="text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Ready to see what offers you qualify for?
        </h2>
        <p className="text-[18px] text-[var(--text-secondary)] text-center">
          Start your application in 5 minutes. No commitment required.
        </p>
        <Button href="#apply">Start Your Application</Button>
      </section>

      <Footer />
    </div>
  );
}
