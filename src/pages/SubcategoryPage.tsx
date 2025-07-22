
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, MapPin } from 'lucide-react';

interface Subcategory {
  id: string;
  name: string;
  icon: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  supplier_id: string;
}

const SubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();

  // Get subcategory details
  const { data: subcategory, isLoading: subcategoryLoading } = useQuery({
    queryKey: ['subcategory', subcategoryId],
    queryFn: async () => {
      if (!subcategoryId) return null;
      
      const { data, error } = await supabase
        .from('subcategories')
        .select('id, name, icon, category_id')
        .eq('id', subcategoryId)
        .eq('is_active', true)
        .single();
      
      if (error) {
        console.error('Error fetching subcategory:', error);
        throw error;
      }
      
      return data as Subcategory;
    },
    enabled: !!subcategoryId
  });

  // Get parent category
  const { data: category } = useQuery({
    queryKey: ['category', subcategory?.category_id],
    queryFn: async () => {
      if (!subcategory?.category_id) return null;
      
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon')
        .eq('id', subcategory.category_id)
        .single();
      
      if (error) {
        console.error('Error fetching category:', error);
        return null;
      }
      
      return data as Category;
    },
    enabled: !!subcategory?.category_id
  });

  // Get products for this subcategory
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', subcategoryId],
    queryFn: async () => {
      if (!subcategoryId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, cover_image, supplier_id')
        .eq('subcategory_id', subcategoryId)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching products:', error);
        return [];
      }
      
      return data as Product[];
    },
    enabled: !!subcategoryId
  });

  const handleBackToCategory = () => {
    if (category?.id) {
      navigate(`/category/${category.id}`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (subcategoryLoading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">טוען פרטי תת קטגוריה...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">תת קטגוריה לא נמצאה</h1>
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
          {category && (
            <>
              <button onClick={handleBackToCategory} className="hover:text-primary">
                {category.name}
              </button>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{subcategory.name}</span>
        </div>

        {/* Subcategory Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{subcategory.icon || '📁'}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
          <p className="text-lg text-muted-foreground">
            ספקים זמינים בתחום {subcategory.name}
          </p>
        </div>

        {/* Products/Suppliers */}
        <div className="max-w-6xl mx-auto">
          {productsLoading ? (
            <div className="text-center py-8">טוען ספקים...</div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">אין ספקים זמינים כרגע</h3>
              <p className="text-muted-foreground mb-4">בקרוב יתווספו ספקים לתחום זה</p>
              <div className="flex gap-4 justify-center">
                {category && (
                  <Button variant="outline" onClick={handleBackToCategory}>
                    <ArrowRight className="w-4 h-4 ml-2" />
                    חזרה ל{category.name}
                  </Button>
                )}
                <Button onClick={handleBackToHome}>
                  <ArrowRight className="w-4 h-4 ml-2" />
                  חזרה לעמוד הבית
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-8">
                ספקים זמינים ({products.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card 
                    key={product.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <img 
                        src={product.cover_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400'} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-sm text-muted-foreground">(12 ביקורות)</span>
                        </div>
                        <Button size="sm">צפה בפרטים</Button>
                      </div>
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

export default SubcategoryPage;
