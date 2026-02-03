"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileText } from "lucide-react";
import {
  PageHeader,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
} from "@/components/insured";

// Types
interface MotorCertificate {
  id: string;
  certificateNumber: string;
  policyNumber: string;
  vehicle: string;
  makeModel: string;
  status: "active" | "expiring_soon" | "expired";
  issued: string;
  expiry: string;
}

interface COI {
  id: string;
  coiNumber: string;
  holder: string;
  template: string;
  status: "active" | "expired";
  issued: string;
  expiry: string;
}

// Mock data
const motorCertificates: MotorCertificate[] = [
  { id: "1", certificateNumber: "CERT-2027-0892", policyNumber: "POL-2027-0012", vehicle: "3-AA-12345", makeModel: "Toyota Hilux 2023", status: "active", issued: "Feb 1, 2027", expiry: "Jan 31, 2027" },
  { id: "2", certificateNumber: "CERT-2027-0891", policyNumber: "POL-2027-0012", vehicle: "3-AA-23456", makeModel: "Isuzu NQR 2022", status: "active", issued: "Feb 1, 2027", expiry: "Jan 31, 2027" },
  { id: "3", certificateNumber: "CERT-2027-0890", policyNumber: "POL-2027-0012", vehicle: "3-AA-34567", makeModel: "Mitsubishi Fuso 2024", status: "expiring_soon", issued: "Mar 1, 2025", expiry: "Feb 28, 2027" },
  { id: "4", certificateNumber: "CERT-2025-0567", policyNumber: "POL-2025-0089", vehicle: "3-AA-45678", makeModel: "Toyota Land Cruiser 2021", status: "expired", issued: "Jan 15, 2025", expiry: "Jan 14, 2027" },
  { id: "5", certificateNumber: "CERT-2027-0888", policyNumber: "POL-2027-0012", vehicle: "3-AA-56742", makeModel: "Hyundai HD72 2023", status: "active", issued: "Jan 23, 2027", expiry: "Jan 22, 2027" },
];

const cois: COI[] = [
  { id: "coi-1", coiNumber: "COI-2027-0012", holder: "Ethio Telecom", template: "Tender", status: "active", issued: "Jan 27, 2027", expiry: "Jan 31, 2027" },
  { id: "coi-2", coiNumber: "COI-2027-0011", holder: "Commercial Bank of Ethiopia", template: "Bank", status: "active", issued: "Jan 26, 2027", expiry: "Jan 31, 2027" },
  { id: "coi-3", coiNumber: "COI-2027-0010", holder: "Bole Tower Management", template: "Landlord", status: "expired", issued: "Jan 25, 2025", expiry: "Jan 24, 2027" },
];

const typeTabs = [
  { id: "motor", label: "Motor Certificates" },
  { id: "coi", label: "COIs" },
];

const motorStatusTabs = [
  { id: "all", label: "All", count: 38 },
  { id: "active", label: "Active", count: 32 },
  { id: "expiring_soon", label: "Expiring Soon", count: 3 },
  { id: "expired", label: "Expired", count: 3 },
];

const coiStatusTabs = [
  { id: "all", label: "All", count: 3 },
  { id: "active", label: "Active", count: 2 },
  { id: "expired", label: "Expired", count: 1 },
];

const motorStatusConfig: Record<MotorCertificate["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  active: { label: "Active", variant: "success" },
  expiring_soon: { label: "Expiring Soon", variant: "warning" },
  expired: { label: "Expired", variant: "error" },
};

const coiStatusConfig: Record<COI["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  active: { label: "Active", variant: "success" },
  expired: { label: "Expired", variant: "error" },
};

export default function InsuredCertificatesPage() {
  const router = useRouter();
  const [certificateType, setCertificateType] = useState("motor");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTypeChange = (type: string) => {
    setCertificateType(type);
    setActiveTab("all");
  };

  const motorColumns: Column<MotorCertificate>[] = [
    {
      key: "certificateNumber",
      header: "Certificate No.",
      width: "160px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.certificateNumber}</span>
      ),
    },
    {
      key: "vehicle",
      header: "Plate No.",
      width: "120px",
    },
    {
      key: "makeModel",
      header: "Vehicle",
      width: "180px",
    },
    {
      key: "status",
      header: "Status",
      width: "130px",
      render: (row) => {
        const config = motorStatusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "issued",
      header: "Issued",
      width: "120px",
    },
    {
      key: "expiry",
      header: "Expiry",
      width: "120px",
    },
    {
      key: "id",
      header: "",
      width: "50px",
      render: () => (
        <button
          className="p-1.5 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={16} />
        </button>
      ),
    },
  ];

  const coiColumns: Column<COI>[] = [
    {
      key: "coiNumber",
      header: "COI No.",
      width: "140px",
      render: (row) => (
        <span className="font-medium text-[var(--text-primary)]">{row.coiNumber}</span>
      ),
    },
    {
      key: "holder",
      header: "Holder",
    },
    {
      key: "template",
      header: "Template",
      width: "120px",
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
      render: (row) => {
        const config = coiStatusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "expiry",
      header: "Expiry",
      width: "120px",
    },
    {
      key: "id",
      header: "",
      width: "50px",
      render: () => (
        <button
          className="p-1.5 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={16} />
        </button>
      ),
    },
  ];

  const filteredMotor = motorCertificates.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.makeModel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredCOIs = cois.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      c.coiNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.holder.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/insured" },
          { label: "Certificates" },
        ]}
        title="My Certificates"
        subtitle={certificateType === "motor" ? "38 motor certificates" : "3 COIs"}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Type Tabs */}
        <div className="px-4 sm:px-6 md:px-8 pt-4 border-b border-[var(--bg-border)]">
          <div className="flex gap-1 p-1 bg-[var(--bg-surface)] rounded-[var(--radius-md)] w-fit">
            {typeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTypeChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors ${
                  certificateType === tab.id
                    ? "bg-white text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 md:px-8 gap-3 sm:gap-0 border-b border-[var(--bg-border)]">
          <Tabs
            tabs={certificateType === "motor" ? motorStatusTabs : coiStatusTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <SearchInput
            placeholder={certificateType === "motor" ? "Search by plate no. or certificate..." : "Search COIs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pb-3 sm:pb-0"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          {certificateType === "motor" ? (
            <DataTable
              columns={motorColumns}
              data={filteredMotor}
              onRowClick={(row) => router.push(`/insured/certificates/${row.id}`)}
              currentPage={1}
              totalPages={4}
              totalItems={38}
            />
          ) : (
            <DataTable
              columns={coiColumns}
              data={filteredCOIs}
              onRowClick={(row) => router.push(`/insured/certificates/${row.id}`)}
              currentPage={1}
              totalPages={1}
              totalItems={3}
            />
          )}
        </div>
      </div>
    </div>
  );
}
