
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Subcategory {
  id: string;
  name: string;
  icon: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // First, get the category by ID (or name for backward compatibility)
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', categoryName],
    queryFn: async () => {
      console.log('Fetching category for:', categoryName);
      
      // Try to fetch by ID first, then by name for backward compatibility
      let query = supabase
        .from('categories')
        .select('id, name, icon')
        .eq('is_active', true);
      
      // Check if categoryName is a UUID (has dashes and correct length)
      const isUUID = categoryName && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryName);
      
      if (isUUID) {
        query = query.eq('id', categoryName);
      } else {
        query = query.eq('name', decodeURIComponent(categoryName || ''));
      }
      
      const { data, error } = await query.single();
      
      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
      
      console.log('Found category:', data);
      return data as Category;
    },
    enabled: !!categoryName
  });

  // Then get subcategories for this category
  const { data: subcategories, isLoading: subcategoriesLoading, error: subcategoriesError } = useQuery({
    queryKey: ['subcategories', category?.id],
    queryFn: async () => {
      if (!category?.id) return [];
      
      console.log('Fetching subcategories for category ID:', category.id);
      
      const { data, error } = await supabase
        .from('subcategories')
        .select('id, name, icon')
        .eq('category_id', category.id)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
      }
      
      console.log('Found subcategories:', data);
      return data as Subcategory[];
    },
    enabled: !!category?.id
  });

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/subcategory/${subcategoryId}`);
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">טוען פרטי קטגוריה...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">קטגוריה לא נמצאה</h1>
            <Button onClick={handleBackToHome}>
              <ArrowRight className="w-4 h-4 ml-2" />
              חזרה לעמוד הבית
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <button onClick={handleBackToHome} className="hover:text-primary">
            עמוד הבית
          </button>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{category.icon}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground">
            בחר תת קטגוריה כדי לראות ספקים זמינים
          </p>
        </div>

        {/* Subcategories */}
        <div className="max-w-4xl mx-auto">
          {subcategoriesLoading ? (
            <div className="text-center py-8">טוען תתי קטגוריות...</div>
          ) : subcategoriesError ? (
            <div className="text-center py-8 text-red-600">
              שגיאה בטעינת תתי קטגוריות
            </div>
          ) : !subcategories || subcategories.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">לא קיימות תתי קטגוריות פעילות לקטגוריה זו</h3>
              <p className="text-muted-foreground mb-4">בקרוב נוסיף תתי קטגוריות לקטגוריה זו</p>
              <Button onClick={handleBackToHome}>
                <ArrowRight className="w-4 h-4 ml-2" />
                חזרה לעמוד הבית
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-8">תתי קטגוריות</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategories.map((subcategory) => (
                  <Card 
                    key={subcategory.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">
                          {subcategory.icon || '📁'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{subcategory.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        לחץ לצפייה בספקים זמינים
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
