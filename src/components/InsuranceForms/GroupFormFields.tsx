import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import FormField from "./InsuranceFormField"

interface GroupFormFieldsProps {
  fields: TInsuranceFormField[]
}

const GroupFormFields = ({ fields }: GroupFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 items-start gap-4 border-l-2 pl-4 md:grid-cols-2 lg:grid-cols-3">
      {fields.map((field) => (
        <FormField key={field.id} fieldData={field} isGroup />
      ))}
    </div>
  )
}

export default GroupFormFields
