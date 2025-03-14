import type { TInsuranceFormField } from "@/types/insurance-forms.type"

export const useFieldValidation = (fieldData: TInsuranceFormField) => {
  const fieldValidation = {
    required: fieldData.required
      ? {
          value: fieldData.required,
          message: "This field is required"
        }
      : undefined,
    pattern: fieldData.validation?.pattern
      ? {
          value: fieldData.validation?.pattern,
          message: "Invalid format"
        }
      : undefined,
    validate: {
      min: (value: number) => {
        if (fieldData.validation?.min && value < fieldData.validation?.min) {
          return `Minimum value is ${fieldData.validation?.min}`
        }
        return true
      },
      max: (value: number) => {
        if (fieldData.validation?.max && value > fieldData.validation?.max) {
          return `Maximum value is ${fieldData.validation?.max}`
        }
        return true
      }
    }
  }

  return fieldValidation
}
