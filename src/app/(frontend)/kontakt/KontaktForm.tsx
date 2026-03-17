'use client'
import React, { useState } from 'react'

const SUBJECTS = [
  'Zapisy na zajęcia',
  'Zajęcia próbne',
  'Oferta dla firm',
  'Warsztaty i eventy',
  'Pytanie o cennik',
  'Inne',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function KontaktForm() {
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Coś poszło nie tak. Spróbuj ponownie lub zadzwoń do nas.')
    }
  }

  if (status === 'success') {
    return (
      <div className="kontakt-success">
        <div className="kontakt-success__icon">✓</div>
        <h3>Wiadomość wysłana!</h3>
        <p>Odpiszemy w ciągu 24 godzin. Do zobaczenia na sali!</p>
      </div>
    )
  }

  return (
    <form className="kontakt-form" onSubmit={handleSubmit} noValidate>
      <div className="kontakt-form__row">
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">
            Imię i nazwisko <span className="kontakt-form__required">*</span>
          </label>
          <input name="name" type="text" className="kontakt-form__input" placeholder="Jan Kowalski" required />
        </div>
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">
            E-mail <span className="kontakt-form__required">*</span>
          </label>
          <input name="email" type="email" className="kontakt-form__input" placeholder="jan@example.com" required />
        </div>
      </div>

      <div className="kontakt-form__row">
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">Telefon</label>
          <input name="phone" type="tel" className="kontakt-form__input" placeholder="+48 500 000 000" />
        </div>
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">Temat</label>
          <select
            className="kontakt-form__input kontakt-form__select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="kontakt-form__field">
        <label className="kontakt-form__label">
          Wiadomość <span className="kontakt-form__required">*</span>
        </label>
        <textarea
          name="message"
          className="kontakt-form__input kontakt-form__textarea"
          placeholder="Napisz, w czym możemy pomóc..."
          rows={5}
          required
        />
      </div>

      {error && <div className="kontakt-form__error">{error}</div>}

      <button type="submit" className="kontakt-form__submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <><span className="kontakt-form__spinner" /> Wysyłanie...</>
        ) : (
          'Wyślij wiadomość →'
        )}
      </button>
    </form>
  )
}
