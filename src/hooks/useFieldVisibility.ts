import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"

export const useFieldVisibility = (fieldData: TInsuranceFormField) => {
  const [isVisible, setIsVisible] = useState(true)
  const { watch } = useFormContext()

  const dependentVisibilityValue = fieldData.visibility?.dependsOn
    ? watch(fieldData.visibility.dependsOn)
    : undefined

  useEffect(() => {
    if (fieldData.visibility) {
      setIsVisible(dependentVisibilityValue === fieldData.visibility.value)
    }
  }, [fieldData.visibility, dependentVisibilityValue])

  return isVisible
}
