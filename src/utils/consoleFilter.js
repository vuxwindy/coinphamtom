// Console Filter - Ẩn lỗi Chrome Extension
// Giúp tập trung vào lỗi thực sự của ứng dụng

export function setupConsoleFilter() {
  // Setting up console filter...

  // Lưu console methods gốc
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  // Danh sách patterns cần lọc (chỉ lỗi không quan trọng)
  const filterPatterns = [
    'chrome-extension://',
    'gomekmidlodglbbmalcneegieacbdmki', // MetaMask extension ID
    'gpcWindowSetting.js', // MetaMask script
    'gpc.js', // MetaMask script
    'web_accessible_resources',
    'manifest key',
    'net::ERR_FAILED',
    'message port closed',
    'runtime.lastError',
    'Unchecked runtime.lastError',
    'injectScript',
    'injectContentScript',
    'execute @ gpc.js',
    'Promise.then step @ gpc.js'
    // KHÔNG lọc: metamask, ethereum, wallet, provider - để Web3 hoạt động bình thường
  ];

  // Hàm kiểm tra có phải lỗi extension không
  function isExtensionError(message) {
    if (typeof message !== 'string') return false;
    
    return filterPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  // Override console.error
  console.error = function(...args) {
    const message = args.join(' ');
    
    if (isExtensionError(message)) {
      // Ẩn lỗi extension
      return;
    }
    
    // Hiển thị lỗi thật
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = function(...args) {
    const message = args.join(' ');
    
    if (isExtensionError(message)) {
      // Ẩn warning extension
      return;
    }
    
    // Hiển thị warning thật
    originalConsoleWarn.apply(console, args);
  };

  // Override console.log (tùy chọn)
  console.log = function(...args) {
    const message = args.join(' ');
    
    if (isExtensionError(message)) {
      // Ẩn log extension
      return;
    }
    
    // Hiển thị log thật
    originalConsoleLog.apply(console, args);
  };

  // Thêm thông báo khi filter được setup
  // Console filter active - Minor extension errors hidden
// Only real application errors will be shown
// Web3 and MetaMask functionality fully preserved
}

// Hàm để bật/tắt filter
export function toggleConsoleFilter(enabled = true) {
  if (enabled) {
    setupConsoleFilter();
  } else {
    // Console filter disabled - all errors visible
  }
}

// Hàm để xem tất cả lỗi (tạm thời)
export function showAllErrors() {
  // Showing all errors including extension errors...
  // Có thể implement logic để tạm thời hiển thị tất cả
}

// Auto setup khi import
if (typeof window !== 'undefined') {
  // Chỉ setup trong browser
  setupConsoleFilter();
}
