import { NavBar, Footer, Button, FeatureCard } from "@/components";
import { TrendingUp, Users, BarChart3, Shield, Zap, Globe } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[100px] w-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBF0 100%)"
        }}
      >
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-[var(--text-primary)] text-center leading-[1.15] max-w-[800px]">
          Grow your business with Qazina
        </h1>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
          Join our network of microfinance institutions and insurers. Reach more businesses, reduce acquisition costs, and grow your portfolio.
        </p>
        <Button href="/contact">Become a Partner</Button>
      </section>

      {/* For Lenders Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
            For Lenders & MFIs
          </h2>
          <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
            Access pre-qualified business loan applications and grow your lending portfolio efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[900px]">
          {/* Benefit Card 1 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-[var(--bg-lime-tint)] rounded-[16px] md:rounded-[20px]">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-[12px]">
              <Users className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Qualified Leads
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Receive applications from businesses that match your lending criteria.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-[var(--bg-lime-tint)] rounded-[16px] md:rounded-[20px]">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-[12px]">
              <TrendingUp className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Lower Acquisition Cost
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Reduce your customer acquisition costs with our efficient marketplace model.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-[var(--bg-lime-tint)] rounded-[16px] md:rounded-[20px]">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-[12px]">
              <BarChart3 className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Portfolio Growth
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Expand your loan book with quality borrowers you might not reach otherwise.
            </p>
          </div>
        </div>

        <Button href="/contact">Partner With Us</Button>
      </section>

      {/* For Insurers Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-cream)] w-full">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
            For Insurance Companies
          </h2>
          <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center leading-[1.6] max-w-[600px]">
            Distribute your insurance products to Ethiopian businesses through our digital platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[900px]">
          {/* Benefit Card 1 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-[16px] md:rounded-[20px] border border-[var(--border-light)]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Globe className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Digital Distribution
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Sell policies online to businesses across Ethiopia without physical branches.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-[16px] md:rounded-[20px] border border-[var(--border-light)]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Zap className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Instant Quotes
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Our platform enables real-time quoting and policy issuance.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-[16px] md:rounded-[20px] border border-[var(--border-light)]">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
              <Shield className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)]">
              Risk Insights
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
              Access business data to make better underwriting decisions.
            </p>
          </div>
        </div>

        <Button href="/contact">Partner With Us</Button>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-white w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-[var(--text-primary)] text-center">
          How it works for partners
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[900px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--lime)] rounded-full">
              <span className="text-[20px] font-bold text-[var(--text-primary)]">1</span>
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Integrate</h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
              Connect your systems via our API or use our partner dashboard.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--lime)] rounded-full">
              <span className="text-[20px] font-bold text-[var(--text-primary)]">2</span>
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Receive Leads</h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
              Get qualified applications that match your criteria.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--lime)] rounded-full">
              <span className="text-[20px] font-bold text-[var(--text-primary)]">3</span>
            </div>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Grow Together</h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
              Expand your customer base while we handle acquisition.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--lime-dark)] w-full">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-white text-center">
          Join our growing network
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-[800px]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--lime)]">52+</span>
            <span className="text-[14px] text-[var(--text-tertiary)] text-center">MFI Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--lime)]">12+</span>
            <span className="text-[14px] text-[var(--text-tertiary)] text-center">Insurance Partners</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--lime)]">5K+</span>
            <span className="text-[14px] text-[var(--text-tertiary)] text-center">Businesses Served</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[32px] md:text-[48px] font-bold text-[var(--lime)]">98%</span>
            <span className="text-[14px] text-[var(--text-tertiary)] text-center">Partner Satisfaction</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="become-partner" className="flex flex-col items-center gap-6 px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] bg-[var(--bg-lime-tint)] w-full">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--text-primary)] text-center">
          Ready to partner with Qazina?
        </h2>
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)] text-center max-w-[500px]">
          Get in touch to learn more about our partnership programs.
        </p>
        <Button href="/contact">Contact Us</Button>
      </section>

      <Footer />
    </div>
  );
}
