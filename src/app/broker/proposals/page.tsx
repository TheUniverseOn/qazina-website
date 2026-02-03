"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, Download, Check, AlertCircle, ClipboardList } from "lucide-react";
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
interface Proposal {
  id: string;
  businessName: string;
  businessId: string;
  vehicleCount: number;
  docsStatus: "complete" | "pending";
  status: "draft" | "awaiting_docs" | "awaiting_insurer" | "quoted" | "awaiting_client" | "bound" | "lost";
  sla: string;
  owner: string;
}

// Mock data
const proposals: Proposal[] = [
  {
    id: "PRO-2027-0012",
    businessName: "ABC Fleet Services",
    businessId: "PRO-2027-0012",
    vehicleCount: 24,
    docsStatus: "complete",
    status: "quoted",
    sla: "2d left",
    owner: "Eve",
  },
  {
    id: "PRO-2027-0015",
    businessName: "XYZ Logistics PLC",
    businessId: "PRO-2027-0015",
    vehicleCount: 12,
    docsStatus: "pending",
    status: "awaiting_insurer",
    sla: "4h left",
    owner: "Eve",
  },
  {
    id: "PRO-2027-0018",
    businessName: "Metro Transport Co.",
    businessId: "PRO-2027-0018",
    vehicleCount: 8,
    docsStatus: "complete",
    status: "draft",
    sla: "—",
    owner: "—",
  },
  {
    id: "PRO-2027-0021",
    businessName: "Nile Distribution",
    businessId: "PRO-2027-0021",
    vehicleCount: 45,
    docsStatus: "complete",
    status: "awaiting_client",
    sla: "5d left",
    owner: "Eve",
  },
  {
    id: "PRO-2027-0009",
    businessName: "Addis Freight Lines",
    businessId: "PRO-2027-0009",
    vehicleCount: 16,
    docsStatus: "pending",
    status: "awaiting_docs",
    sla: "2d overdue",
    owner: "Eve",
  },
  {
    id: "PRO-2027-0023",
    businessName: "Highland Motors Ltd",
    businessId: "PRO-2027-0023",
    vehicleCount: 32,
    docsStatus: "complete",
    status: "bound",
    sla: "3d left",
    owner: "Eve",
  },
];

const tabs = [
  { id: "all", label: "All", count: 24 },
  { id: "draft", label: "Draft", count: 3 },
  { id: "awaiting_docs", label: "Awaiting Docs", count: 2 },
  { id: "awaiting_insurer", label: "Awaiting Insurer", count: 5 },
  { id: "quoted", label: "Quoted", count: 4 },
  { id: "awaiting_client", label: "Awaiting Client", count: 5 },
  { id: "bound", label: "Bound", count: 4 },
  { id: "lost", label: "Lost", count: 1 },
];

const statusConfig: Record<Proposal["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  draft: { label: "Draft", variant: "neutral" },
  awaiting_docs: { label: "Awaiting Docs", variant: "warning" },
  awaiting_insurer: { label: "Awaiting Insurer", variant: "warning" },
  quoted: { label: "Quoted", variant: "success" },
  awaiting_client: { label: "Awaiting Client", variant: "warning" },
  bound: { label: "Bound", variant: "success" },
  lost: { label: "Lost", variant: "neutral" },
};

export default function ProposalsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Column<Proposal>[] = [
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
      header: "#Vehicles",
      width: "90px",
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
    {
      key: "docsStatus",
      header: "Items",
      width: "70px",
      render: (row) => (
        row.docsStatus === "complete" ? (
          <Check size={16} className="text-[var(--status-success)]" />
        ) : (
          <AlertCircle size={16} className="text-[var(--status-warning)]" />
        )
      ),
    },
    {
      key: "sla",
      header: "RIA",
      width: "100px",
      render: (row) => (
        <span className={
          row.sla.includes("overdue") ? "text-[var(--status-error)]" :
          row.sla.includes("h left") ? "text-[var(--status-warning)]" :
          "text-[var(--status-success)]"
        }>
          {row.sla}
        </span>
      ),
    },
    {
      key: "owner",
      header: "Client",
      width: "100px",
    },
  ];

  const filteredProposals = proposals.filter((p) => {
    const matchesTab = activeTab === "all" || p.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/broker" },
          { label: "Proposals" },
        ]}
        title="Proposals"
        subtitle="24 total"
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Filter size={16} />}>
              Filter
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />} onClick={() => router.push("/broker/proposals/new")}>
              Create RFQ
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
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {filteredProposals.length === 0 ? (
            <EmptyState
              icon={<ClipboardList size={28} className="text-[var(--text-tertiary)]" />}
              title={searchQuery || activeTab !== "all" ? "No proposals match your search" : "No proposals yet"}
              description={searchQuery || activeTab !== "all" ? undefined : "Create a new proposal to get started"}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredProposals}
              onRowClick={(row) => router.push(`/broker/proposals/${row.id}`)}
              currentPage={1}
              totalPages={3}
              totalItems={24}
            />
          )}
        </div>
      </div>
    </div>
  );
}
