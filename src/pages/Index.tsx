
import React from 'react';
import SimpleHeader from '@/components/SimpleHeader';
import SimpleHero from '@/components/SimpleHero';
import SimpleFooter from '@/components/SimpleFooter';

// Temporary static categories for immediate deployment
const mockCategories = [
  { id: '1', name: 'מכוניות', icon: '🚗', is_active: true },
  { id: '2', name: 'נדל״ן', icon: '🏠', is_active: true },
  { id: '3', name: 'שירותים', icon: '🛠️', is_active: true },
  { id: '4', name: 'אוכל', icon: '🍕', is_active: true },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <SimpleHeader />
      <SimpleHero />
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">הקטגוריות שלנו</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <div key={category.id} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
