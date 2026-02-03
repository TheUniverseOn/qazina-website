"use client";

import { TextInput, SelectInput, Textarea, RadioGroup } from "../Input";

export function RecordEndorsementResponseForm() {
  return (
    <>
      <RadioGroup
        label="Insurer Decision"
        options={[
          { value: "approved", label: "Approved" },
          { value: "approved_modified", label: "Approved with Modifications" },
          { value: "declined", label: "Declined" },
        ]}
        value="approved"
      />
      <TextInput label="Adjusted Premium" placeholder="ETB 0.00" />
      <Textarea label="Insurer Remarks" placeholder="Any conditions or modifications from the insurer..." rows={3} />
    </>
  );
}

export function RejectEndorsementForm() {
  return (
    <>
      <SelectInput
        label="Rejection Reason"
        options={[
          { value: "", label: "Select reason" },
          { value: "insufficient_info", label: "Insufficient Information" },
          { value: "policy_terms", label: "Against Policy Terms" },
          { value: "risk_assessment", label: "Failed Risk Assessment" },
          { value: "other", label: "Other" },
        ]}
      />
      <Textarea label="Details" placeholder="Explain the reason for rejection..." rows={3} />
    </>
  );
}
