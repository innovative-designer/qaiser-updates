import { DEFAULT_ACCENT_COLOR } from '@/lib/constants';

/** Darken a hex color by mixing with black. ratio 0-1, 0 = original, 1 = black */
export function darkenHex(hex: string, ratio: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * (1 - ratio));
  const dg = Math.round(g * (1 - ratio));
  const db = Math.round(b * (1 - ratio));
  return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`;
}

/** Lighten a hex color by mixing with white. ratio 0-1, 0 = original, 1 = white */
export function lightenHex(hex: string, ratio: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.round(r + (255 - r) * ratio);
  const lg = Math.round(g + (255 - g) * ratio);
  const lb = Math.round(b + (255 - b) * ratio);
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}

export function buildColors(accent: string) {
  return {
    ink: '#1a2433',
    slate: '#617084',
    line: '#d7dee8',
    lineStrong: '#bcc8d6',
    accent,
    accentDeep: darkenHex(accent, 0.4),
    accentSoft: lightenHex(accent, 0.9),
    paper: '#fdfaf4',
    quietPanel: '#f6f2ea',
    white: '#ffffff',
  };
}

export const defaultColors = buildColors(DEFAULT_ACCENT_COLOR);
