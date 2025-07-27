// Security utilities for protecting the application from inspection and unauthorized access

export const initializeSecurityProtections = () => {
  // Function to check if element is in an inbox area
  const isInInboxArea = (element: Element | null): boolean => {
    if (!element) return false;
    
    // Allow selection in elements with these classes or data attributes
    const allowedSelectors = [
      '.email-content-area',      // Main email content
      '.inbox-selectable',        // Explicitly marked inbox areas
      '.otp-code',               // OTP codes
      '[data-allow-selection="true"]', // Elements explicitly allowing selection
    ];
    
    // Check if the element or any parent has allowed classes
    let current: Element | null = element;
    while (current && current !== document.body) {
      // Check class names and data attributes
      if (allowedSelectors.some(selector => {
        if (selector.startsWith('.')) {
          return current!.classList && current!.classList.contains(selector.slice(1));
        } else if (selector.startsWith('[data-')) {
          const attr = selector.slice(1, -1).split('=')[0];
          return current!.hasAttribute && current!.hasAttribute(attr);
        }
        return false;
      })) {
        return true;
      }
      current = current.parentElement;
    }
    
    return false;
  };

  // Selective right-click context menu disable
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as Element;
    
    // Allow right-click in inbox areas for copying
    if (isInInboxArea(target)) {
      return true;
    }
    
    e.preventDefault();
    return false;
  });

  // Selective text selection disable
  document.addEventListener('selectstart', (e) => {
    const target = e.target as Element;
    
    // Allow text selection in inbox areas
    if (isInInboxArea(target)) {
      return true;
    }
    
    e.preventDefault();
    return false;
  });

  // Selective drag and drop disable
  document.addEventListener('dragstart', (e) => {
    const target = e.target as Element;
    
    // Allow drag only for specific inbox content (like copying text)
    if (isInInboxArea(target)) {
      return true;
    }
    
    e.preventDefault();
    return false;
  });

  // Block common developer tools shortcuts
  document.addEventListener('keydown', (e) => {
    const target = e.target as Element;
    
    // Allow copy shortcuts in inbox areas
    if (isInInboxArea(target)) {
      // Allow Ctrl+C (copy), Ctrl+A (select all) in inbox
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A')) {
        return true;
      }
    }
    
    // Block F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+Shift+I (Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+Shift+C (Element selector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+U (View source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+S (Save page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+A (Select all) in non-inbox contexts
    if (e.ctrlKey && e.key === 'a' && !isInInboxArea(target)) {
      e.preventDefault();
      return false;
    }
  });

  // Detect developer tools by checking for console debugging
  const devtools = {
    open: false,
  };

  setInterval(() => {
    if (window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        console.log('%cDeveloper tools detected!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cFor security reasons, developer tools are disabled on this site.', 'color: red; font-size: 16px;');
        // Optionally redirect or take other actions
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Additional console protection
  const originalLog = console.log;
  console.log = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Developer tools detected')) {
      originalLog.apply(console, args);
    }
    // Suppress other console logs in production
  };

  // Disable console in production
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
};

// Function to protect sensitive API calls
export const secureApiCall = async (url: string, options?: RequestInit) => {
  // Remove any sensitive headers or data that shouldn't be exposed
  const secureOptions = {
    ...options,
    // Add security headers
    headers: {
      ...options?.headers,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  // Don't log API calls in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('API Call:', url);
  }

  return fetch(url, secureOptions);
};

// Obfuscate sensitive data in error messages
export const sanitizeError = (error: unknown): string => {
  if (error instanceof Error) {
    // Remove any potential sensitive information from error messages
    let message = error.message;
    
    // Remove URLs that might contain sensitive info
    message = message.replace(/https?:\/\/[^\s]+/g, '[URL_REDACTED]');
    
    // Remove email addresses
    message = message.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL_REDACTED]');
    
    // Remove API keys or tokens
    message = message.replace(/[a-zA-Z0-9]{32,}/g, '[TOKEN_REDACTED]');
    
    return message;
  }
  
  return 'An unexpected error occurred';
};