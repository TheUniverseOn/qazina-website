"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, CreditCard } from "lucide-react";
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
interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  policyNumber: string;
  status: "unpaid" | "proof_uploaded" | "verified" | "paid" | "rejected";
  amount: string;
  dueDate: string;
}

// Mock data
const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2027-0234",
    client: "Ethio Transport",
    policyNumber: "POL-2027-0012",
    status: "unpaid",
    amount: "ETB 45,200",
    dueDate: "Feb 15, 2027",
  },
  {
    id: "2",
    invoiceNumber: "INV-2027-0233",
    client: "Delta Logistics",
    policyNumber: "POL-2027-0178",
    status: "paid",
    amount: "ETB 32,000",
    dueDate: "Jan 25, 2027",
  },
  {
    id: "3",
    invoiceNumber: "INV-2027-0232",
    client: "Quick Freight",
    policyNumber: "POL-2027-0089",
    status: "proof_uploaded",
    amount: "ETB 68,000",
    dueDate: "Jan 15, 2027",
  },
  {
    id: "4",
    invoiceNumber: "INV-2027-0231",
    client: "Muse Trading",
    policyNumber: "POL-2027-0156",
    status: "verified",
    amount: "ETB 54,500",
    dueDate: "Jan 20, 2027",
  },
  {
    id: "5",
    invoiceNumber: "INV-2027-0230",
    client: "Coast Motors",
    policyNumber: "POL-2027-0234",
    status: "rejected",
    amount: "ETB 42,000",
    dueDate: "Jan 28, 2027",
  },
];

const tabs = [
  { id: "all", label: "All", count: 145 },
  { id: "unpaid", label: "Unpaid", count: 23 },
  { id: "proof_uploaded", label: "Proof Uploaded", count: 12 },
  { id: "verified", label: "Verified", count: 8 },
  { id: "paid", label: "Paid", count: 98 },
  { id: "rejected", label: "Rejected", count: 4 },
];

const statusConfig: Record<Invoice["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  unpaid: { label: "Unpaid", variant: "error" },
  proof_uploaded: { label: "Proof Uploaded", variant: "warning" },
  verified: { label: "Verified", variant: "info" },
  paid: { label: "Paid", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

export default function BillingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Column<Invoice>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice No.",
      width: "150px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.invoiceNumber}</span>
      ),
    },
    {
      key: "client",
      header: "Client",
    },
    {
      key: "policyNumber",
      header: "Policy#",
      width: "140px",
      render: (row) => (
        <span className="text-[var(--text-secondary)]">{row.policyNumber}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
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
      key: "dueDate",
      header: "Due Date",
      width: "120px",
    },
  ];

  const filteredInvoices = invoices.filter((i) => {
    const matchesTab = activeTab === "all" || i.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Finance", href: "/broker" },
          { label: "Billing" },
        ]}
        title="Billing & Invoices"
        subtitle="145 total"
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Filter size={16} />}>
              Filter
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />}>
              Create Invoice
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
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {filteredInvoices.length === 0 ? (
            <EmptyState
              icon={<CreditCard size={28} className="text-[var(--text-tertiary)]" />}
              title={searchQuery || activeTab !== "all" ? "No invoices match your filters" : "No invoices yet"}
              description={searchQuery || activeTab !== "all" ? undefined : "Invoices and payment records will appear here"}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredInvoices}
              onRowClick={(row) => router.push(`/broker/billing/${row.id}`)}
              currentPage={1}
              totalPages={8}
              totalItems={145}
            />
          )}
        </div>
      </div>
    </div>
  );
}
