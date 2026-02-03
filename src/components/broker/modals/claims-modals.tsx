"use client";

import { TextInput, SelectInput, Textarea, DatePicker, FileUpload, CheckboxGroup } from "../Input";

export function RequestEvidenceForm() {
  return (
    <>
      <CheckboxGroup
        label="Required Evidence"
        options={[
          { value: "police_report", label: "Police Report" },
          { value: "photos", label: "Photos of Damage" },
          { value: "repair_estimate", label: "Repair Estimate" },
          { value: "medical_report", label: "Medical Report" },
          { value: "witness_statement", label: "Witness Statement" },
          { value: "driving_license", label: "Driving License Copy" },
        ]}
        values={["police_report", "photos"]}
      />
      <DatePicker label="Deadline" />
      <Textarea label="Message to Client" placeholder="Please provide the following evidence for your claim..." rows={3} />
    </>
  );
}

export function SubmitClaimToInsurerForm() {
  return (
    <>
      <SelectInput
        label="Insurer"
        options={[
          { value: "", label: "Select insurer" },
          { value: "nyala", label: "Nyala Insurance S.C" },
          { value: "awash", label: "Awash Insurance S.C" },
          { value: "nib", label: "Nib Insurance S.C" },
        ]}
      />
      <TextInput label="Claim Amount" placeholder="ETB 0.00" />
      <FileUpload label="Supporting Documents" accept=".pdf,.jpg,.png" multiple hint="Upload all relevant documents" />
      <Textarea label="Claim Summary" placeholder="Provide a summary of the claim for the insurer..." rows={4} />
    </>
  );
}

export function RecordSettlementForm() {
  return (
    <>
      <SelectInput
        label="Settlement Type"
        options={[
          { value: "full", label: "Full Settlement" },
          { value: "partial", label: "Partial Settlement" },
          { value: "denied", label: "Claim Denied" },
        ]}
      />
      <TextInput label="Settlement Amount" placeholder="ETB 0.00" />
      <DatePicker label="Settlement Date" />
      <TextInput label="Reference Number" placeholder="Insurer reference number" />
      <Textarea label="Settlement Details" placeholder="Details of the settlement..." rows={3} />
    </>
  );
}
