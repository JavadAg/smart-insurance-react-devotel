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
      minLength: (value: string) => {
        if (
          fieldData.validation?.min &&
          value.length < fieldData.validation?.min
        ) {
          return `Minimum length is ${fieldData.validation?.min}`
        }
        return true
      },
      maxLength: (value: string) => {
        if (
          fieldData.validation?.max &&
          value.length > fieldData.validation?.max
        ) {
          return `Maximum length is ${fieldData.validation?.max}`
        }
        return true
      }
    }
  }

  return fieldValidation
}
