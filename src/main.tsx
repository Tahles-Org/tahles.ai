
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 Application starting...');
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('📅 Build time:', new Date().toISOString());

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found, mounting React app');
}

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('✅ React app mounted successfully');
