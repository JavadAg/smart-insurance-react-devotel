import { Input } from "@/components/ui/input"
import type { ControllerRenderProps } from "react-hook-form"

interface NumberFieldProps {
  field: ControllerRenderProps
}

export const NumberField = ({ field }: NumberFieldProps) => {
  return (
    <Input
      type="number"
      {...field}
      onChange={(e) => {
        const value = e.target.value
        if (value === "" || !isNaN(Number(value))) {
          field.onChange(+value)
        }
      }}
    />
  )
}
