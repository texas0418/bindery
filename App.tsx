import { useState } from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Global safety ceiling: honor Dynamic Type but never let the workstation's
// fixed chrome collapse. Puzzle-critical scan content caps NOWHERE — doctrine
// 11: ciphertext must be fully legible at max text size (QA'd on device).
type TextWithDefaults = typeof Text & {
  defaultProps?: { maxFontSizeMultiplier?: number };
};
const T = Text as TextWithDefaults;
T.defaultProps = { ...T.defaultProps, maxFontSizeMultiplier: 1.4 };

import { initPurchases } from './src/proAccess';
import { hasFlag, initState, useWorldVersion } from './src/state';
import IntroScreen from './src/screens/IntroScreen';
import PageScreen from './src/screens/PageScreen';
import WorkbenchScreen from './src/screens/WorkbenchScreen';

type View =
  | { t: 'bench' } // the open book: every page browsable from intake
  | { t: 'page'; id: number };

function Root() {
  useWorldVersion();
  const [view, setView] = useState<View>({ t: 'bench' });

  if (!hasFlag('introDone')) return <IntroScreen />;

  if (view.t === 'page')
    return <PageScreen id={view.id} onBack={() => setView({ t: 'bench' })} />;
  return <WorkbenchScreen onOpenPage={(id) => setView({ t: 'page', id })} />;
}

export default function App() {
  // Lazy one-time init: sqlite is sync, purchases guards itself. Doing it in
  // the state initializer keeps the first frame correct without an effect.
  const [ready] = useState(() => {
    initState();
    initPurchases(); // fail-open: unlocks the entry in Expo Go / placeholder builds
    return true;
  });
  if (!ready) return null;
  return (
    <>
      <StatusBar style="light" />
      <Root />
    </>
  );
}
