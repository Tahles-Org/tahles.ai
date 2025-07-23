
import React from 'react';

const DebugInfo = () => {
  console.log('🔍 DebugInfo component rendering');
  
  React.useEffect(() => {
    console.log('✅ DebugInfo mounted');
    console.log('🎯 Current time:', new Date().toISOString());
    console.log('📍 Component is visible in DOM');
  }, []);
  
  return (
    <div className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded text-sm z-50">
      <div>🔍 Debug: App is running</div>
      <div>⏰ {new Date().toLocaleTimeString()}</div>
      <div>🌐 {window.location.pathname}</div>
    </div>
  );
};

export default DebugInfo;
