// src/revenuecat.ts
// RevenueCat config for The Bindery. The iOS key is live (project "The
// Bindery", App Store app com.bindery.game); Android stays a placeholder
// until there is a Play listing, and proAccess.ts fails OPEN on any
// placeholder — so an Android build never gates.
//
// The SDK key below is a PUBLIC key: it is designed to ship inside the app
// bundle and identifies the app to RevenueCat. It grants no dashboard
// access and is not a secret (unlike a secret API key, which must never
// appear in this repo).

import { Platform } from 'react-native';

export const ENTITLEMENT_ID = 'entry';
export const PRODUCT_ID = 'bindery_unwriting_unlock';

const IOS_KEY = 'appl_dDCXOMnsGwQyhGpdUggbveqGFse';
const ANDROID_KEY = 'REVENUECAT_ANDROID_KEY_PLACEHOLDER';

export const keyForPlatform = (): string =>
  Platform.OS === 'android' ? ANDROID_KEY : IOS_KEY;

export const isPlaceholderKey = (key: string): boolean =>
  key.includes('PLACEHOLDER');
