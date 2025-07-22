
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Building, Phone, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SupplierRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    businessType: 'עוסק פטור'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^05[0-9]-?[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "שגיאה",
        description: "אנא הכניסו מספר טלפון תקין (050-1234567)",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "שגיאה",
        description: "הסיסמה חייבת להכיל לפחות 6 תווים",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // יצירת משתמש חדש ב-Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/supplier/onboarding/identity`,
          data: {
            name: formData.contactName,
            business_name: formData.businessName,
            user_type: 'supplier'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // יצירת רשומה בטבלת suppliers
        const { error: supplierError } = await supabase
          .from('suppliers')
          .insert([
            {
              id: authData.user.id,
              business_name: formData.businessName,
              business_type: formData.businessType,
              tax_id: '', // יתמלא בשלבים הבאים
              is_active: false, // יופעל אחרי אישור
              is_suspended: false
            }
          ]);

        if (supplierError) throw supplierError;

        // יצירת רשומה בטבלת supplier_onboarding
        const { error: onboardingError } = await (supabase as any)
          .from('supplier_onboarding')
          .insert([
            {
              supplier_id: authData.user.id,
              current_stage: 'identity',
              completed_stages: [],
              verification_data: {
                contact_name: formData.contactName,
                phone: formData.phone,
                email: formData.email
              }
            }
          ]);

        if (onboardingError) throw onboardingError;

        toast({
          title: "הרשמה הושלמה בהצלחה!",
          description: "אנא בדקו את האימייל שלכם לאימות הכתובת",
        });

        // מעבר לשלב הזהות של ה-onboarding
        navigate('/supplier/onboarding/identity');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "שגיאה ברישום",
        description: error.message || "אירעה שגיאה במהלך הרישום",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
              <h1 className="text-2xl font-bold text-white">תכלס</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">הצטרפות כספק</h2>
            <p className="text-gray-600 text-lg">הפלטפורמה המובילה לספקי אירועים</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-purple-100 rounded-full">
                  <UserPlus className="h-6 w-6 text-purple-600" />
                </div>
                רישום ספק חדש
              </CardTitle>
              <p className="text-gray-600 mt-2">מלאו את הפרטים להצטרפות למערכת</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3 text-right">
                  <Label htmlFor="business-name" className="text-lg font-medium text-gray-700 block">
                    שם העסק *
                  </Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      id="business-name"
                      placeholder="הכניסו את שם העסק" 
                      className="pr-10 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      style={{ textAlign: 'right' }}
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <Label htmlFor="contact-name" className="text-lg font-medium text-gray-700 block">
                    שם איש קשר *
                  </Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      id="contact-name"
                      placeholder="הכניסו את שם איש הקשר" 
                      className="pr-10 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      style={{ textAlign: 'right' }}
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <Label htmlFor="email" className="text-lg font-medium text-gray-700 block">
                    כתובת אימייל *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="name@example.com" 
                      className="pr-10 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      style={{ textAlign: 'right' }}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <Label htmlFor="phone" className="text-lg font-medium text-gray-700 block">
                    מספר טלפון *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="050-1234567" 
                      className="pr-10 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      style={{ textAlign: 'right' }}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  {formData.phone && !validatePhone(formData.phone) && (
                    <p className="text-red-500 text-sm text-right">אנא הכניסו מספר טלפון תקין (050-1234567)</p>
                  )}
                </div>

                <div className="space-y-3 text-right">
                  <Label htmlFor="business-type" className="text-lg font-medium text-gray-700 block">
                    סוג עסק *
                  </Label>
                  <select 
                    id="business-type"
                    className="w-full h-12 p-3 border border-gray-300 rounded-md bg-white text-right focus:border-purple-500 focus:ring-purple-500"
                    style={{ textAlign: 'right' }}
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                  >
                    <option value="עוסק פטור">עוסק פטור</option>
                    <option value="עוסק מורשה">עוסק מורשה</option>
                    <option value="חברה">חברה</option>
                    <option value="עמותה">עמותה</option>
                    <option value="שותפות">שותפות</option>
                  </select>
                </div>

                <div className="space-y-3 text-right">
                  <Label htmlFor="password" className="text-lg font-medium text-gray-700 block">
                    סיסמה *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="בחרו סיסמה חזקה" 
                      className="pr-10 pl-10 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      style={{ textAlign: 'right' }}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "נרשם..." : "הרשמה למערכת"}
                </Button>
                
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  בהרשמה למערכת אתם מסכימים 
                  <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-800">
                    לתנאי השימוש
                  </Button>
                  {" ו"}
                  <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-800">
                    למדיניות הפרטיות
                  </Button>
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="link" className="text-gray-600 hover:text-gray-800 text-lg" asChild>
              <a href="/">← חזרה לעמוד הראשי</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegisterPage;
