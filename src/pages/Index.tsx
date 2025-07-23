
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import CategorySliders from '@/components/CategorySliders';
import HowItWorks from '@/components/HowItWorks';
import RecommendedSuppliers from '@/components/RecommendedSuppliers';
import Footer from '@/components/Footer';
import DebugInfo from '@/components/DebugInfo';

const Index = () => {
  console.log('🔍 Index page is rendering - this should appear in browser console');
  console.log('📊 Current timestamp:', new Date().toISOString());
  console.log('🌐 Current URL:', window.location.href);
  console.log('📱 User agent:', navigator.userAgent);
  console.log('🔗 Document ready state:', document.readyState);
  
  // Add iframe detection
  console.log('🖼️ Is in iframe:', window !== window.parent);
  console.log('🔒 Frame options:', document.querySelector('meta[http-equiv="X-Frame-Options"]'));
  
  // Fetch categories for CategoriesGrid
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories-grid'],
    queryFn: async () => {
      console.log('🔄 Fetching categories for grid...');
      console.log('📡 Supabase client status:', !!supabase);
      
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name, icon, is_active')
          .eq('is_active', true);
        
        console.log('📦 Categories grid fetch result:', {
          success: !error,
          count: data?.length || 0,
          error: error?.message,
          data: data
        });
        
        if (error) {
          console.error('❌ Error fetching categories for grid:', error);
          throw error;
        }
        
        return data || [];
      } catch (err) {
        console.error('🚨 Exception in categories fetch:', err);
        throw err;
      }
    },
  });
  
  React.useEffect(() => {
    console.log('✅ Index page mounted successfully');
    console.log('🎨 Categories state:', {
      count: categories?.length || 0,
      loading: categoriesLoading,
      error: categoriesError?.message
    });
    
    // Check if elements are actually rendering
    setTimeout(() => {
      console.log('🔍 DOM check after 1 second:');
      console.log('- Root element:', document.getElementById('root'));
      console.log('- Body children:', document.body.children.length);
      console.log('- Any visible content:', document.body.innerText.length > 0);
    }, 1000);
    
  }, [categories, categoriesLoading, categoriesError]);

  console.log('🎯 About to render Index JSX');
  
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <DebugInfo />
      <Header />
      <HeroSection />
      <CategoriesGrid categories={categories} isLoading={categoriesLoading} />
      <CategorySliders />
      <HowItWorks />
      <RecommendedSuppliers />
      <Footer />
    </div>
  );
};

export default Index;
