import { renderHook, act } from "@testing-library/react"
import { useFormDraft } from "@/hooks/useFormDraft"
import { useForm } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { ReactNode } from "react"

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage
})

// Mock useDebounce
jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: (fn: (...args: any[]) => void) => fn // Return function immediately for testing
}))

describe("useFormDraft", () => {
  const formId = "test-form"
  const STORAGE_KEY = "insurance_form_drafts"

  // Type for our test form
  type TestForm = {
    name: string
    email: string
  }

  let methods: UseFormReturn<TestForm>

  const wrapper = ({ children }: { children: ReactNode }) => {
    return <>{children}</>
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Initialize form methods before each test
    const { result } = renderHook(() =>
      useForm<TestForm>({
        defaultValues: {
          name: "",
          email: ""
        }
      })
    )
    methods = result.current
  })

  it("should load saved draft on mount", () => {
    const savedData = {
      name: "John Doe",
      email: "john@example.com"
    }
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(savedData))

    renderHook(() => useFormDraft(formId, methods), { wrapper })

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      `${STORAGE_KEY}_${formId}`
    )
    expect(methods.getValues()).toEqual(savedData)
  })

  it("should not load draft if no saved data exists", () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null)

    renderHook(() => useFormDraft(formId, methods), { wrapper })

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      `${STORAGE_KEY}_${formId}`
    )
    expect(methods.getValues()).toEqual({
      name: "",
      email: ""
    })
  })

  it("should save form data when values change", async () => {
    const { result } = renderHook(() => useFormDraft(formId, methods), {
      wrapper
    })

    const newData = {
      name: "Jane Doe",
      email: "jane@example.com"
    }

    // Update form values
    act(() => {
      methods.setValue("name", newData.name)
      methods.setValue("email", newData.email)
    })

    // Wait for next tick to ensure save is called
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      `${STORAGE_KEY}_${formId}`,
      JSON.stringify(newData)
    )
  })

  it("should not save draft if formId is undefined", async () => {
    renderHook(() => useFormDraft(undefined, methods), { wrapper })

    act(() => {
      methods.setValue("name", "John Doe")
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(mockLocalStorage.setItem).not.toHaveBeenCalled()
  })

  it("should clear draft when clearDraft is called", () => {
    const { result } = renderHook(() => useFormDraft(formId, methods), {
      wrapper
    })

    act(() => {
      result.current.clearDraft()
    })

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
      `${STORAGE_KEY}_${formId}`
    )
  })

  it("should not clear draft if formId is undefined", () => {
    const { result } = renderHook(() => useFormDraft(undefined, methods), {
      wrapper
    })

    act(() => {
      result.current.clearDraft()
    })

    expect(mockLocalStorage.removeItem).not.toHaveBeenCalled()
  })

  it("should handle invalid JSON in localStorage", () => {
    mockLocalStorage.getItem.mockReturnValueOnce("invalid-json")

    // This should not throw an error
    renderHook(() => useFormDraft(formId, methods), { wrapper })

    expect(methods.getValues()).toEqual({
      name: "",
      email: ""
    })
  })

  it("should cleanup subscription on unmount", () => {
    const unsubscribeMock = jest.fn()
    jest.spyOn(methods, "watch").mockReturnValueOnce({
      unsubscribe: unsubscribeMock
    })

    const { unmount } = renderHook(() => useFormDraft(formId, methods), {
      wrapper
    })

    unmount()

    expect(unsubscribeMock).toHaveBeenCalled()
  })
})
