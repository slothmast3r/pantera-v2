'use client'

import React, { useState } from 'react'

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

type FormState = 'idle' | 'loading' | 'error'

export default function PlatnoscForm() {
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [customPurpose, setCustomPurpose] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const effectivePurpose = purpose === 'Inne' ? customPurpose : purpose

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const amountNum = parseFloat(amount.replace(',', '.'))
    if (!amountNum || amountNum < 1) {
      setErrorMsg('Podaj prawidłową kwotę (minimum 1 zł).')
      return
    }
    if (!effectivePurpose.trim()) {
      setErrorMsg('Opisz za co jest płatność.')
      return
    }
    if (!email.trim()) {
      setErrorMsg('Podaj adres e-mail.')
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/platnosc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountNum,
          purpose: effectivePurpose.trim(),
          email: email.trim(),
          name: name.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.redirectUrl) {
        setErrorMsg(data.error ?? 'Błąd podczas inicjowania płatności. Spróbuj ponownie.')
        setState('error')
        return
      }

      // Redirect to tpay
      window.location.href = data.redirectUrl
    } catch {
      setErrorMsg('Nie można połączyć się z serwerem. Spróbuj ponownie.')
      setState('error')
    }
  }

  return (
    <form className="pay-form" onSubmit={handleSubmit} noValidate>
      <p className="pay-form__section-title">Kwota</p>

      {/* Quick amount buttons */}
      <div className="pay-quick">
        {QUICK_AMOUNTS.map((q) => (
          <button
            key={q}
            type="button"
            className={`pay-quick__btn${amount === String(q) ? ' pay-quick__btn--active' : ''}`}
            onClick={() => setAmount(String(q))}
          >
            {q} zł
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="pay-field pay-field--amount">
        <label className="pay-field__label" htmlFor="amount">
          Własna kwota
        </label>
        <div className="pay-field__input-wrap">
          <input
            id="amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="np. 120"
            className="pay-field__input pay-field__input--number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="pay-field__suffix">PLN</span>
        </div>
      </div>

      <p className="pay-form__section-title">Za co płacisz?</p>

      {/* Purpose select */}
      <div className="pay-field">
        <label className="pay-field__label" htmlFor="purpose">Cel płatności</label>
        <select
          id="purpose"
          className="pay-field__input pay-field__select"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          <option value="">— wybierz —</option>
          {PURPOSES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {purpose === 'Inne' && (
        <div className="pay-field">
          <label className="pay-field__label" htmlFor="customPurpose">Opisz cel płatności</label>
          <input
            id="customPurpose"
            type="text"
            placeholder="np. Warsztaty samoobrony 15.03"
            className="pay-field__input"
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
            maxLength={120}
          />
        </div>
      )}

      <p className="pay-form__section-title">Twoje dane</p>

      <div className="pay-field">
        <label className="pay-field__label" htmlFor="name">Imię i nazwisko</label>
        <input
          id="name"
          type="text"
          placeholder="Jan Kowalski"
          className="pay-field__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
      </div>

      <div className="pay-field">
        <label className="pay-field__label" htmlFor="email">
          E-mail <span className="pay-field__required">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="jan@kowalski.pl"
          className="pay-field__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="pay-field__hint">Na ten adres wyślemy potwierdzenie płatności.</p>
      </div>

      {errorMsg && (
        <div className="pay-error" role="alert">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        className="pay-submit"
        disabled={state === 'loading'}
      >
        {state === 'loading' ? (
          <>
            <span className="pay-submit__spinner" />
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
      </button>

      <p className="pay-form__disclaimer">
        Klikając „Zapłać" zostaniesz przekierowany do bezpiecznej bramki płatniczej tpay.com.
        Twoje dane są chronione protokołem SSL.
      </p>
    </form>
  )
}
