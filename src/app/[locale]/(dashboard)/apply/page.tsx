import { getAllInsuranceForms } from "@/api/insurance"
import InsuranceForms from "@/components/InsuranceForms/InsuranceForms"

export default async function ApplyPage() {
  const forms = await getAllInsuranceForms()

  return <InsuranceForms forms={forms} />
}
