"use client"

import { Fragment, useState } from "react"
import type {
  TInsuranceForm,
  TInsuranceFormFieldValue
} from "@/types/insurance-forms.type"
import { Form } from "@/components/ui/form"
import InsuranceFormField from "./InsuranceFormField"
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
import GroupFormFields from "./GroupFormFields"
import { useScopedI18n } from "@/locale/client"

interface FormsProps {
  forms: TInsuranceForm[]
}

const InsuranceForms = ({ forms }: FormsProps) => {
  const [selectedForm, setSelectedForm] = useState<TInsuranceForm | null>(
    forms[0]
  )

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
      {selectedForm && (
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
              {selectedForm.fields.map((field) => {
                const isGroup =
                  field.type === "group" && field.fields !== undefined

                return (
                  <Fragment key={field.id}>
                    {isGroup ? (
                      <GroupFormFields fields={field.fields!} />
                    ) : (
                      <InsuranceFormField fieldData={field} />
                    )}
                  </Fragment>
                )
              })}
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
      )}
    </div>
  )
}

export default InsuranceForms
