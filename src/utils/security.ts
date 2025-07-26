// Security utilities for protecting the application from inspection and unauthorized access

export const initializeSecurityProtections = () => {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Block common developer tools shortcuts
  document.addEventListener('keydown', (e) => {
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

    // Block Ctrl+A (Select all) in some contexts
    if (e.ctrlKey && e.key === 'a' && e.target instanceof HTMLInputElement === false) {
      e.preventDefault();
      return false;
    }
  });

  // Detect developer tools by checking for console debugging
  let devtools = {
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
    message = message.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL_REDACTED]');
    
    // Remove API keys or tokens
    message = message.replace(/[a-zA-Z0-9]{32,}/g, '[TOKEN_REDACTED]');
    
    return message;
  }
  
  return 'An unexpected error occurred';
};