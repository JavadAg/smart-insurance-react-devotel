"use client"

import type { TInsuranceFormField } from "@/types/insurance-forms.type"
import GroupFormFields from "../GroupFormFields"
import InsuranceFormField from "../InsuranceFormField"
import { Reorder, useDragControls } from "motion/react"
import { GripVertical } from "lucide-react"

interface InsuranceFormRowProps {
  field: TInsuranceFormField
}

const InsuranceFormRow = ({ field }: InsuranceFormRowProps) => {
  const isGroup = field.type === "group" && field.fields !== undefined
  const controls = useDragControls()

  return (
    <Reorder.Item
      dragListener={false}
      dragControls={controls}
      key={field.id}
      value={field.id}
    >
      <div className="flex items-center gap-2">
        <div
          className="cursor-grab opacity-40"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical className="h-4 w-4" />
        </div>
        {isGroup ? (
          <GroupFormFields fields={field.fields!} />
        ) : (
          <InsuranceFormField fieldData={field} />
        )}
      </div>
    </Reorder.Item>
  )
}

export default InsuranceFormRow
