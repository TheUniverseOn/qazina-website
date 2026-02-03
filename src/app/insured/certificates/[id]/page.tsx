"use client";

import { use, useState } from "react";
import {
  Download,
  Share2,
  FileText,
  Car,
  Shield,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  FormModal,
} from "@/components/insured";
import { RequestCOIForm } from "@/components/broker/modals";

type CertificateStatus = "active" | "expiring_soon" | "expired";

const statusConfig: Record<CertificateStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  active: { label: "Active", variant: "success" },
  expiring_soon: { label: "Expiring Soon", variant: "warning" },
  expired: { label: "Expired", variant: "error" },
};

// Mock data
const certificateData = {
  id: "CERT-2027-0892",
  policyNumber: "POL-2027-0012",
  status: "active" as CertificateStatus,
  coverageType: "Comprehensive",
  insurer: "Nyala Insurance S.C",
  sumInsured: "ETB 2,250,000",
  issuedDate: "Feb 1, 2027",
  expiryDate: "Jan 31, 2027",
  premium: "ETB 31,500",
  vehicle: {
    plateNo: "3-AA-12345",
    makeModel: "Toyota Hilux",
    year: 2023,
    chassisNo: "JTFR123456789",
    engineNo: "2GD-1234567",
    color: "White",
    bodyType: "Pickup",
  },
};

const activities = [
  { id: "1", title: "Certificate issued", description: "By Nyala Insurance S.C", timestamp: "Feb 1, 2027", iconColor: "success" as const, icon: <Shield size={16} /> },
  { id: "2", title: "Payment confirmed", timestamp: "Jan 30, 2027", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
  { id: "3", title: "Vehicle added to policy", timestamp: "Jan 28, 2027", iconColor: "info" as const, icon: <Car size={16} /> },
];

const documents = [
  { id: "1", name: "Certificate_of_Insurance.pdf", date: "Feb 1, 2027" },
  { id: "2", name: "Vehicle_Schedule.pdf", date: "Jan 28, 2027" },
];

export default function InsuredCertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showRequestCOI, setShowRequestCOI] = useState(false);
  const cert = certificateData;
  const statusInfo = statusConfig[cert.status];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Certificates", href: "/insured/certificates" },
          { label: cert.id },
        ]}
        title={cert.id}
        subtitle={`${cert.vehicle.plateNo} · ${cert.vehicle.makeModel}`}
        badge={<StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>}
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Share2 size={16} />}>
              Share
            </BrokerButton>
            <BrokerButton variant="secondary" leftIcon={<FileText size={16} />} onClick={() => setShowRequestCOI(true)}>
              Request COI
            </BrokerButton>
            <BrokerButton variant="primary" leftIcon={<Download size={16} />}>
              Download PDF
            </BrokerButton>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Certificate Preview */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Certificate Preview</h2>
              </div>
              <div className="p-6">
                {/* Simulated certificate preview */}
                <div className="border border-[var(--bg-border)] rounded-[var(--radius-md)] p-6 bg-[var(--bg-surface)]">
                  <div className="text-center mb-6">
                    <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Certificate of Motor Insurance</p>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{cert.insurer}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--text-tertiary)]">Certificate No.</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.id}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Policy No.</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Vehicle</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.plateNo} — {cert.vehicle.makeModel} {cert.vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Cover Type</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.coverageType}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Valid From</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Valid Until</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Sum Insured</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.sumInsured}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-tertiary)]">Premium</p>
                      <p className="font-medium text-[var(--text-primary)]">{cert.premium}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-6 py-4 border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-2">
                  <Car size={20} className="text-[var(--text-secondary)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vehicle Details</h2>
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
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Color</p>
                    <p className="font-medium text-[var(--text-primary)]">{cert.vehicle.color}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <BrokerButton variant="secondary" fullWidth leftIcon={<Download size={16} />}>
                  Download Certificate
                </BrokerButton>
                <BrokerButton variant="secondary" fullWidth leftIcon={<Share2 size={16} />}>
                  Share via Email
                </BrokerButton>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="px-5 py-4 border-b border-[var(--bg-border)]">
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

      {/* Request COI Modal */}
      <FormModal
        isOpen={showRequestCOI}
        onClose={() => setShowRequestCOI(false)}
        title="Request Certificate of Insurance"
        submitLabel="Submit Request"
        onSubmit={() => setShowRequestCOI(false)}
      >
        <RequestCOIForm />
      </FormModal>
    </div>
  );
}
