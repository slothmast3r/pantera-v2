import React from 'react'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  labelClassName?: string
  titleClassName?: string
}

export function SectionHeader({ label, title, subtitle, labelClassName, titleClassName }: SectionHeaderProps) {
  return (
    <>
      <div className={`section-label${labelClassName ? ` ${labelClassName}` : ''}`}>{label}</div>
      <h2 className={`section-title${titleClassName ? ` ${titleClassName}` : ''}`}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </>
  )
}
