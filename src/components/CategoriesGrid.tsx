
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  Bus, 
  Ticket, 
  MapPin, 
  UtensilsCrossed, 
  Gift, 
  Video 
} from 'lucide-react';

const categoryIcons = {
  'הרצאות והכשרות': GraduationCap,
  'טיולים ואטרקציות': Bus,
  'כרטיסים לאירועים': Ticket,
  'לוקיישנים': MapPin,
  'מזון ומשקאות': UtensilsCrossed,
  'מתנות ומוצרים': Gift,
  'שירותי הפקה': Video,
};

interface Category {
  id: string;
  name: string;
  icon?: string;
  is_active: boolean;
}

interface CategoriesGridProps {
  categories?: Category[];
  isLoading: boolean;
}

const CategoriesGrid = ({ categories, isLoading }: CategoriesGridProps) => {
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">קטגוריות ראשיות</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">קטגוריות ראשיות</h2>
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground mb-4">
              אין קטגוריות זמינות כרגע
            </p>
            <p className="text-sm text-muted-foreground">
              אנא נסה שוב מאוחר יותר
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">קטגוריות ראשיות</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || MapPin;
            
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 50) + 10} ספקים זמינים
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
