import { ReactNode } from "react"
import { I18nProviderClient } from "../locale/client"

interface I18nProviderProps {
  children: ReactNode
  locale: string
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
