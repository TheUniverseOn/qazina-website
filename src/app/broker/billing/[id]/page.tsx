"use client";

import { use, useState } from "react";
import {
  Download,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Clock,
  Printer,
  Building2,
  CreditCard,
  Image,
  X,
  Eye,
  AlertCircle,
  Send,
  DollarSign,
  Trash2,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  StatusChip,
  ActivityItem,
  FormModal,
  ConfirmModal,
} from "@/components/broker";
import {
  VerifyPaymentForm,
  RecordManualPaymentForm,
} from "@/components/broker/modals";

// Types
type InvoiceStatus = "unpaid" | "proof_uploaded" | "paid" | "proof_rejected" | "overdue" | "cancelled";

interface PaymentProof {
  id: string;
  fileName: string;
  uploadedAt: string;
  amountClaimed: string;
  channel: string;
  status: "pending" | "verified" | "rejected";
  rejectedReason?: string;
  rejectedAt?: string;
}

// Mock data
const invoiceData = {
  id: "INV-2027-0234",
  status: "proof_uploaded" as InvoiceStatus,
  client: "Ethio Transport PLC",
  clientId: "Metro Fleet Premium",
  invoiceDate: "Jan 15, 2027",
  dueDate: "Feb 15, 2027",
  policyNumber: "POL-2027-0089",
  insurer: "Awash Insurance S.C",
  paymentTerms: "Net 30",
  lineItems: [
    { description: "Comprehensive Motor Insurance Premium", qty: 1, rate: "ETB 245,000", amount: "ETB 220,050.00" },
    { description: "Stamp Duty", qty: 1, rate: "ETB 2,250", amount: "ETB 2,287.50" },
  ],
  subtotal: "ETB 335,250.00",
  vat: "ETB 34,087.50",
  totalAmount: "ETB 261,337.50",
  balanceDue: "ETB 261,337.50",
  paymentInfo: {
    bankName: "Commercial Bank of Ethiopia",
    accountNo: "100012345678",
    accountName: "Awash Insurance S.C",
    reference: "INV-2027-0234",
  },
};

const paymentProofs: PaymentProof[] = [
  {
    id: "1",
    fileName: "payment_screenshot.jpg",
    uploadedAt: "Jan 28, 2027 at 2:30 PM",
    amountClaimed: "ETB 261,337.50",
    channel: "TeleBirr",
    status: "pending",
  },
  {
    id: "2",
    fileName: "bank_receipt.pdf",
    uploadedAt: "Jan 27, 2027 at 10:15 AM",
    amountClaimed: "ETB 261,337.50",
    channel: "Bank Transfer",
    status: "rejected",
    rejectedReason: "Amount mismatch",
    rejectedAt: "Jan 27, 2027",
  },
];

const paymentHistory = [
  {
    id: "1",
    title: "Payment proof uploaded",
    description: "Pending verification",
    timestamp: "Jan 28, 2027",
    iconColor: "warning" as const,
    icon: <Image size={16} />,
  },
  {
    id: "2",
    title: "Previous proof rejected",
    description: "Amount mismatch",
    timestamp: "Jan 27, 2027",
    iconColor: "error" as const,
    icon: <X size={16} />,
  },
  {
    id: "3",
    title: "Invoice sent to client",
    description: "Via email",
    timestamp: "Jan 15, 2027",
    iconColor: "info" as const,
    icon: <Send size={16} />,
  },
  {
    id: "4",
    title: "Invoice created",
    description: "By Eve Broker",
    timestamp: "Jan 15, 2027",
    iconColor: "neutral" as const,
    icon: <FileText size={16} />,
  },
];

const statusConfig: Record<InvoiceStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  unpaid: { label: "Unpaid", variant: "error" },
  proof_uploaded: { label: "Proof Uploaded", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  proof_rejected: { label: "Proof Rejected", variant: "error" },
  overdue: { label: "Overdue", variant: "error" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRecordManualPaymentModal, setShowRecordManualPaymentModal] = useState(false);
  const [showCancelInvoiceModal, setShowCancelInvoiceModal] = useState(false);

  const statusInfo = statusConfig[invoiceData.status];
  const hasPendingProof = paymentProofs.some(p => p.status === "pending");

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Billing", href: "/broker/billing" },
          { label: invoiceData.id },
        ]}
        title={invoiceData.id}
        subtitle={`${invoiceData.client} · ${invoiceData.clientId}`}
        badge={<StatusChip variant={statusInfo.variant}>{statusInfo.label}</StatusChip>}
        actions={
          <>
            <BrokerButton variant="secondary" leftIcon={<Printer size={16} />}>
              Print Invoice
            </BrokerButton>
            {invoiceData.status === "unpaid" && (
              <BrokerButton variant="primary" leftIcon={<Send size={16} />}>
                Send Reminder
              </BrokerButton>
            )}
            <BrokerButton variant="secondary" size="sm" onClick={() => setShowRecordManualPaymentModal(true)} leftIcon={<DollarSign size={14} />}>
              Record Manual Payment
            </BrokerButton>
            <BrokerButton variant="danger" size="sm" onClick={() => setShowCancelInvoiceModal(true)} leftIcon={<Trash2 size={14} />}>
              Cancel Invoice
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
            {/* Payment Proofs Card - NEW SECTION */}
            {paymentProofs.length > 0 && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Payment Proofs</h2>
                </div>
                <div className="p-6 space-y-4">
                  {paymentProofs.map((proof) => (
                    <div
                      key={proof.id}
                      className={`p-4 rounded-[var(--radius-md)] border ${
                        proof.status === "pending"
                          ? "border-[var(--status-warning)] bg-[var(--status-warning)]/5"
                          : proof.status === "rejected"
                          ? "border-[var(--status-error)]/30 bg-[var(--bg-surface)]"
                          : "border-[var(--bg-border)] bg-[var(--bg-surface)]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText size={20} className={
                            proof.status === "pending"
                              ? "text-[var(--status-warning)]"
                              : proof.status === "rejected"
                              ? "text-[var(--status-error)]"
                              : "text-[var(--status-success)]"
                          } />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-[var(--text-primary)]">{proof.fileName}</p>
                              {proof.status === "pending" && (
                                <StatusChip variant="warning">Pending Review</StatusChip>
                              )}
                              {proof.status === "rejected" && (
                                <StatusChip variant="error">Proof Rejected</StatusChip>
                              )}
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mt-1">
                              Uploaded: {proof.uploadedAt}
                            </p>
                            <div className="flex gap-6 mt-2 text-sm">
                              <span className="text-[var(--text-secondary)]">
                                Amount claimed: <span className="text-[var(--text-primary)] font-medium">{proof.amountClaimed}</span>
                              </span>
                              <span className="text-[var(--text-secondary)]">
                                Channel: <span className="text-[var(--text-primary)] font-medium">{proof.channel}</span>
                              </span>
                            </div>
                            {proof.status === "rejected" && proof.rejectedReason && (
                              <p className="text-sm text-[var(--status-error)] mt-2">
                                Rejected: {proof.rejectedAt} — "{proof.rejectedReason}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {proof.status === "pending" && (
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--bg-border)]">
                          <BrokerButton variant="secondary" size="sm" leftIcon={<Eye size={14} />}>
                            View Full Image
                          </BrokerButton>
                          <BrokerButton
                            variant="primary"
                            size="sm"
                            leftIcon={<CheckCircle2 size={14} />}
                            onClick={() => setShowVerifyModal(true)}
                          >
                            Verify & Mark Paid
                          </BrokerButton>
                          <BrokerButton
                            variant="secondary"
                            size="sm"
                            leftIcon={<X size={14} />}
                            onClick={() => setShowRejectModal(true)}
                          >
                            Reject Proof
                          </BrokerButton>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invoice Details Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Invoice Details</h2>
                <span className="text-sm text-[var(--text-secondary)]">Due Date: <span className="font-medium text-[var(--text-primary)]">{invoiceData.dueDate}</span></span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Invoice Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Invoice Date</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.invoiceDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Policy Number</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Client</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Insurer</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.insurer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Payment Terms</p>
                    <p className="font-medium text-[var(--text-primary)]">{invoiceData.paymentTerms}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Card */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Line Items</h2>
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[var(--bg-surface)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[var(--text-secondary)]">Description</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-[var(--text-secondary)]">Qty</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-[var(--text-secondary)]">Rate</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-[var(--text-secondary)]">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--bg-border)]">
                    {invoiceData.lineItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-[var(--text-primary)]">{item.description}</td>
                        <td className="px-6 py-4 text-center text-[var(--text-primary)]">{item.qty}</td>
                        <td className="px-6 py-4 text-right text-[var(--text-primary)]">{item.rate}</td>
                        <td className="px-6 py-4 text-right font-medium text-[var(--text-primary)]">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-6 border-t border-[var(--bg-border)] bg-[var(--bg-surface)]">
                  <div className="max-w-xs ml-auto space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Subtotal</span>
                      <span className="font-medium text-[var(--text-primary)]">{invoiceData.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">VAT (15%)</span>
                      <span className="font-medium text-[var(--text-primary)]">{invoiceData.vat}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[var(--bg-border)]">
                      <span className="text-lg font-semibold text-[var(--text-primary)]">Total Amount</span>
                      <span className="text-lg font-bold text-[var(--text-primary)]">{invoiceData.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--status-error)] font-medium">Balance Due</span>
                      <span className="text-[var(--status-error)] font-bold">{invoiceData.balanceDue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-[var(--text-secondary)]" />
                  <h2 className="font-semibold text-[var(--text-primary)]">Payment Information</h2>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Bank Name</p>
                  <p className="font-medium text-[var(--text-primary)]">{invoiceData.paymentInfo.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Account Number</p>
                  <p className="font-medium text-[var(--text-primary)]">{invoiceData.paymentInfo.accountNo}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Account Name</p>
                  <p className="font-medium text-[var(--text-primary)]">{invoiceData.paymentInfo.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Reference</p>
                  <p className="font-medium text-[var(--text-primary)]">{invoiceData.paymentInfo.reference}</p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="font-semibold text-[var(--text-primary)]">Payment History</h2>
              </div>
              <div className="px-5 divide-y divide-[var(--bg-border)]">
                {paymentHistory.map((item) => (
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
          </div>
        </div>
      </div>

      {/* Verify Payment Modal */}
      <FormModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        onSubmit={() => setShowVerifyModal(false)}
        title="Verify Payment"
        submitLabel="Verify & Mark Paid"
        variant="green"
      >
        <VerifyPaymentForm />
      </FormModal>

      {/* Record Manual Payment Modal */}
      <FormModal
        isOpen={showRecordManualPaymentModal}
        onClose={() => setShowRecordManualPaymentModal(false)}
        onSubmit={() => setShowRecordManualPaymentModal(false)}
        title="Record Manual Payment"
        submitLabel="Record Payment"
      >
        <RecordManualPaymentForm />
      </FormModal>

      {/* Cancel Invoice Modal */}
      <ConfirmModal
        isOpen={showCancelInvoiceModal}
        onClose={() => setShowCancelInvoiceModal(false)}
        onConfirm={() => setShowCancelInvoiceModal(false)}
        title="Cancel Invoice"
        message="Are you sure you want to cancel this invoice?"
        confirmLabel="Cancel Invoice"
        variant="destructive"
      />

      {/* Reject Proof Modal - kept as raw for backward compatibility with form fields */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[var(--radius-lg)] w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Reject Payment Proof</h2>
              <button onClick={() => setShowRejectModal(false)}>
                <X size={20} className="text-[var(--text-tertiary)]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Why is this proof being rejected? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" className="w-4 h-4" />
                    <span className="text-sm">Amount doesn&apos;t match invoice</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" className="w-4 h-4" />
                    <span className="text-sm">Reference not found in bank records</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" className="w-4 h-4" />
                    <span className="text-sm">Image unclear / unreadable</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" className="w-4 h-4" />
                    <span className="text-sm">Duplicate submission</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" className="w-4 h-4" />
                    <span className="text-sm">Other</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Additional Notes * (shown to client)
                </label>
                <textarea
                  placeholder="Please provide details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
                />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-secondary)]">Notify client to upload new proof</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--bg-border)]">
              <BrokerButton variant="secondary" onClick={() => setShowRejectModal(false)}>
                Cancel
              </BrokerButton>
              <BrokerButton variant="danger" leftIcon={<X size={16} />} onClick={() => setShowRejectModal(false)}>
                Reject Proof
              </BrokerButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
