// WorkbenchScreen: the open book (doctrine 10b) — all 28 pages browsable
// from intake, keys shown as the damage log records them. Placeholder shell:
// page screens land with page design; this proves the loop and the store.

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { keyLabel, PAGES } from '../content/unwriting/graph';
import { isAttackable } from '../engine/graph';
import { earnedKeys, pageSolved } from '../state';
import { colors, fonts } from '../theme';

export default function WorkbenchScreen({
  onOpenPage,
}: {
  onOpenPage: (id: number) => void;
}) {
  const earned = earnedKeys();
  return (
    <View style={s.root}>
      <Text style={s.header}>THE BINDERY · UNWRITING</Text>
      <Text style={s.sub}>
        {PAGES.filter((p) => pageSolved(p.id)).length} / {PAGES.length} restored
        · {earned.size} {earned.size === 1 ? 'key' : 'keys'} logged
      </Text>
      <FlatList
        data={PAGES}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={s.list}
        renderItem={({ item: p }) => {
          const solved = pageSolved(p.id);
          const ready = isAttackable(p, earned);
          return (
            <Pressable
              style={s.row}
              onPress={() => onOpenPage(p.id)}
              accessibilityRole="button"
            >
              <Text style={s.num}>{String(p.id).padStart(2, '0')}</Text>
              <View style={s.rowBody}>
                <Text style={s.title}>{p.title}</Text>
                {!solved && !ready && (
                  <Text style={s.needs}>
                    needs{' '}
                    {p.consumes
                      .filter((k) => !earned.has(k))
                      .map((k) => keyLabel(k, earned))
                      .join(' · ')}
                  </Text>
                )}
              </View>
              <Text style={[s.mark, solved && s.markSolved]}>
                {solved ? '✓' : ready ? '·' : '—'}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bench, paddingTop: 64 },
  header: {
    color: colors.text,
    fontFamily: fonts.mono,
    fontSize: 16,
    letterSpacing: 3,
    paddingHorizontal: 20,
  },
  sub: {
    color: colors.textFaint,
    fontFamily: fonts.mono,
    fontSize: 12,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  list: { paddingBottom: 48 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopColor: colors.panelEdge,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  num: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 13 },
  rowBody: { flex: 1 },
  title: { color: colors.text, fontFamily: fonts.mono, fontSize: 14 },
  needs: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 11, paddingTop: 2 },
  mark: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 16 },
  markSolved: { color: colors.gilt },
});
