import type { ControllerRenderProps } from "react-hook-form"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

interface SelectFieldProps {
  field: ControllerRenderProps
  fieldData: TInsuranceFormField
  dynamicOptionsData: any
  isLoading: boolean
}

export const SelectField = ({
  field,
  fieldData,
  dynamicOptionsData,
  isLoading
}: SelectFieldProps) => {
  return (
    <Select
      {...field}
      disabled={isLoading}
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? "Loading..." : fieldData.label} />
      </SelectTrigger>
      <SelectContent>
        {fieldData.options && fieldData.options.length > 0 ? (
          fieldData.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))
        ) : fieldData.dynamicOptions ? (
          dynamicOptionsData ? (
            Object.values(dynamicOptionsData).map((value) => {
              if (Array.isArray(value)) {
                return value.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))
              }
              return null
            })
          ) : (
            <span className="text-sm">
              Select {fieldData.dynamicOptions!.dependsOn} First
            </span>
          )
        ) : (
          <span className="text-sm">{fieldData.label} is not available</span>
        )}
      </SelectContent>
    </Select>
  )
}
