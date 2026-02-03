"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import {
  PageHeader,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
} from "@/components/insured";

interface Proposal {
  id: string;
  referenceNumber: string;
  coverageType: string;
  vehicleCount: number;
  status: "submitted" | "under_review" | "quotes_ready" | "accepted" | "expired";
  submittedDate: string;
  quotesCount: number;
}

const proposals: Proposal[] = [
  {
    id: "1",
    referenceNumber: "PRO-2027-0012",
    coverageType: "Comprehensive Motor",
    vehicleCount: 24,
    status: "quotes_ready",
    submittedDate: "Jan 24, 2027",
    quotesCount: 2,
  },
  {
    id: "2",
    referenceNumber: "PRO-2027-0008",
    coverageType: "Third Party",
    vehicleCount: 8,
    status: "under_review",
    submittedDate: "Jan 18, 2027",
    quotesCount: 0,
  },
  {
    id: "3",
    referenceNumber: "PRO-2027-0003",
    coverageType: "Comprehensive Motor",
    vehicleCount: 12,
    status: "accepted",
    submittedDate: "Jan 5, 2027",
    quotesCount: 3,
  },
];

const tabs = [
  { id: "all", label: "All", count: 3 },
  { id: "under_review", label: "Under Review", count: 1 },
  { id: "quotes_ready", label: "Quotes Ready", count: 1 },
  { id: "accepted", label: "Accepted", count: 1 },
];

const statusConfig: Record<Proposal["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  quotes_ready: { label: "Quotes Ready", variant: "success" },
  accepted: { label: "Accepted", variant: "success" },
  expired: { label: "Expired", variant: "neutral" },
};

export default function InsuredProposalsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Column<Proposal>[] = [
    {
      key: "referenceNumber",
      header: "Reference",
      width: "160px",
      render: (row) => <span className="font-medium text-[var(--text-primary)]">{row.referenceNumber}</span>,
    },
    { key: "coverageType", header: "Coverage" },
    { key: "vehicleCount", header: "Vehicles", width: "90px" },
    {
      key: "status",
      header: "Status",
      width: "140px",
      render: (row) => {
        const config = statusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    { key: "submittedDate", header: "Submitted", width: "130px" },
    {
      key: "quotesCount",
      header: "Quotes",
      width: "80px",
      render: (row) => (
        <span className={row.quotesCount > 0 ? "text-[var(--accent-primary)] font-medium" : "text-[var(--text-secondary)]"}>
          {row.quotesCount}
        </span>
      ),
    },
  ];

  const filteredProposals = proposals.filter((p) => {
    const matchesTab = activeTab === "all" || p.status === activeTab;
    const matchesSearch = searchQuery === "" || p.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/insured" },
          { label: "Proposals" },
        ]}
        title="My Proposals"
        subtitle="3 total"
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 md:px-8 gap-3 sm:gap-0 border-b border-[var(--bg-border)]">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <SearchInput
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredProposals}
            onRowClick={(row) => router.push(`/insured/proposals/${row.id}`)}
            currentPage={1}
            totalPages={1}
            totalItems={3}
          />
        </div>
      </div>
    </div>
  );
}
