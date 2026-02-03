"use client";

import { use, useState } from "react";
import {
  Download,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Shield,
  Car,
  Calendar,
  Building2,
  User,
  Mail,
  QrCode,
  ExternalLink,
  Send,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  Modal,
  FormModal,
  ConfirmModal,
} from "@/components/broker";
import {
  IssueMotorCertificateForm,
  IssueCOIForm,
} from "@/components/broker/modals";

// Types
type CertificateType = "motor" | "coi";
type CertificateStatus = "requested" | "issued" | "delivered";

// Mock data
const certificateData = {
  id: "CERT-2027-0892",
  policyNumber: "POL-2027-0012",
  status: "issued" as CertificateStatus,
  type: "motor" as CertificateType,
  holder: "Abebe Transport PLC",
  holderId: "BUS-012-9234",
  holderEmail: "abebe@abebetransport.com",
  insurer: "Nyala Insurance S.C",
  vehicle: {
    plateNo: "3-AA-51245",
    makeModel: "Toyota Hilux",
    year: 2022,
    chassisNo: "JTFR123456789",
    engineNo: "2GD-1234567",
  },
  coverageType: "Comprehensive",
  sumInsured: "ETB 2,250,000",
  issuedDate: "Feb 1, 2027",
  expiryDate: "Jan 31, 2027",
  premium: "ETB 31,500",
  // COI-specific fields
  coi: {
    templateType: null as string | null,
    specialWording: null as string | null,
    deliveryMethod: null as string | null,
    recipientEmail: null as string | null,
    qrCode: null as string | null,
    verificationUrl: null as string | null,
  },
};

// Second mock certificate (COI type)
const coiCertificateData = {
  id: "COI-2027-0012",
  policyNumber: "POL-2027-0012",
  status: "delivered" as CertificateStatus,
  type: "coi" as CertificateType,
  holder: "Abebe Transport PLC",
  holderId: "BUS-012-9234",
  holderEmail: "abebe@abebetransport.com",
  insurer: "Nyala Insurance S.C",
  vehicle: null,
  coverageType: "Comprehensive Motor Fleet",
  sumInsured: "ETB 9,624,014",
  issuedDate: "Feb 5, 2027",
  expiryDate: "Jan 31, 2027",
  premium: "ETB 481,200.70",
  coi: {
    templateType: "Landlord",
    specialWording: "Additional insured: Bole Tower Management PLC",
    deliveryMethod: "Email",
    recipientEmail: "tender@boletower.com",
    qrCode: "https://qazina.com/verify/COI-2027-0012",
    verificationUrl: "https://qazina.com/verify/COI-2027-0012",
  },
};

const statusConfig: Record<CertificateStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  requested: { label: "Requested", variant: "warning" },
  issued: { label: "Issued", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
};

const activities = [
  {
    id: "1",
    title: "Certificate issued",
    description: "By Nyala Insurance S.C",
    timestamp: "Feb 1, 2027",
    iconColor: "success" as const,
    icon: <Shield size={16} />,
  },
  {
    id: "2",
    title: "Policy activated",
    description: "Payment confirmed",
    timestamp: "Jan 30, 2027",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "3",
    title: "Vehicle added to policy",
    timestamp: "Jan 28, 2027",
    iconColor: "info" as const,
    icon: <Car size={16} />,
  },
];

const documents = [
  { id: "1", name: "Certificate_of_Insurance.pdf", uploadedAt: "Feb 1, 2027 - 10:00 AM" },
  { id: "2", name: "Vehicle_Schedule.pdf", uploadedAt: "Jan 28, 2027 - 2:15 PM" },
];

export default function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showRequestCoiModal, setShowRequestCoiModal] = useState(false);
  const [showIssueMotorModal, setShowIssueMotorModal] = useState(false);
  const [showIssueCOIModal, setShowIssueCOIModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);

  // Use COI data if ID starts with COI
  const isCoiView = id.startsWith("COI");
  const cert = isCoiView ? coiCertificateData : certificateData;
  const statusInfo = statusConfig[cert.status];

  // Status-dependent actions
  const renderActions = () => {
    switch (cert.status) {
      case "requested":
        return (
          <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
            Send to Insurer
          </BrokerButton>
        );
      case "issued":
        return (
          <>
            <BrokerButton variant="secondary" leftIcon={<Download size={16} />}>
              Download
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Mark Delivered
            </BrokerButton>
          </>
        );
      case "delivered":
        return (
          <BrokerButton variant="secondary" leftIcon={<Download size={16} />}>
            Download
          </BrokerButton>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Certificates", href: "/broker/certificates" },
          { label: cert.id },
        ]}
        title={cert.holder}
        subtitle={`${cert.id} · ${cert.type === "coi" ? "Certificate of Insurance" : cert.vehicle?.plateNo}`}
        badge={
          <div className="flex items-center gap-2">
            <StatusChip variant={cert.type === "coi" ? "info" : "neutral"}>
              {cert.type === "coi" ? "COI" : "Motor"}
            </StatusChip>
            <StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>
          </div>
        }
        actions={
          <>
            {renderActions()}
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowIssueMotorModal(true)}>
              Issue Motor Certificate
            </BrokerButton>
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowIssueCOIModal(true)}>
              Issue COI
            </BrokerButton>
            <BrokerButton variant="ghost" size="sm" onClick={() => setShowRequestCoiModal(true)}>
              <Plus size={20} />
            </BrokerButton>
            <BrokerButton variant="danger" size="sm" onClick={() => setShowRevokeModal(true)} leftIcon={<Trash2 size={14} />}>
              Revoke
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
            {/* Certificate Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Certificate Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Policy Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Insurer</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.insurer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Coverage Type</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.coverageType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Issued Date</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.issuedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Expiry Date</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Sum Insured</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.sumInsured}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details Card (Motor certs only) */}
            {cert.type === "motor" && cert.vehicle && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <div className="flex items-center gap-2">
                    <Car size={20} className="text-[var(--text-secondary)]" />
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vehicle Information</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Plate Number</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.plateNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Make / Model</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.makeModel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Year</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Chassis No.</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.chassisNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Engine No.</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.engineNo}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COI Details Card (COI certs only) */}
            {cert.type === "coi" && cert.coi.templateType && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-[var(--status-info)]" />
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">COI Details</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Template Type</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.coi.templateType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Delivery Method</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.coi.deliveryMethod}</p>
                    </div>
                    {cert.coi.recipientEmail && (
                      <div>
                        <p className="text-sm text-[var(--text-secondary)]">Recipient Email</p>
                        <p className="font-medium text-[var(--text-primary)]">{cert.coi.recipientEmail}</p>
                      </div>
                    )}
                    {cert.coi.specialWording && (
                      <div className="col-span-2">
                        <p className="text-sm text-[var(--text-secondary)]">Special Wording</p>
                        <p className="font-medium text-[var(--text-primary)]">{cert.coi.specialWording}</p>
                      </div>
                    )}
                  </div>

                  {/* Verification */}
                  {cert.coi.verificationUrl && (
                    <div className="mt-6 pt-6 border-t border-[var(--bg-border)]">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Verification</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-[var(--bg-surface)] rounded-[var(--radius-md)] flex items-center justify-center border border-[var(--bg-border)]">
                          <QrCode size={48} className="text-[var(--text-tertiary)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-secondary)] mb-1">Verification URL</p>
                          <a
                            href={cert.coi.verificationUrl}
                            className="text-sm text-[var(--status-info)] hover:underline flex items-center gap-1"
                          >
                            {cert.coi.verificationUrl}
                            <ExternalLink size={12} />
                          </a>
                          <p className="text-xs text-[var(--text-tertiary)] mt-1">
                            Third parties can scan the QR code or visit this URL to verify certificate authenticity
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Holder Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-[var(--text-secondary)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Policy Holder</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Business Name</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.holder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Business ID</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.holderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Email</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.holderEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Activity */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Activity</h2>
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

      {/* Issue Motor Certificate Modal */}
      <FormModal
        isOpen={showIssueMotorModal}
        onClose={() => setShowIssueMotorModal(false)}
        onSubmit={() => setShowIssueMotorModal(false)}
        title="Issue Motor Certificate"
        submitLabel="Issue Certificate"
      >
        <IssueMotorCertificateForm />
      </FormModal>

      {/* Issue COI Modal */}
      <FormModal
        isOpen={showIssueCOIModal}
        onClose={() => setShowIssueCOIModal(false)}
        onSubmit={() => setShowIssueCOIModal(false)}
        title="Issue Certificate of Insurance"
        submitLabel="Issue COI"
      >
        <IssueCOIForm />
      </FormModal>

      {/* Revoke Certificate Modal */}
      <ConfirmModal
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        onConfirm={() => setShowRevokeModal(false)}
        title="Revoke Certificate"
        message="Are you sure you want to revoke this certificate?"
        confirmLabel="Revoke Certificate"
        variant="destructive"
      />

      {/* Request COI Modal */}
      <Modal
        isOpen={showRequestCoiModal}
        onClose={() => setShowRequestCoiModal(false)}
        title="Request Certificate of Insurance"
        size="lg"
        footer={
          <>
            <BrokerButton variant="secondary" onClick={() => setShowRequestCoiModal(false)}>
              Cancel
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
              Submit Request
            </BrokerButton>
          </>
        }
      >
        <div className="space-y-5">
          {/* Holder Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Holder Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Bole Tower Management PLC"
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Holder Email *
              </label>
              <input
                type="email"
                placeholder="e.g. contact@boletower.com"
                className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Holder Address
            </label>
            <textarea
              placeholder="Full address of the certificate holder..."
              rows={2}
              className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
            />
          </div>

          {/* Template Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Template Type *
            </label>
            <select className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white">
              <option value="">Select template...</option>
              <option value="landlord">Landlord</option>
              <option value="tender">Tender</option>
              <option value="bank">Bank / Lender</option>
              <option value="vendor">Vendor / Contractor</option>
            </select>
          </div>

          {/* Special Wording */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Special Wording
            </label>
            <textarea
              placeholder="Any additional insured language, special endorsements, or custom wording..."
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
                <input type="radio" name="delivery" value="email" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Email to holder</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" value="download" className="w-4 h-4" />
                <span className="text-sm">Download only (manual delivery)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" value="both" className="w-4 h-4" />
                <span className="text-sm">Email + Download</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
