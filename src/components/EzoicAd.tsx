import { useEffect, useRef } from 'react';

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
}

/**
 * EzoicAd component for displaying Ezoic ads
 * This component creates a placeholder that Ezoic can use to inject ads
 */
const EzoicAd: React.FC<EzoicAdProps> = ({ id, className = '', style = {} }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger Ezoic ad refresh when component mounts
    if (window.ezstandalone && typeof window.ezstandalone.cmd !== 'undefined') {
      window.ezstandalone.cmd.push(() => {
        window.ezstandalone.refresh();
      });
    }
  }, []);

  return (
    <div 
      ref={adRef}
      id={id}
      className={`ezoic-ad ${className}`}
      style={style}
      data-ezoic-ad-type="banner"
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