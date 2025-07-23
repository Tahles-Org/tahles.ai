
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  icon?: string;
  is_active: boolean;
}

interface SimpleCategoriesGridProps {
  categories?: Category[];
  isLoading: boolean;
}

const SimpleCategoriesGrid = ({ categories, isLoading }: SimpleCategoriesGridProps) => {
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
                </CardContent>
              </Card>
            ))}
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
          {categories?.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-white"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{category.icon || '📋'}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {Math.floor(Math.random() * 50) + 10} ספקים
                </p>
              </CardContent>
            </Card>
          )) || (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">טוען קטגוריות...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleCategoriesGrid;
