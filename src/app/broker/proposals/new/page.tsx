"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Plus,
  Upload,
  FileText,
  Check,
  X,
  ChevronRight,
  Search,
  Trash2,
  AlertCircle,
  Download,
  CheckCircle2,
} from "lucide-react";
import {
  PageHeader,
  BrokerButton,
  Modal,
  StatusChip,
} from "@/components/broker";

// Types
interface Client {
  id: string;
  name: string;
  tin: string;
  phone: string;
}

interface Vehicle {
  id: string;
  plateNo: string;
  makeModel: string;
  year: string;
  estimatedValue: string;
}

interface Document {
  id: string;
  name: string;
  description: string;
  status: "provided" | "pending" | "not_uploaded";
  required: boolean;
}

// Mock data
const existingClients: Client[] = [
  { id: "1", name: "ABC Transport PLC", tin: "0012345678", phone: "+251911234567" },
  { id: "2", name: "Dawn Taxi Enterprise", tin: "0023456789", phone: "+251922345678" },
  { id: "3", name: "Ethio-Djibouti Logistics", tin: "0034567890", phone: "+251933456789" },
];

const requiredDocuments: Document[] = [
  { id: "1", name: "Vehicle Registration Certificate(s)", description: "Registration or Yellow Card from Transport Authority", status: "provided", required: true },
  { id: "2", name: "Business License", description: "Valid business registration document", status: "provided", required: true },
  { id: "3", name: "TIN Certificate", description: "Tax Identification Number certificate", status: "pending", required: true },
  { id: "4", name: "Driver's License(s)", description: "Valid IDs for all listed drivers", status: "not_uploaded", required: false },
  { id: "5", name: "Previous Insurance Policy (if any)", description: "Prior policy for claims history review", status: "not_uploaded", required: false },
];

export default function CreateRFQPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [documents, setDocuments] = useState<Document[]>(requiredDocuments);

  // New client form state
  const [newClientName, setNewClientName] = useState("");
  const [newClientTin, setNewClientTin] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");

  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({});

  // CSV upload state
  const [csvErrors, setCsvErrors] = useState<{ row: number; field: string; message: string }[]>([]);
  const [showCsvPreview, setShowCsvPreview] = useState(false);

  const handleDownloadTemplate = () => {
    const csvContent = "Plate No.,Make/Model,Year,Estimated Value (ETB)\n3-AA-12345,Toyota Hilux,2024,2500000\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vehicle_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter(line => line.trim());
      const errors: { row: number; field: string; message: string }[] = [];
      const parsed: Vehicle[] = [];

      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map(c => c.trim());
        if (cols.length < 4) {
          errors.push({ row: i + 1, field: "row", message: "Missing columns (expected 4)" });
          continue;
        }
        const [plateNo, makeModel, year, estimatedValue] = cols;

        if (!plateNo) errors.push({ row: i + 1, field: "Plate No.", message: "Plate number is required" });
        if (!makeModel) errors.push({ row: i + 1, field: "Make/Model", message: "Make/Model is required" });
        if (year && (isNaN(Number(year)) || Number(year) < 1990 || Number(year) > 2027)) {
          errors.push({ row: i + 1, field: "Year", message: `Invalid year: ${year}` });
        }
        if (estimatedValue && isNaN(Number(estimatedValue.replace(/[^0-9.]/g, "")))) {
          errors.push({ row: i + 1, field: "Value", message: `Invalid value: ${estimatedValue}` });
        }

        parsed.push({
          id: `csv-${Date.now()}-${i}`,
          plateNo: plateNo || "",
          makeModel: makeModel || "",
          year: year || "",
          estimatedValue: estimatedValue ? `ETB ${Number(estimatedValue.replace(/[^0-9.]/g, "")).toLocaleString()}` : "",
        });
      }

      setCsvErrors(errors);
      if (parsed.length > 0) {
        setVehicles(prev => [...prev, ...parsed]);
        setShowCsvPreview(true);
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = "";
  };

  const steps = [
    { id: 1, label: "Select Client", completed: currentStep > 1 },
    { id: 2, label: "Fleet Upload", completed: currentStep > 2 },
    { id: 3, label: "Documents", completed: false },
  ];

  const filteredClients = existingClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.tin.includes(searchQuery) ||
      client.phone.includes(searchQuery)
  );

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCreateClient = () => {
    if (newClientName && newClientTin) {
      const newClient: Client = {
        id: `new-${Date.now()}`,
        name: newClientName,
        tin: newClientTin,
        phone: newClientPhone,
      };
      setSelectedClient(newClient);
      setShowNewClientModal(false);
      setNewClientName("");
      setNewClientTin("");
      setNewClientPhone("");
      setNewClientEmail("");
    }
  };

  const handleAddVehicle = () => {
    if (newVehicle.plateNo && newVehicle.makeModel) {
      setVehicles([
        ...vehicles,
        {
          id: `v-${Date.now()}`,
          plateNo: newVehicle.plateNo || "",
          makeModel: newVehicle.makeModel || "",
          year: newVehicle.year || "",
          estimatedValue: newVehicle.estimatedValue || "",
        },
      ]);
      setNewVehicle({});
    }
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRFQ = () => {
    // In real app, would submit to API
    router.push("/broker/proposals");
  };

  const totalEstimatedValue = vehicles.reduce((sum, v) => {
    const value = parseFloat(v.estimatedValue.replace(/[^0-9.]/g, "")) || 0;
    return sum + value;
  }, 0);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        breadcrumbs={[
          { label: "Proposals", href: "/broker/proposals" },
          { label: "Create RFQ" },
        ]}
        title="Create RFQ (for client)"
        subtitle="Submit a new request for quote on behalf of a client"
      />

      {/* Progress Steps */}
      <div className="bg-white border-b border-[var(--bg-border)] px-4 sm:px-6 md:px-8 py-4">
        <div className="flex items-center gap-4 max-w-2xl">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed
                      ? "bg-[var(--status-success)] text-white"
                      : currentStep === step.id
                      ? "bg-[var(--accent-primary)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                  }`}
                >
                  {step.completed ? <Check size={16} /> : step.id}
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentStep === step.id
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight size={20} className="mx-4 text-[var(--text-tertiary)]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--bg-surface)]">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Select Client */}
              {currentStep === 1 && (
                <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-6">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                    Step 1: Select or Create Client Account
                  </h2>

                  <div className="flex gap-3 mb-6">
                    <button
                      className={`flex-1 px-4 py-3 rounded-[var(--radius-md)] border-2 text-sm font-medium transition-colors ${
                        !showNewClientModal
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 text-[var(--text-primary)]"
                          : "border-[var(--bg-border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
                      }`}
                      onClick={() => setShowNewClientModal(false)}
                    >
                      <Building2 size={18} className="inline mr-2" />
                      Select Existing Client
                    </button>
                    <button
                      className={`flex-1 px-4 py-3 rounded-[var(--radius-md)] border-2 text-sm font-medium transition-colors ${
                        showNewClientModal
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 text-[var(--text-primary)]"
                          : "border-[var(--bg-border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
                      }`}
                      onClick={() => setShowNewClientModal(true)}
                    >
                      <Plus size={18} className="inline mr-2" />
                      Create New Account
                    </button>
                  </div>

                  {!showNewClientModal ? (
                    <>
                      {/* Search */}
                      <div className="mb-4">
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">
                          Search existing clients
                        </label>
                        <div className="relative">
                          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                          <input
                            type="text"
                            placeholder="Search by company name, TIN, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                          />
                        </div>
                      </div>

                      {/* Client List */}
                      <div className="space-y-2">
                        {filteredClients.map((client) => (
                          <button
                            key={client.id}
                            onClick={() => handleSelectClient(client)}
                            className={`w-full flex items-center justify-between p-4 rounded-[var(--radius-md)] border-2 transition-colors text-left ${
                              selectedClient?.id === client.id
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5"
                                : "border-[var(--bg-border)] hover:border-[var(--text-tertiary)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
                                <Building2 size={20} className="text-[var(--text-secondary)]" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--text-primary)]">{client.name}</p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                  TIN: {client.tin} · {client.phone}
                                </p>
                              </div>
                            </div>
                            {selectedClient?.id === client.id && (
                              <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
                                <Check size={14} className="text-[var(--text-primary)]" />
                              </div>
                            )}
                            <span className="text-sm text-[var(--accent-primary)]">Select</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* New Client Form */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          className="w-full px-4 py-2.5 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            TIN *
                          </label>
                          <input
                            type="text"
                            placeholder="0012345678"
                            value={newClientTin}
                            onChange={(e) => setNewClientTin(e.target.value)}
                            className="w-full px-4 py-2.5 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            placeholder="+251911234567"
                            value={newClientPhone}
                            onChange={(e) => setNewClientPhone(e.target.value)}
                            className="w-full px-4 py-2.5 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="contact@company.com"
                          value={newClientEmail}
                          onChange={(e) => setNewClientEmail(e.target.value)}
                          className="w-full px-4 py-2.5 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                        />
                      </div>
                      <BrokerButton
                        variant="primary"
                        onClick={handleCreateClient}
                        disabled={!newClientName || !newClientTin}
                      >
                        Create Client Account
                      </BrokerButton>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Upload Vehicles */}
              {currentStep === 2 && (
                <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                      Step 2: Upload Fleet Vehicles
                    </h2>
                    <BrokerButton variant="secondary" size="sm" leftIcon={<Download size={14} />} onClick={handleDownloadTemplate}>
                      Download Template
                    </BrokerButton>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] p-8 text-center mb-6">
                    <Upload size={32} className="mx-auto text-[var(--text-tertiary)] mb-3" />
                    <p className="text-sm text-[var(--text-secondary)] mb-1">
                      Drop Fleet CSV/Excel file here or click to upload
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      CSV, XLS, XLSX up to 5MB · Maximum 500 vehicles
                    </p>
                    <label className="mt-3 inline-block text-sm text-[var(--accent-primary)] hover:underline cursor-pointer">
                      Browse Files
                      <input
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        onChange={handleCsvUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* CSV Validation Errors */}
                  {csvErrors.length > 0 && showCsvPreview && (
                    <div className="mb-6 p-4 rounded-[var(--radius-md)] bg-[var(--status-error)]/5 border border-[var(--status-error)]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={18} className="text-[var(--status-error)]" />
                        <p className="font-medium text-[var(--status-error)]">
                          {csvErrors.length} validation {csvErrors.length === 1 ? "error" : "errors"} found
                        </p>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-auto">
                        {csvErrors.map((err, i) => (
                          <p key={i} className="text-sm text-[var(--text-secondary)]">
                            Row {err.row}: <span className="text-[var(--status-error)]">{err.field}</span> — {err.message}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CSV Preview Success */}
                  {showCsvPreview && csvErrors.length === 0 && vehicles.length > 0 && (
                    <div className="mb-6 p-4 rounded-[var(--radius-md)] bg-[var(--status-success)]/5 border border-[var(--status-success)]/20">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-[var(--status-success)]" />
                        <p className="font-medium text-[var(--status-success)]">
                          {vehicles.length} vehicles imported successfully
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-[var(--bg-border)]" />
                    <span className="text-sm text-[var(--text-tertiary)]">OR</span>
                    <div className="flex-1 h-px bg-[var(--bg-border)]" />
                  </div>

                  {/* Manual Add Form */}
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Or add vehicles manually:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Plate No. e.g. 3-AA-12345"
                      value={newVehicle.plateNo || ""}
                      onChange={(e) => setNewVehicle({ ...newVehicle, plateNo: e.target.value })}
                      className="px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Make/Model e.g. Toyota Hilux"
                      value={newVehicle.makeModel || ""}
                      onChange={(e) => setNewVehicle({ ...newVehicle, makeModel: e.target.value })}
                      className="px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Year e.g. 2024"
                      value={newVehicle.year || ""}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                      className="px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Est. Value (ETB)"
                      value={newVehicle.estimatedValue || ""}
                      onChange={(e) => setNewVehicle({ ...newVehicle, estimatedValue: e.target.value })}
                      className="px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm"
                    />
                  </div>
                  <button
                    onClick={handleAddVehicle}
                    className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
                  >
                    <Plus size={16} />
                    Add another vehicle
                  </button>

                  {/* Vehicle List */}
                  {vehicles.length > 0 && (
                    <div className="mt-6 border-t border-[var(--bg-border)] pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <StatusChip variant="success">{vehicles.length} vehicles added</StatusChip>
                        <span className="text-sm text-[var(--text-secondary)]">
                          Total Est. Value: <strong className="text-[var(--text-primary)]">ETB {totalEstimatedValue.toLocaleString()}</strong>
                        </span>
                      </div>
                      <div className="space-y-2">
                        {vehicles.map((vehicle) => (
                          <div
                            key={vehicle.id}
                            className="flex items-center justify-between p-3 bg-[var(--bg-surface)] rounded-[var(--radius-md)]"
                          >
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-[var(--text-primary)]">{vehicle.plateNo}</span>
                              <span className="text-sm text-[var(--text-secondary)]">{vehicle.makeModel}</span>
                              <span className="text-sm text-[var(--text-tertiary)]">{vehicle.year}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-[var(--text-primary)]">{vehicle.estimatedValue}</span>
                              <button
                                onClick={() => handleRemoveVehicle(vehicle.id)}
                                className="text-[var(--status-error)] hover:bg-[var(--status-error)]/10 p-1 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-6">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    Step 3: Required Documents Checklist
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-6">
                    Check off documents the client has provided or will provide. Missing documents can be uploaded later.
                  </p>

                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex items-start gap-4 p-4 rounded-[var(--radius-md)] border ${
                          doc.status === "provided"
                            ? "border-[var(--status-success)] bg-[var(--status-success)]/5"
                            : doc.status === "pending"
                            ? "border-[var(--status-warning)] bg-[var(--status-warning)]/5"
                            : "border-[var(--bg-border)]"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setDocuments(
                              documents.map((d) =>
                                d.id === doc.id
                                  ? {
                                      ...d,
                                      status:
                                        d.status === "provided"
                                          ? "not_uploaded"
                                          : d.status === "pending"
                                          ? "provided"
                                          : "pending",
                                    }
                                  : d
                              )
                            );
                          }}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            doc.status === "provided"
                              ? "border-[var(--status-success)] bg-[var(--status-success)] text-white"
                              : doc.status === "pending"
                              ? "border-[var(--status-warning)] bg-[var(--status-warning)]"
                              : "border-[var(--bg-border)]"
                          }`}
                        >
                          {doc.status === "provided" && <Check size={14} />}
                          {doc.status === "pending" && <span className="w-2 h-2 bg-white rounded-full" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[var(--text-primary)]">{doc.name}</p>
                            {doc.required && (
                              <span className="text-xs text-[var(--status-error)]">*Required</span>
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{doc.description}</p>
                        </div>
                        <StatusChip
                          variant={
                            doc.status === "provided"
                              ? "success"
                              : doc.status === "pending"
                              ? "warning"
                              : "neutral"
                          }
                        >
                          {doc.status === "provided" ? "Provided" : doc.status === "pending" ? "Pending" : "Not uploaded"}
                        </StatusChip>
                      </div>
                    ))}
                  </div>

                  {/* Additional Notes */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      placeholder="Any special requirements or notes for insurers..."
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - RFQ Summary */}
            <div className="col-span-1">
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-5 sticky top-8">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  {currentStep === 1 ? "Broker-Created RFQ" : "RFQ Summary"}
                </h3>

                {currentStep === 1 ? (
                  <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <p>• This RFQ will be logged as broker-initiated</p>
                    <p>• Client will not be able to log into the client portal directly</p>
                    <p>• Activity Log shows "RFQ created by [your name]"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Client</p>
                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedClient?.name || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Vehicles</p>
                      <p className="font-medium text-[var(--text-primary)]">
                        {vehicles.length} vehicles
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Est. Fleet Value</p>
                      <p className="font-medium text-[var(--text-primary)]">
                        ETB {totalEstimatedValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Documents</p>
                      <p className="font-medium text-[var(--text-primary)]">
                        {documents.filter((d) => d.status === "provided").length} / {documents.length} provided
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Created by</p>
                      <p className="font-medium text-[var(--text-primary)]">Eve (Broker)</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Type</p>
                      <StatusChip variant="info">Broker Created</StatusChip>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-[var(--bg-border)] px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <BrokerButton variant="secondary" onClick={() => router.push("/broker/proposals")}>
            Cancel
          </BrokerButton>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <BrokerButton variant="secondary" onClick={handlePrevStep}>
                Back
              </BrokerButton>
            )}
            {currentStep < 3 ? (
              <BrokerButton
                variant="primary"
                onClick={handleNextStep}
                disabled={currentStep === 1 && !selectedClient}
              >
                Next: {currentStep === 1 ? "Fleet Upload" : "Documents"}
              </BrokerButton>
            ) : (
              <div className="flex gap-3">
                <BrokerButton variant="secondary">Save Draft</BrokerButton>
                <BrokerButton variant="primary" onClick={handleSubmitRFQ}>
                  Submit RFQ
                </BrokerButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
