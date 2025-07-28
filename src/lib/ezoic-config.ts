/**
 * Ezoic Integration Configuration
 * This file contains configuration and utilities for Ezoic ads integration
 * Updated for bravomail.email domain with full ad display functionality
 */

export interface EzoicConfig {
  siteId: string;
  domain: string;
  testMode: boolean;
  adRefreshInterval: number;
  enableConsent: boolean;
  enableDebug: boolean;
}

export const ezoicConfig: EzoicConfig = {
  // Ezoic site ID for bravomail.email
  siteId: 'bravomail',
  
  // Domain configuration
  domain: 'bravomail.email',
  
  // Enable test mode for development
  testMode: process.env.NODE_ENV === 'development',
  
  // Ad refresh interval in milliseconds (30 seconds)
  adRefreshInterval: 30000,
  
  // Enable GDPR consent management
  enableConsent: true,
  
  // Enable debug mode for development
  enableDebug: process.env.NODE_ENV === 'development'
};

/**
 * Ad slot configurations for different placements
 * Updated with proper Ezoic ad unit IDs
 */
export const adSlots = {
  header: {
    id: 'bravomail-header-leaderboard',
    ezoicId: 'div-gpt-ad-bravomail_email-header-0',
    size: 'leaderboard' as const,
    dimensions: '728x90',
    minHeight: '120px',
    description: 'Header leaderboard ad - 728x90'
  },
  main: {
    id: 'bravomail-main-banner', 
    ezoicId: 'div-gpt-ad-bravomail_email-main-0',
    size: 'banner' as const,
    dimensions: '728x250',
    minHeight: '280px',
    description: 'Main content banner ad - 728x250'
  },
  footer: {
    id: 'bravomail-footer-rectangle',
    ezoicId: 'div-gpt-ad-bravomail_email-footer-0', 
    size: 'rectangle' as const,
    dimensions: '300x250',
    minHeight: '280px',
    description: 'Footer rectangle ad - 300x250'
  },
  sidebar: {
    id: 'bravomail-sidebar-skyscraper',
    ezoicId: 'div-gpt-ad-bravomail_email-sidebar-0',
    size: 'skyscraper' as const,
    dimensions: '160x600',
    minHeight: '620px',
    description: 'Sidebar skyscraper ad - 160x600'
  }
} as const;

// Extend Window interface for Ezoic globals
declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      define: (id: string, size: string[]) => void;
      display: (id: string) => void;
      showAds: (ids?: string[]) => void;
      refresh: (ids?: string[]) => void;
      destroyPlaceholders: (ids?: string[]) => void;
      enabled: boolean;
    };
    __ez?: {
      evt: {
        add: (element: HTMLElement, event: string, callback: () => void) => void;
      };
    };
    __ez_addPlacements?: (placements: Array<{
      slotName: string;
      slotId: string;
      sizes: string[];
    }>) => void;
  }
}

/**
 * Utility function to check if Ezoic is loaded and available
 */
export const isEzoicLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         window.ezstandalone !== undefined && 
         typeof window.ezstandalone.cmd !== 'undefined';
};

/**
 * Initialize Ezoic ad slot and display it
 */
export const displayEzoicAd = (slotId: string): void => {
  if (typeof window === 'undefined') return;

  try {
    if (isEzoicLoaded() && window.ezstandalone) {
      window.ezstandalone.cmd.push(() => {
        // Find the ad slot configuration
        const slot = Object.values(adSlots).find(s => s.id === slotId || s.ezoicId === slotId);
        if (slot) {
          // Define the ad slot with Ezoic
          const sizes = slot.dimensions.split('x');
          window.ezstandalone?.define(slot.ezoicId, [slot.dimensions]);
          
          // Display the ad
          window.ezstandalone?.display(slot.ezoicId);
        }
      });
    }
  } catch (error) {
    if (ezoicConfig.enableDebug) {
      console.debug('Ezoic ad display error:', error);
    }
  }
};

/**
 * Show multiple ads at once for efficiency
 */
export const showEzoicAds = (slotIds?: string[]): void => {
  if (typeof window === 'undefined') return;

  try {
    if (isEzoicLoaded() && window.ezstandalone?.showAds) {
      if (slotIds) {
        // Convert slot IDs to Ezoic IDs
        const ezoicIds = slotIds.map(id => {
          const slot = Object.values(adSlots).find(s => s.id === id);
          return slot?.ezoicId || id;
        });
        window.ezstandalone.showAds(ezoicIds);
      } else {
        // Show all ads
        window.ezstandalone.showAds();
      }
    }
  } catch (error) {
    if (ezoicConfig.enableDebug) {
      console.debug('Ezoic showAds error:', error);
    }
  }
};

/**
 * Refresh ads for SPA or dynamic content
 */
export const refreshEzoicAds = (slotIds?: string[]): void => {
  if (typeof window === 'undefined') return;

  try {
    if (isEzoicLoaded() && window.ezstandalone?.refresh) {
      if (slotIds) {
        const ezoicIds = slotIds.map(id => {
          const slot = Object.values(adSlots).find(s => s.id === id);
          return slot?.ezoicId || id;
        });
        window.ezstandalone.refresh(ezoicIds);
      } else {
        window.ezstandalone.refresh();
      }
    }
  } catch (error) {
    if (ezoicConfig.enableDebug) {
      console.debug('Ezoic refresh error:', error);
    }
  }
};

/**
 * Destroy ad placeholders (useful for SPA navigation)
 */
export const destroyEzoicAds = (slotIds?: string[]): void => {
  if (typeof window === 'undefined') return;

  try {
    if (isEzoicLoaded() && window.ezstandalone?.destroyPlaceholders) {
      if (slotIds) {
        const ezoicIds = slotIds.map(id => {
          const slot = Object.values(adSlots).find(s => s.id === id);
          return slot?.ezoicId || id;
        });
        window.ezstandalone.destroyPlaceholders(ezoicIds);
      } else {
        window.ezstandalone.destroyPlaceholders();
      }
    }
  } catch (error) {
    if (ezoicConfig.enableDebug) {
      console.debug('Ezoic destroy error:', error);
    }
  }
};

/**
 * Initialize Ezoic integration with full functionality
 */
export const initializeEzoic = (): void => {
  if (typeof window === 'undefined') return;

  // Initialize Ezoic command queue if not exists
  if (!window.ezstandalone) {
    window.ezstandalone = {
      cmd: [],
      define: () => console.debug('Ezoic define called (development mode)'),
      display: () => console.debug('Ezoic display called (development mode)'),
      showAds: () => console.debug('Ezoic showAds called (development mode)'),
      refresh: () => console.debug('Ezoic refresh called (development mode)'),
      destroyPlaceholders: () => console.debug('Ezoic destroyPlaceholders called (development mode)'),
      enabled: !ezoicConfig.testMode
    };
  }

  // Setup debug mode if enabled
  if (ezoicConfig.enableDebug && typeof URLSearchParams !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ez_js_debugger') === '1') {
      console.log('Ezoic JavaScript Integration Debugger enabled');
    }
  }

  // Log integration status
  if (ezoicConfig.testMode) {
    console.debug('Ezoic integration initialized for', ezoicConfig.domain);
    console.debug('Site ID:', ezoicConfig.siteId);
    console.debug('Available ad slots:', Object.keys(adSlots));
  }
};