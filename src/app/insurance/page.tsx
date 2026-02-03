import { NavBar, Footer, Button, StepCard, InsuranceLineCard, FaqItem } from "@/components";
import { ArrowRight, Check, Car, Building2, Scale, Ship, Users, Flame, Briefcase, Package } from "lucide-react";

export default function InsurancePage() {
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
            Get quotes. Compare coverage. Buy in minutes.
          </h1>
          <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] leading-[1.6] max-w-[500px]">
            Business insurance made simple. Answer a few questions, compare quotes from top insurers, and buy coverage online.
          </p>
          <Button href="/contact" className="w-fit">Get Insurance Quotes</Button>
        </div>
        <div className="flex items-center justify-center w-full lg:w-[500px] h-[240px] md:h-[360px] bg-[#F5F5F5] rounded-[16px] md:rounded-[24px] border border-[var(--border-default)]">
          <span className="text-[14px] md:text-[16px] text-[var(--text-tertiary)] text-center leading-[1.5]">
            Insurance Dashboard{"\n"}Placeholder
          </span>
        </div>
      </section>

      {/* Lines Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          What do you need to protect?
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          <InsuranceLineCard icon={Car} title="Motor Insurance" description="Vehicles & fleet" />
          <InsuranceLineCard icon={Building2} title="Property Insurance" description="Buildings & assets" />
          <InsuranceLineCard icon={Scale} title="Liability Insurance" description="Third party" />
          <InsuranceLineCard icon={Ship} title="Marine Cargo" description="Goods in transit" />
          <InsuranceLineCard icon={Users} title="Workers Comp" description="Employee injuries" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          <InsuranceLineCard icon={Flame} title="Fire & Peril" description="Damage protection" />
          <InsuranceLineCard icon={Briefcase} title="Fidelity Guarantee" description="Employee dishonesty" />
          <InsuranceLineCard icon={Package} title="Goods in Transit" description="Shipping protection" />
        </div>
        <Button href="/contact">Get Quotes for Your Business</Button>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works
        </h2>
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6 lg:gap-8 w-full md:w-auto">
          <StepCard number="1" title="Tell Us About Your Business" description="Answer simple questions about your business and coverage needs." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="2" title="Get Quotes" description="Multiple insurers compete to offer you quotes." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="3" title="Compare Coverage" description="See coverage and pricing side by side." />
          <ArrowRight className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-[var(--border-default)] flex-shrink-0" />
          <StepCard number="4" title="Buy & Manage" description="Purchase online and manage your policies in one place." />
        </div>
      </section>

      {/* Policy Management Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Manage all your policies in one place
        </h2>
        <div className="flex items-center justify-center w-full max-w-[900px] h-[200px] md:h-[400px] bg-white rounded-[16px] md:rounded-[24px] border border-[var(--border-default)]">
          <span className="text-[14px] md:text-[16px] text-[var(--text-tertiary)] text-center leading-[1.5]">
            Policy Dashboard Screenshot{"\n"}Placeholder
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {[
            "View all policies",
            "Download documents",
            "Get renewal reminders",
            "File claims online",
            "24/7 access"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
              <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Access to Ethiopia&apos;s insurance network
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          We partner with top-rated insurance companies licensed in Ethiopia to bring you competitive coverage options.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 pt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">12+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Insurance Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">8+</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Coverage Types</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--text-primary)]">24hrs</span>
            <span className="text-[14px] md:text-[16px] text-[var(--text-secondary)]">Policy Activation</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[800px]">
          <FaqItem
            question="What types of insurance do you offer?"
            answer="We offer motor, property, liability, marine cargo, workers comp, fire & peril, fidelity guarantee, and goods in transit insurance."
            defaultOpen
          />
          <FaqItem
            question="How quickly can I get coverage?"
            answer="Most policies can be purchased and activated within 24 hours."
          />
          <FaqItem
            question="Can I add coverage later?"
            answer="Yes, you can request policy endorsements and add coverage at any time."
          />
          <FaqItem
            question="How do I file a claim?"
            answer="You can file claims directly through your online dashboard or contact our support team."
          />
          <FaqItem
            question="Is Qazina an insurance company?"
            answer="No, Qazina is a marketplace that connects businesses with multiple licensed insurers."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Protect your business in minutes.
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center">
          Get quotes from multiple insurers with one simple form.
        </p>
        <Button href="/contact">Get Insurance Quotes</Button>
      </section>

      <Footer />
    </div>
  );
}
