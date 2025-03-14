import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import type {
  TInsuranceForm,
  TInsuranceFormFieldValue
} from "@/types/insurance-forms.type"
import { submitInsuranceForm } from "@/actions/insurance"
import { useFormDraft } from "./useFormDraft"
import { toast } from "sonner"

export const useInsuranceFormSubmission = (form: TInsuranceForm | null) => {
  const methods = useForm<Record<string, TInsuranceFormFieldValue>>()
  const { clearDraft } = useFormDraft(form?.formId, methods)

  const mutation = useMutation({
    mutationFn: async (data: Record<string, TInsuranceFormFieldValue>) => {
      if (!form) {
        toast.error("No form selected")
        return
      }

      // Transform flat form data into grouped structure
      const groupedData = form.fields.reduce(
        (acc, field) => {
          if (field.type === "group" && field.fields) {
            const groupData = field.fields.reduce<
              Record<string, TInsuranceFormFieldValue>
            >((groupAcc, groupField) => {
              groupAcc[groupField.id] = data[groupField.id]
              return groupAcc
            }, {})

            acc[field.id] = groupData
          } else {
            acc[field.id] = data[field.id]
          }
          return acc
        },
        {} as Record<
          string,
          TInsuranceFormFieldValue | Record<string, TInsuranceFormFieldValue>
        >
      )

      return submitInsuranceForm(form.formId, groupedData)
    },
    onSuccess: () => {
      clearDraft()
      methods.reset()
      toast.success("Application submitted successfully")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to submit application")
    }
  })

  return {
    methods,
    submit: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error
  }
}
