import React from 'react'

const s = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const sp = (...paths: string[]) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
)

const f = (d: string, viewBox = '0 0 24 24') => (
  <svg viewBox={viewBox} fill="currentColor">
    <path d={d} />
  </svg>
)

export const offerIconMap: Record<string, { label: string; svg: React.ReactNode }> = {
  // ── Samoobrona & sport ──────────────────────────────────
  shield: {
    label: 'Tarcza',
    svg: s('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'),
  },
  'shield-check': {
    label: 'Tarcza ✓',
    svg: sp('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'),
  },
  fist: {
    label: 'Pięść / Rękawica',
    svg: f('M11 0c-3.1 0-5.8 2.1-6.6 5.1L3.1 11.4C1.1 12 0 13.9 0 16c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5 0-2.1-1.1-4-3.1-4.6l-1.3-6.3C18.8 2.1 16.1 0 13 0h-2zM5 19c-1.7 0-3-1.3-3-3 0-1.1.6-2 1.5-2.6l.8-.5-.2-1L5.3 6C5.8 3.7 7.7 2 10 2h4c2.3 0 4.2 1.7 4.7 4l1.2 5.9-.2 1 .8.5c.9.6 1.5 1.5 1.5 2.6 0 1.7-1.3 3-3 3H5z'),
  },
  martial: {
    label: 'Karate / Kimono',
    svg: f('M507.596,227.204L379.85,79.997c-3.275-3.774-8.235-6.201-13.591-6.201H145.74c-5.155,0-10.196,2.288-13.591,6.201 L4.403,227.204c-6.022,6.941-5.848,17.303,0.404,24.038l63.273,68.139c7.031,7.572,18.976,7.675,26.14,0.246l33.525-34.769v135.35 c0,9.938,8.057,17.994,17.994,17.994h220.52c9.938,0,17.994-8.057,17.994-17.994v-135.35l33.524,34.768 c7.171,7.438,19.115,7.318,26.14-0.246l63.273-68.139C513.444,244.508,513.618,234.145,507.596,227.204z M127.746,233.011 l-46.232,47.947l-39.341-42.366l85.573-98.611V233.011z M269.008,109.785l-13.01,13.573l-13.009-13.573H269.008z M348.264,402.214 H163.734v-66.287h58.469l-14.123,20.993c-5.547,8.246-3.36,19.427,4.886,24.974c8.245,5.548,19.427,3.36,24.974-4.886 l18.056-26.838l18.056,26.838c5.545,8.244,16.725,10.434,24.974,4.886c8.245-5.547,10.433-16.729,4.885-24.974l-14.123-20.993 h58.477V402.214z M348.265,299.939h-184.53c0-10.221,0-180.641,0-190.154h29.404l155.126,161.844V299.939z M348.265,219.618 l-67.341-70.256l37.936-39.578h29.405V219.618z M430.485,280.957l-46.231-47.947v-93.029l85.572,98.609L430.485,280.957z', '0 0 511.999 511.999'),
  },
  activity: {
    label: 'Aktywność / Puls',
    svg: s('M22 12h-4l-3 9L9 3l-3 9H2'),
  },
  clipboard: {
    label: 'Zasady / Procedury',
    svg: sp(
      'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
      'M8 2h8v4H8z'
    ),
  },
  award: {
    label: 'Nagroda / Pas',
    svg: sp(
      'M12 15l-3 3v5l3-3 3 3v-5l-3-3z',
      'M12 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'
    ),
  },
  'user-check': {
    label: 'Instruktor / Uwaga',
    svg: sp(
      'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      'M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'M17 11l2 2 4-4'
    ),
  },
  running: {
    label: 'Bieganie',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="4" r="1.5" />
        <path d="M7 17l2-4 3 2 2-5" />
        <path d="M6 21l4-4" />
        <path d="M15 11l2 4-4 1" />
      </svg>
    ),
  },
  dumbbell: {
    label: 'Hantel',
    svg: f('M317.433,120.791c-4.792,0-9.282,1.302-13.148,3.561v-7.159c0-14.418-11.73-26.148-26.148-26.148 s-26.148,11.73-26.148,26.148v30.103H91.594v-30.103c0-14.418-11.73-26.148-26.148-26.148s-26.148,11.73-26.148,26.148v7.159 c-3.866-2.259-8.357-3.561-13.148-3.561C11.73,120.791,0,132.521,0,146.939v49.702c0,14.418,11.73,26.148,26.148,26.148 c4.792,0,9.282-1.302,13.148-3.561v7.159c0,14.418,11.73,26.148,26.148,26.148s26.148-11.73,26.148-26.148v-30.104h160.394v30.104 c0,14.418,11.73,26.148,26.148,26.148s26.148-11.73,26.148-26.148v-7.159c3.866,2.259,8.357,3.561,13.148,3.561 c14.418,0,26.148-11.73,26.148-26.148v-49.702C343.581,132.521,331.851,120.791,317.433,120.791z M26.148,209.79 c-7.25,0-13.148-5.898-13.148-13.148v-49.702c0-7.25,5.898-13.148,13.148-13.148s13.148,5.898,13.148,13.148v49.702 C39.297,203.892,33.398,209.79,26.148,209.79z M78.594,226.389c0,7.25-5.898,13.148-13.148,13.148s-13.148-5.898-13.148-13.148 v-29.747v-49.702v-29.747c0-7.25,5.898-13.148,13.148-13.148s13.148,5.898,13.148,13.148V226.389z M91.594,183.285v-22.99h160.394 v22.99H91.594z M291.284,226.389c0,7.25-5.898,13.148-13.148,13.148s-13.148-5.898-13.148-13.148V117.192 c0-7.25,5.898-13.148,13.148-13.148s13.148,5.898,13.148,13.148v29.747v49.702V226.389z M330.581,196.642 c0,7.25-5.898,13.148-13.148,13.148s-13.148-5.898-13.148-13.148v-49.702c0-7.25,5.898-13.148,13.148-13.148 s13.148,5.898,13.148,13.148V196.642z', '0 0 343.581 343.581'),
  },
  lightning: {
    label: 'Błyskawica',
    svg: s('M13 2L3 14h9l-1 8 10-12h-9l1-8z'),
  },
  target: {
    label: 'Cel',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  flame: {
    label: 'Ogień',
    svg: s('M12 22c-4-4-8-8-4-14 1 3 3 4 5 3-1-3 1-6 3-8 0 4 4 6 4 10 0 5-4 9-8 9z'),
  },
  // ── Zdrowie & relaks ───────────────────────────────────
  lotus: {
    label: 'Tai Chi / Yin Yang',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 12C4.5 9.7962 5.45052 7.8144 6.96395 6.44221C6.82486 6.89524 6.75 7.37638 6.75 7.875C6.75 10.5674 8.93261 12.75 11.625 12.75C13.489 12.75 15 14.261 15 16.125C15 17.9385 13.5696 19.418 11.7755 19.4967C7.73721 19.378 4.5 16.067 4.5 12ZM3 12C3 7.50744 6.29171 3.7837 10.5949 3.10905C10.9269 3.03761 11.2716 3 11.625 3V3.00767C11.7494 3.00257 11.8744 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.9278 21 11.8558 20.9991 11.784 20.9975C11.7312 20.9991 11.6782 21 11.625 21V20.9923C6.82834 20.7957 3 16.8449 3 12ZM8.25 7.875C8.25 6.26965 9.37083 4.92609 10.8726 4.58417C11.2404 4.52874 11.6168 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 14.6927 18.081 17.054 15.9499 18.3768C16.3013 17.7032 16.5 16.9373 16.5 16.125C16.5 13.4326 14.3174 11.25 11.625 11.25C9.76104 11.25 8.25 9.73896 8.25 7.875ZM12.75 7.875C12.75 7.25368 12.2463 6.75 11.625 6.75C11.0037 6.75 10.5 7.25368 10.5 7.875C10.5 8.49632 11.0037 9 11.625 9C12.2463 9 12.75 8.49632 12.75 7.875ZM12.75 16.125C12.75 15.5037 12.2463 15 11.625 15C11.0037 15 10.5 15.5037 10.5 16.125C10.5 16.7463 11.0037 17.25 11.625 17.25C12.2463 17.25 12.75 16.7463 12.75 16.125Z" fill="currentColor" />
      </svg>
    ),
  },
  heart: {
    label: 'Serce',
    svg: s('M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'),
  },
  wind: {
    label: 'Oddech / Stres',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
        <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
        <path d="M17.59 11.41A2 2 0 1 1 19 15H2" />
      </svg>
    ),
  },
  brain: {
    label: 'Głowa / Psychika',
    svg: sp(
      'M12 5a7 7 0 0 1 7 7H5a7 7 0 0 1 7-7z',
      'M12 19v-7',
      'M9 15l3 4 3-4',
    ),
  },
  // ── Komunikacja & team ─────────────────────────────────
  handshake: {
    label: 'Uścisk dłoni',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12l4-4h5l3 3 5-4 3 3-6 5-3-2-4 4-3-2z" />
        <path d="M7 8V6l3-2h4l3 2v2" />
      </svg>
    ),
  },
  users: {
    label: 'Zespół',
    svg: sp(
      'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'M23 21v-2a4 4 0 0 0-3-3.87',
      'M16 3.13a4 4 0 0 1 0 7.75',
    ),
  },
  speech: {
    label: 'Komunikacja',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  megaphone: {
    label: 'Głos / Asertywność',
    svg: sp('M3 11v2l14 5V6L3 11z', 'M17 8.5a4 4 0 0 1 0 7', 'M3 13v3a2 2 0 0 0 2 2h1'),
  },
  // ── Dzieci & rodzina ───────────────────────────────────
  family: {
    label: 'Rodzina',
    svg: sp(
      'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'M23 21v-2a4 4 0 0 0-3-3.87',
      'M16 3.13a4 4 0 0 1 0 7.75',
    ),
  },
  'parent-child': {
    label: 'Rodzic i dziecko',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="5" r="2.5" />
        <circle cx="17" cy="7" r="1.5" />
        <path d="M5 22v-5l-2-3 5-3 2 4" />
        <path d="M14 22v-4l3-3 3 2-2 5" />
        <path d="M9 14v8" />
      </svg>
    ),
  },
  baby: {
    label: 'Dziecko',
    svg: sp('M9.5 2a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z', 'M4 22V12a8 8 0 0 1 16 0v10', 'M9 22v-4', 'M15 22v-4'),
  },
  // ── Oferta & biznes ────────────────────────────────────
  company: {
    label: 'Firma',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="1" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12.01" />
        <path d="M2 12a20 20 0 0 0 20 0" />
      </svg>
    ),
  },
  schools: {
    label: 'Szkoła',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  book: {
    label: 'Edukacja',
    svg: sp('M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'),
  },
  birthday: {
    label: 'Urodziny',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1" />
        <line x1="2" y1="21" x2="22" y2="21" />
        <path d="M7 8v2M12 8v2M17 8v2" />
        <circle cx="7" cy="4" r="1" /><circle cx="12" cy="4" r="1" /><circle cx="17" cy="4" r="1" />
      </svg>
    ),
  },
  gift: {
    label: 'Prezent',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  // ── Miejsce & logistyka ────────────────────────────────
  gym: {
    label: 'Sala / Klub',
    svg: sp('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'),
  },
  calendar: {
    label: 'Kalendarz',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  clock: {
    label: 'Czas',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  map: {
    label: 'Lokalizacja',
    svg: sp('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'),
  },
  // ── Sukcesy & nagrody ──────────────────────────────────
  trophy: {
    label: 'Puchar',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 21 12 17 16 21" />
        <line x1="12" y1="17" x2="12" y2="11" />
        <path d="M7 4H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h1" />
        <path d="M17 4h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1" />
        <rect x="7" y="2" width="10" height="9" rx="1" />
      </svg>
    ),
  },
  medal: {
    label: 'Medal',
    svg: sp('M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'),
  },
  star: {
    label: 'Gwiazdka',
    svg: s('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
  },
  // ── Misc ───────────────────────────────────────────────
  workshop: {
    label: 'Warsztaty',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  samoobrona: {
    label: 'Samoobrona',
    svg: s('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'),
  },
  check: {
    label: 'Zaliczone',
    svg: sp('M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4L12 14.01l-3-3'),
  },
  other: {
    label: 'Inne',
    svg: s('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
  },
}

export type OfferIconKey = keyof typeof offerIconMap
export const offerIconKeys = Object.keys(offerIconMap) as OfferIconKey[]
