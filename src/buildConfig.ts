// src/buildConfig.ts
// Pure module. The one switch that separates a tester's build from a
// shipping one.
//
// QA_BUILD relaxes the two irreversible things about the ending so a single
// tester can see all three without replaying the book: Blank's secure
// deletion is simulated (data retained) and the signature can be re-chosen.
// Both of those would be lies in a shipping build — the Blank ending's whole
// meaning is that it costs you the thing you restored.
//
// It MUST be false in anything that reaches the App Store. test-content
// asserts that, so a QA build cannot ship by accident; flip it locally for a
// device QA pass and never commit it true.

export const QA_BUILD = false;
