'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const QUICK_AMOUNTS = [50, 100, 150, 200, 300]

const PURPOSES = [
  'Karnet miesięczny – Krav Maga',
  'Karnet miesięczny – Karate',
  'Karnet miesięczny – Tai Chi',
  'Karnet miesięczny – Power Training',
  'Karnet miesięczny – ASG',
  'Zajęcia próbne',
  'Obóz / wyjazd sportowy',
  'Inne',
]

const paymentSchema = z.object({
  amount: z.number({ message: 'Podaj kwotę.' }).min(1, 'Minimalna kwota to 1 zł.'),
  purpose: z.string().min(1, 'Wybierz lub opisz cel płatności.'),
  email: z.string().email('Podaj prawidłowy adres e-mail.'),
  name: z.string().optional(),
})

type FieldErrors = Partial<Record<keyof z.infer<typeof paymentSchema>, string>>

export default function PlatnoscForm() {
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [customPurpose, setCustomPurpose] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState('')

  const effectivePurpose = purpose === 'Inne' ? customPurpose : purpose

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const amountNum = parseFloat(amount.replace(',', '.'))

    const parsed = paymentSchema.safeParse({
      amount: isNaN(amountNum) ? undefined : amountNum,
      purpose: effectivePurpose.trim(),
      email: email.trim(),
      name: name.trim() || undefined,
    })

    if (!parsed.success) {
      const errors: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setLoading(true)

    try {
      const res = await fetch('/api/platnosc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      const data = await res.json()

      if (!res.ok || !data.redirectUrl) {
        setServerError(data.error ?? 'Błąd podczas inicjowania płatności. Spróbuj ponownie.')
        setLoading(false)
        return
      }

      window.location.href = data.redirectUrl
    } catch {
      setServerError('Nie można połączyć się z serwerem. Spróbuj ponownie.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="platnosc-form">
      <p className="platnosc-section-title">Kwota</p>

      <div className="platnosc-quick-amounts">
        {QUICK_AMOUNTS.map((q) => (
          <Button
            key={q}
            type="button"
            variant={amount === String(q) ? 'default' : 'outline'}
            onClick={() => setAmount(String(q))}
            className="flex-1 h-11 text-base font-semibold"
          >
            {q} zł
          </Button>
        ))}
      </div>

      <PayField label="Własna kwota" htmlFor="amount" error={fieldErrors.amount}>
        <div className="platnosc-amount-wrap">
          <input
            id="amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="np. 120"
            className="platnosc-input platnosc-input-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="platnosc-amount-currency">PLN</span>
        </div>
      </PayField>

      <p className="platnosc-section-title">Za co płacisz?</p>

      <PayField label="Cel płatności" htmlFor="purpose" error={fieldErrors.purpose}>
        <select
          id="purpose"
          className="platnosc-input platnosc-input-select"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          <option value="">— wybierz —</option>
          {PURPOSES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </PayField>

      {purpose === 'Inne' && (
        <PayField label="Opisz cel płatności" htmlFor="customPurpose">
          <input
            id="customPurpose"
            type="text"
            placeholder="np. Warsztaty samoobrony 15.03"
            className="platnosc-input"
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
            maxLength={120}
          />
        </PayField>
      )}

      <p className="platnosc-section-title">Twoje dane</p>

      <PayField label="Imię i nazwisko" htmlFor="name">
        <input
          id="name"
          type="text"
          placeholder="Jan Kowalski"
          className="platnosc-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
      </PayField>

      <PayField
        label="E-mail"
        htmlFor="email"
        required
        hint="Na ten adres wyślemy potwierdzenie płatności."
        error={fieldErrors.email}
      >
        <input
          id="email"
          type="email"
          placeholder="jan@kowalski.pl"
          className="platnosc-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </PayField>

      {serverError && (
        <p className="platnosc-field__error platnosc-field__error--server">{serverError}</p>
      )}

      <Button type="submit" disabled={loading} size="lg" className="w-full h-14 text-[1.1rem] font-bold mt-4">
        {loading ? (
          <>
            <span className="pay-spinner" />
            Przekierowuję do płatności…
          </>
        ) : (
          <>
            Zapłać
            {amount && parseFloat(amount) > 0 && (
              <strong> {parseFloat(amount).toFixed(2).replace('.', ',')} zł</strong>
            )}
            &nbsp;→
          </>
        )}
      </Button>

      <p className="platnosc-disclaimer">
        Klikając &bdquo;Zapłać&rdquo; zostaniesz przekierowany do bezpiecznej bramki płatniczej tpay.com. Twoje
        dane są chronione protokołem SSL.
      </p>
    </form>
  )
}

function PayField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="platnosc-field">
      <label htmlFor={htmlFor} className="platnosc-label">
        {label}
        {required && <span className="platnosc-label__required">*</span>}
      </label>
      {children}
      {error && <p className="platnosc-field__error">{error}</p>}
      {hint && <p className="platnosc-field__hint">{hint}</p>}
    </div>
  )
}
