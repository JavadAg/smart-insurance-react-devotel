import Link from "next/link"
import DarkModeToggle from "../shared/DarkModeToggle"
import LanguageSwitcher from "../shared/LanguageSwitcher"

const Header = () => {
  return (
    <header className="bg-primary-foreground flex w-full items-center justify-between rounded-b-2xl p-4">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-2">
        <Link href="/">
          <h1 className="text-2xl font-bold">Smart Insurance</h1>
        </Link>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

export default Header
