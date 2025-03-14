export type TInsuranceForm = {
  formId: string
  title: string
  fields: TInsuranceFormField[]
}

export type TInsuranceFormFieldValue = string | number | boolean

export type TInsuranceFormField = {
  id: string
  label: string
  type:
    | "group"
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "radio"
  fields?: TInsuranceFormField[]
  options?: string[]
  dynamicOptions?: TDynamicOptions
  required?: boolean
  validation?: TValidation
  visibility?: TVisibility
}

export type TDynamicOptions = {
  dependsOn: string
  condition: string
  endpoint: string
  method: string
}

export type TValidation = {
  pattern?: RegExp
  min?: number
  max?: number
}

export type TVisibility = {
  dependsOn: string
  condition: string
  value: string
}
