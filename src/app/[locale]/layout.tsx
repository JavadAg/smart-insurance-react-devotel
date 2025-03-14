// app/[locale]/client/layout.tsx
import { ReactElement } from "react"
import { I18nProviderClient } from "@/locale/client"
import Layout from "@/components/Layout/Layout"

export default async function SubLayout({
  params,
  children
}: {
  params: Promise<{ locale: string }>
  children: ReactElement
}) {
  const { locale } = await params

  return (
    <I18nProviderClient locale={locale}>
      <Layout>{children}</Layout>
    </I18nProviderClient>
  )
}
