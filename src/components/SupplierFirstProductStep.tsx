
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, ImageIcon, PlusCircle, X, CheckCircle } from 'lucide-react';
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
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    coverImage: '',
    videoUrl: ''
  });

  const [variants, setVariants] = useState([
    { name: 'בסיסי', value: 'basic', price: '' }
  ]);

  const [images, setImages] = useState<string[]>([]);

  // Mock categories - בפרודקשן יבואו מ-Supabase
  const categories = [
    { id: '1', name: 'צילום', subcategories: [
      { id: '1-1', name: 'צילום חתונות' },
      { id: '1-2', name: 'צילום אירועים' },
      { id: '1-3', name: 'צילום משפחות' }
    ]},
    { id: '2', name: 'מוזיקה', subcategories: [
      { id: '2-1', name: 'DJ' },
      { id: '2-2', name: 'להקות' },
      { id: '2-3', name: 'זמרים' }
    ]},
    { id: '3', name: 'קייטרינג', subcategories: [
      { id: '3-1', name: 'קייטרינג חלבי' },
      { id: '3-2', name: 'קייטרינג בשרי' },
      { id: '3-3', name: 'קייטרינג טבעוני' }
    ]}
  ];

  const selectedCategory = categories.find(cat => cat.id === productData.category);

  const handleProductDataChange = (field: string, value: string) => {
    setProductData(prev => ({ ...prev, [field]: value }));
    
    // Reset subcategory when category changes
    if (field === 'category') {
      setProductData(prev => ({ ...prev, subcategory: '' }));
    }
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { name: '', value: '', price: '' }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setImages(prev => [...prev, imageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return productData.name && 
           productData.description && 
           productData.category && 
           productData.subcategory &&
           variants.some(variant => variant.name && variant.price);
  };

  const handleCompleteStep = async () => {
    if (!isFormValid()) {
      toast({
        title: "נתונים חסרים",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // יצירת המוצר
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          supplier_id: user.id,
          subcategory_id: productData.subcategory,
          name: productData.name,
          description: productData.description,
          cover_image: productData.coverImage,
          video_url: productData.videoUrl || null
        })
        .select()
        .single();

      if (productError) throw productError;

      // הוספת וריאנטים
      if (variants.length > 0 && product) {
        const variantInserts = variants
          .filter(variant => variant.name && variant.price)
          .map(variant => ({
            product_id: product.id,
            variant_name: variant.name,
            variant_value: variant.value || variant.name,
            price: parseFloat(variant.price)
          }));

        const { error: variantsError } = await supabase
          .from('product_variants')
          .insert(variantInserts);

        if (variantsError) throw variantsError;
      }

      // הוספת תמונות
      if (images.length > 0 && product) {
        const imageInserts = images.map(imageUrl => ({
          product_id: product.id,
          image_url: imageUrl
        }));

        const { error: imagesError } = await supabase
          .from('images')
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      // עדכון שלב onboarding - using type assertion
      const { error: onboardingError } = await (supabase as any)
        .from('supplier_onboarding')
        .update({
          current_stage: 'completed',
          completed_stages: [...(onboardingData.completed_stages || []), 'first_product']
        })
        .eq('supplier_id', user.id);

      if (onboardingError) {
        console.error('First product step update error:', onboardingError);
        throw onboardingError;
      }

      toast({
        title: "המוצר נוסף בהצלחה!",
        description: "תהליך הרישום הושלם. ברוכים הבאים לפלטפורמה!",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete first product step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בהוספת המוצר",
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
            הוספת המוצר הראשון
          </CardTitle>
          <p className="text-gray-600 mt-2">הוסיפו את המוצר או השירות הראשון שלכם</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* פרטי מוצר בסיסיים */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right">פרטי המוצר</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-right">שם המוצר/השירות *</Label>
                <Input
                  value={productData.name}
                  onChange={(e) => handleProductDataChange('name', e.target.value)}
                  placeholder="לדוגמה: צילום חתונה מקצועי"
                  className="text-right"
                  style={{ textAlign: 'right' }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-right">תיאור המוצר *</Label>
                <Textarea
                  value={productData.description}
                  onChange={(e) => handleProductDataChange('description', e.target.value)}
                  placeholder="תארו את השירות שלכם בפירוט..."
                  className="text-right min-h-[100px]"
                  style={{ textAlign: 'right' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-right">קטגוריה *</Label>
                  <Select value={productData.category} onValueChange={(value) => handleProductDataChange('category', value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="בחרו קטגוריה" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-right">תת-קטגוריה *</Label>
                  <Select 
                    value={productData.subcategory} 
                    onValueChange={(value) => handleProductDataChange('subcategory', value)}
                    disabled={!selectedCategory}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="בחרו תת-קטגוריה" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subcategories.map(subcategory => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* תמחור ווריאנטים */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right">תמחור ואפשרויות</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(index)}
                      disabled={variants.length === 1}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <h4 className="font-medium text-gray-700">אפשרות {index + 1}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-right text-sm">שם האפשרות</Label>
                      <Input
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                        placeholder="לדוגמה: בסיסי"
                        className="text-right"
                        style={{ textAlign: 'right' }}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-right text-sm">ערך</Label>
                      <Input
                        value={variant.value}
                        onChange={(e) => handleVariantChange(index, 'value', e.target.value)}
                        placeholder="לדוגמה: basic"
                        className="text-right"
                        style={{ textAlign: 'right' }}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-right text-sm">מחיר (₪)</Label>
                      <Input
                        type="number"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        placeholder="0"
                        className="text-right"
                        style={{ textAlign: 'right' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addVariant}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                הוסף אפשרות נוספת
              </Button>
            </CardContent>
          </Card>

          {/* תמונות ומדיה */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right">תמונות ומדיה</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-right">תמונת שער</Label>
                <Input
                  value={productData.coverImage}
                  onChange={(e) => handleProductDataChange('coverImage', e.target.value)}
                  placeholder="קישור לתמונת השער"
                  className="text-right"
                  style={{ textAlign: 'right' }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-right">קישור לסרטון (אופציונלי)</Label>
                <Input
                  value={productData.videoUrl}
                  onChange={(e) => handleProductDataChange('videoUrl', e.target.value)}
                  placeholder="קישור ליוטיוב או וימיאו"
                  className="text-right"
                  style={{ textAlign: 'right' }}
                />
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-right">תמונות נוספות</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative border rounded-lg p-2">
                        <img src={image} alt={`תמונה ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 text-red-600 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? "שומר..." : "הוסף מוצר וסיים רישום"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierFirstProductStep;
