// DamageLogScreen: the software's ledger of everything recovered — doctrine
// 7 made visible (device QA 2026-08-01, issue #10: without this surface,
// recall quietly became the challenge again). Lists every earned key with
// its logged value, kind, and source page, plus the thirteen-slot letter
// certificate assembling toward the name.

import { ScrollView, Pressable, StyleSheet, View } from 'react-native';
import { ChromeText } from '../engine/ui';

import { KEYS, PAGES } from '../content/unwriting/graph';
import { LETTER_SLOTS, type KeyId } from '../models';
import { earnedKeys } from '../state';
import { colors, fonts } from '../theme';

const KIND_ORDER = ['word', 'instrument', 'letter', 'seal'] as const;
const KIND_TITLE = {
  word: 'RECOVERED WORDS',
  instrument: 'CALIBRATED INSTRUMENTS',
  letter: 'LETTERS OF THE NAME',
  seal: 'SEALS',
} as const;

function producerOf(k: KeyId): number {
  return PAGES.find((p) => p.produces.includes(k))!.id;
}

function CertificateStrip({ earned }: { earned: ReadonlySet<KeyId> }) {
  // slot -> letter for earned letter keys only; unearned slots stay blank.
  const bySlot = new Map<number, string>();
  for (const [id, slot] of Object.entries(LETTER_SLOTS))
    if (earned.has(id as KeyId)) bySlot.set(slot.slot, slot.letter);
  return (
    <View style={s.strip}>
      {Array.from({ length: 13 }, (_, i) => (
        <View key={i} style={s.slot}>
          <ChromeText style={s.slotLetter}>{bySlot.get(i + 1) ?? ' '}</ChromeText>
          <ChromeText style={s.slotNum}>{i + 1}</ChromeText>
        </View>
      ))}
    </View>
  );
}

export default function DamageLogScreen({ onBack }: { onBack: () => void }) {
  const earned = earnedKeys();
  const rows = (Object.keys(KEYS) as KeyId[]).filter((k) => earned.has(k));

  return (
    <View style={s.root}>
      <View style={s.bar}>
        <Pressable onPress={onBack} accessibilityRole="button">
          <ChromeText style={s.back}>‹ BENCH</ChromeText>
        </Pressable>
        <ChromeText style={s.barTitle}>DAMAGE LOG</ChromeText>
      </View>
      <ScrollView contentContainerStyle={s.body}>
        <ChromeText style={s.note}>
          Every recovered key files here automatically. Later pages consume
          them; nothing must be remembered.
        </ChromeText>
        {KIND_ORDER.map((kind) => {
          const ofKind = rows.filter((k) => KEYS[k].kind === kind);
          if (kind !== 'letter' && ofKind.length === 0) return null;
          return (
            <View key={kind} style={s.section}>
              <ChromeText style={s.sectionTitle}>{KIND_TITLE[kind]}</ChromeText>
              {ofKind.map((k) => (
                <View key={k} style={s.row}>
                  <ChromeText style={s.keyLabel}>{KEYS[k].label}</ChromeText>
                  <ChromeText style={s.keySource}>
                    p{String(producerOf(k)).padStart(2, '0')}
                  </ChromeText>
                </View>
              ))}
              {kind === 'letter' && (
                <>
                  {ofKind.length === 0 && (
                    <ChromeText style={s.empty}>none recovered yet</ChromeText>
                  )}
                  <CertificateStrip earned={earned} />
                </>
              )}
            </View>
          );
        })}
        {rows.length === 0 && (
          <ChromeText style={s.empty}>The log is empty. Restore a page.</ChromeText>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bench, paddingTop: 56 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  back: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 1 },
  barTitle: { color: colors.text, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 2 },
  body: { padding: 16, paddingBottom: 48, gap: 18 },
  note: { color: colors.textSoft, fontFamily: fonts.mono, fontSize: 11, lineHeight: 17 },
  section: { gap: 6 },
  sectionTitle: {
    color: colors.textFaint,
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.panelEdge,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 7,
  },
  keyLabel: { color: colors.text, fontFamily: fonts.mono, fontSize: 14 },
  keySource: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 12 },
  empty: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 12 },
  strip: { flexDirection: 'row', gap: 4, marginTop: 10, flexWrap: 'wrap' },
  slot: {
    width: 24,
    alignItems: 'center',
    borderColor: colors.gilt,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 3,
  },
  slotLetter: { color: colors.gilt, fontFamily: fonts.serif, fontSize: 15, minHeight: 18 },
  slotNum: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 8 },
});
