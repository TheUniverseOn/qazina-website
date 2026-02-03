"use client";

import { use, useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { PageHeader, BrokerButton, FormModal } from "@/components/insured";
import { AcceptQuoteForm } from "@/components/broker/modals";

const quotes = [
  {
    id: "q1",
    insurer: "Nyala Insurance S.C",
    premium: "ETB 31,500",
    premiumValue: 31500,
    coverType: "Comprehensive",
    sumInsured: "ETB 2,250,000",
    deductible: "ETB 15,000",
    features: ["Windscreen Cover", "Towing up to 50km", "Third Party Liability", "Personal Accident"],
    recommended: true,
    validUntil: "Feb 15, 2027",
  },
  {
    id: "q2",
    insurer: "Awash Insurance S.C",
    premium: "ETB 28,900",
    premiumValue: 28900,
    coverType: "Comprehensive",
    sumInsured: "ETB 2,250,000",
    deductible: "ETB 20,000",
    features: ["Windscreen Cover", "Third Party Liability", "Personal Accident"],
    recommended: false,
    validUntil: "Feb 12, 2027",
  },
  {
    id: "q3",
    insurer: "Nib Insurance S.C",
    premium: "ETB 33,200",
    premiumValue: 33200,
    coverType: "Comprehensive",
    sumInsured: "ETB 2,500,000",
    deductible: "ETB 10,000",
    features: ["Windscreen Cover", "Towing up to 100km", "Third Party Liability", "Personal Accident", "Roadside Assistance"],
    recommended: false,
    validUntil: "Feb 18, 2027",
  },
];

export default function InsuredQuoteComparePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<typeof quotes[0] | null>(null);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/insured/proposals" },
          { label: id, href: `/insured/proposals/${id}` },
          { label: "Compare Quotes" },
        ]}
        title="Compare Quotes"
        subtitle={`${quotes.length} quotes available for ${id}`}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-white rounded-[var(--radius-lg)] border-2 ${
                quote.recommended ? "border-[var(--accent-primary)] shadow-md" : "border-[var(--bg-border)]"
              } flex flex-col`}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-[var(--text-primary)]">{quote.insurer}</p>
                  {quote.recommended && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-full">
                      <Star size={12} /> Recommended
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{quote.premium}</p>
                <p className="text-xs text-[var(--text-tertiary)]">per year</p>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Cover Type</span>
                    <span className="font-medium text-[var(--text-primary)]">{quote.coverType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Sum Insured</span>
                    <span className="font-medium text-[var(--text-primary)]">{quote.sumInsured}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Deductible</span>
                    <span className="font-medium text-[var(--text-primary)]">{quote.deductible}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Valid Until</span>
                    <span className="font-medium text-[var(--text-primary)]">{quote.validUntil}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--bg-border)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Features</p>
                  <ul className="space-y-1.5">
                    {quote.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="text-[var(--status-success)] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="px-5 pb-5">
                <BrokerButton
                  variant={quote.recommended ? "primary" : "secondary"}
                  fullWidth
                  onClick={() => {
                    setSelectedQuote(quote);
                    setShowAcceptModal(true);
                  }}
                >
                  Accept Quote
                </BrokerButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FormModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onSubmit={() => setShowAcceptModal(false)}
        title="Accept Quote"
        description={selectedQuote ? `${selectedQuote.insurer} — ${selectedQuote.premium}/year` : ""}
        submitLabel="Confirm Acceptance"
        variant="green"
      >
        <AcceptQuoteForm />
      </FormModal>
    </div>
  );
}
