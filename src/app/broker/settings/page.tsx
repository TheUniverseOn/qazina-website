"use client";

import { useState } from "react";
import {
  User,
  Building2,
  Users,
  Bell,
  Shield,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { PageHeader, BrokerButton, Avatar } from "@/components/broker";

// Types
type SettingsTab = "profile" | "company" | "team" | "notifications" | "security" | "billing";

const settingsTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "company", label: "Company", icon: <Building2 size={18} /> },
  { id: "team", label: "Team", icon: <Users size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
];

// Mock data
const profileData = {
  firstName: "Abebe",
  lastName: "Bikila",
  email: "abebe.bikila@company.com",
  phone: "+251 911 234 567",
  role: "Administrator",
  initials: "AB",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="flex flex-col h-full bg-[var(--bg-surface)]">
      <PageHeader
        breadcrumbs={[
          { label: "Settings" },
        ]}
        title="Settings"
        subtitle="Manage your account and company settings"
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="w-full md:w-60 md:flex-shrink-0">
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 space-y-6">
            {activeTab === "profile" && (
              <>
                {/* Profile Information */}
                <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Profile Information</h2>
                    <button className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
                      Edit Profile
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-2xl font-bold text-[var(--accent-text)]">
                          {profileData.initials}
                        </div>
                        <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                          Change photo
                        </button>
                      </div>

                      {/* Profile Fields */}
                      <div className="flex-1 grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-1">First Name</label>
                          <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                            {profileData.firstName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-1">Last Name</label>
                          <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                            {profileData.lastName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-1">Email Address</label>
                          <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                            {profileData.email}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-1">Phone Number</label>
                          <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                            {profileData.phone}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-1">Role</label>
                          <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                            {profileData.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Security</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-[var(--bg-border)]">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Password</p>
                        <p className="text-sm text-[var(--text-secondary)]">Last changed 30 days ago</p>
                      </div>
                      <button className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
                        Change Password
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
                        <p className="text-sm text-[var(--text-secondary)]">Add an extra layer of security to your account</p>
                      </div>
                      {/* Toggle */}
                      <button className="w-12 h-6 rounded-full bg-[var(--bg-divider)] relative transition-colors">
                        <div className="w-5 h-5 rounded-full bg-white shadow absolute left-0.5 top-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "company" && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Company Information</h2>
                  <button className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
                    Edit
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-1">Company Name</label>
                      <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                        Qazina Insurance Brokers
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-1">Registration Number</label>
                      <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                        BR-2024-00123
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-1">Phone</label>
                      <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                        +251 11 234 5678
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                      <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                        info@qazina.com
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-[var(--text-secondary)] mb-1">Address</label>
                      <div className="px-4 py-2.5 bg-[var(--bg-surface)] rounded-[var(--radius-md)] text-[var(--text-primary)]">
                        Bole Road, Addis Ababa, Ethiopia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Team Members</h2>
                  <BrokerButton variant="primary" size="sm">
                    Invite Member
                  </BrokerButton>
                </div>
                <div className="divide-y divide-[var(--bg-border)]">
                  {[
                    { name: "Abebe Bikila", email: "abebe@qazina.com", role: "Administrator", initials: "AB" },
                    { name: "Sara Kebede", email: "sara@qazina.com", role: "Broker", initials: "SK" },
                    { name: "Dawit Haile", email: "dawit@qazina.com", role: "Broker", initials: "DH" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-sm font-medium text-[var(--accent-text)]">
                          {member.initials}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{member.name}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[var(--text-secondary)]">{member.role}</span>
                        <button className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Notification Preferences</h2>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { title: "Email Notifications", description: "Receive email updates for new proposals and policies" },
                    { title: "Push Notifications", description: "Get push notifications for important updates" },
                    { title: "SMS Notifications", description: "Receive SMS alerts for urgent matters" },
                    { title: "Weekly Digest", description: "Get a weekly summary of your activities" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--bg-border)] last:border-0">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                      </div>
                      <button className={`w-12 h-6 rounded-full relative transition-colors ${index < 2 ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-divider)]'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${index < 2 ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Security Settings</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[var(--bg-border)]">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Password</p>
                      <p className="text-sm text-[var(--text-secondary)]">Last changed 30 days ago</p>
                    </div>
                    <BrokerButton variant="secondary" size="sm">
                      Change Password
                    </BrokerButton>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[var(--bg-border)]">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
                      <p className="text-sm text-[var(--text-secondary)]">Add an extra layer of security</p>
                    </div>
                    <BrokerButton variant="secondary" size="sm">
                      Enable
                    </BrokerButton>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Active Sessions</p>
                      <p className="text-sm text-[var(--text-secondary)]">Manage your active sessions</p>
                    </div>
                    <BrokerButton variant="secondary" size="sm">
                      View Sessions
                    </BrokerButton>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-border)]">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Billing & Subscription</h2>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-[var(--bg-surface)] rounded-[var(--radius-md)] mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">Professional Plan</span>
                      <span className="px-2 py-1 bg-[var(--status-success-bg)] text-[var(--status-success)] text-xs font-medium rounded">Active</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">ETB 5,000/month · Renews on Feb 1, 2025</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-[var(--bg-border)]">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Payment Method</p>
                        <p className="text-sm text-[var(--text-secondary)]">Visa ending in 4242</p>
                      </div>
                      <button className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
                        Update
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Billing History</p>
                        <p className="text-sm text-[var(--text-secondary)]">View past invoices and receipts</p>
                      </div>
                      <button className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
                        View History
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
