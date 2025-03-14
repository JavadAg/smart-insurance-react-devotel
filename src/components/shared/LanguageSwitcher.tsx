"use client"

import { useChangeLocale, useCurrentLocale } from "@/locale/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"

const LanguageSwitcher = () => {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentLocale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("tr")}>
          Turkish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
