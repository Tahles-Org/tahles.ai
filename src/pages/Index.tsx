
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

const Index = () => {
  console.log('🔍 Index page is rendering - this should appear in browser console');
  console.log('📊 Current timestamp:', new Date().toISOString());
  
  // Fetch categories for CategoriesGrid
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories-grid'],
    queryFn: async () => {
      console.log('🔄 Fetching categories for grid...');
      
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon, is_active')
        .eq('is_active', true);
      
      console.log('📦 Categories grid fetch result:', {
        success: !error,
        count: data?.length || 0,
        error: error?.message
      });
      
      if (error) {
        console.error('❌ Error fetching categories for grid:', error);
        throw error;
      }
      
      return data || [];
    },
  });
  
  React.useEffect(() => {
    console.log('✅ Index page mounted successfully');
    console.log('🌐 Window location:', window.location.href);
    console.log('📱 User agent:', navigator.userAgent);
    console.log('🎨 Categories state:', {
      count: categories?.length || 0,
      loading: categoriesLoading,
      error: categoriesError?.message
    });
  }, [categories, categoriesLoading, categoriesError]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
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
