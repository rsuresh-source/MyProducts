import '@/global.css';

import { Platform } from 'react-native';

/* ================================================================
   Theme Colors — backward-compatible light/dark palette
   Used by existing ThemedView, ThemedText, and useTheme hook.
   ================================================================ */
export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/* ================================================================
   Huashu Design Tokens — from /prototype/styles.css custom props
   Used by all feature screens (Login, Home, Detail, Cart, Profile).
   ================================================================ */
export const HS = {
  /** Screen background — Slate 50 */
  canvas: '#F8FAFC',
  /** Cards / elevated panels — White */
  surface: '#FFFFFF',
  /** Primary buttons, headers — Slate 900 */
  navy: '#0F172A',
  /** Active tabs, links — Blue 600 */
  accent: '#2563EB',
  /** Input borders, card edges — Slate 200 */
  border: '#E2E8F0',
  /** Primary body text — Slate 900 */
  text: '#0F172A',
  /** Secondary / inactive text — Slate 500 */
  textMuted: '#64748B',
  /** Discount pill background */
  greenBg: '#DCFCE7',
  /** Discount pill text */
  greenText: '#15803D',
  /** Rating badge background */
  amberBg: '#FEF3C7',
  /** Star color */
  amberText: '#F59E0B',
  /** Destructive / alerts / badge — Red 500 */
  danger: '#EF4444',
  /** Image load failure backdrop */
  placeholder: '#E2E8F0',
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radii = {
  /** product cards, profile card */
  card: 16,
  /** input fields */
  field: 12,
  /** primary / logout buttons */
  btn: 14,
  /** pill / badge */
  pill: 999,
} as const;

/** Standard shadow presets for iOS */
export const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: HS.navy,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.07,
      shadowRadius: 4,
    },
    default: { elevation: 3 },
  }),
  flat: Platform.select({
    ios: {
      shadowColor: HS.navy,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },
    default: { elevation: 6 },
  }),
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
