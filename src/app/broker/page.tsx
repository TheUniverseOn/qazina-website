"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  AlertCircle,
  DollarSign,
  Clock,
  Plus,
  CheckCircle2,
  Mail,
  FileCheck,
  ArrowRight,
  Image,
  Shield,
  Users,
} from "lucide-react";
import {
  PageHeader,
  KPICard,
  TaskItem,
  ActivityItem,
  BrokerButton,
  SearchInput,
  StatusChip,
  FormModal,
} from "@/components/broker";

// Task type chips
type TaskType = "verify_payment" | "coi_request" | "follow_up" | "quote_review" | "doc_request";

const taskTypeConfig: Record<TaskType, { label: string; color: string }> = {
  verify_payment: { label: "Verify Payment Proof", color: "warning" },
  coi_request: { label: "COI Request", color: "info" },
  follow_up: { label: "Follow Up", color: "neutral" },
  quote_review: { label: "Quote Review", color: "success" },
  doc_request: { label: "Document Request", color: "warning" },
};

// Mock data
const tasks = [
  {
    id: "1",
    title: "OVERDUE: Verify payment proof",
    subtitle: "Policy # INV-2027-0142",
    status: "overdue" as const,
    dueDate: "3 days overdue",
    type: "verify_payment" as TaskType,
    link: "/broker/billing/INV-2027-0142",
  },
  {
    id: "2",
    title: "Follow up: ABC Fleet quote",
    subtitle: "Proposal # PRO-2027-0025",
    status: "due-today" as const,
    dueDate: "Due Today",
    type: "follow_up" as TaskType,
    link: "/broker/proposals/PRO-2027-0025",
  },
  {
    id: "3",
    title: "Obtain Avobi for quote",
    subtitle: "Proposal # PRO-2027-0033",
    status: "due-tomorrow" as const,
    dueDate: "Due Tomorrow",
    type: "quote_review" as TaskType,
    link: "/broker/proposals/PRO-2027-0033",
  },
  {
    id: "4",
    title: "Verify Payment Proof",
    subtitle: "INV-2027-0234 · Metro Transport",
    status: "due-today" as const,
    dueDate: "Today",
    type: "verify_payment" as TaskType,
    link: "/broker/billing/INV-2027-0234",
  },
  {
    id: "5",
    title: "COI Request",
    subtitle: "EDI Type: cP · Policy # POL-2027-0924",
    status: "due-tomorrow" as const,
    dueDate: "Due Tomorrow",
    type: "coi_request" as TaskType,
    link: "/broker/certificates/POL-2027-0924",
  },
];

const activities = [
  {
    id: "1",
    title: "Policy issued for XYZ Logistics",
    timestamp: "Yesterday at 5:45 PM",
    iconColor: "success" as const,
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "2",
    title: "Quote received from Nyala Insurance",
    description: "Quotation at 5.5% PA",
    timestamp: "Yesterday at 5:45 PM",
    iconColor: "info" as const,
    icon: <Mail size={16} />,
  },
  {
    id: "3",
    title: "COI delivered to: Tender Board",
    timestamp: "Yesterday at 5:40 PM",
    iconColor: "neutral" as const,
    icon: <FileCheck size={16} />,
  },
];

export default function BrokerDashboard() {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    type: "follow_up" as TaskType,
    relatedEntity: "",
    dueDate: "",
    description: "",
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleCreateTask = () => {
    // In production this would POST to API
    setShowCreateTask(false);
    setNewTask({ title: "", type: "follow_up", relatedEntity: "", dueDate: "", description: "" });
  };

  // Get current greeting based on time
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
              {getGreeting()}, Eve
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
            label="Open RFQs"
            value={12}
            subtitle="7 this week"
            icon={<FileText size={20} />}
          />
          <KPICard
            label="Overdue Tasks"
            value={3}
            subtitle="Past due date"
            variant="error"
            icon={<AlertCircle size={20} />}
          />
          <KPICard
            label="Unpaid Invoices"
            value="ETB 285K"
            subtitle="From 6 policies"
            icon={<DollarSign size={20} />}
          />
          <KPICard
            label="Awaiting Client"
            value={5}
            subtitle="Proposals pending response"
            icon={<Users size={20} />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Tasks Section - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Tasks</h2>
              <BrokerButton variant="ghost" size="sm" leftIcon={<Plus size={16} />} onClick={() => setShowCreateTask(true)}>
                Create Task
              </BrokerButton>
            </div>
            <div className="p-4 space-y-2">
              {tasks.map((task) => {
                const typeConfig = taskTypeConfig[task.type];
                return (
                  <div key={task.id} className="flex items-start gap-3">
                    <TaskItem
                      title={task.title}
                      subtitle={task.subtitle}
                      status={task.status}
                      dueDate={task.dueDate}
                      isCompleted={completedTasks.includes(task.id)}
                      onComplete={() => toggleTask(task.id)}
                      onClick={() => router.push(task.link)}
                      badge={
                        <StatusChip variant={typeConfig.color as "success" | "warning" | "error" | "info" | "neutral"}>
                          {typeConfig.label}
                        </StatusChip>
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Section - Takes 1 column */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Activity</h2>
              <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                View All
              </button>
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
        </div>
      </div>

      {/* Create Task Modal */}
      <FormModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onSubmit={handleCreateTask}
        title="Create Task"
        submitLabel="Create Task"
      >
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Task Title</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="e.g. Follow up on ABC Fleet quote"
            className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Task Type</label>
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value as TaskType })}
            className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)]"
          >
            <option value="follow_up">Follow Up</option>
            <option value="verify_payment">Verify Payment</option>
            <option value="coi_request">COI Request</option>
            <option value="quote_review">Quote Review</option>
            <option value="doc_request">Document Request</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Related Entity (Optional)</label>
          <input
            type="text"
            value={newTask.relatedEntity}
            onChange={(e) => setNewTask({ ...newTask, relatedEntity: e.target.value })}
            placeholder="e.g. PRO-2027-0025 or INV-2027-0142"
            className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Due Date</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Description (Optional)</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Add any notes or context..."
            rows={3}
            className="w-full px-3 py-2 border border-[var(--bg-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] resize-none"
          />
        </div>
      </FormModal>
    </div>
  );
}
