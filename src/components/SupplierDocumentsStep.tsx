
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierDocumentsStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierDocumentsStep: React.FC<SupplierDocumentsStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({
    businessLicense: false,
    taxCertificate: false,
    bankStatement: false,
    insurance: false
  });

  const requiredDocuments = [
    {
      key: 'businessLicense',
      label: 'רישיון עסק',
      description: 'רישיון עסק בתוקף מהרשות המקומית',
      required: true
    },
    {
      key: 'taxCertificate',
      label: 'אישור ניהול ספרים',
      description: 'אישור רואה חשבון או פטור מניהול ספרים',
      required: true
    },
    {
      key: 'bankStatement',
      label: 'אישור פרטי בנק',
      description: 'אישור פרטי חשבון בנק לצורך העברות כספים',
      required: true
    },
    {
      key: 'insurance',
      label: 'ביטוח אחריות מקצועית',
      description: 'ביטוח אחריות מקצועית (אם רלוונטי)',
      required: false
    }
  ];

  const handleFileUpload = async (file: File, docType: string) => {
    try {
      setIsLoading(true);
      
      const fileName = `${user.id}/documents/${docType}_${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('supplier-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save document record
      const { error: docError } = await (supabase as any)
        .from('supplier_documents')
        .insert([
          {
            supplier_id: user.id,
            document_type: docType,
            document_url: fileName,
            document_name: file.name,
            is_required: requiredDocuments.find(doc => doc.key === docType)?.required || false
          }
        ]);

      if (docError) throw docError;

      setUploadedDocs(prev => ({ ...prev, [docType]: true }));
      
      toast({
        title: "המסמך הועלה בהצלחה",
        description: `${requiredDocuments.find(doc => doc.key === docType)?.label} הועלה למערכת`,
      });

    } catch (error: any) {
      console.error('Document upload error:', error);
      toast({
        title: "שגיאה בהעלאת המסמך",
        description: error.message || "אירעה שגיאה בהעלאת הקובץ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteStep = async () => {
    const requiredDocsUploaded = requiredDocuments
      .filter(doc => doc.required)
      .every(doc => uploadedDocs[doc.key as keyof typeof uploadedDocs]);

    if (!requiredDocsUploaded) {
      toast({
        title: "מסמכים חסרים",
        description: "אנא העלו את כל המסמכים הנדרשים לפני המעבר לשלב הבא",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Update onboarding stage
      const { error } = await (supabase as any)
        .from('supplier_onboarding')
        .update({
          current_stage: 'agreements',
          completed_stages: [...(onboardingData.completed_stages || []), 'documents']
        })
        .eq('supplier_id', user.id);

      if (error) throw error;

      toast({
        title: "המסמכים הועלו בהצלחה!",
        description: "עוברים לשלב הבא - חתימה על הסכמים",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete documents step error:', error);
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
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            העלאת מסמכים
          </CardTitle>
          <p className="text-gray-600 mt-2">אנא העלו את המסמכים הנדרשים לאימות העסק</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {requiredDocuments.map((doc) => (
            <div key={doc.key} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-800">{doc.label}</h3>
                    {doc.required && (
                      <span className="text-red-500 text-sm">*נדרש</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
                
                {uploadedDocs[doc.key as keyof typeof uploadedDocs] ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">הועלה</span>
                  </div>
                ) : doc.required ? (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">נדרש</span>
                  </div>
                ) : null}
              </div>

              {!uploadedDocs[doc.key as keyof typeof uploadedDocs] && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, doc.key);
                      }}
                    />
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">לחצו להעלאת קובץ</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG עד 10MB</p>
                  </label>
                </div>
              )}
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">הערה חשובה</h4>
                <p className="text-sm text-blue-700">
                  כל המסמכים עוברים בדיקה ואימות על ידי הצוות שלנו. 
                  תהליך האימות לוקח בדרך כלל 1-2 ימי עסקים.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "שומר..." : "המשך לשלב הבא"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDocumentsStep;
