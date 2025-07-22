
import React from 'react';
import { CheckCircle, Circle, User, Building, FileText, FileSignature, Calendar, Package } from 'lucide-react';

interface SupplierProgressIndicatorProps {
  currentStep: string;
  completedSteps: string[];
}

const SupplierProgressIndicator: React.FC<SupplierProgressIndicatorProps> = ({ 
  currentStep, 
  completedSteps 
}) => {
  const steps = [
    { key: 'identity', label: 'אימות זהות', icon: User },
    { key: 'business', label: 'פרטי עסק', icon: Building },
    { key: 'documents', label: 'מסמכים', icon: FileText },
    { key: 'agreements', label: 'הסכמים', icon: FileSignature },
    { key: 'calendar', label: 'יומן', icon: Calendar },
    { key: 'first_product', label: 'מוצר ראשון', icon: Package }
  ];

  const getStepStatus = (stepKey: string) => {
    if (completedSteps.includes(stepKey)) return 'completed';
    if (stepKey === currentStep) return 'current';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">התקדמות הרישום</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.key);
          const StepIcon = step.icon;
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(status)}`}>
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <StepIcon className={`h-5 w-5 ${isCurrent ? 'text-purple-600' : 'text-gray-400'}`} />
                )}
              </div>
              
              <div className="flex-1 text-right">
                <div className={`font-medium ${isCurrent ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                  {step.label}
                </div>
                <div className="text-sm text-gray-400">
                  שלב {index + 1} מתוך {steps.length}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`absolute right-11 mt-10 w-0.5 h-6 ${isCompleted ? 'bg-green-200' : 'bg-gray-200'}`} 
                     style={{ transform: 'translateY(100%)', marginTop: '8px' }} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 text-right">
          הושלמו {completedSteps.length} מתוך {steps.length} שלבים
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierProgressIndicator;
