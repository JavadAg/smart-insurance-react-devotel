import { Column } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import type {
  TColumns,
  TInsuranceSubmission
} from "@/types/insurance-submissions.type"
import { Label } from "@/components/ui/label"
import ColumnFilterWrapper from "./ColumnFilterWrapper/ColumnFilterWrapper"

interface ColumnFiltersProps {
  column: Column<TInsuranceSubmission>
  tableData: TInsuranceSubmission[]
}

const getColumnInputType = (columnId: TColumns) => {
  const columnTypes: Record<TColumns, string> = {
    Age: "number",
    "Insurance Type": "select",
    City: "select",
    "Full Name": "text",
    Gender: "select"
  }
  return columnTypes[columnId] || "text"
}

const getColumnOptions = (
  columnId: string,
  tableData: TInsuranceSubmission[]
) => {
  // remove duplicates
  const columnValues = tableData.map((row) => row[columnId as TColumns])
  const uniqueValues = new Set(columnValues) as Set<string>

  const options: Record<TColumns, string[]> = {
    Age: [],
    "Insurance Type": Array.from(uniqueValues),
    City: Array.from(uniqueValues),
    "Full Name": [],
    Gender: Array.from(uniqueValues)
  }
  return options[columnId as TColumns] || []
}

const ColumnFilters = ({ column, tableData }: ColumnFiltersProps) => {
  const inputType = getColumnInputType(column.id as TColumns)
  const options = getColumnOptions(column.id, tableData)

  if (!column.getCanFilter()) return null

  if (inputType === "select") {
    return (
      <ColumnFilterWrapper>
        <Label htmlFor={column.id}>{column.id}</Label>
        <Select
          value={(column.getFilterValue() as string) ?? "all"}
          onValueChange={(value) =>
            column.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Filter ${column.id}...`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ColumnFilterWrapper>
    )
  }

  return (
    <ColumnFilterWrapper>
      <Label htmlFor={column.id}>{column.id}</Label>
      <Input
        type={inputType}
        placeholder={`Filter ${column.id}...`}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          const value = event.target.value
          column.setFilterValue(value === "" ? undefined : value)
        }}
      />
    </ColumnFilterWrapper>
  )
}

export default ColumnFilters
