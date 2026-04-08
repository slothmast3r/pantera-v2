# Pantera v2

Strona internetowa Klubu Sztuk Walki Pantera — Next.js 15 + Payload CMS 3.

## Stack

- **Next.js 15** (App Router, RSC)
- **Payload CMS 3** — treści, grafik zajęć, cennik, nawigacja
- **PostgreSQL** — baza danych
- **TypeScript**
- **pnpm**

---

## Uruchomienie lokalne

### 1. Zainstaluj zależności

```bash
pnpm install
```

### 2. Uruchom bazę danych (Docker)

```bash
docker compose up -d
```

### 3. Skonfiguruj zmienne środowiskowe

```bash
cp .env.example .env
```

Uzupełnij `.env`:

```env
DATABASE_URI=postgresql://postgres:password@localhost:5432/pantera
PAYLOAD_SECRET=zmien-na-losowy-ciag-znakow
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Uruchom aplikację

```bash
pnpm dev
```

- Strona: http://localhost:3000
- Admin: http://localhost:3000/admin

### 5. Seed danych (opcjonalne)

```bash
pnpm seed
```

---

## Deployment na cPanel

cPanel obsługuje Node.js przez **Phusion Passenger**. Plik startowy to `server.cjs`.

> **Uwaga dot. bazy danych:** cPanel zazwyczaj oferuje tylko MySQL/MariaDB.
> Do Payload potrzebujesz PostgreSQL — użyj darmowego zewnętrznego serwisu:
> - [Neon](https://neon.tech) (polecane, serverless Postgres, darmowy tier)
> - [Supabase](https://supabase.com) (darmowy tier)

### Krok 1 — Utwórz bazę PostgreSQL

Zarejestruj się na [neon.tech](https://neon.tech), utwórz projekt i skopiuj connection string w formacie:

```
postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Krok 2 — Wgraj pliki na serwer

W cPanel → **File Manager** lub przez **FTP** wgraj zawartość projektu do dedykowanego katalogu (np. `~/pantera-v2/`).

**Nie wgrywaj:** `node_modules/`, `.next/`, `.env`

### Krok 3 — Utwórz aplikację Node.js w cPanel

1. cPanel → **Setup Node.js App** → **Create Application**
2. Ustaw:
   - **Node.js version:** 20.x (lub 18.x)
   - **Application mode:** Production
   - **Application root:** `pantera-v2` (katalog z plikami)
   - **Application startup file:** `server.cjs`
3. Kliknij **Create**

### Krok 4 — Skonfiguruj zmienne środowiskowe

W panelu aplikacji Node.js → sekcja **Environment Variables** dodaj:

| Zmienna | Wartość |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URI` | connection string z Neon/Supabase |
| `PAYLOAD_SECRET` | losowy ciąg 32+ znaków |
| `NEXT_PUBLIC_SITE_URL` | `https://twoja-domena.pl` |
| `TPAY_CLIENT_ID` | *(opcjonalne)* |
| `TPAY_CLIENT_SECRET` | *(opcjonalne)* |

### Krok 5 — Zainstaluj zależności i zbuilduj

W cPanel → **Terminal** (lub SSH):

```bash
cd ~/pantera-v2
npm install -g pnpm
pnpm install --frozen-lockfile
pnpm build
```

### Krok 6 — Uruchom aplikację

W cPanel → **Setup Node.js App** → kliknij **Start** przy swojej aplikacji.

### Krok 7 — Skieruj domenę na aplikację

cPanel automatycznie tworzy `.htaccess` przekierowujący domenę na port Passengera.
Jeśli używasz subdomeny lub osobnego katalogu, skonfiguruj ją w **Domains** → wskaż `Application root`.

---

## Struktura projektu

```
server.cjs                   # Entry point dla cPanel / Phusion Passenger
src/
├── app/
│   ├── (frontend)/          # Strony publiczne
│   │   ├── page.tsx         # Strona główna
│   │   ├── grafik/          # Grafik zajęć (z filtrami)
│   │   ├── oferta/          # Oferta zajęć
│   │   ├── instruktor/      # Profile instruktorów
│   │   ├── kontakt/         # Kontakt + FAQ
│   │   ├── platnosc/        # Płatności online (tpay)
│   │   ├── o-nas/           # O nas
│   │   └── regulamin/       # Regulamin
│   ├── (payload)/admin/     # Panel Payload CMS
│   └── api/                 # API routes (kontakt, platnosc)
├── collections/             # Kolekcje Payload
├── globals/                 # Globals Payload
└── seed/                    # Dane startowe
```

## Payload CMS — globals

| Global | Opis |
|---|---|
| `navigation` | Linki nawigacji + CTA |
| `footer` | Kolumny stopki |
| `schedule` | Grafik zajęć |
| `homepage-services` | Sekcja usług na homepage |
| `homepage-pricing` | Cennik na homepage |

## Skrypty

```bash
pnpm dev              # Dev server
pnpm build            # Build produkcyjny
pnpm seed             # Załaduj dane startowe
pnpm generate:types   # Wygeneruj typy Payload
pnpm lint             # ESLint
```
