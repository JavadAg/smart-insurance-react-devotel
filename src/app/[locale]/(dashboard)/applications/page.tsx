import { getInsuranceFormSubmissions } from "@/api/insurance"
import Applications from "@/components/Applications/Applications"

export default async function ApplicationsPage() {
  const applications = await getInsuranceFormSubmissions()

  return <Applications applications={applications} />
}
