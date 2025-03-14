const columns = [
  "Full Name",
  "Age",
  "Gender",
  "Insurance Type",
  "City"
] as const

export type TColumns = (typeof columns)[number]

export type TInsuranceSubmissions = {
  columns: TColumns[]
  data: TInsuranceSubmission[]
}

export type TInsuranceSubmission = {
  id: string
  "Full Name": string
  Age: number
  Gender: string
  "Insurance Type": string
  City: string
}
