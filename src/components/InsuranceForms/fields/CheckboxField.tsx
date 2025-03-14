import type { ControllerRenderProps } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxFieldProps {
  field: ControllerRenderProps
}

export const CheckboxField = ({ field }: CheckboxFieldProps) => {
  return <Checkbox {...field} />
}
