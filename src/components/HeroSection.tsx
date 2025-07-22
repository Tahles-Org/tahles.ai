
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Folder } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data: categories } = await supabase.from('categories').select('id, name, icon');
      console.log('Categories data from Supabase (real-time):', categories);
      console.log('Total categories found:', categories?.length || 0);
      return categories;
    },
  });

  useEffect(() => {
    if (categories) {
      console.log('Displaying categories:', categories);
    }
    if (error) {
      console.error('Error fetching categories:', error);
    }
  }, [categories, error]);

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
          
          {/* Advanced Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="חיפוש מונחה - ספקים, שירותים, מחירים ועוד..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pr-12 text-lg bg-white text-black"
              />
            </div>
          </div>

          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 mb-8">
            חיפוש מתקדם
          </Button>

          {/* Categories Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="col-span-full text-center">טוען קטגוריות...</div>
            ) : !categories || categories.length === 0 ? (
              <div className="col-span-full text-center">אין קטגוריות זמינות כרגע</div>
            ) : (
              categories.map((category) => (
                <a 
                  href={`/category/${encodeURIComponent(category.name)}`}
                  key={category.id} 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Folder className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-white font-medium">{category.name}</p>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
