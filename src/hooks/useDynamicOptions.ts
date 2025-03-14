import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { getDynamicOptions } from "@/api/insurance"
import type { TInsuranceFormField } from "@/types/insurance-forms.type"

export const useDynamicOptions = (fieldData: TInsuranceFormField) => {
  const { watch } = useFormContext()

  const dependentDynamicValue = fieldData.dynamicOptions?.dependsOn
    ? watch(fieldData.dynamicOptions.dependsOn)
    : undefined

  const {
    data: dynamicOptionsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["dynamicOptions", dependentDynamicValue],
    queryFn: async () => {
      const data = await getDynamicOptions(
        fieldData.dynamicOptions!.endpoint,
        `country=${watch("country")}`
      )
      return data
    },
    enabled: !!dependentDynamicValue
  })

  return {
    dynamicOptionsData,
    isLoading,
    error
  }
}
