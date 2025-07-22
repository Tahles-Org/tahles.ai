
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Upload, CheckCircle, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierFirstProductStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierFirstProductStep: React.FC<SupplierFirstProductStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    categoryId: '',
    subcategoryId: '',
    basePrice: '',
    videoUrl: ''
  });

  const [variants, setVariants] = useState([
    { variant_name: 'בסיסי', variant_value: 'חבילה בסיסית', price: '' }
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productData.categoryId) {
      fetchSubcategories(productData.categoryId);
    }
  }, [productData.categoryId]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true);
      
      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      
      const fileName = `${user.id}/products/product_${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('supplier-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setUploadedImages(prev => [...prev, fileName]);
      
      toast({
        title: "התמונה הועלתה בהצלחה",
        description: "התמונה נוספה למוצר",
      });

    } catch (error: any) {
      console.error('Image upload error:', error);
      toast({
        title: "שגיאה בהעלאת התמונה",
        description: error.message || "אירעה שגיאה בהעלאת הקובץ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { variant_name: '', variant_value: '', price: '' }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCompleteStep = async () => {
    if (!productData.name || !productData.description || !productData.subcategoryId) {
      toast({
        title: "נתונים חסרים",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    if (variants.some(v => !v.variant_name || !v.variant_value || !v.price)) {
      toast({
        title: "נתוני גרסאות חסרים",
        description: "אנא מלאו את כל פרטי הגרסאות",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // יצירת המוצר
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([{
          supplier_id: user.id,
          subcategory_id: productData.subcategoryId,
          name: productData.name,
          description: productData.description,
          cover_image: uploadedImages[0] || null,
          video_url: productData.videoUrl || null
        }])
        .select()
        .single();

      if (productError) throw productError;

      // הוספת גרסאות המוצר
      const variantInserts = variants.map(variant => ({
        product_id: product.id,
        variant_name: variant.variant_name,
        variant_value: variant.variant_value,
        price: parseFloat(variant.price)
      }));

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantInserts);

      if (variantsError) throw variantsError;

      // הוספת תמונות נוספות
      if (uploadedImages.length > 1) {
        const imageInserts = uploadedImages.slice(1).map(imageUrl => ({
          product_id: product.id,
          image_url: imageUrl
        }));

        const { error: imagesError } = await supabase
          .from('images')
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      // עדכון שלב ב-supplier_onboarding
      const { error: onboardingError } = await supabase
        .from('supplier_onboarding')
        .update({
          current_stage: 'completed',
          completed_stages: [...(onboardingData.completed_stages || []), 'first_product'],
          verification_data: {
            ...onboardingData.verification_data,
            first_product: {
              product_id: product.id,
              product_name: productData.name
            }
          }
        })
        .eq('supplier_id', user.id);

      if (onboardingError) throw onboardingError;

      toast({
        title: "המוצר נוצר בהצלחה!",
        description: "תהליך הרישום הושלם. ברוכים הבאים!",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete first product step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה ביצירת המוצר",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-800">
            <div className="p-2 bg-purple-100 rounded-full">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            המוצר הראשון שלכם
          </CardTitle>
          <p className="text-gray-600 mt-2">הוסיפו את המוצר או השירות הראשון שלכם</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* פרטי מוצר בסיסיים */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg font-medium">שם המוצר/השירות *</Label>
              <Input
                id="name"
                placeholder="למשל: צילום חתונות, קייטרינג לאירועים"
                className="text-right"
                style={{ textAlign: 'right' }}
                value={productData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-lg font-medium">תיאור המוצר/השירות *</Label>
              <Textarea
                id="description"
                placeholder="תארו בפירוט את השירות או המוצר שלכם..."
                className="min-h-[100px] text-right"
                style={{ textAlign: 'right' }}
                value={productData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-lg font-medium">קטגוריה *</Label>
                <Select value={productData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="בחרו קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-medium">תת-קטגוריה *</Label>
                <Select 
                  value={productData.subcategoryId} 
                  onValueChange={(value) => handleInputChange('subcategoryId', value)}
                  disabled={!productData.categoryId}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="בחרו תת-קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* גרסאות ומחירים */}
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">גרסאות ומחירים</h3>
                <Button onClick={addVariant} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  הוסף גרסה
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>שם הגרסה</Label>
                      <Input
                        placeholder="בסיסי, מתקדם, פרימיום"
                        className="text-right"
                        style={{ textAlign: 'right' }}
                        value={variant.variant_name}
                        onChange={(e) => handleVariantChange(index, 'variant_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>תיאור הגרסה</Label>
                      <Input
                        placeholder="חבילה בסיסית, חבילה מורחבת"
                        className="text-right"
                        style={{ textAlign: 'right' }}
                        value={variant.variant_value}
                        onChange={(e) => handleVariantChange(index, 'variant_value', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>מחיר (₪)</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0"
                          className="text-right"
                          style={{ textAlign: 'right' }}
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        />
                        {variants.length > 1 && (
                          <Button
                            onClick={() => removeVariant(index)}
                            variant="outline"
                            size="sm"
                            className="px-3"
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* העלאת תמונות */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">תמונות המוצר</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative border-2 border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-600">תמונה {index + 1}</p>
                  </div>
                ))}
                
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">הוסף תמונה</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* וידאו (אופציונלי) */}
          <div className="space-y-3">
            <Label htmlFor="video" className="text-lg font-medium">קישור לוידאו (אופציונלי)</Label>
            <Input
              id="video"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="text-right"
              style={{ textAlign: 'right' }}
              value={productData.videoUrl}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
            />
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading || !productData.name || !productData.description || !productData.subcategoryId}
            >
              {isLoading ? "יוצר מוצר..." : "צור מוצר וסיים רישום"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierFirstProductStep;
