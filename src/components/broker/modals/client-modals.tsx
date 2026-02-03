"use client";

import { TextInput, SelectInput, Textarea, DatePicker, FileUpload } from "../Input";

export function RequestCOIForm() {
  return (
    <>
      <TextInput label="Requesting Party" placeholder="Name of the party requesting the COI" />
      <TextInput label="Purpose" placeholder="e.g. Contract requirement, Regulatory compliance" />
      <DatePicker label="Required By" />
      <Textarea label="Additional Details" placeholder="Any specific requirements for the certificate..." rows={3} />
    </>
  );
}

export function RequestEndorsementForm() {
  return (
    <>
      <SelectInput
        label="Endorsement Type"
        options={[
          { value: "", label: "Select type" },
          { value: "add_vehicle", label: "Add Vehicle" },
          { value: "remove_vehicle", label: "Remove Vehicle" },
          { value: "change_coverage", label: "Change Coverage" },
          { value: "update_info", label: "Update Information" },
          { value: "other", label: "Other" },
        ]}
      />
      <DatePicker label="Requested Effective Date" />
      <Textarea label="Description" placeholder="Describe the changes you need..." rows={4} />
      <FileUpload label="Supporting Documents" accept=".pdf,.jpg,.png" multiple hint="Upload any relevant documents" />
    </>
  );
}

export function AcceptQuoteForm() {
  return (
    <>
      <TextInput label="Selected Insurer" disabled />
      <TextInput label="Premium Amount" disabled />
      <Textarea label="Confirmation Message" placeholder="I accept this quote and agree to the terms..." rows={3} />
    </>
  );
}
