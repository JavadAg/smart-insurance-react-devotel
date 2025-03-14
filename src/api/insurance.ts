import { fetchApi } from "@/lib/client"
import type { TInsuranceSubmissions } from "@/types/insurance-submissions.type"
import type { TInsuranceForm } from "@/types/insurance-forms.type"

/**
 * Get all insurance forms fields
 */
export const getAllInsuranceForms = async () => {
  const data = await fetchApi<TInsuranceForm[]>("/api/insurance/forms")
  return data
}

/**
 * Get all insurance form submissions
 */
export const getInsuranceFormSubmissions = async () => {
  const data = await fetchApi<TInsuranceSubmissions>(
    "/api/insurance/forms/submissions",
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24 // 24 hours
      }
    }
  )
  return data
}

/**
 * Get dynamic options for a field
 */
export const getDynamicOptions = async (endpoint: string, params: string) => {
  const data = await fetchApi<{ [key: string]: string | string[] }>(
    `${endpoint}?${params}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24 // 24 hours
      }
    }
  )
  return data
}
