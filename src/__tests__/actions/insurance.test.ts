import { submitInsuranceForm } from "@/actions/insurance"
import { fetchApi } from "@/lib/client"

// Mock the fetchApi function
jest.mock("@/lib/client", () => ({
  fetchApi: jest.fn()
}))

describe("Insurance Actions", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe("submitInsuranceForm", () => {
    const mockFormData = {
      name: "John Doe",
      email: "john@example.com",
      policyType: "health"
    }

    const mockResponse = {
      id: "123",
      status: "submitted",
      ...mockFormData
    }

    it("should successfully submit insurance form", async () => {
      // Setup mock response
      ;(fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse)

      // Call the function
      const result = await submitInsuranceForm("form-1", mockFormData)

      // Assertions
      expect(fetchApi).toHaveBeenCalledTimes(1)
      expect(fetchApi).toHaveBeenCalledWith("/api/insurance/forms/submit", {
        method: "POST",
        body: JSON.stringify(mockFormData)
      })
      expect(result).toEqual(mockResponse)
    })

    it("should handle API errors", async () => {
      // Setup mock error
      const mockError = new Error("API Error")
      ;(fetchApi as jest.Mock).mockRejectedValueOnce(mockError)

      // Call and assert
      await expect(submitInsuranceForm("form-1", mockFormData)).rejects.toThrow(
        "API Error"
      )
      expect(fetchApi).toHaveBeenCalledTimes(1)
    })
  })
})
