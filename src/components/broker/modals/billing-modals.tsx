"use client";

import { TextInput, SelectInput, Textarea, DatePicker, FileUpload } from "../Input";

export function VerifyPaymentForm() {
  return (
    <>
      <TextInput label="Transaction Reference" placeholder="e.g. TXN-2027-0001" />
      <TextInput label="Amount Verified" placeholder="ETB 0.00" />
      <DatePicker label="Payment Date" />
      <SelectInput
        label="Payment Method"
        options={[
          { value: "", label: "Select method" },
          { value: "bank_transfer", label: "Bank Transfer" },
          { value: "check", label: "Check" },
          { value: "cash", label: "Cash" },
          { value: "mobile", label: "Mobile Payment" },
        ]}
      />
      <Textarea label="Notes" placeholder="Any additional verification notes..." rows={2} />
    </>
  );
}

export function RecordManualPaymentForm() {
  return (
    <>
      <TextInput label="Amount" placeholder="ETB 0.00" />
      <DatePicker label="Payment Date" />
      <SelectInput
        label="Payment Method"
        options={[
          { value: "", label: "Select method" },
          { value: "bank_transfer", label: "Bank Transfer" },
          { value: "check", label: "Check" },
          { value: "cash", label: "Cash" },
          { value: "mobile", label: "Mobile Payment" },
        ]}
      />
      <TextInput label="Reference / Receipt No." placeholder="e.g. RCP-001234" />
      <FileUpload label="Payment Proof" accept=".pdf,.jpg,.png" hint="Upload receipt or bank slip" />
      <Textarea label="Notes" placeholder="Additional payment details..." rows={2} />
    </>
  );
}
