import { useEffect, useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { useDebounce } from "./useDebounce"

const DRAFT_STORAGE_KEY = "insurance_form_drafts"

export function useFormDraft<T extends Record<string, any>>(
  formId: string | undefined,
  methods: UseFormReturn<T>
) {
  // Load draft when form changes
  useEffect(() => {
    if (formId) {
      const savedDraft = localStorage.getItem(`${DRAFT_STORAGE_KEY}_${formId}`)
      if (savedDraft) {
        methods.reset(JSON.parse(savedDraft))
      }
    }
  }, [formId, methods])

  // Debounced save function
  const saveDraft = useCallback(
    (data: T) => {
      if (formId) {
        localStorage.setItem(
          `${DRAFT_STORAGE_KEY}_${formId}`,
          JSON.stringify(data)
        )
      }
    },
    [formId]
  )

  const debouncedSave = useDebounce(saveDraft, 1000)

  // Watch form changes and trigger autosave
  useEffect(() => {
    const subscription = methods.watch((data) => {
      debouncedSave(data as T)
    })
    return () => subscription.unsubscribe()
  }, [methods, debouncedSave])

  // Function to clear draft
  const clearDraft = useCallback(() => {
    if (formId) {
      localStorage.removeItem(`${DRAFT_STORAGE_KEY}_${formId}`)
    }
  }, [formId])

  return { clearDraft }
}
