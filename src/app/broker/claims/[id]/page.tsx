"use client";

import { use, useState } from "react";
import {
  Download,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Car,
  Calendar,
  User,
  Image,
  Send,
  ChevronDown,
  Camera,
  X,
  DollarSign,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  Modal,
  FormModal,
} from "@/components/broker";
import {
  RequestEvidenceForm,
  SubmitClaimToInsurerForm,
  RecordSettlementForm,
} from "@/components/broker/modals";

// Types
type ClaimStatus = "reported" | "evidence_needed" | "submitted_to_insurer" | "in_review" | "approved" | "paid" | "denied";

// Mock data
const claimData = {
  id: "CLM-2027-0078",
  policyNumber: "POL-2027-0089",
  status: "submitted_to_insurer" as ClaimStatus,
  claimant: "Selam Tours Ethiopia PLC",
  claimType: "Vehicle Collision",
  reportedParty: "Insured",
  dateOfLoss: "Jan 21, 2027",
  coverage: "Comprehensive Motor",
  estimatedCost: "ETB 180,000",
  approvedAmount: "ETB 180,000",
  location: "Bole Road, near Edna Mall, Addis Ababa",
  description: "The insured vehicle (Toyota Land Cruiser, plate 3-AA-56789) was involved in a collision with another vehicle at Bole intersection. The incident occurred when the other vehicle ran a red light and struck the front passenger side of the insured vehicle. Police report filed (Report No. AA-2027-0452).",
  breakdown: {
    estimationReport: "ETB 165,000.00",
    towingCharges: "ETB 6,000.00",
    deductible: "-ETB 30,000.00",
    total: "ETB 180,000.00",
  },
};

const statusConfig: Record<ClaimStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  reported: { label: "Reported", variant: "info" },
  evidence_needed: { label: "Evidence Needed", variant: "warning" },
  submitted_to_insurer: { label: "Submitted to Insurer", variant: "warning" },
  in_review: { label: "In Review", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  paid: { label: "Paid", variant: "success" },
  denied: { label: "Denied", variant: "error" },
};

const timeline = [
  {
    id: "1",
    title: "Submitted to Insurer",
    description: "Awaiting insurer decision",
    timestamp: "Jan 25, 2027",
    iconColor: "info" as const,
    icon: <Send size={16} />,
    active: true,
  },
  {
    id: "2",
    title: "Evidence Received",
    description: "All required evidence verified",
    timestamp: "Jan 23, 2027",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "3",
    title: "Evidence Requested",
    description: "Additional photos requested",
    timestamp: "Jan 22, 2027",
    iconColor: "warning" as const,
    icon: <Camera size={16} />,
  },
  {
    id: "4",
    title: "Claim Reported",
    description: "Initial claim submitted by client",
    timestamp: "Jan 21, 2027",
    iconColor: "success" as const,
    icon: <AlertCircle size={16} />,
  },
];

const documents = [
  { id: "1", name: "Police_Report.pdf", uploadedAt: "Jan 21, 2027" },
  { id: "2", name: "Damage_Photos.zip", uploadedAt: "Jan 21, 2027" },
  { id: "3", name: "Repair_Estimate.pdf", uploadedAt: "Jan 23, 2027" },
  { id: "4", name: "Drivers_License.pdf", uploadedAt: "Jan 21, 2027" },
];

export default function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showDecisionDropdown, setShowDecisionDropdown] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showRequestEvidenceModal, setShowRequestEvidenceModal] = useState(false);
  const [showSubmitToInsurerModal, setShowSubmitToInsurerModal] = useState(false);
  const [showRecordSettlementModal, setShowRecordSettlementModal] = useState(false);

  const statusInfo = statusConfig[claimData.status];

  // Render action buttons based on claim status
  const renderActions = () => {
    switch (claimData.status) {
      case "reported":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<Camera size={16} />}>
              Request Evidence
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Submit to Insurer
            </BrokerButton>
          </>
        );
      case "evidence_needed":
        return (
          <>
            <BrokerButton variant="secondary">
              Cancel Claim
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<CheckCircle2 size={16} />}>
              Evidence Received
            </BrokerButton>
          </>
        );
      case "submitted_to_insurer":
      case "in_review":
        return (
          <div className="relative">
            <BrokerButton
              variant="primary"
              onClick={() => setShowDecisionDropdown(!showDecisionDropdown)}
            >
              Record Insurer Decision
              <ChevronDown size={16} className="ml-2" />
            </BrokerButton>
            {showDecisionDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-[var(--radius-md)] shadow-lg border border-[var(--bg-border)] z-10">
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--status-success)]" />
                  Approved — amount confirmed
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                  <CheckCircle2 size={16} className="text-[var(--status-warning)]" />
                  Approved — amount adjusted
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                  <X size={16} className="text-[var(--status-error)]" />
                  Denied — reason required
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg-surface)] flex items-center gap-2 border-t border-[var(--bg-border)]">
                  <AlertCircle size={16} className="text-[var(--status-warning)]" />
                  Additional Evidence Required
                </button>
              </div>
            )}
          </div>
        );
      case "approved":
        return (
          <BrokerButton variant="primary" leftIcon={<DollarSign size={16} />} onClick={() => setShowRecordPaymentModal(true)}>
            Record Payment
          </BrokerButton>
        );
      case "paid":
      case "denied":
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
          { label: "Claims", href: "/broker/claims" },
          { label: claimData.id },
        ]}
        title={claimData.id}
        subtitle={`${claimData.claimType} · ${claimData.claimant}`}
        badge={<StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>}
        actions={
          <>
            {renderActions()}
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowRequestEvidenceModal(true)} leftIcon={<Camera size={14} />}>
              Request Evidence
            </BrokerButton>
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowSubmitToInsurerModal(true)} leftIcon={<Send size={14} />}>
              Submit to Insurer
            </BrokerButton>
            <BrokerButton variant="primary" size="sm" onClick={() => setShowRecordSettlementModal(true)} leftIcon={<DollarSign size={14} />} style={{ backgroundColor: "var(--status-success)", borderColor: "var(--status-success)" }}>
              Record Settlement
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
            {/* Claim Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Claim Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Claim Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.claimType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Reported Party</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.reportedParty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Date of Loss</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.dateOfLoss}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Policy Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Coverage</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Claimant</p>
                    <p className="font-medium text-[var(--text-primary)]">{claimData.claimant}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Description Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Incident Description</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Location</p>
                  <p className="text-[var(--text-primary)]">{claimData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Description</p>
                  <p className="text-[var(--text-primary)] leading-relaxed">{claimData.description}</p>
                </div>
              </div>
            </div>

            {/* Claim Amount Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Claim Amount</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <tbody className="divide-y divide-[var(--bg-border)]">
                    <tr>
                      <td className="py-3 text-[var(--text-secondary)]">Estimation Report Cost</td>
                      <td className="py-3 text-right font-medium text-[var(--text-primary)]">{claimData.breakdown.estimationReport}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[var(--text-secondary)]">Towing Charges</td>
                      <td className="py-3 text-right font-medium text-[var(--text-primary)]">{claimData.breakdown.towingCharges}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[var(--text-secondary)]">Deductible</td>
                      <td className="py-3 text-right font-medium text-[var(--status-error)]">{claimData.breakdown.deductible}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[var(--bg-border)]">
                      <td className="py-4 text-lg font-semibold text-[var(--text-primary)]">Total Claim Amount</td>
                      <td className="py-4 text-right text-xl font-bold text-[var(--status-success)]">{claimData.breakdown.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Claim Timeline */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Claim Timeline</h2>
              </div>
              <div className="px-5 divide-y divide-[var(--bg-border)]">
                {timeline.map((item) => (
                  <ActivityItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    timestamp={item.timestamp}
                    iconColor={item.iconColor}
                    icon={item.icon}
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

      {/* Request Evidence Modal */}
      <FormModal
        isOpen={showRequestEvidenceModal}
        onClose={() => setShowRequestEvidenceModal(false)}
        onSubmit={() => setShowRequestEvidenceModal(false)}
        title="Request Evidence"
        submitLabel="Send Request"
      >
        <RequestEvidenceForm />
      </FormModal>

      {/* Submit to Insurer Modal */}
      <FormModal
        isOpen={showSubmitToInsurerModal}
        onClose={() => setShowSubmitToInsurerModal(false)}
        onSubmit={() => setShowSubmitToInsurerModal(false)}
        title="Submit Claim to Insurer"
        submitLabel="Submit to Insurer"
      >
        <SubmitClaimToInsurerForm />
      </FormModal>

      {/* Record Settlement Modal */}
      <FormModal
        isOpen={showRecordSettlementModal}
        onClose={() => setShowRecordSettlementModal(false)}
        onSubmit={() => setShowRecordSettlementModal(false)}
        title="Record Settlement"
        submitLabel="Record Settlement"
        variant="green"
      >
        <RecordSettlementForm />
      </FormModal>

      {/* Record Payment Modal */}
      <Modal
        isOpen={showRecordPaymentModal}
        onClose={() => setShowRecordPaymentModal(false)}
        title="Record Claim Payment"
        size="md"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowRecordPaymentModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<DollarSign size={16} />}>
              Record Payment
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-5">
          {/* Claim Summary */}
          <div className="p-4 bg-[var(--bg-surface)] rounded-[var(--radius-md)]">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[var(--text-secondary)]">Claim ID:</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{claimData.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[var(--text-secondary)]">Approved Amount:</span>
              <span className="text-sm font-medium text-[var(--status-success)]">{claimData.approvedAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Claimant:</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{claimData.claimant}</span>
            </div>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Amount *
            </label>
            <div className="flex">
              <span className="px-3 py-2 bg-[var(--bg-surface)] border border-r-0 border-[var(--bg-border)] rounded-l-[var(--radius-md)] text-sm text-[var(--text-secondary)]">
                ETB
              </span>
              <input
                type="text"
                placeholder="0.00"
                defaultValue="180,000.00"
                className="flex-1 px-3 py-2 border border-[var(--bg-border)] rounded-r-[var(--radius-md)] text-sm"
              />
            </div>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Date *
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
            />
          </div>

          {/* Payment Reference */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Reference / Transaction ID
            </label>
            <input
              type="text"
              placeholder="e.g. TXN-2027-001234"
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Method
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="mobile_money">Mobile Money (TeleBirr/CBE Birr)</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Notes
            </label>
            <textarea
              placeholder="Any additional notes about this payment..."
              rows={2}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>

          {/* Notification */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-[var(--text-secondary)]">Notify claimant about payment</span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
