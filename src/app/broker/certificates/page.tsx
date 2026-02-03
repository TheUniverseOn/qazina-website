"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, Upload, FileText, Car } from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  SearchInput,
  Tabs,
  DataTable,
  StatusChip,
  Column,
  Modal,
} from "@/components/broker";

// Types
interface MotorCertificate {
  id: string;
  certificateNumber: string;
  policyNumber: string;
  vehicle: string;
  status: "active" | "expired" | "revoked";
  holder: string;
  issued: string;
  expiry: string;
}

interface COI {
  id: string;
  coiNumber: string;
  holder: string;
  template: "Tender" | "Bank" | "Landlord" | "Vendor";
  status: "requested" | "issued" | "delivered";
  date: string;
  policy: string;
}

// Mock data - Motor Certificates
const motorCertificates: MotorCertificate[] = [
  {
    id: "1",
    certificateNumber: "CERT-2027-0892",
    policyNumber: "POL-2027-0012",
    vehicle: "3-AA-12345",
    status: "active",
    holder: "ABC Fleet Services",
    issued: "Feb 1, 2027",
    expiry: "Jan 31, 2027",
  },
  {
    id: "2",
    certificateNumber: "CERT-2027-0891",
    policyNumber: "POL-2027-0012",
    vehicle: "3-AA-23456",
    status: "active",
    holder: "ABC Fleet Services",
    issued: "Feb 1, 2027",
    expiry: "Jan 31, 2027",
  },
  {
    id: "3",
    certificateNumber: "CERT-2027-0890",
    policyNumber: "POL-2025-0089",
    vehicle: "3-AA-24567",
    status: "expired",
    holder: "Metro Fleet",
    issued: "Jan 15, 2025",
    expiry: "Jan 14, 2027",
  },
  {
    id: "4",
    certificateNumber: "CERT-2027-0889",
    policyNumber: "POL-2025-0156",
    vehicle: "3-AA-45678",
    status: "revoked",
    holder: "Nile Transport",
    issued: "Dec 10, 2025",
    expiry: "Dec 9, 2027",
  },
  {
    id: "5",
    certificateNumber: "CERT-2027-0888",
    policyNumber: "POL-2027-0178",
    vehicle: "3-AA-56742",
    status: "active",
    holder: "Swift Delivery",
    issued: "Jan 23, 2027",
    expiry: "Jan 22, 2027",
  },
];

// Mock data - COIs
const cois: COI[] = [
  {
    id: "coi-1",
    coiNumber: "COI-2027-0012",
    holder: "Ethio Telecom",
    template: "Tender",
    status: "delivered",
    date: "Jan 27, 2027",
    policy: "POL-2027-0012",
  },
  {
    id: "coi-2",
    coiNumber: "COI-2027-0011",
    holder: "Commercial Bank of Ethiopia",
    template: "Bank",
    status: "issued",
    date: "Jan 26, 2027",
    policy: "POL-2027-0012",
  },
  {
    id: "coi-3",
    coiNumber: "COI-2027-0010",
    holder: "Safari Lodge Properties",
    template: "Landlord",
    status: "requested",
    date: "Jan 25, 2027",
    policy: "POL-2027-0034",
  },
  {
    id: "coi-4",
    coiNumber: "COI-2027-0009",
    holder: "Ethiopian Airlines",
    template: "Vendor",
    status: "delivered",
    date: "Jan 24, 2027",
    policy: "POL-2027-0056",
  },
  {
    id: "coi-5",
    coiNumber: "COI-2027-0008",
    holder: "Dashen Bank",
    template: "Bank",
    status: "delivered",
    date: "Jan 23, 2027",
    policy: "POL-2027-0078",
  },
];

// Type tabs
const typeTabs = [
  { id: "motor", label: "Motor Certificates" },
  { id: "coi", label: "COIs (Third Party)" },
];

// Status tabs for Motor Certificates
const motorStatusTabs = [
  { id: "all", label: "All", count: 156 },
  { id: "active", label: "Active", count: 132 },
  { id: "expired", label: "Expired", count: 18 },
  { id: "revoked", label: "Revoked", count: 6 },
];

// Status tabs for COIs
const coiStatusTabs = [
  { id: "all", label: "All", count: 12 },
  { id: "requested", label: "Requested", count: 3 },
  { id: "issued", label: "Issued", count: 4 },
  { id: "delivered", label: "Delivered", count: 5 },
];

const motorStatusConfig: Record<MotorCertificate["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  active: { label: "Active", variant: "success" },
  expired: { label: "Expired", variant: "error" },
  revoked: { label: "Revoked", variant: "warning" },
};

const coiStatusConfig: Record<COI["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "info" },
  issued: { label: "Issued", variant: "success" },
  delivered: { label: "Delivered", variant: "success" },
};

// Mock policies for dropdown
const policies = [
  { id: "POL-2027-0012", name: "ABC Fleet Services - Motor Fleet", vehicles: 24 },
  { id: "POL-2027-0089", name: "KYT Logistics PLC - Motor Fleet", vehicles: 12 },
  { id: "POL-2027-0003", name: "Nile Distribution - Motor Fleet", vehicles: 45 },
];

// Mock vehicles for dropdown
const vehiclesInPolicy = [
  { id: "1", plateNo: "3-AA-12345", makeModel: "Toyota Hilux 2023" },
  { id: "2", plateNo: "3-AA-23456", makeModel: "Isuzu NQR 2022" },
  { id: "3", plateNo: "3-AA-34567", makeModel: "Mitsubishi Fuso 2024" },
];

// COI Templates
const coiTemplates = [
  { id: "tender", name: "Tender/Bid Bond" },
  { id: "bank", name: "Bank/Financial Institution" },
  { id: "landlord", name: "Landlord/Property Owner" },
  { id: "vendor", name: "Vendor/Supplier Agreement" },
  { id: "custom", name: "Custom Template" },
];

export default function CertificatesPage() {
  const router = useRouter();
  const [certificateType, setCertificateType] = useState("motor");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMotorCertModal, setShowMotorCertModal] = useState(false);
  const [showCOIModal, setShowCOIModal] = useState(false);

  // Reset status tab when switching certificate type
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
      key: "policyNumber",
      header: "Policy#",
      width: "140px",
      render: (row) => (
        <span className="text-[var(--text-secondary)]">{row.policyNumber}</span>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      width: "120px",
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
      render: (row) => {
        const config = motorStatusConfig[row.status];
        return <StatusChip variant={config.variant}>{config.label}</StatusChip>;
      },
    },
    {
      key: "holder",
      header: "Holder",
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
      key: "date",
      header: "Date",
      width: "120px",
    },
  ];

  const filteredMotorCertificates = motorCertificates.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredCOIs = cois.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      c.coiNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.template.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Operations", href: "/broker" },
          { label: "Certificates" },
        ]}
        title="Certificates"
        subtitle={certificateType === "motor" ? "156 motor certificates" : "12 COIs"}
        actions={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowCOIModal(true)}>
              Request COI
            </BrokerButton>
            <BrokerButton
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowMotorCertModal(true)}
            >
              Issue Motor Certificate
            </BrokerButton>
          </>
        }
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
            placeholder={certificateType === "motor" ? "Search certificates..." : "Search COIs..."}
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
              data={filteredMotorCertificates}
              onRowClick={(row) => router.push(`/broker/certificates/${row.id}`)}
              currentPage={1}
              totalPages={8}
              totalItems={156}
            />
          ) : (
            <DataTable
              columns={coiColumns}
              data={filteredCOIs}
              onRowClick={(row) => router.push(`/broker/certificates/coi/${row.id}`)}
              currentPage={1}
              totalPages={1}
              totalItems={12}
            />
          )}
        </div>
      </div>

      {/* Issue Motor Certificate Modal */}
      <Modal
        isOpen={showMotorCertModal}
        onClose={() => setShowMotorCertModal(false)}
        title="Issue Motor Certificate"
        size="lg"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowMotorCertModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />}>
              Issue Certificate
            </BrokerButton>
          </>
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
                <option key={policy.id} value={policy.id}>
                  {policy.id} - {policy.name} ({policy.vehicles} vehicles)
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Select Vehicle *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Choose a vehicle...</option>
              {vehiclesInPolicy.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.plateNo} - {vehicle.makeModel}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Cover Type *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="comprehensive">Comprehensive</option>
              <option value="third_party">Third Party Only</option>
              <option value="third_party_fire_theft">Third Party, Fire & Theft</option>
            </select>
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Valid From *
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Valid Until *
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
              />
            </div>
          </div>

          {/* Upload Certificate Document */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Certificate Document (optional)
            </label>
            <div className="border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] p-6 text-center">
              <Upload size={24} className="mx-auto text-[var(--text-tertiary)] mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Drag & drop or <span className="text-[var(--accent-primary)] cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">PDF only, up to 5MB</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Notes
            </label>
            <textarea
              placeholder="Any additional notes..."
              rows={2}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Request COI Modal */}
      <Modal
        isOpen={showCOIModal}
        onClose={() => setShowCOIModal(false)}
        title="Request Certificate of Insurance"
        size="lg"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowCOIModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />}>
              Request COI
            </BrokerButton>
          </>
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
                <option key={policy.id} value={policy.id}>
                  {policy.id} - {policy.name}
                </option>
              ))}
            </select>
          </div>

          {/* Certificate Holder */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Certificate Holder Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Commercial Bank of Ethiopia"
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
            />
          </div>

          {/* Certificate Holder Address */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Certificate Holder Address
            </label>
            <textarea
              placeholder="Enter address..."
              rows={2}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Template *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Select template...</option>
              {coiTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Special Wording */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Special Wording / Requirements
            </label>
            <textarea
              placeholder="Any specific wording requirements for this COI..."
              rows={3}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Delivery Method *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Email to certificate holder</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" className="w-4 h-4" />
                <span className="text-sm">Physical delivery (courier)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" className="w-4 h-4" />
                <span className="text-sm">Client will pick up</span>
              </label>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm font-medium text-[var(--text-primary)]">Urgent Request</span>
              <span className="text-xs text-[var(--text-secondary)]">(prioritize processing)</span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
