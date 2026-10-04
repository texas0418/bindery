// src/revenuecat.ts
// RevenueCat config for The Bindery. The iOS key is live (project "The
// Bindery", App Store app com.bindery.game); the Play key is live. The
// Amazon key stays a placeholder until the app exists in the Amazon
// developer console, and proAccess.ts fails OPEN on any placeholder — so
// an Amazon build never gates.
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
const AMAZON_KEY = 'amzn_PLACEHOLDER';

export const IS_AMAZON_BUILD = process.env.EXPO_PUBLIC_STORE === 'amazon';

export const keyForPlatform = (): string => {
  if (Platform.OS !== 'android') return IOS_KEY;
  return IS_AMAZON_BUILD ? AMAZON_KEY : ANDROID_KEY;
};

export const isPlaceholderKey = (key: string): boolean =>
  key.includes('PLACEHOLDER');
