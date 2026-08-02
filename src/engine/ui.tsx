// src/engine/ui.tsx
// Text with explicit Dynamic Type ceilings (theme.TYPE_CAPS). Use these
// instead of raw <Text>: Text.defaultProps is silently dead under React 19,
// so caps must ride every component (max-type sweep, 2026-08-02).

import { Text, TextInput, type TextInputProps, type TextProps } from 'react-native';

import { TYPE_CAPS } from '../theme';

/** Workstation furniture: bars, buttons, labels, log rows. */
export const ChromeText = (props: TextProps) => (
  <Text maxFontSizeMultiplier={TYPE_CAPS.chrome} {...props} />
);

/** Scan prose and book surfaces: scales generously (rule 11). */
export const BodyText = (props: TextProps) => (
  <Text maxFontSizeMultiplier={TYPE_CAPS.body} {...props} />
);

/** Table cells: tight cap — a table's legibility IS its grid. */
export const TableText = (props: TextProps) => (
  <Text maxFontSizeMultiplier={TYPE_CAPS.table} {...props} />
);

export const ChromeTextInput = (props: TextInputProps) => (
  <TextInput maxFontSizeMultiplier={TYPE_CAPS.chrome} {...props} />
);
