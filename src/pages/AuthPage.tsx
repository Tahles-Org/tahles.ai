
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, LogIn, Settings, Phone, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'customer'
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleLoginInputChange = (field: keyof typeof loginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignupInputChange = (field: keyof typeof signupData, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^05[0-9]-?[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "התחברות הצליחה!",
        description: "ברוכים הבאים בחזרה",
      });

      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "שגיאה בהתחברות",
        description: error.message || "אירעה שגיאה במהלך ההתחברות",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.phone || !signupData.password) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(signupData.phone)) {
      toast({
        title: "שגיאה",
        description: "אנא הכניסו מספר טלפון תקין (050-1234567)",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "שגיאה",
        description: "הסיסמה חייבת להכיל לפחות 6 תווים",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: signupData.name,
            phone: signupData.phone,
            user_type: signupData.userType
          }
        }
      });

      if (error) throw error;

      toast({
        title: "הרשמה הושלמה בהצלחה!",
        description: "אנא בדקו את האימייל שלכם לאימות הכתובת",
      });

      // Clear form
      setSignupData({
        name: '',
        email: '',
        phone: '',
        password: '',
        userType: 'customer'
      });

    } catch (error: any) {
      console.error('Signup error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Logo Section with Enhanced Design */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
              <h1 className="text-2xl font-bold text-white">תכלס</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">ברוכים הבאים לתכלס</h2>
            <p className="text-gray-600 text-lg">הפלטפורמה המובילה לספקי אירועים</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="login" className="text-lg py-3">התחברות</TabsTrigger>
              <TabsTrigger value="signup" className="text-lg py-3">הרשמה</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <LogIn className="h-6 w-6 text-blue-600" />
                    </div>
                    התחברות למערכת
                  </CardTitle>
                  <p className="text-gray-600 mt-2">היכנסו לחשבון שלכם כדי להמשיך</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3 text-right">
                      <Label htmlFor="login-email" className="text-lg font-medium text-gray-700 block">
                        כתובת אימייל *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="login-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pr-10 h-12 text-right border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          style={{ textAlign: 'right' }}
                          value={loginData.email}
                          onChange={(e) => handleLoginInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-right">
                      <Label htmlFor="login-password" className="text-lg font-medium text-gray-700 block">
                        סיסמה *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="login-password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="הכניסו את הסיסמה שלכם" 
                          className="pr-10 pl-10 h-12 text-right border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          style={{ textAlign: 'right' }}
                          value={loginData.password}
                          onChange={(e) => handleLoginInputChange('password', e.target.value)}
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
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          מתחבר...
                        </div>
                      ) : (
                        "התחברות"
                      )}
                    </Button>
                  </form>
                  
                  <div className="text-center">
                    <Button variant="link" className="text-blue-600 hover:text-blue-800">
                      שכחתם את הסיסמה?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-800">
                    <div className="p-2 bg-green-100 rounded-full">
                      <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                    הרשמה למערכת
                  </CardTitle>
                  <p className="text-gray-600 mt-2">צרו חשבון חדש והצטרפו אלינו</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-3 text-right">
                      <Label htmlFor="signup-name" className="text-lg font-medium text-gray-700 block">
                        שם מלא *
                      </Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="signup-name" 
                          placeholder="הכניסו את השם המלא שלכם" 
                          className="pr-10 h-12 text-right border-gray-300 focus:border-green-500 focus:ring-green-500"
                          style={{ textAlign: 'right' }}
                          value={signupData.name}
                          onChange={(e) => handleSignupInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-right">
                      <Label htmlFor="signup-email" className="text-lg font-medium text-gray-700 block">
                        כתובת אימייל *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pr-10 h-12 text-right border-gray-300 focus:border-green-500 focus:ring-green-500"
                          style={{ textAlign: 'right' }}
                          value={signupData.email}
                          onChange={(e) => handleSignupInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3 text-right">
                      <Label htmlFor="signup-phone" className="text-lg font-medium text-gray-700 block">
                        מספר טלפון *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="signup-phone" 
                          type="tel" 
                          placeholder="050-1234567" 
                          className="pr-10 h-12 text-right border-gray-300 focus:border-green-500 focus:ring-green-500"
                          style={{ textAlign: 'right' }}
                          value={signupData.phone}
                          onChange={(e) => handleSignupInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      {signupData.phone && !validatePhone(signupData.phone) && (
                        <p className="text-red-500 text-sm text-right">אנא הכניסו מספר טלפון תקין (050-1234567)</p>
                      )}
                    </div>
                    
                    <div className="space-y-3 text-right">
                      <Label htmlFor="signup-password" className="text-lg font-medium text-gray-700 block">
                        סיסמה *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          id="signup-password" 
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="בחרו סיסמה חזקה" 
                          className="pr-10 pl-10 h-12 text-right border-gray-300 focus:border-green-500 focus:ring-green-500"
                          style={{ textAlign: 'right' }}
                          value={signupData.password}
                          onChange={(e) => handleSignupInputChange('password', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-right">
                      <Label htmlFor="user-type" className="text-lg font-medium text-gray-700 block">
                        סוג משתמש *
                      </Label>
                      <select 
                        id="user-type" 
                        className="w-full h-12 p-3 border border-gray-300 rounded-md bg-white text-right focus:border-green-500 focus:ring-green-500"
                        style={{ textAlign: 'right' }}
                        value={signupData.userType}
                        onChange={(e) => handleSignupInputChange('userType', e.target.value)}
                      >
                        <option value="customer">לקוח</option>
                        <option value="supplier">ספק</option>
                      </select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          נרשם...
                        </div>
                      ) : (
                        "הרשמה למערכת"
                      )}
                    </Button>
                  </form>
                  
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    בהרשמה למערכת אתם מסכימים 
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                      לתנאי השימוש
                    </Button>
                    {" ו"}
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                      למדיניות הפרטיות
                    </Button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Admin Dashboard Access */}
          <Card className="mt-8 backdrop-blur-sm bg-white/80 shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-xl text-gray-700">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                כניסה לדשבורד ניהולי
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full h-11 border-purple-300 text-purple-700 hover:bg-purple-50" asChild>
                <Link to="/admin">דשבורד ניהולי</Link>
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                זמין למנהלי המערכת בלבד
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="link" className="text-gray-600 hover:text-gray-800 text-lg" asChild>
              <Link to="/">← חזרה לעמוד הראשי</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
