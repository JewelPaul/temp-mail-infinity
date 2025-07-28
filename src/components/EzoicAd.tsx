import { useEffect, useRef } from 'react';
import { refreshEzoicAds, initializeEzoic } from '@/lib/ezoic-config';

interface EzoicAdProps {
  /**
   * Unique ID for the ad slot
   */
  id: string;
  /**
   * CSS class names for styling
   */
  className?: string;
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  /**
   * Ad slot size/type - can be used for responsive design
   */
  size?: 'banner' | 'leaderboard' | 'rectangle' | 'skyscraper';
}

/**
 * EzoicAd component for displaying Ezoic ads
 * This component creates a placeholder that Ezoic can use to inject ads
 */
const EzoicAd: React.FC<EzoicAdProps> = ({ 
  id, 
  className = '', 
  style = {},
  size = 'banner'
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Ezoic if not already done
    initializeEzoic();
    
    // Trigger Ezoic ad refresh when component mounts
    refreshEzoicAds();
  }, []);

  return (
    <div 
      ref={adRef}
      id={id}
      className={`ezoic-ad ${className}`}
      style={style}
      data-ezoic-ad-type={size}
      data-ad-slot={id}
      role="banner"
      aria-label={`Advertisement ${size}`}
    >
      {/* Ezoic will inject ads here */}
    </div>
  );
};

export default EzoicAd;

// Extend Window interface to include Ezoic globals
declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      refresh: () => void;
    };
  }
}