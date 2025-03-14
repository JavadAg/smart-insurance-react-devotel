import React from "react"

const ColumnFilterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full max-w-sm min-w-[200px] flex-1 flex-col items-start space-y-2">
      {children}
    </div>
  )
}

export default ColumnFilterWrapper
