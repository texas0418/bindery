// PageScreen: one spread on the scan bed. Everything here is the lab
// software (doctrine 1): light toggles are instrument controls, the answer
// field declares its shape (rule 8), a miss gets the workstation's flat
// voice — never a nudge (rule 10). Pages are browsable regardless of keys
// (10b); only the restoration field locks, visibly, on missing ingredients.

import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { keyLabel, PAGES } from '../content/unwriting/graph';
import { contentFor } from '../content/unwriting/pages';
import { checkAnswer } from '../engine/hash';
import type { KeyId, Light, PageContent, ScanBlock } from '../models';
import { earnKey, earnedKeys, markPageSeen, pageSolved, setPageSolved } from '../state';
import { colors, fonts } from '../theme';

const LIGHT_LABEL: Record<Light, string> = {
  plain: 'PLAIN',
  raking: 'RAKING',
  uv: 'UV',
  spectral: 'SPECTRAL',
  confidence: 'OCR CONF',
};

const INSTRUMENT_KEY: Partial<Record<Light, KeyId>> = {
  raking: 'RAKING',
  uv: 'UV',
  spectral: 'SPECTRAL',
};

function Block({ block }: { block: ScanBlock }) {
  if (block.kind === 'table' && block.rows)
    return (
      <View style={s.table}>
        {block.rows.map((row, i) => (
          <Text key={i} style={[s.tableRow, i === 0 && s.tableHead]}>
            {row.join('   ·   ')}
          </Text>
        ))}
      </View>
    );
  const style =
    block.kind === 'heading' ? s.blockHeading
    : block.kind === 'margin' ? s.blockMargin
    : block.kind === 'label' ? s.blockLabel
    : block.kind === 'figure' ? s.blockFigure
    : s.blockPara;
  return <Text style={style}>{block.text}</Text>;
}

function LightBar({
  lights,
  earned,
  active,
  onPick,
}: {
  lights: Light[];
  earned: ReadonlySet<KeyId>;
  active: Light;
  onPick: (l: Light) => void;
}) {
  return (
    <View style={s.lightBar}>
      {lights.map((l) => {
        const needsKey = INSTRUMENT_KEY[l];
        const locked = needsKey ? !earned.has(needsKey) : false;
        const isActive = active === l;
        return (
          <Pressable
            key={l}
            onPress={() => !locked && onPick(l)}
            accessibilityRole="button"
            style={[s.light, isActive && s.lightActive]}
          >
            <Text style={[s.lightText, isActive && s.lightTextActive, locked && s.lightLocked]}>
              {locked ? `${LIGHT_LABEL[l]} 🔒` : LIGHT_LABEL[l]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AnswerPanel({
  pageId,
  format,
  hash,
  produces,
}: {
  pageId: number;
  format: string;
  hash: string;
  produces: KeyId[];
}) {
  const [guess, setGuess] = useState('');
  const [missed, setMissed] = useState(false);

  const submit = () => {
    if (!checkAnswer(pageId, guess, hash)) {
      setMissed(true);
      return;
    }
    for (const k of produces) earnKey(k);
    setPageSolved(pageId);
  };

  return (
    <View style={s.panel}>
      <Text style={s.panelTitle}>RESTORATION KEY ENTRY</Text>
      <Text style={s.format}>{format.toUpperCase()}</Text>
      <View style={s.entryRow}>
        <TextInput
          style={s.input}
          value={guess}
          onChangeText={(t) => {
            setGuess(t);
            setMissed(false);
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholder="transcribe your finding…"
          placeholderTextColor={colors.textFaint}
          onSubmitEditing={submit}
        />
        <Pressable style={s.check} onPress={submit} accessibilityRole="button">
          <Text style={s.checkText}>RESTORE</Text>
        </Pressable>
      </View>
      {missed && <Text style={s.miss}>NO MATCH IN RESTORATION MODEL</Text>}
    </View>
  );
}

function ScanBody({
  content,
  light,
  solved,
}: {
  content: PageContent | undefined;
  light: Light;
  solved: boolean;
}) {
  if (!content)
    return (
      <Text style={s.blockLabel}>
        SCAN QUEUED — this leaf is logged in the damage register but not yet transcribed.
      </Text>
    );
  const shown = content.layers.filter((l) => l.light === 'plain' || l.light === light);
  const litButEmpty = light !== 'plain' && !content.layers.some((l) => l.light === light);
  return (
    <>
      {shown.map((l, i) => (
        <View key={i}>
          {l.blocks.map((b, j) => (
            <Block key={j} block={b} />
          ))}
        </View>
      ))}
      {litButEmpty && (
        <Text style={s.blockLabel}>NO ADDITIONAL DETAIL AT THIS WAVELENGTH.</Text>
      )}
      {solved && <Text style={s.restored}>{content.restored}</Text>}
    </>
  );
}

export default function PageScreen({ id, onBack }: { id: number; onBack: () => void }) {
  const page = PAGES.find((p) => p.id === id)!;
  const content = contentFor(id);
  const earned = earnedKeys();
  const solved = pageSolved(id);

  const [light, setLight] = useState<Light>('plain');

  useEffect(() => markPageSeen(id), [id]);

  // The full rack is always present — a real bench has all its lamps
  // (device QA 2026-08-01: a lone PLAIN tab read as a mystery button).
  // Locked instruments show 🔒; page-specific views (OCR conf) append.
  const lights: Light[] = ['plain', 'raking', 'uv', 'spectral'];
  for (const v of content?.views ?? []) lights.push(v);

  const missing = page.consumes.filter((k) => !earned.has(k));
  const showEntry = content?.answer && !solved;

  return (
    <View style={s.root}>
      <View style={s.bar}>
        <Pressable onPress={onBack} accessibilityRole="button">
          <Text style={s.back}>‹ BENCH</Text>
        </Pressable>
        <Text style={s.barTitle}>
          {String(id).padStart(2, '0')} · {page.title.toUpperCase()}
        </Text>
        <Text style={[s.barMark, solved && s.barMarkSolved]}>{solved ? '✓' : ' '}</Text>
      </View>

      <LightBar lights={lights} earned={earned} active={light} onPick={setLight} />

      <ScrollView style={s.scan} contentContainerStyle={s.scanInner}>
        <ScanBody content={content} light={light} solved={solved} />
      </ScrollView>

      {showEntry &&
        (missing.length > 0 ? (
          <View style={s.panel}>
            <Text style={s.lockedText}>
              RESTORATION LOCKED — requires{' '}
              {missing.map((k) => keyLabel(k, earned)).join(' · ')}
            </Text>
          </View>
        ) : (
          <AnswerPanel
            pageId={id}
            format={content.answer!.format}
            hash={content.answer!.hash}
            produces={page.produces}
          />
        ))}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bench, paddingTop: 56 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 12,
  },
  back: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 1 },
  barTitle: { flex: 1, color: colors.text, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 1 },
  barMark: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 15 },
  barMarkSolved: { color: colors.gilt },
  lightBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexWrap: 'wrap',
  },
  light: {
    borderColor: colors.panelEdge,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  lightActive: { borderColor: colors.gilt },
  lightText: { color: colors.textSoft, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1 },
  lightTextActive: { color: colors.gilt },
  lightLocked: { color: colors.textFaint },
  scan: { flex: 1, backgroundColor: colors.paper, marginHorizontal: 12, borderRadius: 4 },
  scanInner: { padding: 18, paddingBottom: 32 },
  blockHeading: {
    color: colors.ink,
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  blockPara: {
    color: colors.ink,
    fontFamily: fonts.serif,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  blockMargin: {
    color: colors.marginRed,
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: colors.marginRed,
  },
  blockLabel: {
    color: colors.inkFaint,
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  blockFigure: {
    color: colors.ink,
    fontFamily: fonts.mono,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.ruledLine,
    borderRadius: 3,
  },
  table: { marginBottom: 12 },
  tableRow: { color: colors.ink, fontFamily: fonts.mono, fontSize: 12, lineHeight: 20 },
  tableHead: { color: colors.inkFaint },
  restored: {
    color: colors.ink,
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.ruledLine,
  },
  panel: { padding: 14, gap: 8 },
  panelTitle: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 2 },
  format: { color: colors.textSoft, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1.5 },
  entryRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.mono,
    fontSize: 15,
    borderColor: colors.panelEdge,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  check: {
    borderColor: colors.gilt,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  checkText: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2 },
  miss: { color: colors.marginRed, fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1 },
  lockedText: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1 },
});
