"use client";

import { useRouter } from "next/navigation";
import {
  Shield,
  FileText,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  KPICard,
  StatusChip,
  ActivityItem,
  SearchInput,
} from "@/components/insured";

// Status mapping: broker → client-facing
const clientStatusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  getting_quotes: { label: "Getting Quotes", variant: "info" },
  quotes_ready: { label: "Quotes Ready", variant: "success" },
  documents_requested: { label: "Documents Requested", variant: "warning" },
  under_review: { label: "Under Review", variant: "info" },
  verifying_payment: { label: "Verifying Payment", variant: "warning" },
  payment_issue: { label: "Payment Issue", variant: "error" },
  active: { label: "Active", variant: "success" },
  expiring_soon: { label: "Expiring Soon", variant: "warning" },
};

// Mock policies
const myPolicies = [
  { id: "POL-2027-0012", name: "Motor Fleet Insurance", insurer: "Nyala Insurance S.C", status: "active", vehicles: 24, expiry: "Jan 31, 2027", premium: "ETB 481,200" },
  { id: "POL-2027-0089", name: "Motor Fleet Insurance", insurer: "Ethiopian Insurance Corp", status: "active", vehicles: 12, expiry: "Mar 15, 2027", premium: "ETB 234,500" },
  { id: "POL-2025-0156", name: "Motor Fleet Insurance", insurer: "Awash Insurance", status: "expiring_soon", vehicles: 8, expiry: "Feb 28, 2027", premium: "ETB 156,000" },
];

// Pending actions
const pendingActions = [
  { id: "1", title: "Upload vehicle registration", subtitle: "END-2027-0045 · Add Vehicle", type: "documents_requested" as const, link: "/insured/endorsements/1" },
  { id: "2", title: "Review new quote", subtitle: "POL-2027-0012 · Renewal", type: "quotes_ready" as const, link: "/insured/policies" },
  { id: "3", title: "Payment verification pending", subtitle: "INV-2027-0142", type: "verifying_payment" as const, link: "/insured/billing" },
];

// Recent activity
const recentActivity = [
  { id: "1", title: "Certificate issued for 3-AA-51245", timestamp: "Today at 10:00 AM", iconColor: "success" as const, icon: <FileText size={16} /> },
  { id: "2", title: "Endorsement approved — vehicle added", timestamp: "Yesterday at 3:30 PM", iconColor: "success" as const, icon: <CheckCircle2 size={16} /> },
  { id: "3", title: "Payment receipt sent to your email", timestamp: "Jan 28, 2027", iconColor: "info" as const, icon: <Mail size={16} /> },
  { id: "4", title: "Policy renewal quote received", timestamp: "Jan 25, 2027", iconColor: "info" as const, icon: <Shield size={16} /> },
];

export default function InsuredDashboard() {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-[var(--bg-border)] px-4 py-4 sm:px-6 md:px-8 md:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
              {getGreeting()}, Asheber
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">{today}</p>
          </div>
          <SearchInput placeholder="Search..." className="w-full sm:w-64" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <KPICard
            label="Active Policies"
            value={3}
            subtitle="44 vehicles covered"
            icon={<Shield size={20} />}
          />
          <KPICard
            label="Pending Actions"
            value={3}
            subtitle="Requires your attention"
            variant="warning"
            icon={<Clock size={20} />}
          />
          <KPICard
            label="Active Certificates"
            value={38}
            subtitle="6 expiring soon"
            icon={<FileText size={20} />}
          />
          <KPICard
            label="Open Claims"
            value={1}
            subtitle="Under review"
            icon={<AlertTriangle size={20} />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* My Policies + Pending Actions - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Policies */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">My Policies</h2>
                <button
                  onClick={() => router.push("/insured/policies")}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
                >
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="divide-y divide-[var(--bg-border)]">
                {myPolicies.map((policy) => {
                  const status = clientStatusConfig[policy.status];
                  return (
                    <div
                      key={policy.id}
                      className="flex items-center justify-between px-5 py-4 hover:bg-[var(--bg-surface)] cursor-pointer transition-colors"
                      onClick={() => router.push("/insured/policies")}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{policy.id}</p>
                          {status && <StatusChip variant={status.variant}>{status.label}</StatusChip>}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {policy.insurer} · {policy.vehicles} vehicles · Expires {policy.expiry}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)] ml-4">{policy.premium}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Pending Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                {pendingActions.map((action) => {
                  const status = clientStatusConfig[action.type];
                  return (
                    <div
                      key={action.id}
                      className="flex items-center gap-4 p-3 rounded-[var(--radius-md)] bg-[var(--bg-surface)] hover:bg-[var(--bg-divider)] cursor-pointer transition-colors"
                      onClick={() => router.push(action.link)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{action.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{action.subtitle}</p>
                      </div>
                      {status && <StatusChip variant={status.variant}>{status.label}</StatusChip>}
                      <ArrowRight size={16} className="text-[var(--text-tertiary)] flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Activity Section - 1 column */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Activity</h2>
            </div>
            <div className="px-5 divide-y divide-[var(--bg-border)]">
              {recentActivity.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  timestamp={activity.timestamp}
                  iconColor={activity.iconColor}
                  icon={activity.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
