import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// tpay credentials — set in .env:
//   TPAY_CLIENT_ID      — konto merchant (numer ID konta tpay)
//   TPAY_CLIENT_SECRET  — klucz API / security code
//   TPAY_API_KEY        — klucz API (Transactions API)
//   TPAY_API_PASSWORD   — hasło API
//   NEXT_PUBLIC_SITE_URL — np. https://panterafsc.pl

const TPAY_API_URL = 'https://api.tpay.com'

async function getTpayToken(): Promise<string> {
  const res = await fetch(`${TPAY_API_URL}/oauth/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.TPAY_CLIENT_ID,
      client_secret: process.env.TPAY_CLIENT_SECRET,
    }),
  })
  if (!res.ok) throw new Error('tpay auth failed')
  const data = await res.json()
  return data.access_token as string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, purpose, email, name } = body as {
      amount: number
      purpose: string
      email: string
      name?: string
    }

    // Basic validation
    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Nieprawidłowa kwota.' }, { status: 400 })
    }
    if (!purpose?.trim()) {
      return NextResponse.json({ error: 'Brak opisu płatności.' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Brak adresu e-mail.' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    // ── tpay Transactions API ──────────────────────────────────────────────
    // Docs: https://docs.tpay.com/#tag/Transactions/operation/createTransaction

    if (!process.env.TPAY_CLIENT_ID || !process.env.TPAY_CLIENT_SECRET) {
      // tpay not configured — return mock redirect for development
      console.warn('[platnosc] tpay env vars not set — returning dev mock')
      return NextResponse.json({
        redirectUrl: `${siteUrl}/platnosc/sukces?mock=1&amount=${amount}`,
      })
    }

    const token = await getTpayToken()

    const amountStr = amount.toFixed(2)

    // Checksum: md5(id + amountStr + crc + security_code)
    const crc = crypto.randomUUID()
    const checksum = crypto
      .createHash('md5')
      .update(
        process.env.TPAY_CLIENT_ID +
          amountStr +
          crc +
          process.env.TPAY_CLIENT_SECRET,
      )
      .digest('hex')

    const payload = {
      amount: amountStr,
      description: purpose,
      payer: {
        email,
        name: name ?? '',
      },
      callbacks: {
        payerUrls: {
          success: `${siteUrl}/platnosc/sukces`,
          error: `${siteUrl}/platnosc/blad`,
        },
        notification: {
          url: `${siteUrl}/api/platnosc/webhook`,
          email: process.env.TPAY_NOTIFICATION_EMAIL ?? '',
        },
      },
      pay: {
        groupId: 150, // 150 = przelew bankowy/błyskawiczny; można zmienić na 103 (Blik)
      },
      lang: 'pl',
      crc,
      checksum,
    }

    const tpayRes = await fetch(`${TPAY_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!tpayRes.ok) {
      const err = await tpayRes.text()
      console.error('[platnosc] tpay error:', err)
      return NextResponse.json(
        { error: 'Błąd bramki płatniczej. Spróbuj ponownie.' },
        { status: 502 },
      )
    }

    const tpayData = await tpayRes.json()
    const redirectUrl: string = tpayData.transactionPaymentUrl

    if (!redirectUrl) {
      return NextResponse.json(
        { error: 'Nie otrzymano linku płatności.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ redirectUrl })
  } catch (err) {
    console.error('[platnosc] unexpected error:', err)
    return NextResponse.json(
      { error: 'Wewnętrzny błąd serwera.' },
      { status: 500 },
    )
  }
}
