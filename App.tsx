import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// Hold the binding on screen long enough to read (walkthrough QA
// 2026-08-02: the stock splash was a flash). The app is ready long before
// this; the pause is ceremony, the fade is the cover opening.
SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ duration: 450, fade: true });
const SPLASH_HOLD_MS = 2250;

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
import DamageLogScreen from './src/screens/DamageLogScreen';
import IntroScreen from './src/screens/IntroScreen';
import PageScreen from './src/screens/PageScreen';
import WorkbenchScreen from './src/screens/WorkbenchScreen';

type ViewState =
  | { t: 'bench' } // the open book: every page browsable from intake
  | { t: 'page'; id: number }
  | { t: 'log' };

function Root() {
  useWorldVersion();
  const [view, setView] = useState<ViewState>({ t: 'bench' });

  if (!hasFlag('introDone')) return <IntroScreen />;

  const toBench = () => setView({ t: 'bench' });

  // The bench stays mounted beneath overlays so scroll position survives
  // (device QA 2026-08-01) — you don't close the book to look at a page.
  return (
    <View style={{ flex: 1 }}>
      <WorkbenchScreen
        onOpenPage={(id) => setView({ t: 'page', id })}
        onOpenLog={() => setView({ t: 'log' })}
      />
      {view.t === 'page' && (
        <View style={StyleSheet.absoluteFill}>
          <PageScreen id={view.id} onBack={toBench} />
        </View>
      )}
      {view.t === 'log' && (
        <View style={StyleSheet.absoluteFill}>
          <DamageLogScreen onBack={toBench} />
        </View>
      )}
    </View>
  );
}

export default function App() {
  // Lazy one-time init: sqlite is sync, purchases guards itself. Doing it in
  // the state initializer keeps the first frame correct without an effect.
  const [ready] = useState(() => {
    initState();
    initPurchases(); // fail-open: unlocks the entry in Expo Go / placeholder builds
    return true;
  });
  useEffect(() => {
    const t = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, SPLASH_HOLD_MS);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <>
      <StatusBar style="light" />
      <Root />
    </>
  );
}
