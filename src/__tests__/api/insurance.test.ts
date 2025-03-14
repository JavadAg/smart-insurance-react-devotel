import {
  getAllInsuranceForms,
  getInsuranceFormSubmissions,
  getDynamicOptions
} from "@/api/insurance"
import { fetchApi } from "@/lib/client"

// Mock the fetchApi function
jest.mock("@/lib/client", () => ({
  fetchApi: jest.fn()
}))

describe("Insurance API", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("getAllInsuranceForms", () => {
    const mockForms = [
      {
        id: "form1",
        fields: [
          {
            id: "name",
            label: "Name",
            type: "text",
            required: true
          }
        ]
      }
    ]

    it("should fetch all insurance forms successfully", async () => {
      ;(fetchApi as jest.Mock).mockResolvedValueOnce(mockForms)

      const result = await getAllInsuranceForms()

      expect(fetchApi).toHaveBeenCalledTimes(1)
      expect(fetchApi).toHaveBeenCalledWith("/api/insurance/forms")
      expect(result).toEqual(mockForms)
    })

    it("should handle API errors", async () => {
      const error = new Error("Failed to fetch forms")
      ;(fetchApi as jest.Mock).mockRejectedValueOnce(error)

      await expect(getAllInsuranceForms()).rejects.toThrow(
        "Failed to fetch forms"
      )
      expect(fetchApi).toHaveBeenCalledTimes(1)
    })
  })

  describe("getInsuranceFormSubmissions", () => {
    const mockSubmissions = {
      submissions: [
        {
          id: "sub1",
          formId: "form1",
          data: {
            name: "John Doe"
          }
        }
      ]
    }

    it("should fetch insurance form submissions successfully", async () => {
      ;(fetchApi as jest.Mock).mockResolvedValueOnce(mockSubmissions)

      const result = await getInsuranceFormSubmissions()

      expect(fetchApi).toHaveBeenCalledTimes(1)
      expect(fetchApi).toHaveBeenCalledWith(
        "/api/insurance/forms/submissions",
        {
          cache: "force-cache",
          next: {
            revalidate: 60 * 60 * 24 // 24 hours
          }
        }
      )
      expect(result).toEqual(mockSubmissions)
    })

    it("should handle API errors", async () => {
      const error = new Error("Failed to fetch submissions")
      ;(fetchApi as jest.Mock).mockRejectedValueOnce(error)

      await expect(getInsuranceFormSubmissions()).rejects.toThrow(
        "Failed to fetch submissions"
      )
      expect(fetchApi).toHaveBeenCalledTimes(1)
    })
  })

  describe("getDynamicOptions", () => {
    const mockOptions = {
      cities: ["New York", "London", "Tokyo"],
      countries: ["USA", "UK", "Japan"]
    }

    it("should fetch dynamic options successfully", async () => {
      ;(fetchApi as jest.Mock).mockResolvedValueOnce(mockOptions)

      const endpoint = "/api/options"
      const params = "type=cities&country=USA"
      const result = await getDynamicOptions(endpoint, params)

      expect(fetchApi).toHaveBeenCalledTimes(1)
      expect(fetchApi).toHaveBeenCalledWith(`${endpoint}?${params}`, {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24 // 24 hours
        }
      })
      expect(result).toEqual(mockOptions)
    })

    it("should handle API errors", async () => {
      const error = new Error("Failed to fetch options")
      ;(fetchApi as jest.Mock).mockRejectedValueOnce(error)

      const endpoint = "/api/options"
      const params = "type=cities"

      await expect(getDynamicOptions(endpoint, params)).rejects.toThrow(
        "Failed to fetch options"
      )
      expect(fetchApi).toHaveBeenCalledTimes(1)
    })

    it("should construct URL with params correctly", async () => {
      ;(fetchApi as jest.Mock).mockResolvedValueOnce({})

      const endpoint = "/api/options"
      const params = "type=cities&country=USA&state=NY"
      await getDynamicOptions(endpoint, params)

      expect(fetchApi).toHaveBeenCalledWith(
        `${endpoint}?${params}`,
        expect.any(Object)
      )
    })
  })
})
