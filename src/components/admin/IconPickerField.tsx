'use client'

import React, { useState } from 'react'
import { useField } from '@payloadcms/ui'
import { offerIconMap, offerIconKeys, type OfferIconKey } from '@/components/icons/offerIcons'

export default function IconPickerField({ path }: { path: string }) {
  const { value, setValue } = useField<string>({ path })
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = offerIconKeys.filter((key) =>
    query.trim() === '' ||
    offerIconMap[key].label.toLowerCase().includes(query.toLowerCase()) ||
    key.toLowerCase().includes(query.toLowerCase()),
  )

  const selected = value ? (offerIconMap[value as OfferIconKey] ?? null) : null

  return (
    <div style={{ marginBottom: '1rem', position: 'relative' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Ikona</p>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1.5px solid #d0d0d0',
          background: '#fff',
          cursor: 'pointer',
          fontSize: '13px',
          color: '#333',
          width: '220px',
        }}
      >
        {selected ? (
          <>
            <span style={{ display: 'flex', width: '20px', height: '20px', color: '#e85d26' }}>
              {selected.svg}
            </span>
            <span>{selected.label}</span>
          </>
        ) : (
          <span style={{ color: '#999' }}>— Wybierz ikonę —</span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa' }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 100,
            background: '#fff',
            border: '1.5px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            width: '320px',
            marginTop: '4px',
          }}
        >
          {/* Search */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0' }}>
            <input
              autoFocus
              type="text"
              placeholder="Szukaj ikony…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1.5px solid #ddd',
                borderRadius: '5px',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '4px',
              padding: '10px',
              maxHeight: '260px',
              overflowY: 'auto',
            }}
          >
            {filtered.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#aaa', fontSize: '12px', padding: '12px 0' }}>
                Brak wyników
              </p>
            )}
            {filtered.map((key) => {
              const { label, svg } = offerIconMap[key]
              const isSelected = value === key
              return (
                <button
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => { setValue(key); setOpen(false); setQuery('') }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '8px 4px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid #e85d26' : '2px solid transparent',
                    background: isSelected ? '#fff5f0' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.1s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5'
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  }}
                >
                  <span style={{ display: 'flex', width: '22px', height: '22px', color: isSelected ? '#e85d26' : '#555' }}>
                    {svg}
                  </span>
                  <span style={{ fontSize: '9px', color: isSelected ? '#e85d26' : '#888', lineHeight: 1.2, textAlign: 'center' }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Clear */}
          {value && (
            <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
              <button
                type="button"
                onClick={() => { setValue(''); setOpen(false) }}
                style={{ fontSize: '11px', color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ✕ Usuń ikonę
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
