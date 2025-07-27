// Utility functions for detecting and handling OTP codes in email content

export interface OTPMatch {
  code: string;
  startIndex: number;
  endIndex: number;
  type: 'numeric' | 'alphanumeric' | 'verification';
}

// Common OTP patterns
const OTP_PATTERNS = [
  // 6-digit numeric codes
  /\b\d{6}\b/g,
  // 4-digit numeric codes  
  /\b\d{4}\b/g,
  // 8-digit numeric codes
  /\b\d{8}\b/g,
  // Alphanumeric codes (letters and numbers, 4-8 characters)
  /\b[A-Z0-9]{4,8}\b/g,
  // Verification codes with common prefixes
  /(?:verification code|access code|security code|confirmation code|auth code|login code|PIN|OTP):\s*([A-Z0-9]{4,8})/gi,
  // Codes in specific formats like "123-456" or "123 456"
  /\b\d{3}[-\s]\d{3}\b/g,
];

// Common OTP context words to help identify legitimate OTP codes
const OTP_CONTEXT_WORDS = [
  'verification', 'verify', 'authenticate', 'confirmation', 'confirm',
  'security', 'access', 'login', 'signin', 'sign-in', 'code',
  'otp', 'pin', 'passcode', 'token', 'temporary', 'expires',
  'valid', 'minutes', 'activate', 'activation'
];

/**
 * Detects OTP codes in text content
 */
export function detectOTPs(text: string): OTPMatch[] {
  const matches: OTPMatch[] = [];
  const lowerText = text.toLowerCase();
  
  // Check if text contains OTP-related context
  const hasOTPContext = OTP_CONTEXT_WORDS.some(word => 
    lowerText.includes(word)
  );
  
  if (!hasOTPContext) {
    return matches;
  }
  
  // Apply patterns to find potential OTP codes
  OTP_PATTERNS.forEach((pattern, index) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const code = match[1] || match[0]; // Use capture group if available
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;
      
      // Filter out obviously non-OTP codes
      if (isLikelyOTP(code, text, startIndex)) {
        matches.push({
          code: code.trim(),
          startIndex,
          endIndex,
          type: determineOTPType(code)
        });
      }
    }
  });
  
  // Remove duplicates and sort by position
  return removeDuplicates(matches).sort((a, b) => a.startIndex - b.startIndex);
}

/**
 * Determines if a potential code is likely a real OTP
 */
function isLikelyOTP(code: string, fullText: string, startIndex: number): boolean {
  // Skip very common numbers that are unlikely to be OTPs
  const commonNumbers = ['1234', '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'];
  if (commonNumbers.includes(code)) {
    return false;
  }
  
  // Skip codes that are part of larger numbers (like years, phone numbers)
  const beforeChar = fullText[startIndex - 1];
  const afterChar = fullText[startIndex + code.length];
  
  if (beforeChar && /\d/.test(beforeChar)) return false;
  if (afterChar && /\d/.test(afterChar)) return false;
  
  // Look for OTP context words near the code (within 50 characters)
  const contextStart = Math.max(0, startIndex - 50);
  const contextEnd = Math.min(fullText.length, startIndex + code.length + 50);
  const context = fullText.slice(contextStart, contextEnd).toLowerCase();
  
  return OTP_CONTEXT_WORDS.some(word => context.includes(word));
}

/**
 * Determines the type of OTP code
 */
function determineOTPType(code: string): 'numeric' | 'alphanumeric' | 'verification' {
  if (/^\d+$/.test(code)) {
    return 'numeric';
  } else if (/^[A-Z0-9]+$/.test(code)) {
    return 'alphanumeric';
  }
  return 'verification';
}

/**
 * Removes duplicate OTP matches
 */
function removeDuplicates(matches: OTPMatch[]): OTPMatch[] {
  const seen = new Set<string>();
  return matches.filter(match => {
    const key = `${match.code}-${match.startIndex}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Wraps OTP codes in HTML with special styling classes
 */
export function highlightOTPs(html: string): string {
  const otps = detectOTPs(html.replace(/<[^>]*>/g, ' ')); // Strip HTML for detection
  
  if (otps.length === 0) {
    return html;
  }
  
  let result = html;
  let offset = 0;
  
  // Sort by position and apply highlights
  otps.forEach(otp => {
    const beforeOTP = result.slice(0, otp.startIndex + offset);
    const afterOTP = result.slice(otp.endIndex + offset);
    
    const wrappedOTP = `<span class="otp-code otp-${otp.type}" data-otp="${otp.code}" title="Click to copy OTP code">${otp.code}</span>`;
    
    result = beforeOTP + wrappedOTP + afterOTP;
    offset += wrappedOTP.length - otp.code.length;
  });
  
  return result;
}

/**
 * Extracts plain text from HTML content
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}