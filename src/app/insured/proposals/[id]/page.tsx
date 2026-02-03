"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, Car } from "lucide-react";
import { PageHeader, StatusChip, BrokerButton, ActivityItem } from "@/components/insured";

const proposal = {
  id: "PRO-2027-0045",
  type: "Motor Fleet Insurance",
  status: "quoted" as const,
  submittedDate: "Jan 28, 2027",
  vehicleCount: 8,
  quotesReceived: 3,
  broker: "Qazina Insurance Brokers",
  description: "Fleet insurance coverage for 8 commercial vehicles including delivery trucks and passenger vans.",
  vehicles: [
    { plateNo: "3-AA-12345", makeModel: "Toyota Hilux", year: 2023 },
    { plateNo: "3-AA-15145", makeModel: "Toyota Land Cruiser Prado", year: 2024 },
    { plateNo: "3-AA-22331", makeModel: "Isuzu NPR", year: 2022 },
  ],
};

const activities = [
  { id: "1", title: "3 quotes received", description: "Compare and select your preferred quote", timestamp: "Jan 30, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
  { id: "2", title: "Proposal under review", description: "Sent to 4 insurers for quotation", timestamp: "Jan 29, 2027", iconColor: "warning" as const, icon: <Clock size={16} /> },
  { id: "3", title: "Proposal submitted", description: "Via Qazina Insurance Brokers", timestamp: "Jan 28, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
];

export default function InsuredProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/insured/proposals" },
          { label: proposal.id },
        ]}
        title={proposal.id}
        subtitle={proposal.type}
        badge={<StatusChip variant="warning">Quotes Ready</StatusChip>}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {/* Compare Quotes CTA */}
        <Link
          href={`/insured/proposals/${id}/compare`}
          className="flex items-center justify-between p-5 mb-6 bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 rounded-[var(--radius-lg)] hover:bg-[var(--accent-primary)]/10 transition-colors"
        >
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{proposal.quotesReceived} quotes are ready for comparison</p>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">Compare quotes side by side and select your preferred insurer</p>
          </div>
          <BrokerButton variant="primary" rightIcon={<ArrowRight size={16} />}>
            Compare Quotes
          </BrokerButton>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Proposal Details */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Proposal Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Insurance Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposal.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Submitted</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposal.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Vehicles</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposal.vehicleCount} vehicles</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Broker</p>
                    <p className="font-medium text-[var(--text-primary)]">{proposal.broker}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--bg-border)]">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Description</p>
                  <p className="text-[var(--text-primary)]">{proposal.description}</p>
                </div>
              </div>
            </div>

            {/* Vehicles */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-2">
                  <Car size={20} className="text-[var(--text-secondary)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vehicles ({proposal.vehicles.length} of {proposal.vehicleCount})</h2>
                </div>
              </div>
              <div className="divide-y divide-[var(--bg-border)]">
                {proposal.vehicles.map((v) => (
                  <div key={v.plateNo} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{v.plateNo}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{v.makeModel} · {v.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Activity</h2>
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
