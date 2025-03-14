import { render, screen, within, waitFor } from "@testing-library/react"
import { useTheme } from "next-themes"
import { ThemeProvider } from "next-themes"
import DarkModeToggle from "@/components/shared/DarkModeToggle"
import userEvent from "@testing-library/user-event"

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children
}))

// Mock the locale
jest.mock("@/locale/client", () => ({
  useScopedI18n: () => (key: string) => {
    const translations = {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System"
    }
    return translations[key as keyof typeof translations]
  }
}))

const renderWithProviders = (component: React.ReactNode) => {
  // Create a div that will contain our portals
  const portalRoot = document.createElement("div")
  portalRoot.setAttribute("id", "portal-root")
  document.body.appendChild(portalRoot)

  const utils = render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )

  return {
    ...utils,
    portalRoot
  }
}

describe("DarkModeToggle", () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    ;(useTheme as jest.Mock).mockImplementation(() => ({
      setTheme: mockSetTheme
    }))
  })

  afterEach(() => {
    // Clean up any portal containers after each test
    const portalRoot = document.getElementById("portal-root")
    if (portalRoot) {
      document.body.removeChild(portalRoot)
    }
  })

  it("renders the toggle button with sun and moon icons", () => {
    renderWithProviders(<DarkModeToggle />)

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByLabelText("Toggle theme")).toBeInTheDocument()
  })

  it("opens dropdown menu when clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(<DarkModeToggle />)

    const button = screen.getByLabelText("Toggle theme")
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByLabelText("theme options")).toBeInTheDocument()
    })

    // Use document.body to find elements in the portal
    const menu = screen.getByLabelText("theme options")
    expect(menu).toBeInTheDocument()

    // Use within to search within the menu
    const menuElement = within(menu as HTMLElement)
    expect(menuElement.getByText("Light")).toBeInTheDocument()
    expect(menuElement.getByText("Dark")).toBeInTheDocument()
    expect(menuElement.getByText("System")).toBeInTheDocument()
  })

  it("calls setTheme with 'light' when Light option is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(<DarkModeToggle />)

    const button = screen.getByRole("button")
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByLabelText("theme options")).toBeInTheDocument()
    })

    const menu = screen.getByLabelText("theme options")
    const menuElement = within(menu as HTMLElement)
    await user.click(menuElement.getByText("Light"))

    expect(mockSetTheme).toHaveBeenCalledTimes(1)
    expect(mockSetTheme).toHaveBeenCalledWith("light")
  })

  it("calls setTheme with 'dark' when Dark option is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(<DarkModeToggle />)

    const button = screen.getByRole("button")
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByLabelText("theme options")).toBeInTheDocument()
    })

    const menu = screen.getByLabelText("theme options")
    const menuElement = within(menu as HTMLElement)
    await user.click(menuElement.getByText("Dark"))

    expect(mockSetTheme).toHaveBeenCalledWith("dark")
  })

  it("calls setTheme with 'system' when System option is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(<DarkModeToggle />)

    const button = screen.getByRole("button")
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByLabelText("theme options")).toBeInTheDocument()
    })

    const menu = screen.getByLabelText("theme options")
    const menuElement = within(menu as HTMLElement)
    await user.click(menuElement.getByText("System"))

    expect(mockSetTheme).toHaveBeenCalledWith("system")
  })
})
