import { Sidebar, ToastProvider } from "@/components/broker";

export const metadata = {
  title: "Qazina Broker",
  description: "Qazina insurance broker platform",
};

export default function BrokerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex h-screen bg-[var(--bg-surface)]">
        <Sidebar />
        <main className="flex-1 overflow-auto pt-[52px] lg:pt-0">{children}</main>
      </div>
    </ToastProvider>
  );
}
