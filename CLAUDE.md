# pantera-v2 — projekt: strona Pantera Family & Sport Club

Strona WWW + panel CMS dla klubu sportowego Pantera w Warszawie (Mokotów).
Języki: **Polski** (UI i treść), TypeScript.

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 15 App Router + React 19 |
| CMS | Payload CMS 3 (PostgreSQL) |
| Styling | Tailwind CSS 4 (`@theme`) + BEM CSS |
| Walidacja | Zod 4 |
| Package manager | **pnpm** |
| Ikony | Google Material Symbols (font) + `offerIcons.tsx` (SVG) |
| Animacje | Framer Motion |

## Struktura katalogów

```
src/
├── app/(frontend)/       # Strony publiczne (Next.js App Router)
│   ├── page.tsx          # Strona główna
│   ├── grafik/           # Grafik zajęć
│   ├── zajecia/[slug]/   # Szczegóły zajęć
│   ├── oferta/[slug]/    # Szczegóły ofert
│   ├── instruktor/[slug]/# Profil instruktora
│   ├── kontakt/          # Formularz kontaktowy
│   ├── platnosc/         # Formularz płatności (tpay)
│   ├── o-nas/            # O nas
│   ├── styles.css        # Globalne style + utility klasy ikon
│   └── variables.css     # Tailwind @theme — kolory, cienie
├── app/(payload)/admin/  # Panel admin Payload
├── collections/          # Konfiguracje kolekcji Payload
├── globals/              # Konfiguracje globali Payload
├── blocks/               # Typy bloków Payload (layout builder)
├── components/
│   ├── blocks/           # Renderery bloków (BlockRenderer.tsx)
│   ├── home/             # Sekcje strony głównej (Navbar, Footer, …)
│   ├── ui/               # Współdzielone komponenty UI
│   └── icons/            # offerIcons.tsx — mapa SVG ikon
├── constants/            # Stałe współdzielone
├── lib/                  # Funkcje pomocnicze
├── fields/               # Własne pola Payload (SEO)
├── hooks/                # Hooki Payload (autoSlug, revalidate)
└── payload.config.ts
```

## Payload CMS — kolekcje i globale

**Kolekcje:** `users`, `media`, `pages`, `classes`, `instructors`,
`testimonials`, `events`, `faq`, `offers`

**Globale:** `navigation`, `footer`, `schedule`, `homepage-services`,
`homepage-pricing`, `contact-info`, `analytics-settings`, `about-gallery`

**Typy auto-generowane:** `src/payload-types.ts` (`pnpm payload generate:types`)

## Path aliases

```
@/*             →  ./src/*
@payload-config →  ./src/payload.config.ts
```

## Konwencje nazewnictwa

### CSS — namespace + BEM

Każda strona/sekcja ma własny namespace. Elementy: `__`, modyfikatory: `--`.

```css
.grafik-hero { }            /* blok */
.grafik-hero__title { }     /* element */
.grafik-hero--dark { }      /* modyfikator */
.kontakt-field__error { }   /* błąd pola formularza */
```

Utility klasy ikon (zdefiniowane w `styles.css`):

```css
.icon-xs  /* 13px, margin-right: 3px */
.icon-sm  /* 1rem */
.icon-md  /* 1.2rem */
```

Używaj na: `<span className="material-symbols-outlined icon-sm">location_on</span>`

### Pliki

- Strony: `page.tsx` (server component domyślnie)
- Client components: sufiks `Client.tsx` lub `'use client'` na górze
- Kolekcje Payload: PascalCase (`Classes.ts`)
- Stałe/lib: camelCase (`scheduleUtils.ts`)

## Wzorzec strony (server component)

```tsx
export const revalidate = 300  // ISR 5 min

// Wszystkie importy NA GÓRZE (przed eksportami funkcji!)
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
// ...

export const metadata: Metadata = { ... }

export default async function XPage() {
  let navData = null
  let footerData = null

  try {
    const payload = await getPayload({ config })
    const [nav, footer, data] = await Promise.all([
      payload.findGlobal({ slug: 'navigation', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
      payload.find({ collection: '...', ... }),
    ])
    navData = nav
    footerData = footer
  } catch {
    // statyczny fallback
  }

  return (
    <>
      <Navbar data={navData} />
      <main>...</main>
      <Footer data={footerData} />
    </>
  )
}
```

## Wzorzec formularza (client component)

```tsx
'use client'
import { z } from 'zod'
import { FormField } from '@/components/ui/FormField'
import { parseZodErrors } from '@/lib/formUtils'
import { CONTACT_SUBJECTS } from '@/constants/formOptions'

const schema = z.object({ name: z.string().min(2, '...'), ... })

// useActionState + parseZodErrors → field-level błędy
// <FormField namespace="kontakt" label="Imię" required error={errors.name}>
//   <input className="kontakt-input" ... />
// </FormField>
```

## Współdzielone stałe i lib

| Plik | Eksportuje |
|---|---|
| `constants/events.ts` | `DAYS`, `DAY_VALUES`, `DAY_LABELS`, `TYPE_COLORS`, `TYPE_LABELS`, `STATUS_LABELS`, `STATUS_COLORS`, `DayValue` |
| `constants/classes.ts` | `INTENSITY_LABELS`, `HIGHLIGHT_ICONS`, `TYPE_ICONS` |
| `constants/scheduleData.ts` | `STATIC_SCHEDULE_FALLBACK` |
| `constants/navigation.ts` | `STATIC_NAV_LINKS` |
| `constants/formOptions.ts` | `CONTACT_SUBJECTS`, `PAYMENT_QUICK_AMOUNTS`, `PAYMENT_PURPOSES` |
| `lib/scheduleUtils.ts` | `DisplayEntry`, `WeekEvent`, `getWeekBounds`, `isThisWeek`, `buildEventsByDay` |
| `lib/eventUtils.ts` | `EventStatus`, `computeStatus`, `formatDateRange` |
| `lib/formUtils.ts` | `parseZodErrors<T>` |

## Współdzielone komponenty UI

| Komponent | Opis |
|---|---|
| `ui/Button.tsx` | CVA variants: default, outline, secondary, accent, ghost, link |
| `ui/FormField.tsx` | Wrapper pola: label, required, error, hint; prop `namespace` generuje klasy BEM |
| `ui/SectionHeader.tsx` | `label` + `title` + opcjonalne `subtitle`; props `labelClassName`, `titleClassName` |
| `ui/Icon.tsx` | Wrapper na Material Symbols |
| `components/blocks/BlockRenderer.tsx` | Dispatcher bloków Payload dla stron `Offer` |

## Kolory (CSS variables)

```css
--color-primary:       #F57C28  /* pomarańczowy — CTA */
--color-primary-hover: #d96a1a
--color-navy:          #0f3460
--color-navy-dark:     #0f1923
--color-navy-mid:      #1a2a3a
--color-accent:        #0094FF
--color-error:         #e63946
--color-success:       #16a34a
```

## Komendy

```bash
pnpm dev                       # dev server
pnpm build                     # produkcyjny build
pnpm devsafe                   # rm -rf .next && dev (po błędach cache)
pnpm payload generate:types    # regeneruj payload-types.ts
pnpm seed                      # załaduj dane seed
```

> **Ważne:** Po `pnpm build` zawsze usuń `.next` przed `pnpm dev`
> (`pnpm devsafe`), inaczej mogą być błędy 500 z niekompatybilnych artefaktów.

## Zmienne środowiskowe (`.env`)

```
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=min-32-znaki
TPAY_CLIENT_ID=
TPAY_CLIENT_SECRET=
TPAY_NOTIFICATION_EMAIL=
NEXT_PUBLIC_SITE_URL=https://...
```
