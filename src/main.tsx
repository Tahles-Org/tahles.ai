
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 Application starting...');
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('📅 Build time:', new Date().toISOString());

// Enhanced environment logging
console.log('🌐 Window context:', {
  isInIframe: window !== window.parent,
  origin: window.location.origin,
  href: window.location.href,
  userAgent: navigator.userAgent,
  cookieEnabled: navigator.cookieEnabled,
  onLine: navigator.onLine
});

// Check for iframe sandboxing issues
if (window !== window.parent) {
  console.log('🖼️ Running in iframe - checking sandbox attributes...');
  try {
    const iframe = window.parent.document.querySelector('iframe');
    if (iframe) {
      console.log('📋 Iframe attributes:', {
        sandbox: iframe.getAttribute('sandbox'),
        src: iframe.getAttribute('src'),
        allow: iframe.getAttribute('allow')
      });
    }
  } catch (e) {
    console.log('❌ Cannot access parent iframe (cross-origin)');
  }
}

// Enhanced error handling
window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise
  });
});

// Performance monitoring
if (typeof performance !== 'undefined') {
  console.log('⚡ Performance timing:', {
    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
  });
}

// Check for required APIs
console.log('🔍 API availability:', {
  fetch: typeof fetch !== 'undefined',
  localStorage: typeof localStorage !== 'undefined',
  sessionStorage: typeof sessionStorage !== 'undefined',
  indexedDB: typeof indexedDB !== 'undefined',
  WebSocket: typeof WebSocket !== 'undefined'
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
} else {
  console.log('✅ Root element found:', {
    tagName: rootElement.tagName,
    id: rootElement.id,
    className: rootElement.className,
    innerHTML: rootElement.innerHTML.slice(0, 100) + '...'
  });
}

const root = createRoot(rootElement);

try {
  console.log('🎯 Attempting to render React app...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ React app mounted successfully');
  
  // Post-mount check
  setTimeout(() => {
    console.log('🔍 Post-mount DOM check:', {
      rootChildren: rootElement.children.length,
      bodyText: document.body.innerText.length,
      hasVisibleContent: document.body.innerText.length > 0
    });
  }, 100);
  
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  
  // Fallback UI
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>שגיאה בטעינת האפליקציה</h1>
      <p>אירעה שגיאה בטעינת האפליקציה. אנא רענן את הדף.</p>
      <p>שגיאה: ${error.message}</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px;">
        רענן דף
      </button>
    </div>
  `;
}
