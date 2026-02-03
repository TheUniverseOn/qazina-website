"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, Download, AlertCircle, RefreshCw, Shield } from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
  EmptyState,
} from "@/components/broker";

// Types
interface Policy {
  id: string;
  policyNumber: string;
  businessName: string;
  businessId: string;
  vehicleCount: number;
  status: "policy_awaited" | "issued" | "delivered" | "active" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid";
  expiryDate: string;
  premium: string;
  daysToExpiry?: number;
  renewalStarted?: boolean;
}

// Mock data
const policies: Policy[] = [
  {
    id: "1",
    policyNumber: "POL-2027-0012",
    businessName: "ABC Fleet Services",
    businessId: "BUS-012-9234",
    vehicleCount: 24,
    status: "active",
    paymentStatus: "paid",
    expiryDate: "Jan 31, 2027",
    premium: "ETB 481,200",
    daysToExpiry: 365,
  },
  {
    id: "2",
    policyNumber: "POL-2027-0089",
    businessName: "KYT Logistics PLC",
    businessId: "BUS-2027-0346",
    vehicleCount: 12,
    status: "active",
    paymentStatus: "partial",
    expiryDate: "Feb 15, 2027",
    premium: "ETB 156,000",
    daysToExpiry: 15,
    renewalStarted: true,
  },
  {
    id: "3",
    policyNumber: "POL-2027-0156",
    businessName: "Metro Transport Co.",
    businessId: "BUS-2027-0347",
    vehicleCount: 8,
    status: "issued",
    paymentStatus: "unpaid",
    expiryDate: "Mar 10, 2027",
    premium: "ETB 98,400",
  },
  {
    id: "4",
    policyNumber: "POL-2027-0003",
    businessName: "Nile Distribution",
    businessId: "BUS-2027-0521",
    vehicleCount: 45,
    status: "delivered",
    paymentStatus: "paid",
    expiryDate: "Dec 31, 2027",
    premium: "ETB 890,500",
    daysToExpiry: 335,
  },
  {
    id: "5",
    policyNumber: "POL-2027-0201",
    businessName: "Azalu Freight Lines",
    businessId: "BUS-2027-0048",
    vehicleCount: 6,
    status: "cancelled",
    paymentStatus: "unpaid",
    expiryDate: "-",
    premium: "ETB 72,000",
  },
  {
    id: "6",
    policyNumber: "POL-2027-0210",
    businessName: "Selam Tours Ethiopia",
    businessId: "BUS-2027-0099",
    vehicleCount: 18,
    status: "policy_awaited",
    paymentStatus: "unpaid",
    expiryDate: "-",
    premium: "ETB 234,000",
  },
];

const tabs = [
  { id: "all", label: "All Policies", count: 45 },
  { id: "policy_awaited", label: "Policy Awaited", count: 3 },
  { id: "issued", label: "Issued", count: 5 },
  { id: "delivered", label: "Delivered", count: 4 },
  { id: "active", label: "Active", count: 32 },
  { id: "cancelled", label: "Cancelled", count: 1 },
];

const statusConfig: Record<Policy["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  policy_awaited: { label: "Policy Awaited", variant: "warning" },
  issued: { label: "Issued", variant: "info" },
  delivered: { label: "Delivered", variant: "info" },
  active: { label: "Active", variant: "success" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

const paymentStatusConfig: Record<Policy["paymentStatus"], { label: string; variant: "success" | "warning" | "error" }> = {
  paid: { label: "Paid", variant: "success" },
  partial: { label: "Partial", variant: "warning" },
  unpaid: { label: "Unpaid", variant: "error" },
};

export default function PoliciesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Column<Policy>[] = [
    {
      key: "policyNumber",
      header: "Policy #",
      width: "150px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.policyNumber}</span>
      ),
    },
    {
      key: "businessName",
      header: "Business",
      render: (row) => (
        <div>
          <p className="font-medium text-[var(--text-primary)]">{row.businessName}</p>
          <p className="text-xs text-[var(--text-secondary)]">{row.businessId}</p>
        </div>
      ),
    },
    {
      key: "vehicleCount",
      header: "Vehicles",
      width: "80px",
      render: (row) => (
        <span className="text-[var(--text-primary)]">{row.vehicleCount}</span>
      ),
    },
    {
      key: "premium",
      header: "Premium",
      width: "130px",
    },
    {
      key: "paymentStatus",
      header: "Payment",
      width: "100px",
      render: (row) => {
        const config = paymentStatusConfig[row.paymentStatus];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "expiryDate",
      header: "Expiry",
      width: "160px",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-primary)]">{row.expiryDate}</span>
          {row.daysToExpiry !== undefined && row.daysToExpiry <= 30 && row.daysToExpiry > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--status-warning)]/10 text-[var(--status-warning)]">
              <AlertCircle size={10} />
              {row.daysToExpiry}d
            </span>
          )}
          {row.renewalStarted && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--status-info)]/10 text-[var(--status-info)]">
              <RefreshCw size={10} />
              Renewal
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "140px",
      render: (row) => {
        const config = statusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
  ];

  const filteredPolicies = policies.filter((p) => {
    const matchesTab = activeTab === "all" || p.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/broker" },
          { label: "Policies" },
        ]}
        title="Policies"
        subtitle="45 total"
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Download size={16} />}>
              Export
            </BrokerButton>
            <BrokerButton variant="secondary" leftIcon={<Filter size={16} />}>
              Filter
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
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {filteredPolicies.length === 0 ? (
            <EmptyState
              icon={<Shield size={28} className="text-[var(--text-tertiary)]" />}
              title={searchQuery || activeTab !== "all" ? "No policies match your filters" : "No policies found"}
              description={searchQuery || activeTab !== "all" ? undefined : "Policies will appear here once proposals are accepted"}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredPolicies}
              onRowClick={(row) => router.push(`/broker/policies/${row.id}`)}
              currentPage={1}
              totalPages={5}
              totalItems={45}
            />
          )}
        </div>
      </div>
    </div>
  );
}
