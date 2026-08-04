// CertificateScreen: page 28 — The Last Signature. The one ceremonial
// surface in the game (oxblood and gilt, the series binding spent here).
// The name assembles from the thirteen letter KEYS — never typed (rule 15);
// three signature lines are the three endings. QA build note: Blank's
// secure deletion is SIMULATED (data retained) so all endings are testable;
// the shipping build wipes — flagged in DESIGN.md.

import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { BodyText, ChromeText, ChromeTextInput } from '../engine/ui';

import { DELIVERY_ALT_HASHES, DELIVERY_HASH, keyLabel, PAGES } from '../content/unwriting/graph';
import { answerKey, decryptWithKey } from '../engine/cipher';
import { checkAnswer } from '../engine/hash';
import { isAttackable } from '../engine/graph';
import { LETTER_SLOTS, type Ending, type KeyId } from '../models';
import { QA_BUILD } from '../buildConfig';
import { earnedKeys, getKv, putKv, resetWorld, setPageSolved } from '../state';
import { colors, fonts } from '../theme';

/** The Delivery epilogue names recipient and place TOGETHER — the assembled
 *  form rule 15 exists to protect — so it ships encrypted under the player's
 *  own correct answer (engine/cipher.ts). Plaintext lives only in
 *  solutions.spoilers.ts; regenerate with scripts/encrypt_epilogue.ts. The
 *  other two epilogues state no answer and ship plain. */
const DELIVERY_EPILOGUE_CIPHER =
  '6fab7b5889fda23a6eb879d988f4a0a86dd977b18bfea5f76cd976348ae3a45b6baf749085e59c766ad9737a84f49aec69b071fd87f49f0b68a07038a6a59de6679a6eaa91deaf3766bc6cdc9091adca6cd39fa90bc83a206dd3a10f0cc73b866ad69ccd0d8c3d5a6bf49e540ed43f6c70c8a6630780342071dfa7de08d435fa6ecea291098937026f9aa4e10acf38b3649a9377038e2d9c65f294a804cc2f23e6d88e377dc6a9e1e59b8c927ce6a78ee4d58b707fd5ac95e3fb89ed7ec9ab47e29987d979eaa32ce1d9861278cfa1c3e09784bf7bc6a61ddfd283327a8ba4f6eed69afd85cbb642edc3993e84c2b4e6e095465d77d761f4e1dc47b978c0636ae295490375d15e40e3c14a9d76c05fd3dcf73f997bcb67b6ddd041f17cdc6949de95437879ca648cdfc744cc7ad1664ae8c752ba7f856e7fe9d1540380d76fd4dac1fe4079b49899d9c1fcc978ff9748dcd6013d77b895fcdbdcffaa76e19420defe04517da29f25dd9102bf7cf09d17e09307d17bf99baadfd4067a7aec9a6ce2de0ab281b8a53ce1dc094c80f0a3db74c21f2a73e250d875d520bd74f0522f72df1b9375f353a473901d1676fa551970d818df77f4569971c41a7f78b658c16edf15fa79f95a466fc9170b7af35bc36cd512007bb65d3c6ddf14697cf25efb6ec0d76405bdf23c6dc5d51704b3f0986ce4d3fb07fcf51c6b8dd22406f8f3bf72dfdd2309f4f8f971cadb9a08f4f770708dda490bf2fbca6f83d8b6';

const EPILOGUE: Record<Exclude<Ending, 'delivery'>, string> = {
  accession:
    'ACCESSION FILED. The volume enters the public record under its author’s name. Somewhere, a catalog search that found nothing for forty years now returns one result: her dates, her name, findable forever. The record is restored. So is her findability. The software files it without comment.',
  blank:
    'DISPOSAL AUTHORIZED. The library shows an empty slot — item deaccessioned by restorer. The damage log dims, key by key, in the order they were found, thirteen letters going out one by one. The last screen is the intake ticket from the first minute, blank. You honored the erasure. You are the last to know her.',
};

const QA_SIMULATED = ' (QA BUILD: deletion simulated — data retained.)';

/** Delivery decrypts under the key its own solve produced; the others are
 *  plain (they name nothing the player had to earn). */
function epilogueFor(chosen: Ending): string {
  if (chosen === 'blank') return EPILOGUE.blank + (QA_BUILD ? QA_SIMULATED : '');
  if (chosen !== 'delivery') return EPILOGUE[chosen];
  const key = getKv('deliveryKey');
  return key ? decryptWithKey(DELIVERY_EPILOGUE_CIPHER, key) : '';
}

/** After a real Blank the record is gone, so there is no strip to draw and
 *  nothing to sign again. The bench behind this screen is already empty. */
function DisposalView({ onBack }: { onBack: () => void }) {
  return (
    <View style={s.root}>
      <View style={s.bar}>
        <Pressable onPress={onBack} accessibilityRole="button">
          <ChromeText style={s.back}>‹ BENCH</ChromeText>
        </Pressable>
        <ChromeText style={s.barTitle}>28 · THE LAST SIGNATURE</ChromeText>
      </View>
      <ScrollView style={s.parchment} contentContainerStyle={s.inner}>
        <BodyText style={s.certHead}>CERTIFICATE OF DISPOSAL</BodyText>
        <BodyText style={s.certSub}>ESTATE LOT 44 · ONE VOLUME · NO AUTHOR OF RECORD</BodyText>
        <BodyText style={s.epilogue}>{EPILOGUE.blank}</BodyText>
      </ScrollView>
    </View>
  );
}

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
  // Blank wipes the record it just signed, so the epilogue cannot be read
  // back out of state afterwards — it is held here for the rest of the
  // session and goes when the app does, which is the point.
  const [wiped, setWiped] = useState(false);

  const choose = (e: Ending) => {
    if (e === 'blank' && !QA_BUILD) {
      setWiped(true);
      resetWorld();
      return;
    }
    putKv('ending', e);
    setPageSolved(28);
    setMode('lines');
  };

  // The Delivery epilogue decrypts under the player's own answer, so the key
  // is kept on-device once earned — nothing readable ever sat in the bundle.
  const signDelivery = (answer: string) => {
    putKv('deliveryKey', answerKey(answer));
    choose('delivery');
  };

  const missing = page.consumes.filter((k) => !earned.has(k));
  // Signed is final in a shipping build; only a QA build reopens the lines.
  const reopenable = !chosen || QA_BUILD;

  if (wiped) return <DisposalView onBack={onBack} />;

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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

            {chosen && <BodyText style={s.epilogue}>{epilogueFor(chosen)}</BodyText>}

            {chosen && !QA_BUILD && (
              <BodyText style={s.assembled}>
                the certificate is signed · this record is closed
              </BodyText>
            )}

            {mode === 'lines' && reopenable && (
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
                  RECIPIENT + WHERE — AS THE RECORD NAMES THEM. FROM WHAT WAS LEFT IN THE BOOK
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
                    if (checkAnswer(28, guess, [DELIVERY_HASH, ...DELIVERY_ALT_HASHES]))
                      signDelivery(guess);
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
    </KeyboardAvoidingView>
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
