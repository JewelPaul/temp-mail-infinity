/**
 * Ezoic Integration Configuration
 * This file contains configuration and utilities for Ezoic ads integration
 */

export interface EzoicConfig {
  siteId?: string;
  testMode: boolean;
  adRefreshInterval: number;
  placeholders: {
    verificationCode: string;
    publisherId: string;
  };
}

export const ezoicConfig: EzoicConfig = {
  // Set this to your actual Ezoic site ID when available
  siteId: undefined,
  
  // Enable test mode for development
  testMode: process.env.NODE_ENV === 'development',
  
  // Ad refresh interval in milliseconds (default: 30 seconds)
  adRefreshInterval: 30000,
  
  // Placeholder values that should be replaced with actual Ezoic data
  placeholders: {
    verificationCode: 'ezoic-verification-placeholder',
    publisherId: 'pub-example123456789'
  }
};

/**
 * Ad slot configurations for different placements
 */
export const adSlots = {
  header: {
    id: 'bravomail-header-banner',
    size: 'leaderboard' as const,
    minHeight: '120px',
    description: 'Header leaderboard ad'
  },
  main: {
    id: 'bravomail-main-banner',
    size: 'banner' as const,
    minHeight: '250px',
    description: 'Main content banner ad'
  },
  footer: {
    id: 'bravomail-footer-banner',
    size: 'rectangle' as const,
    minHeight: '200px',
    description: 'Footer rectangle ad'
  },
  sidebar: {
    id: 'bravomail-sidebar-banner',
    size: 'skyscraper' as const,
    minHeight: '600px',
    description: 'Sidebar skyscraper ad'
  }
} as const;

/**
 * Utility function to check if Ezoic is loaded and available
 */
export const isEzoicLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         window.ezstandalone !== undefined && 
         typeof window.ezstandalone.cmd !== 'undefined';
};

/**
 * Utility function to safely refresh Ezoic ads
 */
export const refreshEzoicAds = (): void => {
  try {
    if (isEzoicLoaded() && window.ezstandalone?.refresh) {
      window.ezstandalone.refresh();
    }
  } catch (error) {
    console.debug('Ezoic ad refresh error (normal in development):', error);
  }
};

/**
 * Initialize Ezoic integration
 */
export const initializeEzoic = (): void => {
  if (typeof window === 'undefined') return;

  // Add Ezoic command queue if not exists
  if (!window.ezstandalone) {
    window.ezstandalone = {
      cmd: [],
      refresh: () => console.debug('Ezoic refresh called (development mode)')
    };
  }

  // Log integration status in development
  if (ezoicConfig.testMode) {
    console.debug('Ezoic integration initialized in test mode');
  }
};