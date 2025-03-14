import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-6 w-[250px]" />

      <div className="flex flex-wrap items-center gap-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-[180px]" />
        ))}
      </div>

      <div className="rounded-lg border">
        <div className="border-b p-4">
          <div className="flex items-center gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-[100px]" />
            ))}
          </div>
        </div>

        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="border-b p-4">
            <div className="flex items-center gap-4">
              {[...Array(6)].map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-[100px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
