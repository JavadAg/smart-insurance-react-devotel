"use client"

import type {
  TInsuranceSubmission,
  TInsuranceSubmissions
} from "@/types/insurance-submissions.type"
import ApplicationDataTable from "./ApplicationDataTable/ApplicationDataTable"
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { useScopedI18n } from "@/locale/client"

interface ApplicationsProps {
  applications: TInsuranceSubmissions
}

const Applications = ({ applications }: ApplicationsProps) => {
  console.log(applications)

  const applicationColumns: ColumnDef<TInsuranceSubmission>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    ...applications.columns.map((columnDef) => ({
      accessorKey: columnDef,
      // custom filter for select columns
      ...(columnDef === "Insurance Type" ||
      columnDef === "City" ||
      columnDef === "Gender"
        ? {
            filterFn: "equals" as const
          }
        : {}),
      // custom filter for number columns
      ...(columnDef === "Age"
        ? {
            filterFn: "weakEquals" as const
          }
        : {}),
      header: ({ column }: { column: any }) => {
        const isSorted = column.getIsSorted()

        return (
          <button
            className={cn(
              "flex cursor-pointer items-center gap-1 text-start",
              isSorted && "text-blue-500"
            )}
            onClick={() => column.toggleSorting()}
          >
            {columnDef}
            {isSorted === "asc" ? (
              <ChevronUp size={16} />
            ) : isSorted === "desc" ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronsUpDown size={16} />
            )}
          </button>
        )
      }
    }))
  ]

  const t = useScopedI18n("applications")

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <ApplicationDataTable
        columns={applicationColumns}
        data={applications.data}
      />
    </div>
  )
}

export default Applications
