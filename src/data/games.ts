export interface Game {
  slug: string;
  title: string;
  genre: string;
  platform: Array<'browser' | 'android' | 'ios'>;
  year: number;
  description: string;
  coverImage: string;
  screenshots: string[];
  trailerUrl?: string;
  storeUrl: {
    browser?: string;
    android?: string;
    ios?: string;
  };
}

export const games: Game[] = [
  {
    slug: 'lava-escape',
    title: 'Лавовый Побег',
    genre: 'Аркада / Казуальная',
    platform: ['browser', 'android'],
    year: 2022,
    description:
      'Беги, прыгай и уворачивайся от потоков лавы в этой захватывающей аркаде. Собирай монеты, открывай новых персонажей и побей рекорд друзей!',
    coverImage: '/images/games/lava-escape/cover.jpg',
    screenshots: [
      '/images/games/lava-escape/screen1.jpg',
      '/images/games/lava-escape/screen2.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    storeUrl: {
      browser: '#',
      android: '#',
    },
  },
  {
    slug: 'bubble-kingdom',
    title: 'Пузырьковое Царство',
    genre: 'Головоломка / Казуальная',
    platform: ['browser', 'android', 'ios'],
    year: 2023,
    description:
      'Магическое подводное царство ждёт тебя! Совмещай цвета, создавай комбо и открывай тайны подводного мира в уютной головоломке.',
    coverImage: '/images/games/bubble-kingdom/cover.jpg',
    screenshots: [
      '/images/games/bubble-kingdom/screen1.jpg',
      '/images/games/bubble-kingdom/screen2.jpg',
    ],
    storeUrl: {
      browser: '#',
      android: '#',
      ios: '#',
    },
  },
  {
    slug: 'star-raider',
    title: 'Звёздный Налётчик',
    genre: 'Шутер / Инди',
    platform: ['browser'],
    year: 2023,
    description:
      'Пиксельный космический шутер с современным твистом. Уничтожай вражеские флоты, прокачивай корабль и исследуй бесконечный космос.',
    coverImage: '/images/games/star-raider/cover.jpg',
    screenshots: [
      '/images/games/star-raider/screen1.jpg',
      '/images/games/star-raider/screen2.jpg',
    ],
    storeUrl: {
      browser: '#',
    },
  },
  {
    slug: 'forest-spirits',
    title: 'Лесные Духи',
    genre: 'Приключение / Инди',
    platform: ['browser', 'android'],
    year: 2024,
    description:
      'Отправься в мистическое путешествие через заколдованный лес. Подружись с духами природы, раскрой древние тайны и спаси магический мир.',
    coverImage: '/images/games/forest-spirits/cover.jpg',
    screenshots: [
      '/images/games/forest-spirits/screen1.jpg',
      '/images/games/forest-spirits/screen2.jpg',
    ],
    storeUrl: {
      browser: '#',
      android: '#',
    },
  },
  {
    slug: 'steel-wheels',
    title: 'Стальные Колёса',
    genre: 'Гонки / Казуальная',
    platform: ['browser', 'ios'],
    year: 2024,
    description:
      'Безумные гонки на монстр-траках по разрушенным городам и джунглям. Собирай нитро, уничтожай соперников и добирайся до финиша первым!',
    coverImage: '/images/games/steel-wheels/cover.jpg',
    screenshots: [
      '/images/games/steel-wheels/screen1.jpg',
      '/images/games/steel-wheels/screen2.jpg',
    ],
    storeUrl: {
      browser: '#',
      ios: '#',
    },
  },
  {
    slug: 'neon-jumper',
    title: 'Неоновый Прыгун',
    genre: 'Платформер / Инди',
    platform: ['browser'],
    year: 2024,
    description:
      'Паркур по неоновым крышам киберпанк-мегаполиса ночью под бит синтвейва. Прыгай, скользи и достигай невозможного.',
    coverImage: '/images/games/neon-jumper/cover.jpg',
    screenshots: [
      '/images/games/neon-jumper/screen1.jpg',
      '/images/games/neon-jumper/screen2.jpg',
    ],
    storeUrl: {
      browser: '#',
    },
  },
];
