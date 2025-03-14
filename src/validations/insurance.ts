import { z } from "zod"

export type InsuranceFormSchemaType = z.infer<typeof insuranceFormSchema>

export const insuranceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(1, "Address is required")
})
