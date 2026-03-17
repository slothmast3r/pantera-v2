import { getPayload } from 'payload'
import { richText } from './helpers'

type Instructors = {
  instructor1: { id: number }
  instructor2: { id: number }
  instructor3: { id: number }
}

export async function seedClasses(
  payload: Awaited<ReturnType<typeof getPayload>>,
  { instructor1, instructor2, instructor3 }: Instructors,
) {
  console.log('Seeding classes...')
  await Promise.all([
    // 1. Krav Maga (Dorośli)
    payload.create({
      collection: 'classes',
      data: {
        title: 'Krav Maga',
        slug: 'krav-maga',
        type: 'krav-maga',
        ageGroup: 'adults',
        heading: {
          title: 'Krav Maga – Skuteczna samoobrona i trening dla ciała',
          subtitle:
            'Poczuj się pewniej w każdej sytuacji. Naucz się reagować na zagrożenia, popraw kondycję i zredukuj stres w bezpiecznej, kameralnej atmosferze.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Krav Maga to system oparty na naturalnych odruchach obronnych, co czyni go prostym do opanowania i niezwykle skutecznym. W Panterze nie uczymy agresji, lecz mądrego reagowania.',
            'Nasz trening to kompletny system wiedzy o bezpieczeństwie oraz doskonała metoda na zadbanie o sprawność fizyczną.',
          ),
        },
        highlights: [
          { title: 'Realna samoobrona', description: 'Obrona przed uderzeniami, kopnięciami i chwytami.', icon: '🛡️' },
          { title: 'Procedury bezpieczeństwa', description: 'Jak unikać zagrożeń i radzić sobie w stresie.', icon: '📋' },
          { title: 'Lepsza forma', description: 'Poprawisz siłę, dynamikę i wydolność organizmu.', icon: '💪' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zajęcia dla kobiet i mężczyzn w wieku 20–45+ lat. Niezależnie od tego, czy pracujesz w biurze, czy szukasz ruchu po godzinach – to miejsce dla Ciebie. Nie musisz mieć wcześniejszego doświadczenia.',
        },
        logistics: { intensity: 'medium-high', whatToBring: 'Długie spodnie sportowe, koszulka, woda' },
        instructor: instructor1.id,
        cta: {
          heading: 'Zapisz się na pierwszy trening',
          description: 'Pierwsze zajęcia są bezpłatne. Przekonaj się sam, dlaczego nam ufają.',
          buttonText: 'Zapisz się na pierwszy trening',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 2. Krav Maga Dzieci
    payload.create({
      collection: 'classes',
      data: {
        title: 'Krav Maga Kids',
        slug: 'krav-maga-dzieci',
        type: 'krav-maga',
        ageGroup: 'children',
        heading: {
          title: 'Krav Maga dla dzieci i młodzieży – Bezpieczeństwo i pewność siebie',
          subtitle:
            'Nasze zajęcia to coś więcej niż ruch. Łączymy naukę zasad bezpieczeństwa ze świetną zabawą i wszechstronnym rozwojem fizycznym. Pomagamy dzieciom stać się bystrymi i dzielnymi.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'To więcej niż sport. Nasz program przygotowuje dzieci na wyzwania współczesnego świata, łącząc dynamiczną zabawę z edukacją. Uczymy, jak rozpoznawać zagrożenia i jak na nie reagować.',
            'Wszystko to w atmosferze wsparcia i akceptacji. Prowadzimy grupy wiekowe: 4–6, 7–10 oraz 11–14 lat.',
          ),
        },
        highlights: [
          { title: 'Pewność siebie', description: 'Budujemy odwagę i wiarę we własne możliwości.', icon: '⭐' },
          { title: 'Odpowiedzialność', description: 'Uczymy szacunku i odpowiedzialności za kolegów z grupy.', icon: '🤝' },
          { title: 'Sprawność fizyczna', description: 'Rozwijamy szybkość, koordynację i zwinność przez gry ruchowe.', icon: '🏃' },
          { title: 'Motywacja i cele', description: 'Kilka razy w roku organizujemy egzaminy na pasy.', icon: '🎯' },
          { title: 'Bezpieczne techniki', description: 'Nauka bezpiecznych padów, uwolnień z chwytów i prostych obron.', icon: '🛡️' },
          { title: 'Elementy bokserskie', description: 'W starszych grupach: elementy bokserskie i kopnięcia.', icon: '🥊' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zapraszamy dzieci i młodzież w grupach wiekowych: 4–6, 7–10 oraz 11–14 lat. To idealne miejsce zarówno dla dzieci nieśmiałych, które potrzebują wzmocnienia, jak i tych pełnych energii.',
        },
        logistics: { intensity: 'medium', whatToBring: 'Koszulka, długie spodnie sportowe, woda i pozytywne nastawienie' },
        instructor: instructor1.id,
        cta: {
          heading: 'Zapisz dziecko na zajęcia',
          description: 'Pierwsze zajęcia są bezpłatne. Przekonaj się, jak wiele może zyskać Twoje dziecko.',
          buttonText: 'Zapisz dziecko',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 3. Karate Dzieci
    payload.create({
      collection: 'classes',
      data: {
        title: 'Karate Dzieci',
        slug: 'karate-dzieci',
        type: 'karate',
        ageGroup: 'children',
        heading: {
          title: 'Karate dla Dzieci – Charakter kształtowany w ruchu',
          subtitle:
            'Tradycyjna sztuka walki, która uczy szacunku, koncentracji i wytrwałości. Wychowanie poprzez sport w najlepszym wydaniu.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Karate w Panterze to szkoła charakteru. Pod okiem doświadczonego senseia dzieci uczą się nie tylko technik walki, ale przede wszystkim panowania nad emocjami i szacunku do współćwiczących.',
            'To idealne zajęcia dla dzieci potrzebujących wyciszenia, jak i tych, którym brakuje ruchu.',
          ),
        },
        highlights: [
          { title: 'Samodyscyplina', description: 'Nauka etykiety dojo i systematyczności.', icon: '📐' },
          { title: 'Koncentracja', description: 'Trening kata i technik wymaga skupienia uwagi.', icon: '🎯' },
          { title: 'Sprawność ogólna', description: 'Wszechstronny rozwój motoryczny.', icon: '💪' },
          { title: 'Ścieżka rozwoju', description: 'Zdobywanie kolejnych stopni (pasów) uczy dążenia do celu.', icon: '🏆' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zajęcia dla dzieci i młodzieży. Grupy dobierane wiekowo. Idealne dla dzieci szukających dyscypliny, jak i tych, którym brakuje ruchu.',
        },
        logistics: { intensity: 'medium', whatToBring: 'Wygodny strój sportowy lub kimono' },
        instructor: instructor2.id,
        cta: {
          heading: 'Zapisz dziecko na karate',
          description: 'Pierwsze zajęcia są bezpłatne. Sprawdź, jak karate kształtuje charakter.',
          buttonText: 'Zapisz dziecko na karate',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 4. Tai Chi
    payload.create({
      collection: 'classes',
      data: {
        title: 'Tai Chi',
        slug: 'tai-chi',
        type: 'tai-chi',
        ageGroup: 'all',
        heading: {
          title: 'Tai Chi – Równowaga ciała i umysłu',
          subtitle:
            'Odkryj spokój w ruchu. Zajęcia dedykowane osobom szukającym harmonii, poprawy zdrowia i odpoczynku od codziennego pośpiechu.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Tai Chi to trening uważności i mobilności. Skupiamy się na płynnych sekwencjach ruchów, głębokim oddechu i poprawnym ustawieniu ciała.',
            'To bezpieczna forma aktywności, która nie obciąża stawów i nie zawiera elementów rywalizacji.',
          ),
        },
        highlights: [
          { title: 'Zdrowy kręgosłup', description: 'Poprawa postawy i mobilności stawów.', icon: '🌿' },
          { title: 'Redukcja stresu', description: 'Wyciszenie umysłu i nauka świadomego oddechu.', icon: '☯️' },
          { title: 'Dla każdego', description: 'Bez względu na wiek (35–65+) i kondycję.', icon: '👴' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zajęcia dla dorosłych i seniorów bez względu na wiek (35–65+) i kondycję. Idealne dla osób szukających spokojnej, ale skutecznej formy aktywności.',
        },
        logistics: { intensity: 'low', whatToBring: 'Luźny, niekrępujący ruchów strój' },
        instructor: instructor3.id,
        cta: {
          heading: 'Dołącz do grupy Tai Chi',
          description: 'Pierwsze zajęcia są bezpłatne. Odkryj spokój w ruchu.',
          buttonText: 'Dołącz do grupy Tai Chi',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 5. Treningi Indywidualne
    payload.create({
      collection: 'classes',
      data: {
        title: 'Treningi Indywidualne',
        slug: 'indywidualne',
        type: 'individual',
        ageGroup: 'all',
        heading: {
          title: 'Treningi Indywidualne – 100% uwagi trenera',
          subtitle:
            'Twój cel, Twój czas, Twój plan. Osiągaj wyniki szybciej dzięki pracy „jeden na jeden" z doświadczonym instruktorem.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Idealne rozwiązanie dla osób z napiętym grafikiem lub specyficznymi celami treningowymi.',
            'Niezależnie czy chcesz nauczyć się samoobrony, schudnąć, czy poprawić technikę bokserską – dostosujemy program do Twoich możliwości.',
          ),
        },
        highlights: [
          { title: 'Krav Maga / Samoobrona', description: 'Nauka technik dopasowana do Twoich predyspozycji.', icon: '🛡️' },
          { title: 'Boks / Kick-boxing', description: 'Trening techniczny i kondycyjny na workach (Boxing Cardio).', icon: '🥊' },
          { title: 'Trening motoryczny', description: 'Budowanie siły i wytrzymałości.', icon: '💪' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Dla zapracowanych profesjonalistów, osób ceniących dyskrecję oraz tych, którzy chcą szybkich postępów. Elastyczne godziny (również poranne i weekendowe).',
          expectTitle: 'Kontakt i terminy',
          expectContent:
            'Tel: 508 689 718 | E-mail: kontakt@pantera.waw.pl. Elastyczne godziny, również poranne i weekendowe.',
        },
        logistics: { intensity: 'medium-high', whatToBring: 'Strój sportowy, woda' },
        cta: {
          heading: 'Umów się na trening personalny',
          description: 'Skontaktuj się z nami i ustalmy termin dopasowany do Twojego grafiku.',
          buttonText: 'Umów się na trening personalny',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 6. ASG
    payload.create({
      collection: 'classes',
      data: {
        title: 'Dynamiczne Strzelectwo ASG',
        slug: 'asg',
        type: 'asg',
        ageGroup: 'all',
        heading: {
          title: 'Dynamiczne Strzelectwo ASG – Precyzja i adrenalina',
          subtitle:
            'Bezpieczne wprowadzenie do świata strzelectwa dynamicznego i sportowego z wykorzystaniem profesjonalnych replik.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Treningi prowadzone są z użyciem replik ASG GBB (Gas Blow Back), które wiernie imitują działanie broni palnej (odrzut, obsługa zamka), ale są znacznie bezpieczniejsze.',
            'To doskonała szkoła koncentracji, opanowania i odpowiedzialności. Korzystamy z replik takich modeli jak Glock 17, HK 416, AK 74. Zapewniamy okulary ochronne i niezbędne wyposażenie.',
          ),
        },
        highlights: [
          { title: 'Zasady bezpieczeństwa', description: 'Odpowiedzialne posługiwanie się repliką.', icon: '🔒' },
          { title: 'Technika strzelecka', description: 'Postawy strzeleckie, praca na zasłonach, celowanie.', icon: '🎯' },
          { title: 'Dynamika', description: 'Strzelanie w ruchu i pod presją czasu do tarcz IPSC.', icon: '⚡' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Dzieci od 8. roku życia (za zgodą rodziców) oraz dorośli. Zajęcia w formule indywidualnej lub w małych grupach.',
        },
        logistics: { intensity: 'medium', whatToBring: 'Wygodny strój sportowy – okulary ochronne i sprzęt zapewniamy' },
        cta: {
          heading: 'Zapytaj o termin ASG',
          description: 'Skontaktuj się z nami, aby umówić się na trening strzelecki.',
          buttonText: 'Zapytaj o termin ASG',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 7. Karate Dorośli
    payload.create({
      collection: 'classes',
      data: {
        title: 'Karate Dorośli',
        slug: 'karate',
        type: 'karate',
        ageGroup: 'adults',
        heading: {
          title: 'Karate Tradycyjne – Siła charakteru i kondycja',
          subtitle:
            'Klasyczna japońska sztuka walki dla dorosłych, która buduje siłę fizyczną, kondycję oraz odporność psychiczną. To trening, który wymaga skupienia, dając w zamian satysfakcję z precyzji i panowania nad własnym ciałem.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Karate to coś więcej niż techniki walki — to filozofia dyscypliny, szacunku i ciągłego doskonalenia. Na zajęciach w Panterze pracujesz nad precyzją ruchów, siłą i koordynacją.',
            'Zajęcia dla dorosłych (16+) szukających tradycyjnej formy treningu, dyscypliny i rozwoju osobistego.',
          ),
        },
        highlights: [
          { title: 'Sprawność i technika', description: 'Poprawa koordynacji, siły i elastyczności.', icon: '🥋' },
          { title: 'Redukcja stresu', description: 'Intensywny wysiłek pozwala „przewietrzyć głowę" po pracy.', icon: '🧘' },
          { title: 'Konsekwencja', description: 'Nauka wytrwałości i dążenia do mistrzostwa w technice.', icon: '🎯' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zajęcia dla osób dorosłych (16+), które szukają tradycyjnej formy treningu, dyscypliny i rozwoju osobistego. Brak wymagań co do wcześniejszego doświadczenia.',
        },
        logistics: { intensity: 'medium', whatToBring: 'Wygodny strój sportowy lub keiko-gi (kimono), woda' },
        instructor: instructor2.id,
        cta: {
          heading: 'Zapisz się na karate dla dorosłych',
          description: 'Pierwsze zajęcia są bezpłatne. Przekonaj się, jak karate zmienia podejście do życia.',
          buttonText: 'Zapisz się na zajęcia',
          buttonLink: '/kontakt',
        },
      },
    }),

    // 8. Power Training
    payload.create({
      collection: 'classes',
      data: {
        title: 'Power Training',
        slug: 'power-training',
        type: 'power-training',
        ageGroup: 'adults',
        heading: {
          title: 'Power Training – Trening siłowy i kondycyjny',
          subtitle:
            'Kompleksowy trening ogólnorozwojowy, który buduje siłę funkcjonalną i żelazną kondycję. Idealne uzupełnienie dla osób trenujących sztuki walki oraz tych, którzy chcą zadbać o sylwetkę i zdrowie.',
        },
        introduction: {
          title: 'O zajęciach',
          content: richText(
            'Power Training łączy elementy treningu siłowego z ćwiczeniami funkcjonalnymi i kondycyjnymi. Program jest skalowalny — niezależnie od tego, czy wracasz do formy po przerwie, czy chcesz poprawić wyniki sportowe.',
            'Trening pod okiem doświadczonego instruktora gwarantuje bezpieczeństwo i efektywność.',
          ),
        },
        highlights: [
          { title: 'Wzmocnienie ciała', description: 'Praca nad siłą mięśniową i stabilizacją (core), co przekłada się na lepszą postawę na co dzień.', icon: '💪' },
          { title: 'Poprawa motoryki', description: 'Zwiększenie dynamiki i wytrzymałości, przydatne w Karate czy Krav Maga.', icon: '⚡' },
          { title: 'Bezpieczeństwo', description: 'Nauka poprawnej techniki wykonywania ćwiczeń siłowych, aby unikać kontuzji.', icon: '🛡️' },
          { title: 'Redukcja stresu', description: 'Intensywny wysiłek to najlepszy sposób na rozładowanie napięcia.', icon: '🧘' },
        ],
        targetAudience: {
          forWhoTitle: 'Dla kogo?',
          forWhoContent:
            'Zajęcia dla dorosłych na każdym poziomie zaawansowania. Niezależnie od tego, czy wracasz do formy po przerwie, czy chcesz poprawić swoje wyniki sportowe.',
        },
        logistics: { intensity: 'medium-high', whatToBring: 'Wygodny strój sportowy, buty na zmianę, woda' },
        instructor: instructor2.id,
        cta: {
          heading: 'Zapisz się na próbny trening',
          description: 'Pierwsze zajęcia są bezpłatne. Sprawdź, czym jest Power Training w Panterze.',
          buttonText: 'Zapisz się na próbny trening',
          buttonLink: '/kontakt',
        },
      },
    }),
  ])
  console.log('Created 8 classes')
}
