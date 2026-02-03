"use client";

import { TextInput, SelectInput, Textarea, DatePicker, FileUpload, RadioGroup, CheckboxGroup } from "../Input";

export function AddQuoteForm() {
  return (
    <>
      <SelectInput
        label="Insurer"
        options={[
          { value: "", label: "Select insurer" },
          { value: "nyala", label: "Nyala Insurance S.C" },
          { value: "awash", label: "Awash Insurance S.C" },
          { value: "ethio-life", label: "Ethiopian Life Insurance" },
          { value: "nib", label: "Nib Insurance S.C" },
        ]}
      />
      <TextInput label="Quoted Premium" placeholder="ETB 0.00" />
      <TextInput label="Commission Rate (%)" placeholder="e.g. 15" type="number" />
      <DatePicker label="Valid Until" />
      <FileUpload label="Quote Document" accept=".pdf,.doc,.docx" hint="PDF or Word, max 10MB" />
      <Textarea label="Notes" placeholder="Any special terms or conditions..." rows={3} />
    </>
  );
}

export function RequestDocumentsForm() {
  return (
    <>
      <CheckboxGroup
        label="Required Documents"
        options={[
          { value: "vehicle_reg", label: "Vehicle Registration Certificate" },
          { value: "driving_license", label: "Driving License" },
          { value: "id_card", label: "National ID Card" },
          { value: "tin", label: "TIN Certificate" },
          { value: "trade_license", label: "Trade License" },
          { value: "photos", label: "Vehicle Photos" },
        ]}
        values={["vehicle_reg", "driving_license"]}
      />
      <Textarea label="Message to Client" placeholder="Please provide the following documents..." rows={3} />
    </>
  );
}

export function AddNoteForm() {
  return (
    <>
      <SelectInput
        label="Note Type"
        options={[
          { value: "general", label: "General Note" },
          { value: "client_call", label: "Client Call" },
          { value: "insurer_update", label: "Insurer Update" },
          { value: "internal", label: "Internal Note" },
        ]}
      />
      <Textarea label="Note" placeholder="Write your note here..." rows={4} />
    </>
  );
}

export function SendQuotesToClientForm() {
  return (
    <>
      <TextInput label="Client Email" placeholder="client@example.com" type="email" />
      <CheckboxGroup
        label="Quotes to Include"
        options={[
          { value: "q1", label: "Nyala Insurance — ETB 31,500" },
          { value: "q2", label: "Awash Insurance — ETB 28,900" },
          { value: "q3", label: "Nib Insurance — ETB 33,200" },
        ]}
        values={["q1", "q2", "q3"]}
      />
      <Textarea label="Message" placeholder="Hi, please find attached the insurance quotes..." rows={3} />
    </>
  );
}

export function MarkAsLostForm() {
  return (
    <>
      <RadioGroup
        label="Reason"
        options={[
          { value: "price", label: "Price too high" },
          { value: "competitor", label: "Client went with competitor" },
          { value: "no_response", label: "Client unresponsive" },
          { value: "cancelled", label: "Client cancelled request" },
          { value: "other", label: "Other" },
        ]}
        value="price"
      />
      <Textarea label="Additional Details" placeholder="Any additional context..." rows={3} />
    </>
  );
}

export function ReassignProposalForm() {
  return (
    <>
      <SelectInput
        label="Reassign To"
        options={[
          { value: "", label: "Select team member" },
          { value: "yonas", label: "Yonas Tadesse" },
          { value: "helen", label: "Helen Gebremedhin" },
          { value: "daniel", label: "Daniel Bekele" },
        ]}
      />
      <Textarea label="Reason for Reassignment" placeholder="Explain why this proposal is being reassigned..." rows={3} />
    </>
  );
}

export function RecordInsurerDecisionForm() {
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
      <RadioGroup
        label="Decision"
        options={[
          { value: "approved", label: "Approved" },
          { value: "declined", label: "Declined" },
          { value: "counter_offer", label: "Counter Offer" },
        ]}
        value="approved"
      />
      <TextInput label="Final Premium" placeholder="ETB 0.00" />
      <DatePicker label="Valid Until" />
      <Textarea label="Remarks" placeholder="Any conditions or remarks from the insurer..." rows={3} />
    </>
  );
}
