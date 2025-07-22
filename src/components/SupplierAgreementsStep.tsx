
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileSignature, Shield, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierAgreementsStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierAgreementsStep: React.FC<SupplierAgreementsStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    supplierAgreement: false,
    dataProcessing: false
  });

  const agreementTexts = {
    termsOfService: {
      title: "תנאי שימוש",
      content: `ברוכים הבאים לפלטפורמת השירותים שלנו. תנאי השימוש הבאים חלים על כל השימוש שלכם בפלטפורמה.

1. הגדרות כלליות
- הפלטפורמה מיועדת לחיבור בין ספקי שירותים ללקוחות
- השימוש בפלטפורמה מותנה בקבלת תנאים אלה במלואם

2. התחייבויות הספק
- לספק שירותים באיכות גבוהה ובמקצועיות
- לעמד בלוחות זמנים מוסכמים
- לשמור על סודיות מידע הלקוחות

3. תשלומים ועמלות
- העמלה הגבייה הינה 5% מכל עסקה
- התשלום יועבר תוך 7 ימי עסקים
- ניתן לעדכן פרטי בנק בכל עת`
    },
    privacyPolicy: {
      title: "מדיניות פרטיות",
      content: `אנו מכבדים את פרטיותכם ומתחייבים להגן על המידע האישי שלכם.

1. איסוף מידע
- אנו אוספים מידע לצורך הפעלת השירות בלבד
- המידע נשמר בצורה מאובטחת

2. שימוש במידע
- המידע משמש לחיבור עם לקוחות פוטנציאליים
- לא נעביר מידע לצדדים שלישיים ללא הסכמה

3. זכויותיכם
- זכות לעיון במידע השמור עליכם
- זכות לעדכון או מחיקת מידע
- זכות להגשת תלונה לרשות הגנת הפרטיות`
    },
    supplierAgreement: {
      title: "הסכם ספק",
      content: `הסכם זה מגדיר את היחסים בינכם לבין הפלטפורמה כספק שירותים.

1. סטטוס משפטי
- אתם פועלים כקבלנים עצמאיים
- אחראים לכל הרישיונות והביטוחים הנדרשים

2. איכות שירות
- התחייבות לאיכות שירות גבוהה
- מענה מהיר לפניות לקוחות
- עמידה בסטנדרטים מקצועיים

3. ביטול והפסקה
- ניתן לבטל את ההסכם בהודעה מוקדמת של 30 יום
- זכות הפלטפורמה להשעות ספק במקרה של הפרת תנאים`
    },
    dataProcessing: {
      title: "הסכמה לעיבוד נתונים",
      content: `הסכמתכם לעיבוד נתונים אישיים במסגרת הפעילות בפלטפורמה.

1. סוגי נתונים
- פרטים אישיים ועסקיים
- מידע פיננסי לצורך תשלומים
- נתוני ביצועים ופעילות

2. מטרות העיבוד
- הפעלת השירות וחיבור עם לקוחות
- ביצוע תשלומים וניהול כספי
- שיפור השירות וחוויית המשתמש

3. שמירת נתונים
- הנתונים נשמרים כל עוד חשבונכם פעיל
- ניתן לבקש מחיקת נתונים בכל עת`
    }
  };

  const handleAgreementChange = (agreementKey: string, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [agreementKey]: checked }));
  };

  const allAgreementsAccepted = Object.values(agreements).every(agreement => agreement);

  const handleCompleteStep = async () => {
    if (!allAgreementsAccepted) {
      toast({
        title: "נדרשת הסכמה לכל ההסכמים",
        description: "אנא אשרו את כל ההסכמים לפני המעבר לשלב הבא",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // שמירת ההסכמים בטבלה נפרדת
      const agreementInserts = Object.entries(agreements)
        .filter(([_, accepted]) => accepted)
        .map(([agreementType, _]) => ({
          supplier_id: user.id,
          agreement_type: agreementType,
          signature_data: {
            timestamp: new Date().toISOString(),
            ip_address: 'client-ip', // בפרודקשן נקבל את ה-IP האמיתי
            user_agent: navigator.userAgent
          }
        }));

      const { error: agreementsError } = await supabase
        .from('supplier_agreements')
        .insert(agreementInserts);

      if (agreementsError) throw agreementsError;

      // עדכון שלב ב-supplier_onboarding
      const { error: onboardingError } = await supabase
        .from('supplier_onboarding')
        .update({
          current_stage: 'calendar',
          completed_stages: [...(onboardingData.completed_stages || []), 'agreements']
        })
        .eq('supplier_id', user.id);

      if (onboardingError) throw onboardingError;

      toast({
        title: "ההסכמים נחתמו בהצלחה!",
        description: "עוברים לשלב הבא - הגדרת יומן",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete agreements step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בשמירת ההסכמים",
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
              <FileSignature className="h-6 w-6 text-purple-600" />
            </div>
            הסכמים והתחייבויות
          </CardTitle>
          <p className="text-gray-600 mt-2">אנא קראו בעיון ואשרו את ההסכמים הבאים</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>חשוב לדעת:</strong> ההסכמים הבאים מגדירים את הזכויות והחובות שלכם כספק בפלטפורמה.
              אנא קראו בעיון לפני החתימה.
            </div>
          </div>

          {Object.entries(agreementTexts).map(([key, agreement]) => (
            <Card key={key} className="border border-gray-200">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-gray-800 text-right">
                  {agreement.title}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-40 p-4 bg-gray-50 rounded border text-right" dir="rtl">
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {agreement.content}
                  </div>
                </ScrollArea>
                
                <div className="flex items-center space-x-2 justify-end">
                  <label htmlFor={key} className="text-sm font-medium text-gray-700 cursor-pointer">
                    קראתי ואני מסכים/ה לתנאים
                  </label>
                  <Checkbox
                    id={key}
                    checked={agreements[key as keyof typeof agreements]}
                    onCheckedChange={(checked) => handleAgreementChange(key, checked as boolean)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {!allAgreementsAccepted && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                נדרש לאשר את כל ההסכמים לפני המעבר לשלב הבא
              </div>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading || !allAgreementsAccepted}
            >
              {isLoading ? "שומר..." : "חתום והמשך לשלב הבא"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierAgreementsStep;
