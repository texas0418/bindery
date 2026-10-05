// src/revenuecat.ts
// RevenueCat config for The Bindery. All three store keys are live: App
// Store, Play Store, and Amazon Appstore (RevenueCat app appdb9b4bf46a,
// created 2026-10-05). proAccess.ts still fails OPEN on any placeholder,
// which is why a placeholder here would silently give the book away.
//
// The SDK keys below are PUBLIC keys: they are designed to ship inside the
// app bundle and identify the app to RevenueCat. They grant no dashboard
// access and are not secrets (unlike a secret API key, which must never
// appear in this repo).
//
// Store selection is a BUILD-TIME flag: EXPO_PUBLIC_STORE=amazon in the
// environment when Metro bundles (scripts/build-amazon-apk.sh sets it).
// Unset, every build is a Play build, so nothing changes for the existing
// pipeline. The Amazon billing library already ships in every Android
// build via purchases-hybrid-common; the flag only decides which store the
// SDK talks to at configure time.

import { Platform } from 'react-native';

export const ENTITLEMENT_ID = 'entry';
export const PRODUCT_ID = 'bindery_unwriting_unlock';

const IOS_KEY = 'appl_dDCXOMnsGwQyhGpdUggbveqGFse';
const ANDROID_KEY = 'goog_uORWPRIqtYDXphYCoTZpDvGenNe';
const AMAZON_KEY = 'amzn_WXWZsksllardGPPtaENHUVahIAw';

export const IS_AMAZON_BUILD = process.env.EXPO_PUBLIC_STORE === 'amazon';

export const keyForPlatform = (): string => {
  if (Platform.OS !== 'android') return IOS_KEY;
  return IS_AMAZON_BUILD ? AMAZON_KEY : ANDROID_KEY;
};

export const isPlaceholderKey = (key: string): boolean =>
  key.includes('PLACEHOLDER');
