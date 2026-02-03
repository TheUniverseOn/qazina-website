"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileCheck,
  ArrowRight,
} from "lucide-react";
import {
  PageHeader,
  SearchInput,
  StatusChip,
  Tabs,
} from "@/components/insured";

// Client-facing endorsement statuses
type ClientEndorsementStatus = "submitted" | "under_review" | "pending_approval" | "applied" | "rejected";

interface ClientEndorsement {
  id: string;
  endorsementNumber: string;
  policyNumber: string;
  type: string;
  status: ClientEndorsementStatus;
  requestDate: string;
  lastUpdate: string;
  premiumAdjustment: string;
}

const statusConfig: Record<ClientEndorsementStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  pending_approval: { label: "Pending Approval", variant: "warning" },
  applied: { label: "Applied", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

const endorsements: ClientEndorsement[] = [
  {
    id: "1",
    endorsementNumber: "END-2027-0045",
    policyNumber: "POL-2027-0012",
    type: "Add Vehicle",
    status: "under_review",
    requestDate: "Jan 28, 2027",
    lastUpdate: "Jan 30, 2027",
    premiumAdjustment: "+ETB 45,000",
  },
  {
    id: "2",
    endorsementNumber: "END-2027-0044",
    policyNumber: "POL-2027-0056",
    type: "Remove Vehicle",
    status: "applied",
    requestDate: "Jan 22, 2027",
    lastUpdate: "Jan 26, 2027",
    premiumAdjustment: "-ETB 28,500",
  },
  {
    id: "3",
    endorsementNumber: "END-2027-0043",
    policyNumber: "POL-2027-0103",
    type: "Change Coverage",
    status: "applied",
    requestDate: "Jan 19, 2027",
    lastUpdate: "Jan 23, 2027",
    premiumAdjustment: "+ETB 12,000",
  },
  {
    id: "4",
    endorsementNumber: "END-2027-0042",
    policyNumber: "POL-2027-0181",
    type: "Reinstatement",
    status: "rejected",
    requestDate: "Jan 14, 2027",
    lastUpdate: "Jan 18, 2027",
    premiumAdjustment: "—",
  },
  {
    id: "5",
    endorsementNumber: "END-2027-0041",
    policyNumber: "POL-2027-0012",
    type: "Add Vehicle",
    status: "submitted",
    requestDate: "Jan 29, 2027",
    lastUpdate: "Jan 29, 2027",
    premiumAdjustment: "+ETB 32,000",
  },
];

const tabs = [
  { id: "all", label: "All", count: 5 },
  { id: "submitted", label: "Submitted", count: 1 },
  { id: "under_review", label: "Under Review", count: 1 },
  { id: "pending_approval", label: "Pending Approval", count: 0 },
  { id: "applied", label: "Applied", count: 2 },
  { id: "rejected", label: "Rejected", count: 1 },
];

export default function InsuredEndorsementsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = endorsements.filter((e) => {
    const matchesTab = activeTab === "all" || e.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      e.endorsementNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/insured" },
          { label: "Endorsements" },
        ]}
        title="My Endorsements"
        subtitle={`${endorsements.length} total`}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 md:px-8 gap-3 sm:gap-0 border-b border-[var(--bg-border)]">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <SearchInput
            placeholder="Search endorsements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Status Cards */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <div className="space-y-3">
            {filtered.map((endorsement) => {
              const status = statusConfig[endorsement.status];
              return (
                <div
                  key={endorsement.id}
                  className="bg-white border border-[var(--bg-border)] rounded-[var(--radius-lg)] p-4 sm:p-5 hover:border-[var(--text-tertiary)] cursor-pointer transition-colors"
                  onClick={() => router.push(`/insured/endorsements/${endorsement.id}`)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-[var(--text-primary)]">{endorsement.endorsementNumber}</span>
                        <StatusChip variant={status.variant}>{status.label}</StatusChip>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                        <span>Policy: {endorsement.policyNumber}</span>
                        <span>Type: {endorsement.type}</span>
                        <span>Requested: {endorsement.requestDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${endorsement.premiumAdjustment.startsWith("+") ? "text-[var(--status-success)]" : endorsement.premiumAdjustment.startsWith("-") ? "text-[var(--status-error)]" : "text-[var(--text-secondary)]"}`}>
                          {endorsement.premiumAdjustment}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">Updated {endorsement.lastUpdate}</p>
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-tertiary)] flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FileCheck size={48} className="mx-auto text-[var(--text-tertiary)] mb-3" />
                <p className="text-[var(--text-secondary)]">No endorsements found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
