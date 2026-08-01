// WorkbenchScreen: the digitized volume's table of contents (device QA
// 2026-08-01, issue #11 — Simon's direction: the software presents the
// OBJECT, not a database). Workstation chrome is the thin dark frame at
// top; below it, the book: paper ground, serif folio titles with dotted
// leaders, damaged titles healing to crisp ink as pages restore, and a
// ribbon at the reading edge (first attackable unsolved page).

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { keyLabel, PAGES } from '../content/unwriting/graph';
import { isAttackable } from '../engine/graph';
import type { KeyId, Page } from '../models';
import { earnedKeys, pageSolved } from '../state';
import { colors, fonts } from '../theme';

function TocRow({
  page,
  earned,
  ribbon,
  onOpen,
}: {
  page: Page;
  earned: ReadonlySet<KeyId>;
  ribbon: boolean;
  onOpen: () => void;
}) {
  const solved = pageSolved(page.id);
  const ready = isAttackable(page, earned);
  const missing = page.consumes.filter((k) => !earned.has(k));
  return (
    <Pressable style={s.row} onPress={onOpen} accessibilityRole="button">
      {ribbon && <View style={s.ribbon} />}
      <View style={s.rowInner}>
        <View style={s.titleLine}>
          <Text style={s.folio}>{String(page.id).padStart(2, '0')}</Text>
          <Text
            style={[s.title, solved ? s.titleSolved : ready ? s.titleReady : s.titleBlocked]}
            numberOfLines={1}
          >
            {page.title}
          </Text>
          <Text style={s.leader} numberOfLines={1} ellipsizeMode="clip">
            {'· '.repeat(60)}
          </Text>
          <Text style={[s.mark, solved && s.markSolved]}>
            {solved ? '✓' : ready ? '·' : '—'}
          </Text>
        </View>
        {!solved && !ready && (
          <Text style={s.needs}>
            needs {missing.map((k) => keyLabel(k, earned)).join(' · ')}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default function WorkbenchScreen({
  onOpenPage,
  onOpenLog,
}: {
  onOpenPage: (id: number) => void;
  onOpenLog: () => void;
}) {
  const earned = earnedKeys();
  const solvedCount = PAGES.filter((p) => pageSolved(p.id)).length;
  const ribbonAt = PAGES.find((p) => !pageSolved(p.id) && isAttackable(p, earned))?.id;

  return (
    <View style={s.root}>
      <View style={s.chrome}>
        <View style={s.chromeText}>
          <Text style={s.header}>THE BINDERY · UNWRITING</Text>
          <Text style={s.sub}>
            {solvedCount} / {PAGES.length} restored · {earned.size}{' '}
            {earned.size === 1 ? 'key' : 'keys'} logged
          </Text>
        </View>
        <Pressable style={s.logBtn} onPress={onOpenLog} accessibilityRole="button">
          <Text style={s.logBtnText}>DAMAGE LOG</Text>
        </Pressable>
      </View>
      <View style={s.book}>
        <Text style={s.contentsHead}>CONTENTS</Text>
        <FlatList
          data={PAGES}
          keyExtractor={(p) => String(p.id)}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <TocRow
              page={item}
              earned={earned}
              ribbon={item.id === ribbonAt}
              onOpen={() => onOpenPage(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bench, paddingTop: 56 },
  chrome: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  chromeText: { flex: 1 },
  header: { color: colors.text, fontFamily: fonts.mono, fontSize: 15, letterSpacing: 3 },
  sub: { color: colors.textFaint, fontFamily: fonts.mono, fontSize: 11, paddingTop: 3 },
  logBtn: {
    borderColor: colors.gilt,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  logBtnText: { color: colors.gilt, fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5 },
  book: {
    flex: 1,
    backgroundColor: colors.paper,
    marginHorizontal: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  contentsHead: {
    color: colors.inkFaint,
    fontFamily: fonts.serif,
    fontSize: 13,
    letterSpacing: 6,
    textAlign: 'center',
    paddingVertical: 14,
  },
  list: { paddingBottom: 48, paddingHorizontal: 6 },
  row: { flexDirection: 'row' },
  ribbon: {
    width: 4,
    backgroundColor: colors.marginRed,
    borderRadius: 2,
    marginVertical: 6,
  },
  rowInner: { flex: 1, paddingVertical: 10, paddingHorizontal: 12 },
  titleLine: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  folio: {
    color: colors.inkFaint,
    fontFamily: fonts.serif,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  title: { fontFamily: fonts.serif, fontSize: 17, flexShrink: 1 },
  titleSolved: { color: colors.ink },
  titleReady: { color: colors.ink, opacity: 0.75 },
  titleBlocked: { color: colors.inkFaint, opacity: 0.8 },
  leader: { flex: 1, color: colors.ruledLine, fontSize: 12, letterSpacing: 2 },
  mark: { color: colors.inkFaint, fontFamily: fonts.serif, fontSize: 15 },
  markSolved: { color: colors.gilt },
  needs: { color: colors.inkFaint, fontFamily: fonts.mono, fontSize: 10.5, paddingTop: 3 },
});
