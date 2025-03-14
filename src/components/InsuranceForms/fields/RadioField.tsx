import type { ControllerRenderProps } from "react-hook-form"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RadioFieldProps {
  field: ControllerRenderProps
  fieldData: TInsuranceFormField
}

export const RadioField = ({ field, fieldData }: RadioFieldProps) => {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className="flex flex-row gap-4"
    >
      {fieldData.options?.map((option) => (
        <div key={option} className="mt-2 flex items-center gap-2">
          <RadioGroupItem value={option} id={field.name + option} />
          <Label htmlFor={field.name + option}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
