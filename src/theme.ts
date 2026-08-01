// src/theme.ts
// Two worlds share the screen and must never blur (doctrine 1): the
// WORKSTATION (the lab's software — cold graphite, mono type) and the SCAN
// (Vera's pages — warm paper, ink, her hand). The oxblood/gilt pair is the
// series binding (assets/icon.png) and is reserved for the journal object
// itself and moments of ceremony (seals, the signature).

export const colors = {
  // workstation chrome
  bench: '#14161a',
  panel: '#1d2026',
  panelEdge: '#32363e',
  text: '#e8e6e0',
  textSoft: '#a5a29a',
  textFaint: '#6e6b64',
  // the scan
  paper: '#ede7da',
  paperDeep: '#e4dece',
  ink: '#26221c',
  inkFaint: '#8a867b',
  ruledLine: '#b9c0bd',
  marginRed: '#a63a3a',
  // the binding (series identity — use sparingly)
  oxblood: '#4a1717',
  oxbloodDeep: '#421313',
  gilt: '#c9a24b',
  giltBright: '#f0dca0',
  // instruments (also the key-type colors in the damage log)
  raking: '#d3a34e',
  uv: '#a78bd4',
  spectral: '#5cb3a8',
} as const;

export const fonts = {
  /** Workstation voice: everything the lab's software says. */
  mono: 'Menlo',
  /** Vera's printed/typed documents. */
  serif: 'Baskerville',
  serifItalic: 'Baskerville-Italic',
  /** Neutral UI fallback. */
  sans: 'Avenir Next',
} as const;
