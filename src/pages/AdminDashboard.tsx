import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, TreeDeciduous, ArrowRight, Users, Package, MessageSquare, ShoppingCart, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

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

interface Supplier {
  id: string;
  business_name: string;
  business_type: string;
  is_active: boolean;
  is_suspended: boolean;
  created_at: string;
}

interface Audience {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

interface Concept {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

interface Order {
  id: string;
  status: string;
  total_price: number;
  customer_name: string;
  customer_email: string;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  customer_name: string;
  review_text: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // Categories and Subcategories queries
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

  // Suppliers query
  const { data: suppliers } = useQuery({
    queryKey: ['admin-suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('business_name');
      
      if (error) throw error;
      return data as Supplier[];
    },
  });

  // Audiences query
  const { data: audiences } = useQuery({
    queryKey: ['admin-audiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audiences')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Audience[];
    },
  });

  // Concepts query
  const { data: concepts } = useQuery({
    queryKey: ['admin-concepts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('concepts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Concept[];
    },
  });

  // Orders query
  const { data: orders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
  });

  // Reviews query
  const { data: reviews } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
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

  // Categories Tab Component
  const CategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder="חיפוש קטגוריות..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>הוסף קטגוריה חדשה</Button>
      </div>
      
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
    </div>
  );

  // Simple list component for other tabs
  const SimpleListTab = ({ 
    data, 
    title, 
    renderItem 
  }: { 
    data: any[], 
    title: string, 
    renderItem: (item: any) => React.ReactNode 
  }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder={`חיפוש ${title}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>הוסף {title} חדש</Button>
      </div>
      
      <div className="grid gap-4">
        {data?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {renderItem(item)}
                <Button variant="ghost" size="sm">עריכה</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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
            <TreeDeciduous className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">🗂 מרכז הניהול של המערכת</h1>
          </div>
          <p className="text-muted-foreground">
            ניהול מקיף של כל המידע במערכת - קטגוריות, ספקים, הזמנות ועוד
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">קטגוריות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {categories?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">ספקים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {suppliers?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">קהלים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {audiences?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">קונספטים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {concepts?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">הזמנות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {orders?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">ביקורות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center text-primary">
                {reviews?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <TreeDeciduous className="h-4 w-4" />
              קטגוריות
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              ספקים
            </TabsTrigger>
            <TabsTrigger value="audiences" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              קהלים
            </TabsTrigger>
            <TabsTrigger value="concepts" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              קונספטים
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              הזמנות
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              ביקורות
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreeDeciduous className="h-5 w-5" />
                  קטגוריות ותתי קטגוריות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CategoriesTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  ספקים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleListTab
                  data={suppliers || []}
                  title="ספק"
                  renderItem={(supplier: Supplier) => (
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold">{supplier.business_name}</div>
                        <div className="text-sm text-muted-foreground">{supplier.business_type}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={supplier.is_active ? "default" : "secondary"}>
                          {supplier.is_active ? "פעיל" : "לא פעיל"}
                        </Badge>
                        {supplier.is_suspended && (
                          <Badge variant="destructive">מושעה</Badge>
                        )}
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audiences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  קהלי יעד
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleListTab
                  data={audiences || []}
                  title="קהל יעד"
                  renderItem={(audience: Audience) => (
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold">{audience.name}</div>
                        {audience.description && (
                          <div className="text-sm text-muted-foreground">{audience.description}</div>
                        )}
                      </div>
                      <Badge variant={audience.is_active ? "default" : "secondary"}>
                        {audience.is_active ? "פעיל" : "לא פעיל"}
                      </Badge>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concepts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  קונספטים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleListTab
                  data={concepts || []}
                  title="קונספט"
                  renderItem={(concept: Concept) => (
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold">{concept.name}</div>
                        <div className="text-sm text-muted-foreground">{concept.type}</div>
                      </div>
                      <Badge variant={concept.is_active ? "default" : "secondary"}>
                        {concept.is_active ? "פעיל" : "לא פעיל"}
                      </Badge>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  הזמנות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleListTab
                  data={orders || []}
                  title="הזמנה"
                  renderItem={(order: Order) => (
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold">{order.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                      </div>
                      <div className="text-lg font-bold">₪{order.total_price}</div>
                      <Badge variant={
                        order.status === 'completed' ? 'default' :
                        order.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {order.status === 'completed' ? 'הושלם' :
                         order.status === 'pending' ? 'ממתין' : 'בוטל'}
                      </Badge>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  ביקורות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleListTab
                  data={reviews || []}
                  title="ביקורת"
                  renderItem={(review: Review) => (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="font-semibold">{review.customer_name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {review.review_text}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-500">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                        </div>
                        <Badge variant={
                          review.status === 'approved' ? 'default' :
                          review.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {review.status === 'approved' ? 'אושר' :
                           review.status === 'pending' ? 'ממתין' : 'נדחה'}
                        </Badge>
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;