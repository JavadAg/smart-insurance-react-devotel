import { Input } from "@/components/ui/input"
import type { ControllerRenderProps } from "react-hook-form"

interface TextFieldProps {
  field: ControllerRenderProps
}

export const TextField = ({ field }: TextFieldProps) => {
  return <Input {...field} />
}
