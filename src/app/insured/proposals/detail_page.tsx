"use client";

import { use } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  Car,
  ArrowRight,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
} from "@/components/insured";

const proposalData = {
  id: "PRO-2027-0012",
  coverageType: "Comprehensive Motor",
  vehicleCount: 24,
  status: "quotes_ready",
  submittedDate: "Jan 24, 2027",
  quotesAvailable: 2,
  totalSumInsured: "ETB 48,500,000",
  broker: "Qazina Brokerage",
  brokerContact: "Eve Broker",
};

const activities = [
  { id: "1", title: "2 quotes received", description: "Ready for your review", timestamp: "Jan 27, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
  { id: "2", title: "RFQ sent to 3 insurers", timestamp: "Jan 25, 2027", iconColor: "info" as const, icon: <FileText size={16} /> },
  { id: "3", title: "Proposal submitted", timestamp: "Jan 24, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
];

export default function InsuredProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/insured/proposals" },
          { label: proposalData.id },
        ]}
        title={proposalData.id}
        subtitle={`${proposalData.coverageType} · ${proposalData.vehicleCount} vehicles`}
        badge={<StatusChip variant="success">Quotes Ready</StatusChip>}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {/* Quotes CTA */}
        <div className="bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 rounded-[var(--radius-lg)] p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">{proposalData.quotesAvailable} Quotes Available</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Compare quotes from different insurers and select the best option for your fleet.</p>
            </div>
            <Link href={`/insured/proposals/${id}/compare`}>
              <BrokerButton variant="primary" rightIcon={<ArrowRight size={16} />}>
                Compare Quotes
              </BrokerButton>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Proposal Details */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Proposal Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Coverage Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.coverageType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Fleet Size</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.vehicleCount} vehicles</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Total Sum Insured</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.totalSumInsured}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Submitted</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Broker</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.broker}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Contact</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposalData.brokerContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Timeline</h2>
              </div>
              <div className="px-5 divide-y divide-[var(--bg-border)]">
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    timestamp={activity.timestamp}
                    iconColor={activity.iconColor}
                    icon={activity.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
