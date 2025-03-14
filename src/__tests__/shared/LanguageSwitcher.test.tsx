import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LanguageSwitcher from "@/components/shared/LanguageSwitcher"
import { useChangeLocale, useCurrentLocale } from "@/locale/client"

// Mock the locale hooks
jest.mock("@/locale/client", () => ({
  useChangeLocale: jest.fn(),
  useCurrentLocale: jest.fn()
}))

describe("LanguageSwitcher", () => {
  const mockChangeLocale = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useChangeLocale as jest.Mock).mockReturnValue(mockChangeLocale)
    ;(useCurrentLocale as jest.Mock).mockReturnValue("en")
  })

  it("renders with current locale", () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("en")
  })

  it("opens dropdown menu when clicked", async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const button = screen.getByRole("button")
    await user.click(button)

    const englishOption = screen.getByText("English")
    const turkishOption = screen.getByText("Turkish")

    expect(englishOption).toBeInTheDocument()
    expect(turkishOption).toBeInTheDocument()
  })

  it("calls changeLocale with 'en' when English is selected", async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const button = screen.getByRole("button")
    await user.click(button)

    const englishOption = screen.getByText("English")
    await user.click(englishOption)

    expect(mockChangeLocale).toHaveBeenCalledTimes(1)
    expect(mockChangeLocale).toHaveBeenCalledWith("en")
  })

  it("calls changeLocale with 'tr' when Turkish is selected", async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const button = screen.getByRole("button")
    await user.click(button)

    const turkishOption = screen.getByText("Turkish")
    await user.click(turkishOption)

    expect(mockChangeLocale).toHaveBeenCalledTimes(1)
    expect(mockChangeLocale).toHaveBeenCalledWith("tr")
  })

  it("displays different locale when current locale changes", () => {
    ;(useCurrentLocale as jest.Mock).mockReturnValue("tr")
    render(<LanguageSwitcher />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("tr")
  })
})
