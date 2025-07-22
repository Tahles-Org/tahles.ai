
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AppHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  
  const { data: supabaseHealth, error: supabaseError } = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('count')
          .limit(1);
        
        if (error) throw error;
        
        console.log('✅ Supabase health check passed');
        return { status: 'healthy', data };
      } catch (error) {
        console.error('❌ Supabase health check failed:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    console.log('🔄 App Health Check Status:', {
      supabaseHealth: !!supabaseHealth,
      supabaseError: !!supabaseError,
      timestamp: new Date().toISOString()
    });
    
    if (supabaseHealth) {
      setHealthStatus('healthy');
    } else if (supabaseError) {
      setHealthStatus('error');
    }
  }, [supabaseHealth, supabaseError]);

  useEffect(() => {
    // Log critical app info
    console.log('🏥 App Health Check initialized:', {
      location: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      reactVersion: React.version,
      supabaseUrl: supabase.supabaseUrl
    });
  }, []);

  // This component doesn't render anything visible, just logs
  return null;
};

export default AppHealthCheck;
