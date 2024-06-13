import {
  ButtonTexts,
  SlideShowType,
  TimelineMode,
} from '@models/TimelineModel';
import xss from 'xss';
import { darkTheme, defaultTheme } from '../components/common/themes';

export const hexToRGBA = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getDefaultThemeOrDark = (isDark?: boolean) => {
  if (isDark) {
    return darkTheme;
  }
  return defaultTheme;
};

export const getDefaultClassNames = () => ({
  card: 'rc-card',
  cardMedia: 'rc-card-media',
  cardSubTitle: 'rc-card-subtitle',
  cardText: 'rc-card-text',
  cardTitle: 'rc-card-title',
  controls: 'rc-controls',
  title: 'rc-title',
});

export const getDefaultButtonTexts: () => ButtonTexts = () => ({
  changeDensity: 'Textdichte ändern',
  changeDensityOptions: {
    high: {
      helpText: 'Zeigt mehr Elemente auf einmal',
      text: 'Hoch',
    },
    low: {
      helpText: 'Zeigt weniger Elemente auf einmal',
      text: 'Niedrig',
    },
  },
  changeLayout: 'Layout ändern',
  changeLayoutOptions: {
    alternating: {
      helpText:
        'Zeigt Karten in einem vertikalen Layout mit abwechselnder Anordnung',
      text: 'Abwechselnd',
    },
    horizontal: {
      helpText: 'Zeigt Karten in einem horizontalen Layout',
      text: 'Horizontal',
    },
    horizontal_all: {
      helpText: 'Zeigt alle Karten in einem horizontalen Layout',
      text: 'Horizontal alle Karten',
    },
    vertical: {
      helpText: 'Zeigt Karten in einem vertikalen Layout',
      text: 'Vertikal',
    },
  },
  dark: 'In den Dunkelmodus wechseln',
  first: 'Zum Anfang',
  jumpTo: 'Springe zu',
  last: 'Zum Ende',
  light: 'In den Hellmodus wechseln',
  next: 'weiter',
  play: 'Diashow starten',
  previous: 'zurück',
  stop: 'Diashow stoppen',
});

//get slidehow type based on mode

export const getSlideShowType: (mode: TimelineMode) => SlideShowType = (
  mode,
) => {
  if (mode === 'HORIZONTAL') {
    return 'reveal';
  }
  if (mode === 'VERTICAL') {
    return 'reveal';
  }

  if (mode === 'VERTICAL_ALTERNATING') {
    return 'slide_from_sides';
  }

  return 'reveal';
};

export const isTextArray = (text: string | string[]): text is string[] => {
  return Array.isArray(text);
};

export const sanitizeHtmlText = (text: string | string[]) => {
  if (isTextArray(text)) {
    return text.map((t) => xss(t));
  }
  return xss(text);
};

export const getUniqueID = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  const randomValues = new Uint32Array(7);

  window.crypto.getRandomValues(randomValues);

  for (let i = 0; i < randomValues.length; i++) {
    autoId += chars[randomValues[i] % chars.length];
  }

  return autoId;
};
