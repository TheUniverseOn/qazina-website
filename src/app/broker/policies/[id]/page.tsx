"use client";

import { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Pencil,
  FilePlus,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Shield,
  Car,
  AlertCircle,
  Calendar,
  DollarSign,
  Plus,
  Send,
  Download,
  XCircle,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  KPICard,
  DataTable,
  Column,
  Tabs,
  FormModal,
} from "@/components/broker";
import { CancelPolicyForm, FileClaimForm } from "@/components/broker/modals";

// Types
interface Vehicle {
  id: string;
  plateNo: string;
  makeModel: string;
  year: number;
  sumInsured: string;
  premium: string;
}

interface Endorsement {
  id: string;
  type: string;
  status: "requested" | "submitted_to_insurer" | "issued" | "delivered" | "closed";
  date: string;
  description: string;
}

interface Certificate {
  id: string;
  vehiclePlate: string;
  type: "motor" | "coi";
  status: "requested" | "issued" | "delivered";
  issuedDate: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: string;
  status: "unpaid" | "proof_uploaded" | "verified" | "paid" | "rejected";
  dueDate: string;
}

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
}

// Mock data
const policyData = {
  id: "POL-2027-0012",
  businessName: "ABC Fleet Services",
  businessId: "BUS-012-9234",
  status: "active" as const,
  vehicleCount: 24,
  insurer: "Nyala Insurance S.C",
  policyPeriod: "Feb 1, 2027 – Jan 31, 2027",
  coverageType: "Comprehensive",
  totalPremium: "ETB 481,200.70",
  sumInsured: "ETB 9,624,014",
  daysRemaining: 337,
  nextPaymentDue: "Feb 15, 2027",
  paymentStatus: "Paid",
  commissionRate: "15%",
  commissionAmount: "ETB 72,180",
};

const vehicles: Vehicle[] = [
  { id: "1", plateNo: "3-AA-12345", makeModel: "Toyota Hilux", year: 2022, sumInsured: "ETB 2,250,000", premium: "ETB 31,500" },
  { id: "2", plateNo: "3-AA-24356", makeModel: "Isuzu NQR", year: 2021, sumInsured: "ETB 3,290,000", premium: "ETB 175,750" },
  { id: "3", plateNo: "3-AA-34567", makeModel: "Mitsubishi Fuso", year: 2020, sumInsured: "ETB 4,084,014", premium: "ETB 273,950" },
];

const endorsements: Endorsement[] = [
  { id: "END-2027-0034", type: "Add Vehicle", status: "submitted_to_insurer", date: "Jan 28, 2027", description: "Add 1 Toyota Land Cruiser Prado" },
  { id: "END-2027-0029", type: "Remove Vehicle", status: "closed", date: "Jan 15, 2027", description: "Remove 3-AA-99887 (written off)" },
];

const certificates: Certificate[] = [
  { id: "CERT-2027-0892", vehiclePlate: "3-AA-12345", type: "motor", status: "delivered", issuedDate: "Feb 1, 2027" },
  { id: "CERT-2027-0893", vehiclePlate: "3-AA-24356", type: "motor", status: "issued", issuedDate: "Feb 1, 2027" },
  { id: "COI-2027-0012", vehiclePlate: "—", type: "coi", status: "requested", issuedDate: "—" },
];

const invoicesList: Invoice[] = [
  { id: "INV-2027-0234", invoiceNumber: "INV-2027-0234", amount: "ETB 261,337.50", status: "paid", dueDate: "Feb 15, 2027" },
  { id: "INV-2027-0235", invoiceNumber: "INV-2027-0235", amount: "ETB 219,863.20", status: "unpaid", dueDate: "May 15, 2027" },
];

const documents: Document[] = [
  { id: "1", name: "Policy_Schedule.pdf", uploadedAt: "Feb 1, 2027 - 10:00 AM" },
  { id: "2", name: "Certificate_of_Insurance.pdf", uploadedAt: "Feb 1, 2027 - 10:15 AM" },
  { id: "3", name: "Vehicle_Schedule.xlsx", uploadedAt: "Jan 25, 2027 - 1:30 PM" },
];

const activities = [
  {
    id: "1",
    title: "Policy issued by Nyala Insurance",
    timestamp: "Feb 1, 2027",
    iconColor: "success" as const,
    icon: <Shield size={16} />,
  },
  {
    id: "2",
    title: "Payment received - Full premium",
    description: "ETB 481,200.70",
    timestamp: "Jan 30, 2027",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "3",
    title: "Endorsement request: Add Vehicle",
    description: "END-2027-0034",
    timestamp: "Jan 28, 2027",
    iconColor: "info" as const,
    icon: <Pencil size={16} />,
  },
  {
    id: "4",
    title: "Proposal accepted by client",
    timestamp: "Jan 29, 2027",
    iconColor: "info" as const,
    icon: <FileText size={16} />,
  },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "servicing", label: "Servicing", count: 5 },
  { id: "billing", label: "Billing", count: 2 },
  { id: "activity", label: "Activity" },
];

const endorsementStatusConfig: Record<Endorsement["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "info" },
  submitted_to_insurer: { label: "Submitted", variant: "warning" },
  issued: { label: "Issued", variant: "success" },
  delivered: { label: "Delivered", variant: "success" },
  closed: { label: "Closed", variant: "neutral" },
};

const certStatusConfig: Record<Certificate["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "warning" },
  issued: { label: "Issued", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
};

const invoiceStatusConfig: Record<Invoice["status"], { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  unpaid: { label: "Unpaid", variant: "error" },
  proof_uploaded: { label: "Proof Uploaded", variant: "warning" },
  verified: { label: "Verified", variant: "info" },
  paid: { label: "Paid", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

export default function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFileClaimModal, setShowFileClaimModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMoreMenu]);

  const vehicleColumns: Column<Vehicle>[] = [
    { key: "plateNo", header: "Plate No.", width: "120px" },
    { key: "makeModel", header: "Make / Model" },
    { key: "year", header: "Year", width: "80px" },
    { key: "sumInsured", header: "Sum Insured", width: "150px" },
    { key: "premium", header: "Premium", width: "150px" },
  ];

  const endorsementColumns: Column<Endorsement>[] = [
    { key: "id", header: "ID", width: "150px", render: (row) => <span className="font-medium text-[var(--text-primary)]">{row.id}</span> },
    { key: "type", header: "Type", width: "140px" },
    { key: "description", header: "Description" },
    { key: "date", header: "Date", width: "120px" },
    { key: "status", header: "Status", width: "130px", render: (row) => { const c = endorsementStatusConfig[row.status]; return <StatusChip variant={c.variant}>{c.label}</StatusChip>; } },
  ];

  const certColumns: Column<Certificate>[] = [
    { key: "id", header: "ID", width: "160px", render: (row) => <span className="font-medium text-[var(--text-primary)]">{row.id}</span> },
    { key: "vehiclePlate", header: "Vehicle", width: "120px" },
    { key: "type", header: "Type", width: "80px", render: (row) => <StatusChip variant={row.type === "coi" ? "info" : "neutral"}>{row.type === "coi" ? "COI" : "Motor"}</StatusChip> },
    { key: "issuedDate", header: "Issued", width: "120px" },
    { key: "status", header: "Status", width: "120px", render: (row) => { const c = certStatusConfig[row.status]; return <StatusChip variant={c.variant}>{c.label}</StatusChip>; } },
  ];

  const invoiceColumns: Column<Invoice>[] = [
    { key: "invoiceNumber", header: "Invoice #", width: "160px", render: (row) => <span className="font-medium text-[var(--text-primary)]">{row.invoiceNumber}</span> },
    { key: "amount", header: "Amount", width: "150px", render: (row) => <span className="font-medium">{row.amount}</span> },
    { key: "dueDate", header: "Due Date", width: "120px" },
    { key: "status", header: "Status", width: "130px", render: (row) => { const c = invoiceStatusConfig[row.status]; return <StatusChip variant={c.variant}>{c.label}</StatusChip>; } },
  ];

  const renderOverviewTab = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KPICard
          label="Total Premium"
          value={policyData.totalPremium}
          icon={<Shield size={20} />}
        />
        <KPICard
          label="Days Remaining"
          value={policyData.daysRemaining}
          subtitle="Expires Jan 31, 2027"
          icon={<Calendar size={20} />}
        />
        <KPICard
          label="Commission"
          value={policyData.commissionAmount}
          subtitle={`${policyData.commissionRate} rate`}
          icon={<CheckCircle2 size={20} />}
          variant="success"
        />
        <KPICard
          label="Claims"
          value="0"
          subtitle="No active claims"
          icon={<AlertCircle size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Policy Details Card */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Policy Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Insurer</p>
                  <p className="font-medium text-[var(--text-primary)]">{policyData.insurer}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Policy Period</p>
                  <p className="font-medium text-[var(--text-primary)]">{policyData.policyPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Coverage Type</p>
                  <p className="font-medium text-[var(--text-primary)]">{policyData.coverageType}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Total Sum Insured</p>
                  <p className="font-medium text-[var(--text-primary)]">{policyData.sumInsured}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Payment Status</p>
                  <p className="font-medium text-[var(--status-success)]">{policyData.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Next Payment Due</p>
                  <p className="font-medium text-[var(--text-primary)]">{policyData.nextPaymentDue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicles Card */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
              <div className="flex items-center gap-2">
                <Car size={20} className="text-[var(--text-secondary)]" />
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Covered Vehicles</h2>
                <span className="px-2 py-0.5 bg-[var(--bg-surface)] rounded text-sm text-[var(--text-secondary)]">
                  {policyData.vehicleCount}
                </span>
              </div>
              <button className="text-sm text-[var(--accent-primary)] hover:underline">
                View all vehicles
              </button>
            </div>
            <DataTable
              columns={vehicleColumns}
              data={vehicles}
              showPagination={false}
            />
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Documents */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
              <h2 className="font-semibold text-[var(--text-primary)]">Documents</h2>
            </div>
            <div className="p-4 space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-surface)] hover:bg-[var(--bg-divider)] cursor-pointer transition-colors"
                >
                  <FileText size={20} className="text-[var(--status-info)] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{doc.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{doc.uploadedAt}</p>
                  </div>
                  <Download size={16} className="text-[var(--text-tertiary)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderServicingTab = () => (
    <div className="space-y-6">
      {/* Endorsements */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Endorsements</h2>
          <BrokerButton variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
            New Endorsement
          </BrokerButton>
        </div>
        <DataTable
          columns={endorsementColumns}
          data={endorsements}
          showPagination={false}
        />
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Certificates</h2>
          <BrokerButton variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
            Request COI
          </BrokerButton>
        </div>
        <DataTable
          columns={certColumns}
          data={certificates}
          showPagination={false}
        />
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      {/* Invoices */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Invoices</h2>
          <BrokerButton variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
            Create Invoice
          </BrokerButton>
        </div>
        <DataTable
          columns={invoiceColumns}
          data={invoicesList}
          showPagination={false}
        />
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Payment Schedule</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)]">
              <div>
                <p className="font-medium text-[var(--text-primary)]">Installment 1 of 2</p>
                <p className="text-sm text-[var(--text-secondary)]">Due: Feb 15, 2027</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-[var(--text-primary)]">ETB 261,337.50</span>
                <StatusChip variant="success">Paid</StatusChip>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)]">
              <div>
                <p className="font-medium text-[var(--text-primary)]">Installment 2 of 2</p>
                <p className="text-sm text-[var(--text-secondary)]">Due: May 15, 2027</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-[var(--text-primary)]">ETB 219,863.20</span>
                <StatusChip variant="error">Unpaid</StatusChip>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--bg-border)] flex justify-between">
            <span className="text-[var(--text-secondary)]">Total Premium</span>
            <span className="font-bold text-[var(--text-primary)]">{policyData.totalPremium}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Activity Timeline</h2>
      </div>
      <div className="px-6 divide-y divide-[var(--bg-border)]">
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
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Policies", href: "/broker/policies" },
          { label: policyData.id },
        ]}
        title={policyData.businessName}
        subtitle={`${policyData.id} · ${policyData.vehicleCount} vehicles`}
        badge={<StatusChip variant="success">Active</StatusChip>}
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Award size={16} />} onClick={() => router.push("/broker/certificates")}>
              Certificates
            </BrokerButton>
            <BrokerButton variant="secondary" leftIcon={<Pencil size={16} />} onClick={() => router.push("/broker/endorsements")}>
              Endorsement
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<FilePlus size={16} />} onClick={() => setShowFileClaimModal(true)}>
              File Claim
            </BrokerButton>
            <div className="relative" ref={moreMenuRef}>
              <BrokerButton variant="ghost" size="sm" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                <MoreHorizontal size={20} />
              </BrokerButton>
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-[var(--radius-md)] border border-[var(--bg-border)] shadow-lg z-50 py-1">
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                    onClick={() => { setShowMoreMenu(false); }}
                  >
                    <Download size={14} className="text-[var(--text-secondary)]" />
                    Download Policy
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--status-error)] hover:bg-[var(--bg-surface)] transition-colors"
                    onClick={() => { setShowMoreMenu(false); setShowCancelModal(true); }}
                  >
                    <XCircle size={14} />
                    Cancel Policy
                  </button>
                </div>
              )}
            </div>
          </>
        }
      />

      {/* Tabs */}
      <div className="px-4 sm:px-6 md:px-8 border-b border-[var(--bg-border)] bg-white">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "servicing" && renderServicingTab()}
        {activeTab === "billing" && renderBillingTab()}
        {activeTab === "activity" && renderActivityTab()}
      </div>
      {/* File Claim Modal */}
      <FormModal
        isOpen={showFileClaimModal}
        onClose={() => setShowFileClaimModal(false)}
        onSubmit={() => setShowFileClaimModal(false)}
        title="File New Claim"
        submitLabel="File Claim"
      >
        <FileClaimForm />
      </FormModal>

      {/* Cancel Policy Modal */}
      <FormModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onSubmit={() => setShowCancelModal(false)}
        title="Cancel Policy"
        submitLabel="Cancel Policy"
        variant="destructive"
      >
        <CancelPolicyForm />
      </FormModal>
    </div>
  );
}
