// CertificateScreen: page 28 — The Last Signature. The one ceremonial
// surface in the game (oxblood and gilt, the series binding spent here).
// The name assembles from the thirteen letter KEYS — never typed (rule 15);
// three signature lines are the three endings. QA build note: Blank's
// secure deletion is SIMULATED (data retained) so all endings are testable;
// the shipping build wipes — flagged in DESIGN.md.

import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BodyText, ChromeText, ChromeTextInput } from '../engine/ui';

import { DELIVERY_HASH, keyLabel, PAGES } from '../content/unwriting/graph';
import { checkAnswer } from '../engine/hash';
import { isAttackable } from '../engine/graph';
import { LETTER_SLOTS, type Ending, type KeyId } from '../models';
import { earnedKeys, getKv, putKv, setPageSolved } from '../state';
import { colors, fonts } from '../theme';

const EPILOGUE: Record<Ending, string> = {
  accession:
    'ACCESSION FILED. The volume enters the public record under its author’s name. Somewhere, a catalog search that found nothing for forty years now returns one result: her dates, her name, findable forever. The record is restored. So is her findability. The software files it without comment.',
  delivery:
    'RELEASED FOR PRIVATE DELIVERY — c/o E. Nightingale, Notary (estate), for A. Halloran, Arbor Lane. Months later, a letter arrives at the Bindery, no return address, signed only M.: "She taught my mother the flower alphabet. Nobody ever told me why. I am learning it now."',
  blank:
    'DISPOSAL AUTHORIZED. The library shows an empty slot — item deaccessioned by restorer. The damage log dims, key by key, in the order they were found, thirteen letters going out one by one. The last screen is the intake ticket from the first minute, blank. You honored the erasure. You are the last to know her. (QA BUILD: deletion simulated — data retained.)',
};

function NameStrip() {
  const slots = new Map<number, string>();
  for (const s of Object.values(LETTER_SLOTS)) slots.set(s.slot, s.letter);
  return (
    <View style={s.strip}>
      {Array.from({ length: 13 }, (_, i) => (
        <View key={i} style={[s.slot, i === 3 && s.slotGap]}>
          <BodyText style={s.slotLetter}>{slots.get(i + 1)}</BodyText>
        </View>
      ))}
    </View>
  );
}

export default function CertificateScreen({ onBack }: { onBack: () => void }) {
  const page = PAGES.find((p) => p.id === 28)!;
  const earned = earnedKeys();
  const ready = isAttackable(page, earned);
  const chosen = getKv('ending') as Ending | undefined;

  const [mode, setMode] = useState<'lines' | 'delivery' | 'blankConfirm'>('lines');
  const [guess, setGuess] = useState('');
  const [missed, setMissed] = useState(false);

  const choose = (e: Ending) => {
    putKv('ending', e);
    setPageSolved(28);
    setMode('lines');
  };

  const missing = page.consumes.filter((k) => !earned.has(k));

  return (
    <View style={s.root}>
      <View style={s.bar}>
        <Pressable onPress={onBack} accessibilityRole="button">
          <ChromeText style={s.back}>‹ BENCH</ChromeText>
        </Pressable>
        <ChromeText style={s.barTitle}>28 · THE LAST SIGNATURE</ChromeText>
      </View>
      <ScrollView style={s.parchment} contentContainerStyle={s.inner}>
        <BodyText style={s.certHead}>CERTIFICATE OF RESTORATION</BodyText>
        <BodyText style={s.certSub}>ESTATE LOT 44 · ONE VOLUME · AUTHOR</BodyText>

        {!ready ? (
          <>
            <View style={s.stripEmpty}>
              <BodyText style={s.certSub}>
                the name line awaits · {missing.length} requirement
                {missing.length === 1 ? '' : 's'} outstanding
              </BodyText>
            </View>
            <BodyText style={s.reqs}>
              {missing.map((k) => keyLabel(k, earned)).join(' · ')}
            </BodyText>
          </>
        ) : (
          <>
            <NameStrip />
            <BodyText style={s.assembled}>
              assembled from the record — no part of it typed
            </BodyText>

            {chosen && <BodyText style={s.epilogue}>{EPILOGUE[chosen]}</BodyText>}

            {mode === 'lines' && (
              <View style={s.lines}>
                <BodyText style={s.linesHead}>
                  {chosen
                    ? 'THE RESTORER MAY RECONSIDER (QA BUILD — all lines remain open):'
                    : 'THREE LINES. THE RESTORER SIGNS ONE.'}
                </BodyText>
                <Pressable style={s.line} onPress={() => choose('accession')} accessibilityRole="button">
                  <BodyText style={s.lineTitle}>1 · ARCHIVE RECORD</BodyText>
                  <BodyText style={s.lineSub}>public accession — preserved, and findable, forever</BodyText>
                </Pressable>
                <Pressable style={s.line} onPress={() => setMode('delivery')} accessibilityRole="button">
                  <BodyText style={s.lineTitle}>2 · PRIVATE DELIVERY</BodyText>
                  <BodyText style={s.lineSub}>
                    recipient unknown — unless the book told you. state recipient + where
                  </BodyText>
                </Pressable>
                <Pressable style={s.line} onPress={() => setMode('blankConfirm')} accessibilityRole="button">
                  <BodyText style={s.lineTitle}>3 · DISPOSAL AUTHORIZATION</BodyText>
                  <BodyText style={s.lineSub}>secure deletion — the record ends with you</BodyText>
                </Pressable>
              </View>
            )}

            {mode === 'delivery' && (
              <View style={s.lines}>
                <ChromeText style={s.entryLabel}>
                  RECIPIENT + WHERE — FROM WHAT WAS LEFT IN THE BOOK
                </ChromeText>
                <ChromeTextInput
                  style={s.input}
                  value={guess}
                  onChangeText={(t) => {
                    setGuess(t);
                    setMissed(false);
                  }}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  placeholder="—"
                  placeholderTextColor={colors.inkFaint}
                  onSubmitEditing={() => {
                    if (checkAnswer(28, guess, DELIVERY_HASH)) choose('delivery');
                    else setMissed(true);
                  }}
                />
                {missed && <ChromeText style={s.miss}>NO SUCH RECIPIENT IN THE RECORD</ChromeText>}
                <Pressable onPress={() => setMode('lines')} accessibilityRole="button">
                  <ChromeText style={s.cancel}>‹ the other lines</ChromeText>
                </Pressable>
              </View>
            )}

            {mode === 'blankConfirm' && (
              <View style={s.lines}>
                <BodyText style={s.linesHead}>
                  DISPOSAL IS PERMANENT. THE SOFTWARE ASKS ONCE MORE, IN ITS DRYEST VOICE:
                  AUTHORIZE SECURE DELETION OF THE ONLY COPY?
                </BodyText>
                <Pressable style={s.line} onPress={() => choose('blank')} accessibilityRole="button">
                  <BodyText style={s.lineTitle}>AUTHORIZE</BodyText>
                </Pressable>
                <Pressable onPress={() => setMode('lines')} accessibilityRole="button">
                  <ChromeText style={s.cancel}>‹ the other lines</ChromeText>
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.oxbloodDeep, paddingTop: 56 },
  bar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 10 },
  back: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 1 },
  barTitle: { color: colors.giltBright, fontFamily: fonts.mono, fontSize: 13, letterSpacing: 2 },
  parchment: { flex: 1, marginHorizontal: 12, backgroundColor: colors.oxblood, borderColor: colors.gilt, borderWidth: 1, borderRadius: 4 },
  inner: { padding: 20, paddingBottom: 44, gap: 12 },
  certHead: { color: colors.giltBright, fontFamily: fonts.serif, fontSize: 20, letterSpacing: 3, textAlign: 'center' },
  certSub: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, textAlign: 'center' },
  strip: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 10, flexWrap: 'wrap' },
  stripEmpty: { marginTop: 16 },
  slot: { borderBottomColor: colors.gilt, borderBottomWidth: 1, paddingHorizontal: 3, paddingBottom: 2 },
  slotGap: { marginRight: 14 },
  slotLetter: { color: colors.giltBright, fontFamily: fonts.serif, fontSize: 22 },
  assembled: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textAlign: 'center' },
  reqs: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 11, lineHeight: 18, textAlign: 'center', marginTop: 8 },
  lines: { marginTop: 16, gap: 10 },
  linesHead: { color: colors.giltBright, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1.5, lineHeight: 17 },
  line: { borderColor: colors.gilt, borderWidth: 1, borderRadius: 3, padding: 12, gap: 3 },
  lineTitle: { color: colors.giltBright, fontFamily: fonts.serif, fontSize: 16, letterSpacing: 1 },
  lineSub: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 10.5, lineHeight: 16 },
  entryLabel: { color: colors.giltBright, fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: 1.5 },
  input: { color: colors.giltBright, fontFamily: fonts.mono, fontSize: 15, borderColor: colors.gilt, borderWidth: 1, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 10 },
  miss: { color: colors.giltBright, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1 },
  cancel: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, paddingTop: 4 },
  epilogue: { color: colors.giltBright, fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 23, marginTop: 14 },
});
