'use client'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { parseZodErrors } from '@/lib/formUtils'
import { CONTACT_SUBJECTS } from '@/constants/formOptions'

const contactSchema = z.object({
  name: z.string().min(2, 'Imię i nazwisko musi mieć co najmniej 2 znaki.'),
  email: z.string().email('Podaj prawidłowy adres e-mail.'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Wybierz temat.'),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków.'),
})

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>
type FormState = { status: 'idle' | 'success' | 'error'; fieldErrors?: FieldErrors }

async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { status: 'error', fieldErrors: parseZodErrors<z.infer<typeof contactSchema>>(parsed.error) }
  }

  try {
    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
    if (!res.ok) throw new Error()
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}

export default function KontaktForm() {
  const [state, formAction, isPending] = useActionState(sendMessage, { status: 'idle' })
  const [shakeKey, setShakeKey] = useState(0)
  const e = state.fieldErrors ?? {}

  useEffect(() => {
    if (state.status === 'error') {
      setShakeKey((k) => k + 1)
      if (!state.fieldErrors) {
        toast.error('Coś poszło nie tak. Spróbuj ponownie lub zadzwoń do nas.')
      }
    }
  }, [state])

  return (
    <div className="kontakt-transition-container">
      <div className="kontakt-transition-inner">
        {state.status === 'success' ? (
          <div className="kontakt-success">
            <div className="kontakt-success__icon-circle">
              <svg className="checkmark-svg" viewBox="0 0 52 52">
                <path className="checkmark-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="kontakt-success__title">Wiadomość wysłana!</h3>
            <p className="kontakt-success__text">
              Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin. Do zobaczenia na sali!
            </p>
          </div>
        ) : (
          <form action={formAction} noValidate>
            <div className="kontakt-row">
              <FormField namespace="kontakt" label="Imię i nazwisko" required error={e.name}>
                <input
                  key={`name-${shakeKey}`}
                  name="name"
                  type="text"
                  className={`kontakt-input ${e.name ? 'kontakt-input--error' : ''}`}
                  placeholder="Jan Kowalski"
                  required
                />
              </FormField>
              <FormField namespace="kontakt" label="E-mail" required error={e.email}>
                <input
                  key={`email-${shakeKey}`}
                  name="email"
                  type="email"
                  className={`kontakt-input ${e.email ? 'kontakt-input--error' : ''}`}
                  placeholder="jan@example.com"
                  required
                />
              </FormField>
            </div>

            <div className="kontakt-row">
              <FormField namespace="kontakt" label="Telefon" error={e.phone}>
                <input
                  key={`phone-${shakeKey}`}
                  name="phone"
                  type="tel"
                  className={`kontakt-input ${e.phone ? 'kontakt-input--error' : ''}`}
                  placeholder="+48 500 000 000"
                />
              </FormField>
              <FormField namespace="kontakt" label="Temat" error={e.subject}>
                <select
                  key={`subject-${shakeKey}`}
                  name="subject"
                  className={`kontakt-input cursor-pointer ${e.subject ? 'kontakt-input--error' : ''}`}
                  defaultValue={CONTACT_SUBJECTS[0]}
                >
                  {CONTACT_SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField namespace="kontakt" label="Wiadomość" required error={e.message}>
              <textarea
                key={`message-${shakeKey}`}
                name="message"
                className={`kontakt-input resize-y min-h-32.5 ${e.message ? 'kontakt-input--error' : ''}`}
                placeholder="Napisz, w czym możemy pomóc..."
                rows={5}
                required
              />
            </FormField>

            <Button
              type="submit"
              disabled={isPending}
              variant="default"
              size="lg"
              className={`w-full mt-2 font-bold transition-transform active:scale-[0.98] ${
                isPending ? 'kontakt-submit--pending' : ''
              }`}
              style={{ borderRadius: '10px', height: 'auto', padding: '14px 24px' }}
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
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

