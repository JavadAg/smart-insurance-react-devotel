import { useFormContext, type ControllerRenderProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../ui/select"
import { DatePicker } from "../ui/date-picker"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useFieldVisibility } from "@/hooks/useFieldVisibility"
import { useDynamicOptions } from "@/hooks/useDynamicOptions"
import { useFieldValidation } from "@/hooks/useFieldValidation"
import { cn } from "@/lib/utils"

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
        return 0
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
        return <Input {...field} />
      case "number":
        return (
          <Input
            type="number"
            {...field}
            onChange={(e) => {
              const value = e.target.value
              if (value === "" || !isNaN(Number(value))) {
                field.onChange(value)
              }
            }}
          />
        )
      case "date":
        return <DatePicker {...field} />
      case "checkbox":
        return <Checkbox {...field} />
      case "select":
        return (
          <Select
            {...field}
            disabled={isLoading}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={isLoading ? "Loading..." : fieldData.label}
              />
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
                <span className="text-sm">
                  {fieldData.label} is not available
                </span>
              )}
            </SelectContent>
          </Select>
        )
      case "radio":
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-row gap-4"
          >
            {fieldData.options?.map((option) => (
              <div key={option} className="mt-2 flex items-center gap-2">
                <RadioGroupItem value={option} />
                <Label>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
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
