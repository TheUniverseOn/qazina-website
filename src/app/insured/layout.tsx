import { InsuredSidebar, ToastProvider } from "@/components/insured";

export const metadata = {
  title: "Qazina Insured",
  description: "Qazina insurance client portal",
};

export default function InsuredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex h-screen bg-[var(--bg-surface)]">
        <InsuredSidebar />
        <main className="flex-1 overflow-auto pt-[52px] lg:pt-0">{children}</main>
      </div>
    </ToastProvider>
  );
}
