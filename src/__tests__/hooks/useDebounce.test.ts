import { renderHook } from "@testing-library/react"
import { useDebounce } from "@/hooks/useDebounce"
import { act } from "react-dom/test-utils"

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("should debounce the callback function", () => {
    const callback = jest.fn()
    const delay = 1000

    const { result } = renderHook(() => useDebounce(callback, delay))
    const debouncedFn = result.current

    // Call the debounced function multiple times
    act(() => {
      debouncedFn()
      debouncedFn()
      debouncedFn()
    })

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled()

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(delay)
    })

    // Verify callback was only called once
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should cancel previous timeout when called again", () => {
    const callback = jest.fn()
    const delay = 1000

    const { result } = renderHook(() => useDebounce(callback, delay))
    const debouncedFn = result.current

    // Call once and advance time partially
    act(() => {
      debouncedFn()
      jest.advanceTimersByTime(500) // Half the delay
    })

    // Call again
    act(() => {
      debouncedFn()
    })

    // Advance time to just after the first timeout should have fired
    act(() => {
      jest.advanceTimersByTime(501)
    })

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled()

    // Advance remaining time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Verify callback was only called once
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should pass arguments to the callback function", () => {
    const callback = jest.fn()
    const delay = 1000

    const { result } = renderHook(() => useDebounce(callback, delay))
    const debouncedFn = result.current

    // Call with arguments
    act(() => {
      debouncedFn("test", 123)
    })

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(delay)
    })

    // Verify callback was called with correct arguments
    expect(callback).toHaveBeenCalledWith("test", 123)
  })
})
