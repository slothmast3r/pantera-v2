'use client'

import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      richColors
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: 'inherit',
        },
      }}
      {...props}
    />
  )
}
