"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, Upload, Car, FileText, X, Calendar, FileCheck } from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
  Drawer,
  EmptyState,
} from "@/components/broker";

// Types
interface Endorsement {
  id: string;
  endorsementNumber: string;
  policyNumber: string;
  type: "add_vehicle" | "remove_vehicle" | "change_coverage" | "cancel" | "reinstate";
  status: "requested" | "awaiting_docs" | "submitted_to_insurer" | "issued" | "closed" | "rejected";
  requestDate: string;
  adjustedPremium: string;
}

// Mock data
const endorsements: Endorsement[] = [
  {
    id: "1",
    endorsementNumber: "END-2027-0045",
    policyNumber: "POL-2027-0012",
    type: "add_vehicle",
    status: "requested",
    requestDate: "Jan 28, 2027",
    adjustedPremium: "+ETB 45,000",
  },
  {
    id: "2",
    endorsementNumber: "END-2027-0044",
    policyNumber: "POL-2027-0056",
    type: "remove_vehicle",
    status: "issued",
    requestDate: "Jan 22, 2027",
    adjustedPremium: "-ETB 28,500",
  },
  {
    id: "3",
    endorsementNumber: "END-2027-0043",
    policyNumber: "POL-2027-0103",
    type: "change_coverage",
    status: "closed",
    requestDate: "Jan 19, 2027",
    adjustedPremium: "+ETB 12,000",
  },
  {
    id: "4",
    endorsementNumber: "END-2027-0042",
    policyNumber: "POL-2027-0181",
    type: "reinstate",
    status: "rejected",
    requestDate: "Jan 14, 2027",
    adjustedPremium: "—",
  },
];

const tabs = [
  { id: "all", label: "All", count: 18 },
  { id: "requested", label: "Requested", count: 3 },
  { id: "awaiting_docs", label: "Awaiting Docs", count: 2 },
  { id: "submitted_to_insurer", label: "Submitted to Insurer", count: 4 },
  { id: "issued", label: "Issued", count: 5 },
  { id: "closed", label: "Closed", count: 3 },
  { id: "rejected", label: "Rejected", count: 1 },
];

const statusConfig: Record<Endorsement["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "info" },
  awaiting_docs: { label: "Awaiting Docs", variant: "warning" },
  submitted_to_insurer: { label: "Submitted to Insurer", variant: "warning" },
  issued: { label: "Issued", variant: "success" },
  closed: { label: "Closed", variant: "neutral" },
  rejected: { label: "Rejected", variant: "error" },
};

const typeConfig: Record<Endorsement["type"], string> = {
  add_vehicle: "Add Vehicle",
  remove_vehicle: "Remove Vehicle",
  change_coverage: "Change Coverage",
  cancel: "Cancellation",
  reinstate: "Reinstatement",
};

// Mock policies for dropdown
const policies = [
  { id: "POL-2027-0012", name: "ABC Fleet Services - Motor Fleet" },
  { id: "POL-2027-0089", name: "KYT Logistics PLC - Motor Fleet" },
  { id: "POL-2027-0003", name: "Nile Distribution - Motor Fleet" },
  { id: "POL-2027-0156", name: "Metro Transport Co. - Motor Fleet" },
];

export default function EndorsementsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [selectedEndorsementType, setSelectedEndorsementType] = useState("");

  const columns: Column<Endorsement>[] = [
    {
      key: "endorsementNumber",
      header: "Endorsement #",
      width: "160px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.endorsementNumber}</span>
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
      key: "type",
      header: "Type",
      width: "140px",
      render: (row) => typeConfig[row.type],
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      render: (row) => {
        const config = statusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "requestDate",
      header: "Requested",
      width: "130px",
    },
    {
      key: "adjustedPremium",
      header: "Adj. Premium",
      width: "130px",
      render: (row) => (
        <span className={`font-medium ${row.adjustedPremium.startsWith("+") ? "text-[var(--status-success)]" : row.adjustedPremium.startsWith("-") ? "text-[var(--status-error)]" : "text-[var(--text-secondary)]"}`}>
          {row.adjustedPremium}
        </span>
      ),
    },
  ];

  const filteredEndorsements = endorsements.filter((e) => {
    const matchesTab = activeTab === "all" || e.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      e.endorsementNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/broker" },
          { label: "Endorsements" },
        ]}
        title="Endorsements"
        subtitle="18 total"
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Filter size={16} />}>
              Filter
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />} onClick={() => setShowCreateDrawer(true)}>
              New Endorsement
            </BrokerButton>
          </>
        }
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

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {filteredEndorsements.length === 0 ? (
            <EmptyState
              icon={<FileCheck size={28} className="text-[var(--text-tertiary)]" />}
              title={searchQuery || activeTab !== "all" ? "No endorsements match your filters" : "No endorsements yet"}
              description={searchQuery || activeTab !== "all" ? undefined : "Endorsement requests will appear here"}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredEndorsements}
              onRowClick={(row) => router.push(`/broker/endorsements/${row.id}`)}
              currentPage={1}
              totalPages={2}
              totalItems={18}
            />
          )}
        </div>
      </div>

      {/* Create Endorsement Drawer */}
      <Drawer
        isOpen={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        title="Create Endorsement"
        width="lg"
        footer={
          <div className="flex gap-3 w-full">
            <BrokerButton variant="secondary" onClick={() => setShowCreateDrawer(false)} className="flex-1">
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />} className="flex-1">
              Create Endorsement
            </BrokerButton>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Policy Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Select Policy *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Choose a policy...</option>
              {policies.map((policy) => (
                <option key={policy.id} value={policy.id}>{policy.id} - {policy.name}</option>
              ))}
            </select>
          </div>

          {/* Endorsement Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Endorsement Type *
            </label>
            <select
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white"
              value={selectedEndorsementType}
              onChange={(e) => setSelectedEndorsementType(e.target.value)}
            >
              <option value="">Select type...</option>
              <option value="add_vehicle">Add Vehicle(s)</option>
              <option value="remove_vehicle">Remove Vehicle(s)</option>
              <option value="change_details">Change Details</option>
              <option value="cancel">Policy Cancellation</option>
              <option value="reinstate">Reinstatement</option>
            </select>
          </div>

          {/* Effective Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Effective Date *
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
              />
            </div>
          </div>

          {/* Vehicle Section - Only show for add/remove vehicle */}
          {(selectedEndorsementType === "add_vehicle" || selectedEndorsementType === "remove_vehicle") && (
            <div className="border border-[var(--bg-border)] rounded-[var(--radius-md)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-2">
                  <Car size={18} className="text-[var(--text-secondary)]" />
                  <span className="font-medium text-sm text-[var(--text-primary)]">
                    {selectedEndorsementType === "add_vehicle" ? "Vehicles to Add" : "Vehicles to Remove"}
                  </span>
                </div>
              </div>

              {/* Bulk Upload */}
              <div className="px-4 py-3 border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-3">
                  <Upload size={16} className="text-[var(--text-secondary)]" />
                  <span className="text-sm text-[var(--text-secondary)]">Bulk upload</span>
                  <button className="text-sm text-[var(--accent-primary)] hover:underline">
                    Download Template
                  </button>
                  <BrokerButton variant="secondary" size="sm" leftIcon={<Upload size={14} />}>
                    Upload
                  </BrokerButton>
                </div>
              </div>

              {/* Manual Add */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] mb-1">Plate No. *</label>
                    <input
                      type="text"
                      placeholder="e.g. 3-AA-12345"
                      className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] mb-1">Make / Model</label>
                    <input
                      type="text"
                      placeholder="e.g. Toyota Hilux"
                      className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] mb-1">Sum Insured *</label>
                    <input
                      type="text"
                      placeholder="ETB 0.00"
                      className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                  </div>
                </div>
                <BrokerButton variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
                  Add Another Vehicle
                </BrokerButton>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Reason for Endorsement
            </label>
            <textarea
              placeholder="Describe the reason for this endorsement request..."
              rows={3}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>

          {/* Supporting Documents */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Supporting Documents
            </label>
            <div className="border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] p-6 text-center">
              <FileText size={24} className="mx-auto text-[var(--text-tertiary)] mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Drag & drop or <span className="text-[var(--accent-primary)] cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Vehicle registrations, purchase invoices, etc.</p>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
