"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Check,
  Shield,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  FormModal,
} from "@/components/insured";
import { AcceptQuoteForm } from "@/components/broker/modals";

interface Quote {
  id: string;
  insurer: string;
  premium: string;
  coverage: string;
  deductible: string;
  paymentOptions: string[];
  roadside: boolean;
  windscreen: boolean;
  personalAccident: boolean;
  recommended?: boolean;
}

const proposalRef = "PRO-2027-0012";

const quotes: Quote[] = [
  {
    id: "1",
    insurer: "Awash Insurance",
    premium: "ETB 485,200",
    coverage: "ETB 48.5M",
    deductible: "ETB 10,000",
    paymentOptions: ["Full", "2 installments"],
    roadside: true,
    windscreen: true,
    personalAccident: true,
    recommended: true,
  },
  {
    id: "2",
    insurer: "Nyala Insurance",
    premium: "ETB 512,000",
    coverage: "ETB 48.5M",
    deductible: "ETB 15,000",
    paymentOptions: ["Full only"],
    roadside: true,
    windscreen: false,
    personalAccident: true,
  },
  {
    id: "3",
    insurer: "Ethiopian Ins.",
    premium: "ETB 498,750",
    coverage: "ETB 48.5M",
    deductible: "ETB 12,000",
    paymentOptions: ["Full", "2 installments", "4 installments"],
    roadside: false,
    windscreen: true,
    personalAccident: false,
  },
];

export default function QuoteComparisonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleAccept = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowAcceptModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/insured/proposals" },
          { label: proposalRef, href: `/insured/proposals/${id}` },
          { label: "Compare Quotes" },
        ]}
        title="Compare Quotes"
        subtitle={`${proposalRef} · 3 quotes available`}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-white rounded-[var(--radius-lg)] border-2 ${
                quote.recommended ? "border-[var(--accent-primary)]" : "border-[var(--bg-border)]"
              } overflow-hidden`}
            >
              {/* Header */}
              <div className={`px-5 py-4 ${quote.recommended ? "bg-[var(--accent-primary)]/5" : "bg-[var(--bg-surface)]"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text-primary)]">{quote.insurer}</h3>
                  {quote.recommended && (
                    <StatusChip variant="warning">
                      <Star size={12} className="fill-current mr-1" />
                      Recommended
                    </StatusChip>
                  )}
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-2">{quote.premium}</p>
                <p className="text-sm text-[var(--text-secondary)]">Annual premium</p>
              </div>

              {/* Details */}
              <div className="p-5 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Coverage</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{quote.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Deductible</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{quote.deductible}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Payment</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{quote.paymentOptions.join(", ")}</span>
                  </div>
                </div>

                <div className="h-px bg-[var(--bg-border)]" />

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--text-primary)]">Included</p>
                  <div className="flex items-center gap-2">
                    {quote.roadside ? (
                      <Check size={14} className="text-[var(--status-success)]" />
                    ) : (
                      <span className="w-3.5 h-0.5 bg-[var(--text-tertiary)] rounded" />
                    )}
                    <span className={`text-sm ${quote.roadside ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>Roadside Assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quote.windscreen ? (
                      <Check size={14} className="text-[var(--status-success)]" />
                    ) : (
                      <span className="w-3.5 h-0.5 bg-[var(--text-tertiary)] rounded" />
                    )}
                    <span className={`text-sm ${quote.windscreen ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>Windscreen Cover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quote.personalAccident ? (
                      <Check size={14} className="text-[var(--status-success)]" />
                    ) : (
                      <span className="w-3.5 h-0.5 bg-[var(--text-tertiary)] rounded" />
                    )}
                    <span className={`text-sm ${quote.personalAccident ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>Personal Accident</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="px-5 pb-5">
                <BrokerButton
                  variant={quote.recommended ? "primary" : "secondary"}
                  fullWidth
                  onClick={() => handleAccept(quote)}
                >
                  {quote.recommended ? "Accept Recommended" : "Accept Quote"}
                </BrokerButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accept Quote Modal */}
      <FormModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onSubmit={() => setShowAcceptModal(false)}
        title="Accept Quote"
        description={`Confirm acceptance of the quote from ${selectedQuote?.insurer}`}
        submitLabel="Accept Quote"
        variant="green"
      >
        <AcceptQuoteForm
          insurerName={selectedQuote?.insurer}
          premium={selectedQuote?.premium}
        />
      </FormModal>
    </div>
  );
}
