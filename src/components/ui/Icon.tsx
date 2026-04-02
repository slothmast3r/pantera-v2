import React from 'react'

type Props = {
  name: string
  className?: string
  size?: number
}

/**
 * Google Material Symbols Outlined icon.
 * Requires the Material Symbols font loaded in layout.tsx.
 * Icon names: https://fonts.google.com/icons
 */
export default function Icon({ name, className = '', size }: Props) {
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
      style={size ? { fontSize: `${size}px` } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
