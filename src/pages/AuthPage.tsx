import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, LogIn, Settings } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-primary">תכלס</h1>
            </a>
            <p className="text-muted-foreground mt-2">הרשמה והתחברות למערכת</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">התחברות</TabsTrigger>
              <TabsTrigger value="signup">הרשמה</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    התחברות למערכת
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">אימייל</Label>
                    <Input id="email" type="email" placeholder="הכנס את האימייל שלך" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">סיסמה</Label>
                    <Input id="password" type="password" placeholder="הכנס את הסיסמה שלך" />
                  </div>
                  <Button className="w-full">התחבר</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    הרשמה למערכת
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">שם מלא</Label>
                    <Input id="signup-name" placeholder="הכנס את השם המלא שלך" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">אימייל</Label>
                    <Input id="signup-email" type="email" placeholder="הכנס את האימייל שלך" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">סיסמה</Label>
                    <Input id="signup-password" type="password" placeholder="הכנס סיסמה" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-type">סוג משתמש</Label>
                    <select id="user-type" className="w-full p-2 border rounded-md bg-background">
                      <option value="customer">לקוח</option>
                      <option value="supplier">ספק</option>
                    </select>
                  </div>
                  <Button className="w-full">הירשם</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Admin Dashboard Access */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center">
                <Settings className="h-5 w-5" />
                כניסה לדשבורד ניהולי
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/admin">דשבורד ניהולי</a>
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                זמין למנהלי המערכת בלבד
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button variant="link" asChild>
              <a href="/">חזרה לעמוד הראשי</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;