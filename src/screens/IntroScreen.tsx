// IntroScreen: the intake ticket. Diegetic tutorializing only (doctrine 3) —
// the player is a new hire reading a job slip, not a gamer reading a tutorial.

import { Pressable, StyleSheet, View } from 'react-native';
import { ChromeText } from '../engine/ui';

import { setFlag } from '../state';
import { colors, fonts } from '../theme';

export default function IntroScreen() {
  return (
    <View style={s.root}>
      <View style={s.ticket}>
        <ChromeText style={s.sys}>BINDERY WORKSTATION · INTAKE</ChromeText>
        <ChromeText style={s.line}>Estate lot 44 — one item, damaged.</ChromeText>
        <ChromeText style={s.line}>Journal, cloth-bound, author unknown.</ChromeText>
        <ChromeText style={s.line}>Flyleaf name excised. Begin scan.</ChromeText>
        <ChromeText style={s.procedure}>
          PROCEDURE: study each leaf under the bench lights. Transcribe your
          finding into the RESTORATION KEY ENTRY field; the model verifies.
          Recovered keys file to the damage log automatically.
        </ChromeText>
        <Pressable
          style={s.btn}
          onPress={() => setFlag('introDone')}
          accessibilityRole="button"
        >
          <ChromeText style={s.btnText}>ACCEPT JOB</ChromeText>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bench,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  ticket: {
    backgroundColor: colors.panel,
    borderColor: colors.panelEdge,
    borderWidth: 1,
    borderRadius: 6,
    padding: 24,
    gap: 10,
    maxWidth: 420,
    width: '100%',
  },
  sys: {
    color: colors.textFaint,
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
  },
  line: { color: colors.text, fontFamily: fonts.mono, fontSize: 15 },
  procedure: {
    color: colors.textSoft,
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  btn: {
    marginTop: 16,
    borderColor: colors.gilt,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: colors.gilt,
    fontFamily: fonts.mono,
    fontSize: 14,
    letterSpacing: 3,
  },
});
