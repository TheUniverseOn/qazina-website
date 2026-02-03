"use client";

import { use, useState } from "react";
import {
  Edit,
  Send,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Mail,
  Car,
  Download,
  Clock,
  Plus,
  AlertCircle,
  Check,
  Star,
  Building2,
  User,
  Calendar,
  Shield,
  Upload,
  Trash2,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  Tabs,
  DataTable,
  Column,
  Modal,
  FormModal,
  ConfirmModal,
} from "@/components/broker";
import {
  AddNoteForm,
  SendQuotesToClientForm,
  ReassignProposalForm,
  RecordInsurerDecisionForm,
} from "@/components/broker/modals";

// Types
interface Vehicle {
  id: string;
  plateNo: string;
  makeModel: string;
  year: number;
  sumInsured: string;
  premium: string;
  ctr: string;
}

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
  status?: "uploaded" | "pending";
}

interface MissingDocument {
  id: string;
  name: string;
  pendingCount?: number;
  uploaded?: boolean;
  uploadedAt?: string;
}

interface InsurerOutreach {
  id: string;
  name: string;
  status: "quoted" | "sent" | "no_response";
  date: string;
  note?: string;
}

interface Quote {
  id: string;
  insurer: string;
  premium: string;
  coverage: string;
  deductible: string;
  paymentOptions: string;
  roadside: boolean;
  recommended?: boolean;
  document?: string;
}

// Mock data
const proposalData = {
  id: "PRO-2027-0012",
  businessName: "ABC Fleet Services PLC",
  businessContact: "Abebe Kebede",
  businessEmail: "abebe@abcfleet.com",
  status: "quoted" as const,
  vehicleCount: 24,
  insurer: "Nyala Insurance S.C",
  policyPeriod: "Feb 1, 2027 – Jan 31, 2027",
  coverageType: "Comprehensive Motor",
  totalPremium: "ETB 485,200",
  policyStatus: "2 days remaining",
  quoteValidUntil: "Jan 29, 2027",
  totalSumInsured: "ETB 48,500,000",
  vehicleMix: "SA 30%/P",
  submittedDate: "Jan 24, 2027",
  slaTarget: "Quote to client within 3 business days",
  slaRemaining: "2 days, 4 hours remaining",
};

const vehicles: Vehicle[] = [
  { id: "1", plateNo: "3-AA-12345", makeModel: "Toyota Hilux", year: 2023, sumInsured: "ETB 2,500,000", premium: "ETB 31,500", ctr: "0" },
  { id: "2", plateNo: "3-AA-23456", makeModel: "Isuzu NQR", year: 2022, sumInsured: "ETB 3,200,000", premium: "ETB 40,000", ctr: "250" },
  { id: "3", plateNo: "3-AA-34567", makeModel: "Mitsubishi Fuso", year: 2024, sumInsured: "ETB 4,800,000", premium: "ETB 60,000", ctr: "0" },
];

const documents: Document[] = [
  { id: "1", name: "Vehicle_Schedule.xlsx", uploadedAt: "Jan 25, 2027 - 1:30 PM", status: "uploaded" },
  { id: "2", name: "Quote_Awash_Insurance.pdf", uploadedAt: "Jan 26, 2027 - 10:15 AM", status: "uploaded" },
  { id: "3", name: "Quote_Nyala_Insurance.pdf", uploadedAt: "Jan 27, 2027 - 2:30 PM", status: "uploaded" },
];

const missingDocuments: MissingDocument[] = [
  { id: "1", name: "Vehicle registration cards", pendingCount: 3, uploaded: false },
  { id: "2", name: "Driver licenses", pendingCount: 5, uploaded: false },
  { id: "3", name: "Business license", uploaded: true, uploadedAt: "Jan 25" },
  { id: "4", name: "TIN certificate", uploaded: true, uploadedAt: "Jan 25" },
];

const insurerOutreach: InsurerOutreach[] = [
  { id: "1", name: "Awash Insurance", status: "quoted", date: "Jan 26" },
  { id: "2", name: "Nyala Insurance", status: "quoted", date: "Jan 27" },
  { id: "3", name: "Ethiopian Ins.", status: "sent", date: "Jan 25", note: "No response" },
];

const quotes: Quote[] = [
  {
    id: "1",
    insurer: "Awash Insurance",
    premium: "ETB 485,200",
    coverage: "ETB 48.5M",
    deductible: "ETB 10,000",
    paymentOptions: "Full / 2 inst.",
    roadside: true,
    recommended: true,
    document: "Quote_Awash_Insurance.pdf",
  },
  {
    id: "2",
    insurer: "Nyala Insurance",
    premium: "ETB 512,000",
    coverage: "ETB 48.5M",
    deductible: "ETB 15,000",
    paymentOptions: "Full only",
    roadside: true,
    document: "Quote_Nyala_Insurance.pdf",
  },
  {
    id: "3",
    insurer: "Ethiopian Ins.",
    premium: "Pending",
    coverage: "—",
    deductible: "—",
    paymentOptions: "—",
    roadside: false,
  },
];

const activities = [
  {
    id: "1",
    title: "Quote received from Nyala Insurance",
    description: "Quotation at 5.5% PA",
    timestamp: "5 hours ago",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "2",
    title: "Quote received from Awash Insurance",
    description: "Quotation at 5.2% PA - Recommended",
    timestamp: "1 day ago",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "3",
    title: "RFQ sent to 3 insurers",
    timestamp: "2 days ago",
    iconColor: "info" as const,
    icon: <Mail size={16} />,
  },
  {
    id: "4",
    title: "Vehicle schedule uploaded",
    timestamp: "3 days ago",
    iconColor: "neutral" as const,
    icon: <FileText size={16} />,
  },
  {
    id: "5",
    title: "Proposal created by Eve Broker",
    timestamp: "3 days ago",
    iconColor: "neutral" as const,
    icon: <FileText size={16} />,
  },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "quotes", label: "Quotes", count: 2 },
  { id: "files", label: "Files", count: 3 },
  { id: "activity", label: "Activity" },
];

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showRequestDocModal, setShowRequestDocModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showSendToClientModal, setShowSendToClientModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showRecordDecisionModal, setShowRecordDecisionModal] = useState(false);
  const [showDeleteProposalModal, setShowDeleteProposalModal] = useState(false);
  const [showRejectPaymentModal, setShowRejectPaymentModal] = useState(false);

  type ProposalStatus = "draft" | "submitted" | "awaiting_docs" | "awaiting_insurer" | "quoted" | "awaiting_client" | "bound" | "lost";

  // Status-dependent actions
  const renderStatusActions = () => {
    const status = proposalData.status as ProposalStatus;
    switch (status) {
      case "draft":
        return (
          <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
            Submit
          </BrokerButton>
        );
      case "submitted":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<FileText size={16} />} onClick={() => setShowRequestDocModal(true)}>
              Request Documents
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Send to Insurer
            </BrokerButton>
          </>
        );
      case "awaiting_docs":
        return (
          <>
            <BrokerButton variant="secondary">
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<CheckCircle2 size={16} />}>
              Documents Received
            </BrokerButton>
          </>
        );
      case "awaiting_insurer":
        return (
          <BrokerButton variant="primary" leftIcon={<Plus size={16} />} onClick={() => setShowAddQuoteModal(true)}>
            Add Quote
          </BrokerButton>
        );
      case "quoted":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<Plus size={16} />} onClick={() => setShowAddQuoteModal(true)}>
              Add Quote
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Send to Client
            </BrokerButton>
          </>
        );
      case "awaiting_client":
        return (
          <BrokerButton variant="primary" leftIcon={<CheckCircle2 size={16} />}>
            Record Decision
          </BrokerButton>
        );
      case "bound":
        return (
          <BrokerButton variant="primary" leftIcon={<Shield size={16} />}>
            Create Policy
          </BrokerButton>
        );
      case "lost":
        return null;
      default:
        return null;
    }
  };

  const statusVariantMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
    draft: "neutral",
    submitted: "info",
    awaiting_docs: "warning",
    awaiting_insurer: "warning",
    quoted: "success",
    awaiting_client: "warning",
    bound: "success",
    lost: "neutral",
  };

  const statusLabelMap: Record<string, string> = {
    draft: "Draft",
    submitted: "Submitted",
    awaiting_docs: "Awaiting Docs",
    awaiting_insurer: "Awaiting Insurer",
    quoted: "Quoted",
    awaiting_client: "Awaiting Client",
    bound: "Bound",
    lost: "Lost",
  };

  const vehicleColumns: Column<Vehicle>[] = [
    { key: "plateNo", header: "Plate No.", width: "120px" },
    { key: "makeModel", header: "Make / Model" },
    { key: "year", header: "Year", width: "80px" },
    { key: "sumInsured", header: "Sum Insured", width: "150px" },
    { key: "premium", header: "Premium", width: "150px" },
    { key: "ctr", header: "CTR", width: "80px" },
  ];

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        {/* RFQ Summary Card */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">RFQ Summary</h2>
            <BrokerButton variant="secondary" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </BrokerButton>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building2 size={18} className="text-[var(--text-tertiary)] mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Business</p>
                  <p className="font-medium text-[var(--text-primary)]">{proposalData.businessName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User size={18} className="text-[var(--text-tertiary)] mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Contact</p>
                  <p className="font-medium text-[var(--text-primary)]">{proposalData.businessContact}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{proposalData.businessEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Car size={18} className="text-[var(--text-tertiary)] mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Fleet Size</p>
                  <p className="font-medium text-[var(--text-primary)]">{proposalData.vehicleCount} vehicles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-[var(--text-tertiary)] mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Coverage</p>
                  <p className="font-medium text-[var(--text-primary)]">{proposalData.coverageType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-[var(--text-tertiary)] mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Submitted</p>
                  <p className="font-medium text-[var(--text-primary)]">{proposalData.submittedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Documents Card */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Missing Documents</h2>
            <BrokerButton variant="secondary" size="sm">
              Request All
            </BrokerButton>
          </div>
          <div className="p-4 space-y-2">
            {missingDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--bg-surface)]"
              >
                <div className="flex items-center gap-3">
                  {doc.uploaded ? (
                    <Check size={18} className="text-[var(--status-success)]" />
                  ) : (
                    <AlertCircle size={18} className="text-[var(--status-warning)]" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {doc.name}
                      {doc.pendingCount && !doc.uploaded && (
                        <span className="text-[var(--text-secondary)]"> ({doc.pendingCount} pending)</span>
                      )}
                    </p>
                    {doc.uploaded && doc.uploadedAt && (
                      <p className="text-xs text-[var(--text-tertiary)]">Uploaded {doc.uploadedAt}</p>
                    )}
                  </div>
                </div>
                {!doc.uploaded && (
                  <BrokerButton variant="ghost" size="sm">
                    Request
                  </BrokerButton>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Insurer Outreach Card */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Insurer Outreach</h2>
            <BrokerButton variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
              Add Insurer
            </BrokerButton>
          </div>
          <div className="divide-y divide-[var(--bg-border)]">
            {insurerOutreach.map((insurer) => (
              <div
                key={insurer.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-[var(--text-tertiary)]" />
                  <span className="font-medium text-[var(--text-primary)]">{insurer.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusChip variant={insurer.status === "quoted" ? "success" : "neutral"}>
                    {insurer.status === "quoted" ? "Quoted" : "Sent"}
                  </StatusChip>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {insurer.date}
                    {insurer.note && ` · ${insurer.note}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Tracking Card */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">SLA Tracking</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-[var(--text-secondary)] mb-2">Target: {proposalData.slaTarget}</p>
            <div className="flex items-center gap-2 text-[var(--status-success)]">
              <Clock size={18} />
              <span className="font-medium">{proposalData.slaRemaining}</span>
            </div>
            <div className="mt-4">
              <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1">
                Log Delay Reason
                <span className="text-xs">▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - 1 column */}
      <div className="space-y-6">
        {/* Activity */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
            <h2 className="font-semibold text-[var(--text-primary)]">Recent Activity</h2>
          </div>
          <div className="px-5 divide-y divide-[var(--bg-border)]">
            {activities.slice(0, 4).map((activity) => (
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
          <div className="px-5 py-3 border-t border-[var(--bg-border)]">
            <button
              onClick={() => setActiveTab("activity")}
              className="text-sm text-[var(--accent-primary)] hover:underline"
            >
              View all activity
            </button>
          </div>
        </div>

        {/* Vehicles Summary */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
            <div className="flex items-center gap-2">
              <Car size={18} className="text-[var(--text-secondary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Vehicles</h2>
              <span className="px-2 py-0.5 bg-[var(--bg-surface)] rounded text-sm text-[var(--text-secondary)]">
                {proposalData.vehicleCount}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--bg-surface)]"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{vehicle.plateNo}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{vehicle.makeModel} · {vehicle.year}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{vehicle.sumInsured}</p>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <button className="text-sm text-[var(--accent-primary)] hover:underline">
              View all {proposalData.vehicleCount} vehicles
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotesTab = () => (
    <div className="space-y-6">
      {/* Quotes Comparison Card */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Quotes ({quotes.filter(q => q.premium !== "Pending").length})</h2>
          <BrokerButton variant="secondary" size="sm" leftIcon={<Plus size={14} />} onClick={() => setShowAddQuoteModal(true)}>
            Add Quote
          </BrokerButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--bg-surface)]">
                <th className="text-left px-6 py-3 text-sm font-medium text-[var(--text-secondary)]"></th>
                {quotes.map((quote) => (
                  <th key={quote.id} className="text-left px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{quote.insurer}</span>
                      {quote.recommended && (
                        <Star size={14} className="text-[var(--status-warning)] fill-[var(--status-warning)]" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--bg-border)]">
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Premium</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm font-medium text-[var(--text-primary)]">
                    {quote.premium}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Coverage</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm text-[var(--text-primary)]">
                    {quote.coverage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Deductible</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm text-[var(--text-primary)]">
                    {quote.deductible}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Payment</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm text-[var(--text-primary)]">
                    {quote.paymentOptions}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Roadside</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm text-[var(--text-primary)]">
                    {quote.roadside ? (
                      <Check size={16} className="text-[var(--status-success)]" />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Document</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm">
                    {quote.document ? (
                      <button className="text-[var(--accent-primary)] hover:underline">View PDF</button>
                    ) : (
                      <span className="text-[var(--text-tertiary)]">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">Recommend</td>
                {quotes.map((quote) => (
                  <td key={quote.id} className="px-6 py-3 text-sm">
                    {quote.premium !== "Pending" && (
                      quote.recommended ? (
                        <span className="flex items-center gap-1 text-[var(--status-warning)]">
                          <Star size={14} className="fill-current" /> Recommended
                        </span>
                      ) : (
                        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                          Mark
                        </button>
                      )
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-[var(--bg-border)]">
          <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
            Send to Client for Review
          </BrokerButton>
        </div>
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-6">
      {/* Files Card */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Files ({documents.length})</h2>
          <BrokerButton variant="secondary" size="sm" leftIcon={<Upload size={14} />}>
            Upload
          </BrokerButton>
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

      {/* Vehicles Card */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
          <div className="flex items-center gap-2">
            <Car size={20} className="text-[var(--text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vehicles</h2>
            <span className="px-2 py-0.5 bg-[var(--bg-surface)] rounded text-sm text-[var(--text-secondary)]">
              {proposalData.vehicleCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-[var(--accent-primary)] hover:underline">
              Download Template
            </button>
            <BrokerButton variant="secondary" size="sm" leftIcon={<Upload size={14} />}>
              Upload Filled Template
            </BrokerButton>
          </div>
        </div>
        <DataTable
          columns={vehicleColumns}
          data={vehicles}
          showPagination={false}
        />
        <div className="px-6 py-4 border-t border-[var(--bg-border)] flex items-center justify-between">
          <BrokerButton variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
            Add Single Vehicle
          </BrokerButton>
          <button className="text-sm text-[var(--accent-primary)] hover:underline">
            View All
          </button>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      {/* Activity Card */}
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
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/broker/proposals" },
          { label: id },
        ]}
        title={proposalData.businessName}
        subtitle={`${proposalData.id} · ${proposalData.vehicleCount} vehicles`}
        badge={<StatusChip variant={statusVariantMap[proposalData.status] || "neutral"}>{statusLabelMap[proposalData.status] || proposalData.status}</StatusChip>}
        actions={
          <>
            {renderStatusActions()}
            <div className="relative">
              <BrokerButton variant="ghost" size="sm" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                <MoreHorizontal size={20} />
              </BrokerButton>
              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-[var(--radius-md)] shadow-lg border border-[var(--bg-border)] z-10">
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowAddQuoteModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Quote
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowRequestDocModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]"
                  >
                    <FileText size={16} />
                    Request Document
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowAddNoteModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]"
                  >
                    <FileText size={16} />
                    Add Note
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowSendToClientModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]"
                  >
                    <Send size={16} />
                    Send to Client
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowReassignModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]"
                  >
                    <Edit size={16} />
                    Reassign
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowRecordDecisionModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]"
                  >
                    <CheckCircle2 size={16} />
                    Record Insurer Decision
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                    <Download size={16} />
                    Export PDF
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowRejectPaymentModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 text-[var(--status-error)] border-t border-[var(--bg-border)]"
                  >
                    <AlertCircle size={16} />
                    Reject Payment Proof
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowRejectModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 text-[var(--status-error)] border-t border-[var(--bg-border)]"
                  >
                    <Trash2 size={16} />
                    Mark as Lost
                  </button>
                  <button
                    onClick={() => { setShowMoreMenu(false); setShowDeleteProposalModal(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 text-[var(--status-error)] border-t border-[var(--bg-border)]"
                  >
                    <Trash2 size={16} />
                    Delete Proposal
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
        {activeTab === "quotes" && renderQuotesTab()}
        {activeTab === "files" && renderFilesTab()}
        {activeTab === "activity" && renderActivityTab()}
      </div>

      {/* Add Quote Modal */}
      <Modal
        isOpen={showAddQuoteModal}
        onClose={() => setShowAddQuoteModal(false)}
        title="Add Quote"
        size="lg"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowAddQuoteModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Plus size={16} />}>
              Add Quote
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-5">
          {/* Insurer Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Insurer *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Select insurer...</option>
              <option value="awash">Awash Insurance S.C</option>
              <option value="nyala">Nyala Insurance S.C</option>
              <option value="ethiopian">Ethiopian Insurance Corporation</option>
              <option value="nib">NIB Insurance Company</option>
              <option value="united">United Insurance S.C</option>
            </select>
          </div>

          {/* Premium Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Total Premium *
              </label>
              <div className="flex">
                <span className="px-3 py-2 bg-[var(--bg-surface)] border border-r-0 border-[var(--bg-border)] rounded-l-[var(--radius-md)] text-sm text-[var(--text-secondary)]">
                  ETB
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 border border-[var(--bg-border)] rounded-r-[var(--radius-md)] text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Deductible *
              </label>
              <div className="flex">
                <span className="px-3 py-2 bg-[var(--bg-surface)] border border-r-0 border-[var(--bg-border)] rounded-l-[var(--radius-md)] text-sm text-[var(--text-secondary)]">
                  ETB
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 border border-[var(--bg-border)] rounded-r-[var(--radius-md)] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Coverage Type *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="comprehensive">Comprehensive</option>
              <option value="third_party">Third Party Only</option>
              <option value="third_party_fire_theft">Third Party, Fire & Theft</option>
            </select>
          </div>

          {/* Payment Options */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Full payment</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">2 installments</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">4 installments (quarterly)</span>
              </label>
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Inclusions
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Roadside Assistance</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Windscreen Cover</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Personal Accident Cover</span>
              </label>
            </div>
          </div>

          {/* Quote Document Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Quote Document
            </label>
            <div className="border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] p-6 text-center">
              <Upload size={24} className="mx-auto text-[var(--text-tertiary)] mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Drag & drop or <span className="text-[var(--accent-primary)] cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">PDF, up to 10MB</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Notes
            </label>
            <textarea
              placeholder="Any additional notes about this quote..."
              rows={3}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Mark as Lost Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Mark Proposal as Lost"
        size="sm"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowRejectModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="destructive">
              Mark as Lost
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--status-error)]/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-[var(--status-error)]" />
            </div>
            <p className="text-[var(--text-secondary)]">
              Are you sure you want to mark this proposal as lost? The client will be notified of this decision.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Reason
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Select reason...</option>
              <option value="price">Client chose lower price</option>
              <option value="competitor">Client went with competitor</option>
              <option value="cancelled">Client cancelled</option>
              <option value="no_response">No response from client</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Add Note Modal */}
      <FormModal
        isOpen={showAddNoteModal}
        onClose={() => setShowAddNoteModal(false)}
        onSubmit={() => setShowAddNoteModal(false)}
        title="Add Note"
        submitLabel="Add Note"
      >
        <AddNoteForm />
      </FormModal>

      {/* Send to Client Modal */}
      <FormModal
        isOpen={showSendToClientModal}
        onClose={() => setShowSendToClientModal(false)}
        onSubmit={() => setShowSendToClientModal(false)}
        title="Send Quotes to Client"
        submitLabel="Send to Client"
      >
        <SendQuotesToClientForm />
      </FormModal>

      {/* Reassign Modal */}
      <FormModal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
        onSubmit={() => setShowReassignModal(false)}
        title="Reassign Proposal"
        submitLabel="Reassign"
      >
        <ReassignProposalForm />
      </FormModal>

      {/* Record Insurer Decision Modal */}
      <FormModal
        isOpen={showRecordDecisionModal}
        onClose={() => setShowRecordDecisionModal(false)}
        onSubmit={() => setShowRecordDecisionModal(false)}
        title="Record Insurer Decision"
        submitLabel="Record Decision"
      >
        <RecordInsurerDecisionForm />
      </FormModal>

      {/* Delete Proposal Modal */}
      <ConfirmModal
        isOpen={showDeleteProposalModal}
        onClose={() => setShowDeleteProposalModal(false)}
        onConfirm={() => setShowDeleteProposalModal(false)}
        title="Delete Proposal"
        message="Are you sure you want to delete this proposal? This action cannot be undone."
        confirmLabel="Delete Proposal"
        variant="destructive"
      />

      {/* Reject Payment Proof Modal */}
      <ConfirmModal
        isOpen={showRejectPaymentModal}
        onClose={() => setShowRejectPaymentModal(false)}
        onConfirm={() => setShowRejectPaymentModal(false)}
        title="Reject Payment Proof"
        message="Are you sure you want to reject this payment proof?"
        confirmLabel="Reject Proof"
        variant="destructive"
      />

      {/* Request Document Modal */}
      <Modal
        isOpen={showRequestDocModal}
        onClose={() => setShowRequestDocModal(false)}
        title="Request Document"
        size="md"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowRequestDocModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Send Request
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Document Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Vehicle Registration Card, Driver's License"
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe what is needed and any specific requirements..."
              rows={3}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--text-secondary)]">Notify client via email</span>
          </label>
        </div>
      </Modal>
    </div>
  );
}
