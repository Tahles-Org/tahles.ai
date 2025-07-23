
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CategoryFromDB {
  id: string;
  name: string;
  icon: string;
}

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data: categories, error } = await supabase
          .from('categories')
          .select('id, name, icon')
          .eq('is_active', true);
        
        if (error) throw error;
        return categories as CategoryFromDB[];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
  
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            פתרונות הפקה במרחק לחיצה
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100">
            הספקים המובילים לכל אירוע - במחיר מנצח והזמנה מיידית
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="הפתרון המושלם לאירוע שלכם - במרחק 10 קליקים"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pr-12 text-lg bg-white text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
            {isLoading ? (
              <div className="col-span-full text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="mt-2">טוען קטגוריות...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-300">
                <p>שגיאה בטעינת קטגוריות</p>
                <p className="text-sm mt-1">נסה לרענן את הדף</p>
              </div>
            ) : !categories || categories.length === 0 ? (
              <div className="col-span-full text-center">
                <p>אין קטגוריות זמינות כרגע</p>
                <p className="text-sm mt-1">נסה שוב מאוחר יותר</p>
              </div>
            ) : (
              categories.slice(0, 16).map((category) => (
                <Link 
                  to={`/category/${category.id}`}
                  key={category.id} 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">{category.icon || '📁'}</span>
                  </div>
                  <p className="text-xs text-white font-medium">{category.name}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
