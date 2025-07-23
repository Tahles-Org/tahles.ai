
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import HowItWorks from '@/components/HowItWorks';
import RecommendedSuppliers from '@/components/RecommendedSuppliers';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  name: string;
  icon: string;
  is_active: boolean;
}

const Index = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name, icon, is_active')
          .eq('is_active', true);
        
        if (error) throw error;
        return data as Category[];
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Return empty array as fallback
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main>
        <HeroSection />
        <CategoriesGrid 
          categories={categories || []} 
          isLoading={isLoading}
        />
        <HowItWorks />
        <RecommendedSuppliers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
