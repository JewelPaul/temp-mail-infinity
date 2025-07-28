# Ezoic Ads Integration

This document describes the comprehensive Ezoic ads integration implemented in the BravoMail application.

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

### 2. Ads.txt File

An `ads.txt` file has been created in the `public` directory at `/public/ads.txt`. This file is crucial for programmatic advertising and will be accessible at `https://yourdomain.com/ads.txt`.

**Important**: Replace the placeholder entries in this file with actual values provided by Ezoic support.

### 3. React Components

#### EzoicAd Component

A reusable `EzoicAd` component has been created at `src/components/EzoicAd.tsx` that provides:

- TypeScript support with full type definitions
- Automatic ad refresh on component mount
- Configurable ad slots with unique IDs
- Responsive styling support
- Error handling for development environments
- Accessibility features (ARIA labels)
- Multiple ad size options

#### Configuration System

A comprehensive configuration system has been implemented in `src/lib/ezoic-config.ts` featuring:

- Centralized ad slot management
- Environment-specific settings
- Utility functions for ad management
- Type-safe configuration options

### 4. Ad Placements

The integration includes strategic ad placements:

- **Header Banner**: Leaderboard ad at the top of the page
- **Main Content**: Primary banner ad in the content area
- **Footer Banner**: Rectangle ad at the bottom of the page

### 5. Usage Examples

```tsx
import EzoicAd from "@/components/EzoicAd";
import { adSlots } from "@/lib/ezoic-config";

// Using predefined ad slots
<EzoicAd 
  id={adSlots.header.id}
  className="w-full max-w-5xl"
  style={{ minHeight: adSlots.header.minHeight }}
  size={adSlots.header.size}
/>

// Custom ad placement
<EzoicAd 
  id="custom-ad-slot" 
  className="w-full max-w-4xl"
  style={{ minHeight: '250px' }}
  size="banner"
/>
```

## Setup Instructions

### 1. Ezoic Account Setup
- Create an account with Ezoic and add your website
- Complete the site verification process

### 2. Configuration Updates
- Replace `ezoic-verification-placeholder` in `index.html` with your actual verification code
- Update the `ads.txt` file with entries provided by Ezoic support
- Set your site ID in `src/lib/ezoic-config.ts` if required

### 3. Testing
- Deploy your application
- Verify ads.txt is accessible at `https://yourdomain.com/ads.txt`
- Confirm Ezoic scripts load without errors
- Test ad placements after Ezoic approval

## Technical Features

### Performance Optimization
- Asynchronous script loading to prevent blocking
- Lazy loading of ad components
- Minimal impact on Core Web Vitals

### Development Experience
- Error handling in development mode
- Console debugging information
- TypeScript support throughout

### Production Ready
- Environment-specific configurations
- Proper error boundaries
- Accessibility compliance
- SEO-friendly implementation

## Important Notes

- The integration is designed to be non-intrusive and will not affect site performance
- Ads will only display after Ezoic has approved your site
- The component handles Ezoic's ad refresh mechanism automatically
- All ad placements follow best practices for user experience
- The system supports multiple ad formats and responsive design

## File Structure

```
├── public/
│   └── ads.txt                    # Ads.txt file for programmatic advertising
├── src/
│   ├── components/
│   │   └── EzoicAd.tsx           # Main ad component
│   ├── lib/
│   │   └── ezoic-config.ts       # Configuration and utilities
│   └── pages/
│       └── Index.tsx             # Example usage implementation
├── index.html                     # HTML integration scripts
└── docs/
    └── EZOIC_INTEGRATION.md      # This documentation
```

## Troubleshooting

- **Ads not showing**: Ensure your site is approved by Ezoic and the verification meta tag is correct
- **Console errors**: Ad-related errors in development are normal due to ad blockers
- **Build issues**: The integration uses standard web APIs and should not affect the build process
- **Performance concerns**: All scripts load asynchronously and include proper error handling

## Support

For Ezoic-specific issues, contact Ezoic support with your site details and configuration questions.