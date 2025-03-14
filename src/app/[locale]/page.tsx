import Link from "next/link"
import { getScopedI18n } from "@/locale/server"

export default async function HomePage() {
  const scopedT = await getScopedI18n("home")

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">{scopedT("title")}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/apply"
          className="hover:bg-accent rounded-lg border p-6 transition-colors"
        >
          <h2 className="mb-2 text-2xl font-semibold">
            {scopedT("apply.title")}
          </h2>
          <p className="text-muted-foreground">
            {scopedT("apply.description")}
          </p>
        </Link>
        <Link
          href="/applications"
          className="hover:bg-accent rounded-lg border p-6 transition-colors"
        >
          <h2 className="mb-2 text-2xl font-semibold">
            {scopedT("applications.title")}
          </h2>
          <p className="text-muted-foreground">
            {scopedT("applications.description")}
          </p>
        </Link>
      </div>
    </div>
  )
}
