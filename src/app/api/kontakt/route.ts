import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Wypełnij wymagane pola.' }, { status: 400 })
    }

    // TODO: podłącz e-mail (np. nodemailer / Resend / SendGrid)
    // Na razie logujemy i zwracamy sukces
    console.log('📬 Nowa wiadomość kontaktowa:', { name, email, phone, subject, message })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 })
  }
}
