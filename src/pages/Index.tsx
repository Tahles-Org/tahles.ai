
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
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories-grid'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon, is_active')
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    },
  });
  
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
