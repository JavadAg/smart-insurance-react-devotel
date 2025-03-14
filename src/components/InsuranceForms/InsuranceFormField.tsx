import { useFormContext, type ControllerRenderProps } from "react-hook-form"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { DatePicker } from "../ui/date-picker"
import { useFieldVisibility } from "@/hooks/useFieldVisibility"
import { useDynamicOptions } from "@/hooks/useDynamicOptions"
import { useFieldValidation } from "@/hooks/useFieldValidation"
import { cn } from "@/lib/utils"
import {
  TextField,
  NumberField,
  SelectField,
  RadioField,
  CheckboxField
} from "./fields"
import { Reorder } from "motion/react"

interface FormFieldProps {
  fieldData: TInsuranceFormField
  isGroup?: boolean
}

const InsuranceFormField = ({ fieldData, isGroup }: FormFieldProps) => {
  const { control } = useFormContext()
  const isVisible = useFieldVisibility(fieldData)
  const { dynamicOptionsData, isLoading } = useDynamicOptions(fieldData)
  const fieldValidation = useFieldValidation(fieldData)

  const getDefaultValue = () => {
    switch (fieldData.type) {
      case "text":
        return ""
      case "number":
        return ""
      case "date":
        return undefined
      case "checkbox":
        return false
      case "select":
        return ""
      case "radio":
        return ""
      default:
        return ""
    }
  }

  if (!isVisible) return null

  const renderField = (field: ControllerRenderProps) => {
    switch (fieldData.type) {
      case "text":
        return <TextField field={field} />
      case "number":
        return <NumberField field={field} />
      case "date":
        return <DatePicker field={field} />
      case "checkbox":
        return <CheckboxField field={field} />
      case "select":
        return (
          <SelectField
            field={field}
            fieldData={fieldData}
            dynamicOptionsData={dynamicOptionsData}
            isLoading={isLoading}
          />
        )
      case "radio":
        return <RadioField field={field} fieldData={fieldData} />
      default:
        return null
    }
  }

  return (
    <FormField
      name={fieldData.id}
      control={control}
      rules={fieldValidation}
      defaultValue={getDefaultValue()}
      render={({ field }) => (
        <FormItem
          className={cn(
            isGroup ? "max-w-full" : "max-w-full md:max-w-1/2 lg:max-w-1/3",
            fieldData.type === "checkbox" && "flex items-center gap-4"
          )}
        >
          <FormLabel>{fieldData.label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InsuranceFormField
