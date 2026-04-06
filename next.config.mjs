import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // --- STRONY GŁÓWNE I SYSTEMOWE ---
      { source: '/20170204-2', destination: '/', permanent: true },
      { source: '/nowy-rok-nowe-wyzwania-2017', destination: '/', permanent: true },
      { source: '/polityka-prywatnosci', destination: '/', permanent: true },
      { source: '/regulamin-pantera-family-sport-club', destination: '/', permanent: true },
      { source: '/tets', destination: '/', permanent: true },
      { source: '/ninja_forms_preview_page', destination: '/', permanent: true },
      { source: '/formularz', destination: '/kontakt', permanent: true },
      { source: '/zapisy', destination: '/kontakt', permanent: true },
      { source: '/zapisy-na-nowy-sezon', destination: '/kontakt', permanent: true },
      { source: '/zapisy-na-samoobrona-krav-maga', destination: '/kontakt', permanent: true },
      {
        source: '/zapisy-na-zajecia-online-dla-dzieci-i-doroslych',
        destination: '/kontakt',
        permanent: true,
      },
      { source: '/zapisy-ninja', destination: '/kontakt', permanent: true },
      { source: '/zapisy-ninja-2', destination: '/kontakt', permanent: true },
      { source: '/platnosci', destination: '/platnosc', permanent: true },
      { source: '/grafik-zajec', destination: '/grafik', permanent: true },
      { source: '/starujemy-od-wrzesnia-2020', destination: '/grafik', permanent: true },
      { source: '/wakacyjne-treningi', destination: '/grafik', permanent: true },

      // --- ZAJĘCIA: KRAV MAGA ---
      { source: '/krav-maga', destination: '/zajecia/krav-maga', permanent: true },
      { source: '/gary-boaz-w-panterze', destination: '/zajecia/krav-maga', permanent: true },
      {
        source: '/nowe-zdjecia-w-galerii-krav-maga',
        destination: '/zajecia/krav-maga',
        permanent: true,
      },
      {
        source: '/zapowiedz-egzaminy-krav-maga',
        destination: '/zajecia/krav-maga',
        permanent: true,
      },
      {
        source: '/krav-maga-dla-dzieci-warszawa',
        destination: '/zajecia/krav-maga-dzieci',
        permanent: true,
      },
      {
        source: '/samoobrona-dla-dzieci-warszawa',
        destination: '/zajecia/krav-maga-dzieci',
        permanent: true,
      },
      {
        source: '/samoobrona-krav-maga-dla-dzieci-w-panterze',
        destination: '/zajecia/krav-maga-dzieci',
        permanent: true,
      },
      {
        source: '/zapisy-na-treningi-samoobrona-krav-maga-dla-dzieci',
        destination: '/zajecia/krav-maga-dzieci',
        permanent: true,
      },

      // --- ZAJĘCIA: KARATE / AIKIDO / INNE ---
      { source: '/karate-dla-dzieci', destination: '/zajecia/karate-dzieci', permanent: true },
      { source: '/aikido-dla-dzieci', destination: '/zajecia/karate-dzieci', permanent: true },
      {
        source: '/oboz-aikido-i-samoobrony-dla-dzieci',
        destination: '/zajecia/karate-dzieci',
        permanent: true,
      },
      {
        source: '/oboz-dla-dzieci-sportowo-jezykowy',
        destination: '/zajecia/karate-dzieci',
        permanent: true,
      },
      { source: '/taniec-dla-dzieci', destination: '/zajecia/karate-dzieci', permanent: true },
      {
        source: '/warsztaty-szermierki-dla-dzieci',
        destination: '/zajecia/karate-dzieci',
        permanent: true,
      },
      {
        source: '/aikido-dla-doroslych-i-mlodziezy',
        destination: '/zajecia/tai-chi',
        permanent: true,
      },
      { source: '/zdjecia-z-treningu-aikido', destination: '/zajecia/tai-chi', permanent: true },
      { source: '/dancefit', destination: '/zajecia/power-training', permanent: true },
      { source: '/forma-za-trojke', destination: '/zajecia/power-training', permanent: true },
      { source: '/total-body-workout', destination: '/zajecia/power-training', permanent: true },
      {
        source: '/total-body-workout-trening-ogolnorozwojowy',
        destination: '/zajecia/power-training',
        permanent: true,
      },
      {
        source: '/trening-strzelania-dynamiczno-taktycznego-air-soft-gun',
        destination: '/zajecia/asg',
        permanent: true,
      },
      { source: '/trening-strzelecki-dla-dzieci', destination: '/zajecia/asg', permanent: true },

      // --- ZAJĘCIA: INDYWIDUALNE ---
      { source: '/treningi-indywidualne', destination: '/zajecia/indywidualne', permanent: true },
      {
        source: '/treningi-indywidualne-dla-dzieci',
        destination: '/zajecia/indywidualne',
        permanent: true,
      },
      {
        source: '/treningi-indywidualne-krav-maga',
        destination: '/zajecia/indywidualne',
        permanent: true,
      },
      {
        source: '/treningi-indywidualne-samoobrony-krav-maga-live-on-line',
        destination: '/zajecia/indywidualne',
        permanent: true,
      },
      {
        source: '/zajecia-indywidualne-dla-dzieci-krav-maga',
        destination: '/zajecia/indywidualne',
        permanent: true,
      },

      // --- OFERTA SPECJALNA ---
      {
        source: '/zajecia-dla-kobiet',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/krav-maga-dla-mam',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/krav-maga-samoobrona-dla-kobiet-warszawa',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/kurs-samoobrony-dla-kobiet',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/kurs-samoobrony-dla-kobiet-warszawa',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/obron-swoja-torebke-samoobrona-krav-maga-dla-kobiet',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/samoobrona-dla-kobiet-edycja-marzec-2020',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/warsztaty-samoobrony-dla-kobiet',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/warsztaty-samoobrony-dla-kobiet-obron-swoja-torebke',
        destination: '/oferta/samoobrona-dla-kobiet',
        permanent: true,
      },
      {
        source: '/krav-maga-dla-ojcow-synow-i-corek',
        destination: '/oferta/warsztaty-rodzinne',
        permanent: true,
      },
      {
        source: '/krav-maga-dla-ojcow-synow-i-corek-szkolenie',
        destination: '/oferta/warsztaty-rodzinne',
        permanent: true,
      },
      {
        source: '/rodzinne-treningi-samoobrony-krav-maga',
        destination: '/oferta/warsztaty-rodzinne',
        permanent: true,
      },
      {
        source: '/warsztaty-krav-maga-dla-ojcow-z-dziecmi',
        destination: '/oferta/warsztaty-rodzinne',
        permanent: true,
      },
      {
        source: '/organizacja-imprez-dla-przedszkoli',
        destination: '/oferta/dla-szkol',
        permanent: true,
      },
      { source: '/pokaz-w-szkole-sp-115', destination: '/oferta/dla-szkol', permanent: true },
      {
        source: '/warsztaty-samoobrony-krav-maga-w-lxx-liceum',
        destination: '/oferta/dla-szkol',
        permanent: true,
      },
      {
        source: '/organizacja-urodzin-dla-dzieci',
        destination: '/oferta/urodziny',
        permanent: true,
      },
      { source: '/sala-zabaw', destination: '/oferta/urodziny', permanent: true },

      // --- ARCHIWUM / GALERIE -> ZAJĘCIA ---
      {
        source: '/1-dzien-otwarty-marzec-2014-galeria-zdjec',
        destination: '/zajecia',
        permanent: true,
      },
      { source: '/2-dzien-otwarty-wrzesien-2014', destination: '/zajecia', permanent: true },
      { source: '/egzaminy-aikido-dla-dzieci-2020', destination: '/zajecia', permanent: true },
      { source: '/galeria', destination: '/zajecia', permanent: true },
      { source: '/oboz', destination: '/zajecia', permanent: true },
      { source: '/oboz-wakacje-2015', destination: '/zajecia', permanent: true },
      { source: '/wakacje-2016', destination: '/zajecia', permanent: true },
      { source: '/zapisy-na-ferie-w-miescie', destination: '/zajecia', permanent: true },
      {
        source: '/zapisy-na-oboz-samoobrony-dla-dzieci-2019',
        destination: '/zajecia',
        permanent: true,
      },
      { source: '/zdjecia-z-obozu-dla-dzieci-2017', destination: '/zajecia', permanent: true },
      {
        source: '/zdjecia-z-obozu-dla-dzieci-aikido-i-samoobrona',
        destination: '/zajecia',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2017/02/DSC_0603.jpg',
        destination: '/zajecia',
        permanent: true,
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
