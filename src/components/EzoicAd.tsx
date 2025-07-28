import { useEffect, useRef } from 'react';
import { displayEzoicAd, initializeEzoic, ezoicConfig } from '@/lib/ezoic-config';

interface EzoicAdProps {
  /**
   * Unique ID for the ad slot (matches adSlots config)
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
  /**
   * Auto-display the ad on mount (default: true)
   */
  autoDisplay?: boolean;
}

/**
 * EzoicAd component for displaying Ezoic ads with full integration
 * This component creates proper Ezoic ad slots and calls ezstandalone.display()
 */
const EzoicAd: React.FC<EzoicAdProps> = ({ 
  id, 
  className = '', 
  style = {},
  size = 'banner',
  autoDisplay = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef(false);

  useEffect(() => {
    // Initialize Ezoic if not already done
    initializeEzoic();
    
    // Display the ad automatically if enabled
    if (autoDisplay && !displayedRef.current) {
      // Small delay to ensure Ezoic scripts are loaded
      const timer = setTimeout(() => {
        displayEzoicAd(id);
        displayedRef.current = true;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [id, autoDisplay]);

  // Generate Ezoic-compatible ID from our slot ID
  const ezoicId = `div-gpt-ad-${ezoicConfig.domain.replace('.', '_')}-${id.replace('bravomail-', '')}-0`;

  return (
    <div 
      ref={adRef}
      id={ezoicId}
      className={`ezoic-ad ezoic-ad-${size} ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        ...style
      }}
      data-ezoic-ad-type={size}
      data-ad-slot={id}
      data-ezoic-slot={ezoicId}
      role="banner"
      aria-label={`Advertisement ${size}`}
    >
      {ezoicConfig.testMode && (
        <div 
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            margin: '10px 0',
            backgroundColor: '#f9f9f9',
            color: '#666',
            fontSize: '14px'
          }}
        >
          [Ezoic Ad Placeholder - {size}]<br />
          ID: {ezoicId}<br />
          Slot: {id}
        </div>
      )}
    </div>
  );
};

export default EzoicAd;