import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Folders, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
}

interface Subcategory {
  id: string;
  name: string;
  icon?: string;
  category_id: string;
  is_active: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: subcategories } = useQuery({
    queryKey: ['admin-subcategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Subcategory[];
    },
  });

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategorySubcategories = (categoryId: string) => {
    return subcategories?.filter(sub => sub.category_id === categoryId) || [];
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">תכלס</h1>
            </a>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">דשבורד ניהולי</h2>
          </div>
          <Button variant="outline" asChild>
            <a href="/">חזרה לאתר</a>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Folders className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">🗂 עץ המידע של המערכת</h1>
          </div>
          <p className="text-muted-foreground">
            תצוגת עץ היררכי של כל המידע הקיים במערכת - קטגוריות ותתי קטגוריות
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folders className="h-5 w-5" />
              קטגוריות ותתי קטגוריות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories?.map((category) => {
                const isExpanded = expandedCategories.has(category.id);
                const categorySubcategories = getCategorySubcategories(category.id);
                
                return (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-semibold text-lg">{category.name}</span>
                        <Badge variant={category.is_active ? "default" : "secondary"}>
                          {category.is_active ? "פעיל" : "לא פעיל"}
                        </Badge>
                        <Badge variant="outline">
                          {categorySubcategories.length} תתי קטגוריות
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        עריכה
                      </Button>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 mr-8 space-y-2">
                        {categorySubcategories.length > 0 ? (
                          categorySubcategories.map((subcategory) => (
                            <div 
                              key={subcategory.id}
                              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm">{subcategory.icon}</span>
                                <span className="font-medium">{subcategory.name}</span>
                                <Badge 
                                  variant={subcategory.is_active ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {subcategory.is_active ? "פעיל" : "לא פעיל"}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm">
                                עריכה
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground text-center py-4">
                            אין תתי קטגוריות עבור קטגוריה זו
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">סה"כ קטגוריות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center text-primary">
                {categories?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">סה"כ תתי קטגוריות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center text-primary">
                {subcategories?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">קטגוריות פעילות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center text-primary">
                {categories?.filter(c => c.is_active).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;