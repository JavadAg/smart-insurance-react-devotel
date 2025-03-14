import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createDynamicFormSchema } from "../validations/insurance"
import { getAllInsuranceForms, submitInsuranceForm } from "@/api/insurance"

export function useInsuranceForm(formId: string) {
  const { data: form, isLoading } = useQuery({
    queryKey: ["insurance-form", formId],
    queryFn: () => getAllInsuranceForms()
  })

  const mutation = useMutation({
    mutationFn: (data: unknown) => submitInsuranceForm(formId, data),
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
      console.error("Form submission error:", error)
    }
  })

  const formSchema = form ? createDynamicFormSchema(form.fields) : null

  const formMethods = useForm({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: form?.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: ""
      }),
      {}
    )
  })

  return {
    form,
    isLoading,
    formMethods,
    submit: mutation.mutate,
    isSubmitting: mutation.isPending
  }
}
