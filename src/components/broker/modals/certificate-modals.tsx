"use client";

import { TextInput, SelectInput, Textarea, DatePicker, FileUpload } from "../Input";

export function IssueMotorCertificateForm() {
  return (
    <>
      <TextInput label="Certificate Number" placeholder="e.g. CERT-2027-0001" />
      <SelectInput
        label="Vehicle"
        options={[
          { value: "", label: "Select vehicle" },
          { value: "v1", label: "3-AA-12345 — Toyota Hilux" },
          { value: "v2", label: "3-AA-15145 — Toyota Land Cruiser Prado" },
        ]}
      />
      <SelectInput
        label="Cover Type"
        options={[
          { value: "comprehensive", label: "Comprehensive" },
          { value: "third_party", label: "Third Party" },
          { value: "third_party_fire_theft", label: "Third Party, Fire & Theft" },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <DatePicker label="Valid From" />
        <DatePicker label="Valid Until" />
      </div>
      <TextInput label="Sum Insured" placeholder="ETB 0.00" />
      <FileUpload label="Certificate PDF" accept=".pdf" hint="Upload signed certificate PDF" />
    </>
  );
}

export function IssueCOIForm() {
  return (
    <>
      <TextInput label="COI Reference" placeholder="e.g. COI-2027-0001" />
      <TextInput label="Requesting Party" placeholder="Name of the party requesting the COI" />
      <SelectInput
        label="Coverage Scope"
        options={[
          { value: "full", label: "Full Policy Coverage" },
          { value: "specific", label: "Specific Coverage Lines" },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <DatePicker label="Valid From" />
        <DatePicker label="Valid Until" />
      </div>
      <Textarea label="Special Instructions" placeholder="Any specific details to include..." rows={3} />
    </>
  );
}
