# Consent Modes and GDPR Compliance

This document explains the different consent banner modes available in the consent manager and their implications for GDPR compliance.

## Banner Modes

### Blocking Mode (Default)

```jsx
<ConsentManager bannerMode="blocking" />
```

The banner appears as a full-screen overlay that prevents interaction with the underlying page until the user makes a consent choice.

**Characteristics:**

- Full-screen semi-transparent overlay
- User cannot scroll or interact with the page
- Forces an explicit consent decision before browsing
- Most conservative approach for compliance

### Floating Mode

```jsx
<ConsentManager bannerMode="floating" />
```

The banner appears as a floating element in the corner of the screen, allowing users to browse the site before making a consent decision.

**Characteristics:**

- Non-intrusive corner positioning (bottom-right on desktop, bottom bar on mobile)
- User can scroll and interact with the page
- No tracking occurs until explicit consent is given
- Better user experience, still GDPR-compliant when configured correctly

## GDPR Compliance Requirements

Under GDPR, valid consent for non-essential cookies must be:

1. **Freely given** - User must have a genuine choice without detriment
2. **Specific** - Consent must be given for each specific purpose
3. **Informed** - User must understand what they're consenting to
4. **Unambiguous** - Requires a clear affirmative action

### What This Means in Practice

| Requirement  | How to Comply                                                    |
| ------------ | ---------------------------------------------------------------- |
| Freely given | Don't block essential site functionality based on consent choice |
| Specific     | Use category-based consent (marketing, functional, advertising)  |
| Informed     | Provide clear descriptions of what each category does            |
| Unambiguous  | Require explicit button click - not just browsing/scrolling      |

## The `implyConsentOnInteraction` Prop

```jsx
<ConsentManager implyConsentOnInteraction={true} />
```

This prop treats any click outside the consent banner as implicit acceptance of all cookies.

### GDPR Compliance Warning

**This prop is NOT GDPR-compliant for non-essential cookies.**

The European Data Protection Board (EDPB) has explicitly stated that:

> "Actions such as scrolling or swiping through a webpage or similar user activity will not under any circumstances satisfy the requirement of a clear and affirmative action."

— EDPB Guidelines 05/2020 on consent under Regulation 2016/679

### When `implyConsentOnInteraction` May Be Appropriate

- Sites not subject to GDPR (non-EU users only)
- Jurisdictions with less strict consent requirements
- After explicit legal review and risk assessment
- For truly essential/functional cookies only (though these don't require consent)

### Recommended Configuration for GDPR Compliance

```jsx
<ConsentManager
  bannerMode="floating" // Non-intrusive but visible
  implyConsentOnInteraction={false} // Require explicit consent (default)
  showRejectAll={true} // Give users a clear way to decline
/>
```

## Pre-Consent Tracking Behaviour

When using `bannerMode="floating"`, users can browse before consenting. During this pre-consent period:

| Tracking Type                     | Behaviour               | GDPR Status |
| --------------------------------- | ----------------------- | ----------- |
| Analytics (Segment, GA, etc.)     | **Not loaded**          | Compliant   |
| Advertising pixels                | **Not loaded**          | Compliant   |
| Functional cookies                | **Not loaded**          | Compliant   |
| Essential cookies (session, CSRF) | Allowed without consent | Compliant   |

The consent manager follows a "no tracking until consent" approach, which is the safest default for GDPR compliance.

## Summary

| Configuration                                                | User Experience                       | GDPR Compliant | Recommended For              |
| ------------------------------------------------------------ | ------------------------------------- | -------------- | ---------------------------- |
| `bannerMode="blocking"`                                      | Must decide before browsing           | Yes            | Maximum compliance certainty |
| `bannerMode="floating"`                                      | Can browse, explicit consent required | Yes            | Better UX with compliance    |
| `bannerMode="floating"` + `implyConsentOnInteraction={true}` | Browsing implies consent              | **No**         | Non-EU sites only            |

## Can You Track Before Consent? (Pre-Consent Analytics)

A common question is whether you can collect any analytics data before users consent. The short answer: **it depends on the tool and method**.

### The ePrivacy Directive Blocker

Even if you claim "legitimate interest" under GDPR, the **ePrivacy Directive (Article 5(3))** requires consent for storing or accessing information on user devices. This means:

- Cookies = consent required
- LocalStorage = consent required
- Device fingerprinting = consent required

This applies regardless of your GDPR legal basis.

### Path 1: Cookie-Free Anonymous Analytics (No Consent Required)

Some privacy-focused analytics tools can run without consent because they:

| Requirement              | Implementation                                 |
| ------------------------ | ---------------------------------------------- |
| No cookies               | Server-side session handling only              |
| No persistent IDs        | Hash-based pseudonymization with rotating keys |
| Immediate anonymization  | Data anonymized within 24 hours                |
| No cross-device tracking | Each session treated independently             |
| Aggregated data only     | No individual user profiles                    |

**Tools that qualify:**

- [Plausible Analytics](https://plausible.io/data-policy) - Open source, EU-hosted
- [Fathom Analytics](https://usefathom.com/why-fathom-analytics/cookieless-analytics) - Cookieless by design
- [Simple Analytics](https://www.simpleanalytics.com/) - No personal data collected

These can run alongside your consent manager, providing basic metrics while users browse pre-consent.

### Path 2: Legitimate Interest (Limited & Risky)

Under GDPR Article 6(1)(f), you might claim legitimate interest for analytics, but only if:

1. **No device storage used** (no cookies, localStorage, etc.)
2. **Purpose limited to "reach measurement"** (page views, not user behaviour)
3. **Legitimate Interests Assessment (LIA) conducted**
4. **Data minimised and anonymised immediately**
5. **No data transfers outside EU** (or adequate safeguards in place)

**This does NOT apply to:**

- Google Analytics (uses cookies, transfers to US)
- Segment (uses persistent identifiers)
- Any advertising or retargeting tracking
- Cross-session user profiling

### Why Segment Requires Consent

This consent manager is built for Segment, which:

- Uses cookies/identifiers for user tracking
- Transfers data to US servers
- Enables individual user analytics and profiling

Therefore, **Segment-based tracking always requires explicit consent** under GDPR.

### Hybrid Approach (Recommended)

For the best balance of insights and compliance:

```
Pre-consent: Privacy-first analytics (Plausible, Fathom, etc.)
             └─ Basic page views, referrers, device types
             └─ No consent required
             └─ Runs immediately on page load

Post-consent: Full Segment tracking
              └─ Detailed user analytics
              └─ Advertising pixels
              └─ Only after explicit consent
```

This gives you:

- Immediate insights into all traffic
- Full analytics for consenting users
- Complete GDPR compliance

## Further Reading

- [EDPB Guidelines on Consent](https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)
- [ICO Guidance on Cookies](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/)
- [CNIL Cookie Guidelines](https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines)
- [Plausible: Legal Assessment for GDPR Compliance](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)
- [TermsFeed: Consent vs Legitimate Interest](https://www.termsfeed.com/blog/gdpr-user-consent-legitimate-interest/)
