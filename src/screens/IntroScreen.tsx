// IntroScreen: the intake ticket. Diegetic tutorializing only (doctrine 3) —
// the player is a new hire reading a job slip, not a gamer reading a tutorial.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { setFlag } from '../state';
import { colors, fonts } from '../theme';

export default function IntroScreen() {
  return (
    <View style={s.root}>
      <View style={s.ticket}>
        <Text style={s.sys}>BINDERY WORKSTATION · INTAKE</Text>
        <Text style={s.line}>Estate lot 44 — one item, damaged.</Text>
        <Text style={s.line}>Journal, cloth-bound, author unknown.</Text>
        <Text style={s.line}>Flyleaf name excised. Begin scan.</Text>
        <Pressable
          style={s.btn}
          onPress={() => setFlag('introDone')}
          accessibilityRole="button"
        >
          <Text style={s.btnText}>ACCEPT JOB</Text>
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
