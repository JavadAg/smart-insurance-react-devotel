"use server"

import { fetchApi } from "@/lib/client"
import type { TInsuranceSubmission } from "@/types/insurance-submissions.type"

/**
 * Submit a insurance form
 */
export const submitInsuranceForm = async (formId: string, values: any) => {
  // we assume form fields are same as response from getAllInsuranceForms
  // since doc is not clear about it
  const data = await fetchApi<TInsuranceSubmission>(
    `/api/insurance/forms/submit`,
    {
      method: "POST",
      body: JSON.stringify(values)
    }
  )
  return data
}
