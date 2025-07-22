
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 Application starting...');
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('📅 Build time:', new Date().toISOString());

// Enhanced error handling
window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});

// Performance monitoring
if (typeof performance !== 'undefined') {
  console.log('⚡ Performance timing:', {
    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
} else {
  console.log('✅ Root element found, mounting React app');
}

const root = createRoot(rootElement);

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ React app mounted successfully');
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  
  // Fallback UI
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>שגיאה בטעינת האפליקציה</h1>
      <p>אירעה שגיאה בטעינת האפליקציה. אנא רענן את הדף.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px;">
        רענן דף
      </button>
    </div>
  `;
}
