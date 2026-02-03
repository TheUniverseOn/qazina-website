"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, Upload, FileText, AlertTriangle } from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
  Modal,
  EmptyState,
} from "@/components/broker";

// Mock policies for dropdown
const policies = [
  { id: "POL-2027-0069", name: "Motor Fleet Insurance - POL-2027-0069", coverage: "Comprehensive", validUntil: "Dec 31, 2027" },
  { id: "POL-2027-0012", name: "Property Insurance - POL-2027-0012", coverage: "All Risks", validUntil: "Jan 15, 2027" },
  { id: "POL-2027-0089", name: "Motor Fleet Insurance - POL-2027-0089", coverage: "Third Party", validUntil: "Mar 1, 2027" },
];

// Types
interface Claim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  client: string;
  type: "accident" | "theft" | "collision" | "fire" | "vandalism" | "other";
  status: "reported" | "evidence_needed" | "submitted_to_insurer" | "in_review" | "approved" | "paid" | "denied";
  amount: string;
  filed: string;
}

// Mock data
const claims: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-2027-0089",
    policyNumber: "POL-2027-0234",
    client: "Abebe Transport",
    type: "accident",
    status: "reported",
    amount: "ETB 875,000",
    filed: "Jan 25, 2027",
  },
  {
    id: "2",
    claimNumber: "CLM-2027-0088",
    policyNumber: "POL-2027-0012",
    client: "Eagle Logistics",
    type: "theft",
    status: "evidence_needed",
    amount: "ETB 95,000",
    filed: "Jan 20, 2027",
  },
  {
    id: "3",
    claimNumber: "CLM-2027-0087",
    policyNumber: "POL-2027-0089",
    client: "Dawn Freight",
    type: "collision",
    status: "submitted_to_insurer",
    amount: "ETB 45,000",
    filed: "Jan 9, 2027",
  },
  {
    id: "4",
    claimNumber: "CLM-2027-0086",
    policyNumber: "POL-2027-0178",
    client: "Mulu Trading",
    type: "fire",
    status: "paid",
    amount: "ETB 200,000",
    filed: "Jan 5, 2027",
  },
  {
    id: "5",
    claimNumber: "CLM-2027-0085",
    policyNumber: "POL-2024-0731",
    client: "Desert Motors",
    type: "vandalism",
    status: "denied",
    amount: "ETB 34,090",
    filed: "Dec 28, 2024",
  },
];

const tabs = [
  { id: "all", label: "All", count: 33 },
  { id: "reported", label: "Reported", count: 5 },
  { id: "evidence_needed", label: "Evidence Needed", count: 3 },
  { id: "submitted_to_insurer", label: "Submitted to Insurer", count: 8 },
  { id: "in_review", label: "In Review", count: 4 },
  { id: "approved", label: "Approved", count: 6 },
  { id: "paid", label: "Paid", count: 5 },
  { id: "denied", label: "Denied", count: 2 },
];

const statusConfig: Record<Claim["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  reported: { label: "Open", variant: "success" },
  evidence_needed: { label: "Evidence Needed", variant: "warning" },
  submitted_to_insurer: { label: "Submitted", variant: "info" },
  in_review: { label: "In Review", variant: "info" },
  approved: { label: "Approved", variant: "success" },
  paid: { label: "Paid", variant: "neutral" },
  denied: { label: "Denied", variant: "error" },
};

const typeConfig: Record<Claim["type"], string> = {
  accident: "Accident",
  theft: "Theft",
  collision: "Collision",
  fire: "Fire",
  vandalism: "Vandalism",
  other: "Other",
};

export default function ClaimsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFileClaimModal, setShowFileClaimModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState("");

  const columns: Column<Claim>[] = [
    {
      key: "claimNumber",
      header: "Claim No.",
      width: "150px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.claimNumber}</span>
      ),
    },
    {
      key: "policyNumber",
      header: "Policy",
      width: "140px",
      render: (row) => (
        <span className="text-[var(--text-secondary)]">{row.policyNumber}</span>
      ),
    },
    {
      key: "client",
      header: "Client",
    },
    {
      key: "type",
      header: "Type",
      width: "110px",
      render: (row) => typeConfig[row.type],
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (row) => {
        const config = statusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "amount",
      header: "Amount",
      width: "130px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.amount}</span>
      ),
    },
    {
      key: "filed",
      header: "Filed",
      width: "120px",
    },
  ];

  const filteredClaims = claims.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Operations", href: "/broker" },
          { label: "Claims" },
        ]}
        title="Claims"
        subtitle="33 total"
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Filter size={16} />}>
              Filter
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />} onClick={() => setShowFileClaimModal(true)}>
              File New Claim
            </BrokerButton>
          </>
        }
      />

      {/* File New Claim Modal */}
      <Modal
        isOpen={showFileClaimModal}
        onClose={() => setShowFileClaimModal(false)}
        title="File a Claim"
        size="lg"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowFileClaimModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />}>
              Submit Claim
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-6">
          {/* 1. Select Policy */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">1. Select Policy</h3>
            <div className="space-y-2">
              {policies.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => setSelectedPolicy(policy.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-[var(--radius-md)] border-2 transition-colors text-left ${
                    selectedPolicy === policy.id
                      ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5"
                      : "border-[var(--bg-border)] hover:border-[var(--text-tertiary)]"
                  }`}
                >
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{policy.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {policy.coverage} · Valid until {policy.validUntil}
                    </p>
                  </div>
                  {selectedPolicy === policy.id && (
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
                      <span className="text-[10px] font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Incident Details */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">2. Incident Details</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Date of Incident *</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Time of Incident</label>
                <input
                  type="time"
                  placeholder="e.g. 10:30 AM"
                  className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Incident Type *</label>
                <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
                  <option value="">Select...</option>
                  <option value="collision">Vehicle Collision</option>
                  <option value="theft">Theft</option>
                  <option value="fire">Fire</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="natural">Natural Disaster</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Location of Incident</label>
                <input
                  type="text"
                  placeholder="e.g. Bole Road, near Edna Mall, Addis Ababa"
                  className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Police Report Number (if applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. AA-2126-0456"
                  className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1">Description of Incident *</label>
              <textarea
                placeholder="Please provide a detailed description of the incident..."
                rows={3}
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
              />
            </div>
          </div>

          {/* 3. Supporting Documents */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">3. Supporting Documents</h3>
            <div className="border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] p-6 text-center">
              <Upload size={24} className="mx-auto text-[var(--text-tertiary)] mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Drag and drop files here, or <span className="text-[var(--accent-primary)] cursor-pointer">click to browse</span>
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                Upload photos, police reports, repair estimates (PDF, JPG, PNG up to 10MB each)
              </p>
              <button className="mt-3 text-sm text-[var(--accent-primary)] hover:underline">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 md:px-8 gap-3 sm:gap-0 border-b border-[var(--bg-border)]">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <SearchInput
            placeholder="Search claims..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {filteredClaims.length === 0 ? (
            <EmptyState
              icon={<AlertTriangle size={28} className="text-[var(--text-tertiary)]" />}
              title={searchQuery || activeTab !== "all" ? "No claims match your filters" : "No claims filed"}
              description={searchQuery || activeTab !== "all" ? undefined : "Insurance claims will appear here"}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredClaims}
              onRowClick={(row) => router.push(`/broker/claims/${row.id}`)}
              currentPage={1}
              totalPages={2}
              totalItems={33}
            />
          )}
        </div>
      </div>
    </div>
  );
}
