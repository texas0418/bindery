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

// Play review 2026-10-02 rejected vc2 frozen on this splash ("app does not
// open or load"). The ceremonial hide lives in a React effect, so anything
// that kills the first render leaves the native splash up forever. This
// module-scope failsafe owes nothing to the component tree: past this point
// the player sees the bench or the offline card, never a stuck cover.
const SPLASH_FAILSAFE_MS = 6000;
setTimeout(() => {
  SplashScreen.hideAsync().catch(() => {});
}, SPLASH_FAILSAFE_MS);

// Dynamic Type ceilings live in theme.ts (TYPE_CAPS) and are applied as
// explicit maxFontSizeMultiplier props per surface — Text.defaultProps is
// silently DEAD under React 19 (caught in the 2026-08-02 max-type sweep:
// the "global cap" did nothing and AX sizes scaled unbounded).

import { initPurchases } from './src/proAccess';
import { hasFlag, initState, useWorldVersion } from './src/state';
import CertificateScreen from './src/screens/CertificateScreen';
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
          {view.id === 28 ? (
            // Page 28 is the certificate — the choice, not a puzzle.
            <CertificateScreen onBack={toBench} />
          ) : (
            <PageScreen id={view.id} onBack={toBench} />
          )}
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
  // A failed init must not take the tree down with it (the pre-failsafe
  // freeze): the player gets the workstation's own outage card instead.
  const [ready] = useState(() => {
    try {
      initState();
      initPurchases(); // fail-open: unlocks the entry in Expo Go / placeholder builds
      return true;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const t = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, SPLASH_HOLD_MS);
    return () => clearTimeout(t);
  }, []);
  if (!ready) {
    return (
      <View style={offlineStyles.room}>
        <StatusBar style="light" />
        <Text style={offlineStyles.heading}>BINDERY WORKSTATION</Text>
        <Text style={offlineStyles.body}>
          LOCAL STORE UNAVAILABLE. CLOSE THE APP AND REOPEN IT; THE BENCH
          RESUMES WHERE YOU LEFT IT.
        </Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <Root />
    </>
  );
}

const offlineStyles = StyleSheet.create({
  room: {
    flex: 1,
    backgroundColor: '#17191c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  heading: {
    color: '#9aa3ad',
    fontFamily: 'Menlo',
    fontSize: 13,
    letterSpacing: 3,
    marginBottom: 16,
  },
  body: {
    color: '#6e767f',
    fontFamily: 'Menlo',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 320,
  },
});
