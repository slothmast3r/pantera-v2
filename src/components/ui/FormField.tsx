import React from 'react'

interface FormFieldProps {
  label: string
  namespace: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}

export function FormField({ label, namespace: ns, htmlFor, required, error, hint, children }: FormFieldProps) {
  return (
    <div className={`${ns}-field`}>
      <label htmlFor={htmlFor} className={`${ns}-label`}>
        {label}
        {required && <span className={`${ns}-label__required`}>*</span>}
      </label>
      {children}
      {error && <p className={`${ns}-field__error`}>{error}</p>}
      {hint && <p className={`${ns}-field__hint`}>{hint}</p>}
    </div>
  )
}
