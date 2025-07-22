
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, GraduationCap, Bus, Ticket, MapPin, UtensilsCrossed, Gift, Video } from 'lucide-react';

const categoryIcons = {
  'הרצאות והכשרות': GraduationCap,
  'טיולים ואטרקציות': Bus,
  'כרטיסים לאירועים': Ticket,
  'לוקיישנים': MapPin,
  'מזון ומשקאות': UtensilsCrossed,
  'מתנות ומוצרים': Gift,
  'שירותי הפקה': Video,
};

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            פתרונות הזמנה במרחק לחיצה
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100">
            מוצאים לכם את הספקים הטובים ביותר לכל אירוע
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="מה אתם מחפשים? (צלם, DJ, אולם...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pr-12 text-lg bg-white text-black"
              />
            </div>
          </div>

          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 mb-8">
            התחל לחפש
          </Button>

          {/* Categories Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto">
            {categories?.map((category) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || MapPin;
              
              return (
                <div 
                  key={category.id} 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-white font-medium">{category.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
