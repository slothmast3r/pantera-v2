'use client'
import { useActionState } from 'react'

const SUBJECTS = [
  'Zapisy na zajęcia',
  'Zajęcia próbne',
  'Oferta dla firm',
  'Warsztaty i eventy',
  'Pytanie o cennik',
  'Inne',
]

type FormState = { status: 'idle' | 'success' | 'error'; error?: string }

async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      }),
    })
    if (!res.ok) throw new Error()
    return { status: 'success' }
  } catch {
    return { status: 'error', error: 'Coś poszło nie tak. Spróbuj ponownie lub zadzwoń do nas.' }
  }
}

export default function KontaktForm() {
  const [state, formAction, isPending] = useActionState(sendMessage, { status: 'idle' })

  if (state.status === 'success') {
    return (
      <div className="kontakt-success">
        <div className="kontakt-success__icon">✓</div>
        <h3>Wiadomość wysłana!</h3>
        <p>Odpiszemy w ciągu 24 godzin. Do zobaczenia na sali!</p>
      </div>
    )
  }

  return (
    <form className="kontakt-form" action={formAction} noValidate>
      <div className="kontakt-form__row">
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">
            Imię i nazwisko <span className="kontakt-form__required">*</span>
          </label>
          <input
            name="name"
            type="text"
            className="kontakt-form__input"
            placeholder="Jan Kowalski"
            required
          />
        </div>
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">
            E-mail <span className="kontakt-form__required">*</span>
          </label>
          <input
            name="email"
            type="email"
            className="kontakt-form__input"
            placeholder="jan@example.com"
            required
          />
        </div>
      </div>

      <div className="kontakt-form__row">
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">Telefon</label>
          <input
            name="phone"
            type="tel"
            className="kontakt-form__input"
            placeholder="+48 500 000 000"
          />
        </div>
        <div className="kontakt-form__field">
          <label className="kontakt-form__label">Temat</label>
          <select
            name="subject"
            className="kontakt-form__input kontakt-form__select"
            defaultValue={SUBJECTS[0]}
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
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

      {state.error && <div className="kontakt-form__error">{state.error}</div>}

      <button
        type="submit"
        className={`kontakt-form__submit${isPending ? ' kontakt-form__submit--pending' : ''}`}
        disabled={isPending}
      >
        {isPending ? (
          <>
            Wysyłanie
            <span className="kontakt-form__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </>
        ) : (
          'Wyślij wiadomość →'
        )}
      </button>
    </form>
  )
}
