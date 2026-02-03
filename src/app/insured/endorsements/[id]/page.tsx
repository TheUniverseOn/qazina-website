"use client";

import { use, useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  Download,
} from "lucide-react";
import {
  PageHeader,
  StatusChip,
  ActivityItem,
  FormModal,
  ConfirmModal,
  BrokerButton,
} from "@/components/insured";
import { RequestEndorsementForm } from "@/components/broker/modals";

// Client-facing status
type ClientEndorsementStatus = "submitted" | "under_review" | "pending_approval" | "applied" | "rejected";

const statusConfig: Record<ClientEndorsementStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  pending_approval: { label: "Pending Approval", variant: "warning" },
  applied: { label: "Applied", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

// Progress steps for the tracker
const progressSteps = [
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Under Review" },
  { key: "pending_approval", label: "Pending Approval" },
  { key: "applied", label: "Applied" },
];

// Mock data
const endorsementData = {
  id: "END-2027-0045",
  policyNumber: "POL-2027-0012",
  policyName: "Motor Fleet Insurance",
  status: "under_review" as ClientEndorsementStatus,
  type: "Add Vehicle",
  requestDate: "Jan 28, 2027",
  effectiveDate: "Feb 15, 2027",
  lastUpdate: "Jan 30, 2027",
  reason: "Adding 2 new delivery trucks for fleet expansion",
  premiumAdjustment: {
    additional: "ETB 40,700",
    stampDuty: "ETB 450",
    vat: "ETB 6,117.50",
    total: "ETB 52,267.50",
  },
  vehicle: {
    plateNo: "3-AA-15145",
    makeModel: "Toyota Land Cruiser Prado",
    year: 2024,
    value: "ETB 4,500,000",
  },
};

const activities = [
  { id: "1", title: "Under review by insurer", description: "Your request is being reviewed", timestamp: "Jan 30, 2027", iconColor: "warning" as const, icon: <Clock size={16} /> },
  { id: "2", title: "Documents verified", description: "All uploaded documents checked", timestamp: "Jan 29, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
  { id: "3", title: "Request submitted", description: "Endorsement request created", timestamp: "Jan 28, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
];

const documents = [
  { id: "1", name: "Vehicle_Registration_3-AA-15145.pdf", date: "Jan 28, 2027" },
  { id: "2", name: "Purchase_Invoice.pdf", date: "Jan 28, 2027" },
];

function getStepStatus(stepKey: string, currentStatus: ClientEndorsementStatus) {
  const stepOrder = progressSteps.map((s) => s.key);
  const currentIndex = stepOrder.indexOf(currentStatus);
  const stepIndex = stepOrder.indexOf(stepKey);

  if (currentStatus === "rejected") {
    // For rejected, only "submitted" is complete
    if (stepIndex === 0) return "completed";
    return "pending";
  }

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "pending";
}

export default function InsuredEndorsementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showRequestEndorsement, setShowRequestEndorsement] = useState(false);
  const [showCancelRequest, setShowCancelRequest] = useState(false);
  const statusInfo = statusConfig[endorsementData.status];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Endorsements", href: "/insured/endorsements" },
          { label: endorsementData.id },
        ]}
        title={endorsementData.id}
        subtitle={`${endorsementData.type} Endorsement`}
        badge={<StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>}
        actions={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowCancelRequest(true)}>
              Cancel Request
            </BrokerButton>
            <BrokerButton variant="primary" onClick={() => setShowRequestEndorsement(true)}>
              Request Endorsement
            </BrokerButton>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {/* Progress Tracker */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-6 mb-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Progress</h3>
          <div className="flex items-center">
            {progressSteps.map((step, index) => {
              const stepStatus = getStepStatus(step.key, endorsementData.status);
              return (
                <div key={step.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        stepStatus === "completed"
                          ? "bg-[var(--status-success)] text-white"
                          : stepStatus === "current"
                          ? "bg-[var(--accent-primary)] text-[var(--accent-text)]"
                          : "bg-[var(--bg-divider)] text-[var(--text-tertiary)]"
                      }`}
                    >
                      {stepStatus === "completed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      stepStatus === "current" ? "font-medium text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-5 ${
                      stepStatus === "completed" ? "bg-[var(--status-success)]" : "bg-[var(--bg-divider)]"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Endorsement Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Policy</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.type}</p>
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
                    <p className="text-sm text-[var(--text-secondary)]">Last Update</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.lastUpdate}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--bg-border)]">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Reason</p>
                  <p className="text-[var(--text-primary)]">{endorsementData.reason}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vehicle to Add</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Plate Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.vehicle.plateNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Make / Model</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.vehicle.makeModel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Year</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Vehicle Value</p>
                    <p className="font-medium text-[var(--text-primary)]">{endorsementData.vehicle.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Adjustment */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Premium Adjustment</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Additional Premium (Pro-rata)</span>
                    <span className="font-medium text-[var(--text-primary)]">{endorsementData.premiumAdjustment.additional}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Stamp Duty</span>
                    <span className="font-medium text-[var(--text-primary)]">{endorsementData.premiumAdjustment.stampDuty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">VAT (15%)</span>
                    <span className="font-medium text-[var(--text-primary)]">{endorsementData.premiumAdjustment.vat}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--bg-border)]">
                    <span className="text-lg font-medium text-[var(--text-primary)]">Total</span>
                    <span className="text-xl font-bold text-[var(--status-success)]">{endorsementData.premiumAdjustment.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Timeline</h2>
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
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
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
                      <p className="text-xs text-[var(--text-tertiary)]">{doc.date}</p>
                    </div>
                    <Download size={16} className="text-[var(--text-tertiary)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Endorsement Modal */}
      <FormModal
        isOpen={showRequestEndorsement}
        onClose={() => setShowRequestEndorsement(false)}
        title="Request Endorsement"
        submitLabel="Submit Request"
        onSubmit={() => setShowRequestEndorsement(false)}
      >
        <RequestEndorsementForm />
      </FormModal>

      {/* Cancel Request Modal */}
      <ConfirmModal
        isOpen={showCancelRequest}
        onClose={() => setShowCancelRequest(false)}
        title="Cancel Request"
        message="Are you sure you want to cancel this endorsement request?"
        variant="destructive"
        confirmLabel="Cancel Request"
        onConfirm={() => setShowCancelRequest(false)}
      />
    </div>
  );
}
