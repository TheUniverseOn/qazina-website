"use client";

import { use, useState } from "react";
import {
  Download,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Plus,
  Send,
  ChevronDown,
  X,
  Receipt,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  FormModal,
} from "@/components/broker";
import {
  RecordEndorsementResponseForm,
  RejectEndorsementForm,
} from "@/components/broker/modals";

// Types
type EndorsementStatus = "requested" | "awaiting_docs" | "submitted_to_insurer" | "issued" | "delivered" | "closed" | "rejected";

interface Vehicle {
  id: string;
  plateNo: string;
  makeModel: string;
  year: number;
  chassisNumber: string;
  engineNumber: string;
  vehicleValue: string;
  action: "add" | "remove" | "existing";
}

// Mock data
const endorsementData = {
  id: "END-2027-0034",
  policyNumber: "POL-2027-0012",
  businessName: "Motor Fleet Insurance",
  businessId: "BUS-012-9234",
  status: "submitted_to_insurer" as EndorsementStatus,
  type: "add_vehicle",
  typeLabel: "Add Vehicle",
  requestDate: "Jan 28, 2027",
  effectiveDate: "Feb 15, 2027",
  insurer: "Nyala Insurance S.C",
  requestedBy: "Asheber Kebede (Safari Tours)",
  additionalPremium: 40700,
  stampDuty: 450,
  vat: 6117.50,
  totalAdditionalPremium: 52267.50,
  reason: "Client acquired 2 new delivery trucks for fleet expansion",
};

const statusConfig: Record<EndorsementStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "info" },
  awaiting_docs: { label: "Awaiting Docs", variant: "warning" },
  submitted_to_insurer: { label: "Submitted to Insurer", variant: "warning" },
  issued: { label: "Issued", variant: "success" },
  delivered: { label: "Delivered", variant: "success" },
  closed: { label: "Closed", variant: "neutral" },
  rejected: { label: "Rejected", variant: "error" },
};

const vehicles: Vehicle[] = [
  { id: "1", plateNo: "3-AA-15145", makeModel: "Toyota Land Cruiser Prado", year: 2024, chassisNumber: "JTEBH3FJ90K123456", engineNumber: "2TR-5784321", vehicleValue: "ETB 4,500,000", action: "add" },
];

const documents = [
  { id: "1", name: "Vehicle_Registration_3-AA-99001.pdf", uploadedAt: "Jan 28, 2027 - 2:30 PM" },
  { id: "2", name: "Vehicle_Registration_3-AA-99002.pdf", uploadedAt: "Jan 28, 2027 - 2:35 PM" },
  { id: "3", name: "Vehicle_Registration_3-AA-99003.pdf", uploadedAt: "Jan 28, 2027 - 2:40 PM" },
  { id: "4", name: "Purchase_Invoice.pdf", uploadedAt: "Jan 28, 2027 - 2:45 PM" },
];

const activities = [
  {
    id: "1",
    title: "Pending Approval",
    description: "Waiting for insurer approval",
    timestamp: "",
    iconColor: "warning" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "2",
    title: "Premium Calculated",
    description: "ETB 52,267.50 by John",
    timestamp: "",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "3",
    title: "Documents Verified",
    timestamp: "Yesterday at 10:45 AM",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "4",
    title: "Request Created",
    timestamp: "",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
];

export default function EndorsementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showResponseDropdown, setShowResponseDropdown] = useState(false);
  const [showRecordResponseModal, setShowRecordResponseModal] = useState(false);
  const [showRejectEndorsementModal, setShowRejectEndorsementModal] = useState(false);

  const statusInfo = statusConfig[endorsementData.status];

  // Vehicle info is displayed as a grid, not a table
  const vehicleInfo = vehicles[0]; // For single vehicle endorsement

  // Render action buttons based on endorsement status
  const renderActions = () => {
    switch (endorsementData.status) {
      case "requested":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<FileText size={16} />}>
              Request Documents
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Submit to Insurer
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
      case "submitted_to_insurer":
        return (
          <div className="relative">
            <BrokerButton
              variant="primary"
              onClick={() => setShowResponseDropdown(!showResponseDropdown)}
            >
              Record Insurer Response
              <ChevronDown size={16} className="ml-2" />
            </BrokerButton>
            {showResponseDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-[var(--radius-md)] shadow-lg border border-[var(--bg-border)] z-10">
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--status-success)]" />
                  Issued — premium confirmed
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                  <CheckCircle2 size={16} className="text-[var(--status-warning)]" />
                  Issued — premium adjusted
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                  <X size={16} className="text-[var(--status-error)]" />
                  Rejected — reason required
                </button>
              </div>
            )}
          </div>
        );
      case "issued":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<Receipt size={16} />}>
              Create Invoice
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<CheckCircle2 size={16} />}>
              Mark Delivered
            </BrokerButton>
          </>
        );
      case "delivered":
        return (
          <BrokerButton variant="primary" leftIcon={<CheckCircle2 size={16} />}>
            Close
          </BrokerButton>
        );
      case "closed":
      case "rejected":
        // No actions for terminal states
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Endorsements", href: "/broker/endorsements" },
          { label: endorsementData.id },
        ]}
        title={endorsementData.id}
        subtitle={`${endorsementData.typeLabel} Endorsement`}
        badge={<StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>}
        actions={
          <>
            {renderActions()}
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowRecordResponseModal(true)}>
              Record Response
            </BrokerButton>
            <BrokerButton variant="danger" size="sm" onClick={() => setShowRejectEndorsementModal(true)}>
              Reject Endorsement
            </BrokerButton>
            <BrokerButton variant="ghost" size="sm">
              <MoreHorizontal size={20} />
            </BrokerButton>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Endorsement Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Endorsement Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Policy Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Insurer</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.insurer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Endorsement Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.typeLabel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Request Date</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Effective Date</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.effectiveDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Requested By</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.requestedBy}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--bg-border)]">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Reason for Endorsement</p>
                  <p className="text-[var(--text-primary)]">{endorsementData.reason}</p>
                </div>
                {/* Premium Adjustment */}
                <div className="mt-6 pt-6 border-t border-[var(--bg-border)]">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Premium Adjustment</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Additional Premium (Pro-rata)</span>
                      <span className="font-medium text-[var(--text-primary)]">ETB {endorsementData.additionalPremium.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Stamp Duty</span>
                      <span className="font-medium text-[var(--text-primary)]">ETB {endorsementData.stampDuty.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">VAT (15%)</span>
                      <span className="font-medium text-[var(--text-primary)]">ETB {endorsementData.vat.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--bg-border)]">
                      <span className="text-lg font-medium text-[var(--text-primary)]">Total Additional Premium</span>
                      <span className="text-xl font-bold text-[var(--status-success)]">ETB {endorsementData.totalAdditionalPremium.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Vehicle Information */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">New Vehicle Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Make / Model</p>
                    <p className="font-medium text-[var(--text-primary)]">{vehicleInfo.makeModel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Year</p>
                    <p className="font-medium text-[var(--text-primary)]">{vehicleInfo.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Chassis Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{vehicleInfo.chassisNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Engine Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{vehicleInfo.engineNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Vehicle Value</p>
                    <p className="font-medium text-[var(--text-primary)]">{vehicleInfo.vehicleValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Activity Timeline</h2>
              </div>
              <div className="px-5 divide-y divide-[var(--bg-border)]">
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

            {/* Documents */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Documents</h2>
                <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  + Add
                </button>
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
      </div>
      {/* Record Response Modal */}
      <FormModal
        isOpen={showRecordResponseModal}
        onClose={() => setShowRecordResponseModal(false)}
        onSubmit={() => setShowRecordResponseModal(false)}
        title="Record Endorsement Response"
        submitLabel="Record Response"
      >
        <RecordEndorsementResponseForm />
      </FormModal>

      {/* Reject Endorsement Modal */}
      <FormModal
        isOpen={showRejectEndorsementModal}
        onClose={() => setShowRejectEndorsementModal(false)}
        onSubmit={() => setShowRejectEndorsementModal(false)}
        title="Reject Endorsement"
        submitLabel="Reject Endorsement"
        variant="destructive"
      >
        <RejectEndorsementForm />
      </FormModal>
    </div>
  );
}
