# Pantera v2

Strona internetowa Klubu Sztuk Walki Pantera — Next.js 15 + Payload CMS 3.

## Stack

- **Next.js 15** (App Router, RSC)
- **Payload CMS 3** — treści, grafik zajęć, cennik, nawigacja
- **PostgreSQL** — baza danych (przez Docker)
- **TypeScript**
- **pnpm**

## Uruchomienie lokalne

### 1. Zainstaluj zależności

```bash
pnpm install
```

### 2. Uruchom bazę danych

```bash
docker compose up -d
```

### 3. Skonfiguruj zmienne środowiskowe

Skopiuj `.env.example` do `.env` i uzupełnij:

```env
DATABASE_URI=postgresql://postgres:password@localhost:5432/pantera
PAYLOAD_SECRET=twoj-sekret

# tpay (opcjonalne — bez nich działa tryb dev z mock redirect)
TPAY_CLIENT_ID=
TPAY_CLIENT_SECRET=
TPAY_NOTIFICATION_EMAIL=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Uruchom aplikację

```bash
pnpm dev
```

Strona: [http://localhost:3000](http://localhost:3000)
Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Seed danych (opcjonalne)

```bash
pnpm seed
```

## Struktura projektu

```
src/
├── app/
│   ├── (frontend)/          # Strony publiczne
│   │   ├── page.tsx         # Strona główna
│   │   ├── grafik/          # Grafik zajęć (z filtrami)
│   │   ├── oferta/          # Oferta zajęć
│   │   ├── kadra/           # Profile instruktorów
│   │   ├── kontakt/         # Kontakt + FAQ
│   │   ├── platnosc/        # Płatności online (tpay)
│   │   ├── o-nas/           # O nas
│   │   ├── zajecia/         # Pojedyncze zajęcia
│   │   └── regulamin/       # Regulamin
│   ├── (payload)/admin/     # Panel Payload CMS
│   └── api/                 # API routes (kontakt, platnosc)
├── collections/             # Kolekcje Payload (Classes, Instructors, FAQ…)
├── globals/                 # Globals Payload (Navigation, Footer, Schedule, HomepageServices, HomepagePricing)
├── components/
│   ├── home/                # Sekcje strony głównej
│   └── admin/               # Komponenty panelu admina (ScheduleRowLabel)
├── blocks/                  # Bloki treści Payload
└── seed/                    # Dane startowe
```

## Payload CMS — globals

| Global | Opis |
|---|---|
| `navigation` | Linki nawigacji + CTA |
| `footer` | Kolumny stopki |
| `schedule` | Grafik zajęć (wpisy z etykietą: dzień · godziny · zajęcia) |
| `homepage-services` | Sekcja usług na homepage (karty, liczba kolumn) |
| `homepage-pricing` | Cennik na homepage (plany, benefity) |

## Płatności (tpay)

API route `/api/platnosc` obsługuje integrację z tpay Transactions API:
- OAuth Bearer token (`TPAY_CLIENT_ID` + `TPAY_CLIENT_SECRET`)
- Gdy env vars są puste — zwraca mock redirect (tryb dev)
- Strony wynikowe: `/platnosc/sukces` i `/platnosc/blad`

## Skrypty

```bash
pnpm dev              # Dev server
pnpm build            # Build produkcyjny
pnpm seed             # Załaduj dane startowe
pnpm generate:types   # Wygeneruj typy Payload
pnpm lint             # ESLint
```
