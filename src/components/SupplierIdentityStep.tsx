
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail, Upload, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierIdentityStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierIdentityStep: React.FC<SupplierIdentityStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [verifications, setVerifications] = useState({
    phone: false,
    email: false,
    idFront: false,
    idBack: false
  });

  const [phoneCode, setPhoneCode] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const handlePhoneVerification = async () => {
    // כאן תהיה אינטגרציה עם שירות SMS
    // לעת עתה נדמה אימות
    setShowPhoneVerification(true);
    toast({
      title: "קוד נשלח",
      description: "קוד אימות נשלח למספר הטלפון שלכם",
    });
  };

  const verifyPhoneCode = async () => {
    if (phoneCode === '1234') { // קוד דמה לבדיקה
      setVerifications(prev => ({ ...prev, phone: true }));
      
      // שמירה ב-supplier_verifications
      await (supabase as any)
        .from('supplier_verifications')
        .insert([
          {
            supplier_id: user.id,
            verification_type: 'phone',
            document_url: '',
            verification_notes: `Phone verified: ${onboardingData.verification_data?.phone}`
          }
        ]);

      toast({
        title: "אימות הטלפון הושלם",
        description: "מספר הטלפון אומת בהצלחה",
      });
    } else {
      toast({
        title: "קוד שגוי",
        description: "אנא הכניסו את הקוד הנכון",
        variant: "destructive",
      });
    }
  };

  const handleEmailVerification = async () => {
    // אימות האימייל כבר קיים ב-Supabase Auth
    // נבדק אם המשתמש אימת את האימייל
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (currentUser?.email_confirmed_at) {
      setVerifications(prev => ({ ...prev, email: true }));
      
      await (supabase as any)
        .from('supplier_verifications')
        .insert([
          {
            supplier_id: user.id,
            verification_type: 'email',
            document_url: '',
            verification_notes: `Email verified: ${currentUser.email}`
          }
        ]);

      toast({
        title: "אימות האימייל הושלם",
        description: "כתובת האימייל אומתה בהצלחה",
      });
    } else {
      setShowEmailVerification(true);
      toast({
        title: "אנא אמתו את האימייל",
        description: "בדקו את תיבת הדואר שלכם ולחצו על הקישור לאימות",
      });
    }
  };

  const handleFileUpload = async (file: File, type: 'idFront' | 'idBack') => {
    try {
      setIsLoading(true);
      
      const fileName = `${user.id}/identity/${type}_${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('supplier-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // שמירה ב-supplier_verifications
      await (supabase as any)
        .from('supplier_verifications')
        .insert([
          {
            supplier_id: user.id,
            verification_type: type === 'idFront' ? 'id_front' : 'id_back',
            document_url: fileName,
            verification_notes: `ID ${type} uploaded`
          }
        ]);

      setVerifications(prev => ({ ...prev, [type]: true }));
      
      toast({
        title: "העלאה הושלמה",
        description: `תמונת ${type === 'idFront' ? 'חזית' : 'גב'} התעודת זהות הועלתה בהצלחה`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "שגיאה בהעלאה",
        description: error.message || "אירעה שגיאה בהעלאת הקובץ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteStep = async () => {
    const allVerified = Object.values(verifications).every(v => v);
    
    if (!allVerified) {
      toast({
        title: "אימותים חסרים",
        description: "אנא השלימו את כל האימותים לפני המעבר לשלב הבא",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // עדכון שלב ב-supplier_onboarding
      const { error } = await (supabase as any)
        .from('supplier_onboarding')
        .update({
          current_stage: 'business',
          completed_stages: [...(onboardingData.completed_stages || []), 'identity']
        })
        .eq('supplier_id', user.id);

      if (error) throw error;

      toast({
        title: "שלב הזהות הושלם!",
        description: "עוברים לשלב הבא - פרטי העסק",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בעדכון השלב",
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
              <User className="h-6 w-6 text-purple-600" />
            </div>
            אימות זהות
          </CardTitle>
          <p className="text-gray-600 mt-2">אנא השלימו את כל האימותים הנדרשים</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* אימות טלפון */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-800">אימות מספר טלפון</h3>
                  <p className="text-sm text-gray-600">{onboardingData.verification_data?.phone}</p>
                </div>
              </div>
              {verifications.phone ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Button onClick={handlePhoneVerification} variant="outline" size="sm">
                  שלח קוד
                </Button>
              )}
            </div>

            {showPhoneVerification && !verifications.phone && (
              <div className="flex gap-2">
                <Input
                  placeholder="הכניסו את הקוד (1234)"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="text-right"
                  style={{ textAlign: 'right' }}
                />
                <Button onClick={verifyPhoneCode} size="sm">
                  אמת
                </Button>
              </div>
            )}
          </div>

          {/* אימות אימייל */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-800">אימות כתובת אימייל</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              {verifications.email ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Button onClick={handleEmailVerification} variant="outline" size="sm">
                  בדק אימות
                </Button>
              )}
            </div>
          </div>

          {/* העלאת תעודת זהות */}
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              העלאת תעודת זהות
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>צד קדמי של התעודה</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {verifications.idFront ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>הועלה בהצלחה</span>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'idFront');
                        }}
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">לחצו להעלאת תמונה</p>
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>צד אחורי של התעודה</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {verifications.idBack ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>הועלה בהצלחה</span>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'idBack');
                        }}
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">לחצו להעלאת תמונה</p>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading || !Object.values(verifications).every(v => v)}
            >
              {isLoading ? "שומר..." : "המשך לשלב הבא"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierIdentityStep;
