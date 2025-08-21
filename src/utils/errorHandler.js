// Global Error Handler for Vue
// Handles all errors gracefully without breaking the app

export function setupErrorHandler(app) {
  // Vue error handler
  app.config.errorHandler = (err, vm, info) => {
    console.warn('⚠️ Vue Error:', err.message);
    console.warn('⚠️ Component:', vm?.$options?.name || 'Unknown');
    console.warn('⚠️ Info:', info);
    
    // Don't break the app for common errors
    if (err.message.includes('Cannot read properties of null') ||
        err.message.includes('Cannot set properties of null') ||
        err.message.includes('is not defined') ||
        err.message.includes('is not a function') ||
        err.message.includes('Web3') ||
        err.message.includes('firebase') ||
        err.message.includes('SystemLogicCore')) {
      return; // Prevent error from breaking the app
    }
  };

  // Global error handler
  window.addEventListener('error', (event) => {
    const error = event.error;
    const message = error ? error.message : event.message;
    
    console.warn('⚠️ Global Error:', message);
    
    // Don't break the page for common errors
    if (message) {
      if (message.includes('Cannot read properties of null') || 
          message.includes('Cannot set properties of null') ||
          message.includes('addEventListener')) {
        console.warn('⚠️ DOM element not found, skipping...');
        return false; // Prevent default error handling
      }
      
      if (message.includes('is not defined') || 
          message.includes('is not a function')) {
        console.warn('⚠️ Function or variable not available, skipping...');
        return false; // Prevent default error handling
      }
      
      if (message.includes('Web3 is not loaded') || 
          message.includes('Web3Modal not found') ||
          message.includes('Web3 is not defined')) {
        console.warn('⚠️ Web3 not available, skipping blockchain features...');
        return false; // Prevent default error handling
      }
      
      if (message.includes('firebase') && 
          (message.includes('is not a function') || message.includes('not defined'))) {
        console.warn('⚠️ Firebase not available, skipping Firebase features...');
        return false; // Prevent default error handling
      }
      
      if (message.includes('SystemLogicCore is not defined')) {
        console.warn('⚠️ SystemLogicCore not available, skipping...');
        return false; // Prevent default error handling
      }
      
      if (message.includes('collection') && message.includes('null')) {
        console.warn('⚠️ Firebase collection not available, skipping...');
        return false; // Prevent default error handling
      }
    }
    
    return true; // Allow default error handling for other errors
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason ? reason.message : 'Unknown promise rejection';
    
    console.warn('⚠️ Unhandled promise rejection:', message);
    
    // Don't break the page for common promise rejections
    if (message) {
      if (message.includes('firebase') || 
          message.includes('Web3') || 
          message.includes('SystemLogicCore') ||
          message.includes('collection') ||
          message.includes('storage') ||
          message.includes('auth')) {
        console.warn('⚠️ Service not available, skipping...');
        event.preventDefault(); // Prevent default error handling
        return;
      }
    }
  });

  // Override console.error to be less aggressive
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Don't show certain errors as errors
    if (message.includes('Cannot read properties of null') ||
        message.includes('Cannot set properties of null') ||
        message.includes('is not defined') ||
        message.includes('is not a function') ||
        message.includes('Web3 is not loaded') ||
        message.includes('Web3Modal not found') ||
        message.includes('firebase') ||
        message.includes('SystemLogicCore')) {
      console.warn('⚠️', ...args);
      return;
    }
    
    // Call original console.error for real errors
    originalConsoleError.apply(console, args);
  };

  console.log('✅ Error handler setup complete');
}

// Safe function wrapper
export function safeExecute(func, fallback = null) {
  try {
    return func();
  } catch (error) {
    console.warn('⚠️ Function execution failed:', error.message);
    if (fallback) {
      return fallback();
    }
    return null;
  }
}

// Safe async function wrapper
export async function safeExecuteAsync(func, fallback = null) {
  try {
    return await func();
  } catch (error) {
    console.warn('⚠️ Async function execution failed:', error.message);
    if (fallback) {
      return await fallback();
    }
    return null;
  }
}

// Safe DOM manipulation
export function safeSetTextContent(selector, text) {
  try {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
      return true;
    }
    return false;
  } catch (error) {
    console.warn('⚠️ Failed to set text content:', error.message);
    return false;
  }
}

// Safe event listener addition
export function safeAddEventListener(selector, event, handler) {
  try {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener(event, handler);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('⚠️ Failed to add event listener:', error.message);
    return false;
  }
}
