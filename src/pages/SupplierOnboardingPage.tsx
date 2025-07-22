
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SupplierProgressIndicator from '@/components/SupplierProgressIndicator';
import SupplierIdentityStep from '@/components/SupplierIdentityStep';

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
              // עדכון שלב הבא
              navigate('/supplier/onboarding/business');
            }}
          />
        );
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">שלב בפיתוח</h2>
            <p className="text-gray-600">השלב "{step}" נמצא בפיתוח</p>
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
