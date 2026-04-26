import type { ZodError } from 'zod'

export function parseZodErrors<T>(error: ZodError): Partial<Record<keyof T, string>> {
  const result: Partial<Record<keyof T, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof T
    if (!result[field]) result[field] = issue.message
  }
  return result
}
