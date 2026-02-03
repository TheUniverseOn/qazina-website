"use client";

import { SelectInput, Textarea, DatePicker } from "../Input";

export function CancelPolicyForm() {
  return (
    <>
      <SelectInput
        label="Cancellation Reason"
        options={[
          { value: "", label: "Select reason" },
          { value: "client_request", label: "Client Request" },
          { value: "non_payment", label: "Non-Payment" },
          { value: "fraud", label: "Fraud / Misrepresentation" },
          { value: "replacement", label: "Policy Replacement" },
          { value: "other", label: "Other" },
        ]}
      />
      <DatePicker label="Effective Cancellation Date" />
      <Textarea label="Notes" placeholder="Additional details about cancellation..." rows={3} />
    </>
  );
}
