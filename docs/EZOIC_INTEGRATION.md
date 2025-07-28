# Ezoic Ads Integration

This document describes the Ezoic ads integration implemented in the BravoMail application.

## Integration Components

### 1. HTML Script Integration

The Ezoic ads integration script has been added to `index.html`:

```html
<!-- Ezoic Ads Integration -->
<script async src="//www.ezojs.com/basicads.js"></script>

<!-- Ezoic Site Verification -->
<meta name="ezoic-site-verification" content="ezoic-verification-placeholder" />
```

**Note**: Replace `ezoic-verification-placeholder` with the actual verification code provided by Ezoic when setting up your site.

### 2. React Component

A reusable `EzoicAd` component has been created at `src/components/EzoicAd.tsx` that provides:

- TypeScript support
- Automatic ad refresh on component mount
- Configurable ad slots with unique IDs
- Responsive styling support

### 3. Usage Example

```tsx
import EzoicAd from "@/components/EzoicAd";

// Basic usage
<EzoicAd id="my-ad-slot" />

// With custom styling
<EzoicAd 
  id="banner-ad" 
  className="w-full max-w-4xl"
  style={{ minHeight: '250px' }}
/>
```

## Setup Instructions

1. **Ezoic Account Setup**: Create an account with Ezoic and add your website
2. **Site Verification**: Replace `ezoic-verification-placeholder` in `index.html` with your actual verification code
3. **Ad Placements**: Use the `EzoicAd` component to place ads throughout your application
4. **Testing**: Ezoic ads will not display in development mode or with ad blockers enabled

## Important Notes

- The integration is designed to be non-intrusive and will not affect site performance
- Ads will only display after Ezoic has approved your site
- The component handles Ezoic's ad refresh mechanism automatically
- All ad placements follow best practices for user experience

## Troubleshooting

- **Ads not showing**: Ensure your site is approved by Ezoic and the verification meta tag is correct
- **Console errors**: Ad-related errors in development are normal due to ad blockers
- **Build issues**: The integration uses standard web APIs and should not affect the build process