
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SimpleHeader from '@/components/SimpleHeader';
import SimpleHero from '@/components/SimpleHero';
import SimpleCategoriesGrid from '@/components/SimpleCategoriesGrid';
import SimpleFooter from '@/components/SimpleFooter';

const Index = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories-simple'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name, icon, is_active')
          .eq('is_active', true);
        
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Categories fetch error:', err);
        return [];
      }
    },
  });
  
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">תכלס</h1>
          <p className="text-gray-600 mb-4">פלטפורמת הספקים הגדולה בישראל</p>
          <p className="text-sm text-gray-500">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <SimpleHeader />
      <SimpleHero />
      <SimpleCategoriesGrid categories={categories} isLoading={isLoading} />
      <SimpleFooter />
    </div>
  );
};

export default Index;
