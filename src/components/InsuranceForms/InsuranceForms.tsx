"use client"

import { useState, useEffect } from "react"
import type {
  TInsuranceForm,
  TInsuranceFormFieldValue,
  TInsuranceFormField
} from "@/types/insurance-forms.type"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../ui/select"
import { Label } from "../ui/label"
import { useInsuranceFormSubmission } from "@/hooks/useInsuranceFormSubmission"
import { useScopedI18n } from "@/locale/client"
import { Reorder } from "motion/react"
import InsuranceFormRow from "./InsuranceFormRow/InsuranceFormRow"

interface FormsProps {
  forms: TInsuranceForm[]
}

const InsuranceForms = ({ forms }: FormsProps) => {
  const [selectedForm, setSelectedForm] = useState<TInsuranceForm | null>(
    forms[0]
  )
  const [fields, setFields] = useState(selectedForm?.fields ?? [])

  useEffect(() => {
    if (selectedForm) {
      setFields(selectedForm.fields)
    }
  }, [selectedForm])

  const { methods, submit, isSubmitting } =
    useInsuranceFormSubmission(selectedForm)

  const handleSubmit = (data: Record<string, TInsuranceFormFieldValue>) => {
    submit(data)
  }

  const t = useScopedI18n("insuranceForms")

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <div className="flex flex-col gap-2">
        <Label>{t("selectForm")}</Label>
        <Select
          defaultValue={forms[0].formId}
          onValueChange={(value) => {
            const form = forms.find((form) => form.formId === value)
            if (form) {
              setSelectedForm(form)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a form" />
          </SelectTrigger>
          <SelectContent>
            {forms.map((form) => (
              <SelectItem key={form.formId} value={form.formId}>
                {form.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedForm ? (
        <div
          key={selectedForm.formId}
          className="bg-primary-foreground rounded-lg p-3 shadow"
        >
          <h2 className="mb-6 text-2xl font-bold">{selectedForm.title}</h2>
          <Form {...methods}>
            <form
              className="flex flex-col gap-6"
              onSubmit={methods.handleSubmit(handleSubmit)}
            >
              <Reorder.Group
                axis="y"
                values={fields.map((f) => f.id)}
                onReorder={(newOrder: string[]) => {
                  const reorderedFields = newOrder
                    .map((id) => fields.find((field) => field.id === id))
                    .filter(
                      (field): field is TInsuranceFormField =>
                        field !== undefined
                    )
                  setFields(reorderedFields)
                }}
                className="flex flex-col gap-6"
              >
                {fields.map((field) => {
                  return <InsuranceFormRow key={field.id} field={field} />
                })}
              </Reorder.Group>
              <Button
                type="submit"
                className="mt-4 max-w-fit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("sending") : t("sendApplication")}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>No form selected</div>
      )}
    </div>
  )
}

export default InsuranceForms
