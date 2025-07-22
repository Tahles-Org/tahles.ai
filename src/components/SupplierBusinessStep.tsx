
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, Upload, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierBusinessStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierBusinessStep: React.FC<SupplierBusinessStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);
  
  const [businessData, setBusinessData] = useState({
    businessDescription: '',
    website: '',
    address: '',
    city: '',
    yearEstablished: '',
    employeeCount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (file: File) => {
    try {
      setIsLoading(true);
      
      const fileName = `${user.id}/business/logo_${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('supplier-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Update supplier with logo URL
      const { error: updateError } = await supabase
        .from('suppliers')
        .update({ profile_image: fileName })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setLogoUploaded(true);
      
      toast({
        title: "הלוגו הועלה בהצלחה",
        description: "הלוגו של העסק הועלה בהצלחה למערכת",
      });

    } catch (error: any) {
      console.error('Logo upload error:', error);
      toast({
        title: "שגיאה בהעלאת הלוגו",
        description: error.message || "אירעה שגיאה בהעלאת הקובץ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteStep = async () => {
    if (!businessData.businessDescription || !businessData.address) {
      toast({
        title: "נתונים חסרים",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Update supplier with business data
      const { error: supplierError } = await supabase
        .from('suppliers')
        .update({
          description: businessData.businessDescription,
        })
        .eq('id', user.id);

      if (supplierError) throw supplierError;

      // Update onboarding stage
      const { error: onboardingError } = await (supabase as any)
        .from('supplier_onboarding')
        .update({
          current_stage: 'documents',
          completed_stages: [...(onboardingData.completed_stages || []), 'business'],
          verification_data: {
            ...onboardingData.verification_data,
            business: businessData
          }
        })
        .eq('supplier_id', user.id);

      if (onboardingError) throw onboardingError;

      toast({
        title: "פרטי העסק נשמרו!",
        description: "עוברים לשלב הבא - העלאת מסמכים",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete business step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בשמירת הנתונים",
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
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            פרטי העסק
          </CardTitle>
          <p className="text-gray-600 mt-2">אנא הכניסו את פרטי העסק שלכם</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">לוגו העסק</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {logoUploaded ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <span>הלוגו הועלה בהצלחה</span>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(file);
                    }}
                  />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">לחצו להעלאת לוגו העסק</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG עד 5MB</p>
                </label>
              )}
            </div>
          </div>

          {/* Business Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-lg font-medium">תיאור העסק *</Label>
            <Textarea
              id="description"
              placeholder="ספרו לנו על העסק שלכם..."
              className="min-h-[100px] text-right"
              style={{ textAlign: 'right' }}
              value={businessData.businessDescription}
              onChange={(e) => handleInputChange('businessDescription', e.target.value)}
              required
            />
          </div>

          {/* Website */}
          <div className="space-y-3">
            <Label htmlFor="website" className="text-lg font-medium">אתר אינטרנט</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.example.com"
              className="text-right"
              style={{ textAlign: 'right' }}
              value={businessData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="space-y-3">
            <Label htmlFor="address" className="text-lg font-medium">כתובת העסק *</Label>
            <Input
              id="address"
              placeholder="רחוב, מספר בית"
              className="text-right"
              style={{ textAlign: 'right' }}
              value={businessData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>

          {/* City */}
          <div className="space-y-3">
            <Label htmlFor="city" className="text-lg font-medium">עיר *</Label>
            <Input
              id="city"
              placeholder="שם העיר"
              className="text-right"
              style={{ textAlign: 'right' }}
              value={businessData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Year Established */}
            <div className="space-y-3">
              <Label htmlFor="year" className="text-lg font-medium">שנת הקמה</Label>
              <Input
                id="year"
                type="number"
                placeholder="2020"
                className="text-right"
                style={{ textAlign: 'right' }}
                value={businessData.yearEstablished}
                onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
              />
            </div>

            {/* Employee Count */}
            <div className="space-y-3">
              <Label htmlFor="employees" className="text-lg font-medium">מספר עובדים</Label>
              <select
                id="employees"
                className="w-full h-10 p-2 border border-gray-300 rounded-md bg-white text-right"
                style={{ textAlign: 'right' }}
                value={businessData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
              >
                <option value="">בחרו טווח</option>
                <option value="1">עצמאי</option>
                <option value="2-5">2-5 עובדים</option>
                <option value="6-10">6-10 עובדים</option>
                <option value="11-50">11-50 עובדים</option>
                <option value="50+">50+ עובדים</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading || !businessData.businessDescription || !businessData.address}
            >
              {isLoading ? "שומר..." : "המשך לשלב הבא"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierBusinessStep;
