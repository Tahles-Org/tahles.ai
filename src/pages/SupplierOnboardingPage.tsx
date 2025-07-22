import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import SupplierProgressIndicator from '@/components/SupplierProgressIndicator';
import SupplierIdentityStep from '@/components/SupplierIdentityStep';
import SupplierBusinessStep from '@/components/SupplierBusinessStep';
import SupplierDocumentsStep from '@/components/SupplierDocumentsStep';
import SupplierAgreementsStep from '@/components/SupplierAgreementsStep';
import SupplierCalendarStep from '@/components/SupplierCalendarStep';
import SupplierFirstProductStep from '@/components/SupplierFirstProductStep';

const SupplierOnboardingPage = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/supplier/register');
          return;
        }

        setCurrentUser(user);

        // שליפת נתוני onboarding
        const { data: onboarding, error } = await (supabase as any)
          .from('supplier_onboarding')
          .select('*')
          .eq('supplier_id', user.id)
          .single();

        if (error || !onboarding) {
          toast({
            title: "שגיאה",
            description: "לא נמצאו נתוני רישום. אנא התחילו מחדש.",
            variant: "destructive",
          });
          navigate('/supplier/register');
          return;
        }

        setOnboardingData(onboarding);

        // בדיקה אם המשתמש בשלב הנכון
        if (step !== (onboarding as any).current_stage) {
          navigate(`/supplier/onboarding/${(onboarding as any).current_stage}`);
        }

      } catch (error) {
        console.error('Error checking user:', error);
        navigate('/supplier/register');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [step, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !onboardingData) {
    return null;
  }

  const renderStepContent = () => {
    switch (step) {
      case 'identity':
        return (
          <SupplierIdentityStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/onboarding/business');
            }}
          />
        );
      case 'business':
        return (
          <SupplierBusinessStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/onboarding/documents');
            }}
          />
        );
      case 'documents':
        return (
          <SupplierDocumentsStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/onboarding/agreements');
            }}
          />
        );
      case 'agreements':
        return (
          <SupplierAgreementsStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/onboarding/calendar');
            }}
          />
        );
      case 'calendar':
        return (
          <SupplierCalendarStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/onboarding/first_product');
            }}
          />
        );
      case 'first_product':
        return (
          <SupplierFirstProductStep 
            user={currentUser}
            onboardingData={onboardingData}
            onStepComplete={() => {
              navigate('/supplier/dashboard'); // נוביל לדשבורד הספק
            }}
          />
        );
      case 'completed':
        return (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">ברוכים הבאים!</h2>
              <p className="text-gray-600 mb-8">
                תהליך הרישום הושלם בהצלחה. אתם עכשיו חלק מהפלטפורמה שלנו.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/supplier/dashboard')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  עבור לדשבורד שלי
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  חזור לעמוד הבית
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">שלב לא מזוהה</h2>
            <p className="text-gray-600">השלב "{step}" אינו קיים במערכת</p>
            <Button 
              onClick={() => navigate('/supplier/onboarding/identity')}
              className="mt-4"
            >
              חזור לתחילת התהליך
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ציר התקדמות */}
          <div className="lg:col-span-1">
            <SupplierProgressIndicator 
              currentStep={(onboardingData as any).current_stage}
              completedSteps={(onboardingData as any).completed_stages || []}
            />
          </div>
          
          {/* תוכן השלב */}
          <div className="lg:col-span-3">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOnboardingPage;
