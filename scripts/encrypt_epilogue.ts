// scripts/encrypt_epilogue.ts — dev tool. Prints the ciphertext for the
// Delivery epilogue, keyed by the canonical answer, for pasting into
// src/screens/CertificateScreen.tsx. The plaintext lives only in
// solutions.spoilers.ts. Run: npx tsx scripts/encrypt_epilogue.ts

import { answerKey, encryptWithKey } from '../src/engine/cipher';
import { DELIVERY_EPILOGUE, DELIVERY_SOLUTION } from '../solutions.spoilers';

console.log(encryptWithKey(DELIVERY_EPILOGUE, answerKey(DELIVERY_SOLUTION)));
