
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Settings, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupplierCalendarStepProps {
  user: any;
  onboardingData: any;
  onStepComplete: () => void;
}

const SupplierCalendarStep: React.FC<SupplierCalendarStepProps> = ({
  user,
  onboardingData,
  onStepComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  
  const [workingHours, setWorkingHours] = useState({
    sunday: { enabled: true, start: '09:00', end: '17:00' },
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '14:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' }
  });

  const [calendarSettings, setCalendarSettings] = useState({
    bufferTime: '30', // דקות מרווח בין פגישות
    maxBookingsPerDay: '5',
    advanceBookingDays: '30', // כמה ימים מראש ניתן להזמין
    autoConfirm: false
  });

  const daysInHebrew = {
    sunday: 'ראשון',
    monday: 'שני',
    tuesday: 'שלישי',
    wednesday: 'רביעי',
    thursday: 'חמישי',
    friday: 'שישי',
    saturday: 'שבת'
  };

  const handleDayToggle = (day: string, enabled: boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], enabled }
    }));
  };

  const handleTimeChange = (day: string, timeType: 'start' | 'end', value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [timeType]: value }
    }));
  };

  const handleCalendarConnect = async () => {
    // בפרודקשן זה יהיה אינטגרציה עם Google Calendar / Outlook
    setIsLoading(true);
    
    // סימולציה של חיבור יומן
    setTimeout(() => {
      setCalendarConnected(true);
      setIsLoading(false);
      toast({
        title: "היומן חובר בהצלחה",
        description: "כעת תוכלו לנהל את הזמינות שלכם",
      });
    }, 2000);
  };

  const handleCompleteStep = async () => {
    try {
      setIsLoading(true);

      // שמירת הגדרות יומן ב-supplier_onboarding
      const { error: onboardingError } = await supabase
        .from('supplier_onboarding')
        .update({
          current_stage: 'first_product',
          completed_stages: [...(onboardingData.completed_stages || []), 'calendar'],
          verification_data: {
            ...onboardingData.verification_data,
            calendar: {
              working_hours: workingHours,
              calendar_settings: calendarSettings,
              calendar_connected: calendarConnected
            }
          }
        })
        .eq('supplier_id', user.id);

      if (onboardingError) throw onboardingError;

      toast({
        title: "הגדרות היומן נשמרו!",
        description: "עוברים לשלב הבא - הוספת המוצר הראשון",
      });

      onStepComplete();

    } catch (error: any) {
      console.error('Complete calendar step error:', error);
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בשמירת הגדרות היומן",
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
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            הגדרת יומן וזמינות
          </CardTitle>
          <p className="text-gray-600 mt-2">הגדירו את שעות הפעילות וחברו את היומן שלכם</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* חיבור יומן */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right flex items-center gap-2">
                <Settings className="h-5 w-5" />
                חיבור יומן
              </h3>
            </CardHeader>
            <CardContent>
              {calendarConnected ? (
                <div className="flex items-center justify-center gap-3 text-green-600 p-4">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-medium">היומן חובר בהצלחה</span>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">חברו את היומן שלכם לניהול זמינות אוטומטי</p>
                  <Button onClick={handleCalendarConnect} disabled={isLoading} className="mx-auto">
                    {isLoading ? "מחבר..." : "חבר יומן Google"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* שעות עבודה */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right flex items-center gap-2">
                <Clock className="h-5 w-5" />
                שעות עבודה שבועיות
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Checkbox
                    checked={hours.enabled}
                    onCheckedChange={(checked) => handleDayToggle(day, checked as boolean)}
                  />
                  
                  <div className="flex-1 text-right">
                    <span className="font-medium text-gray-700">
                      {daysInHebrew[day as keyof typeof daysInHebrew]}
                    </span>
                  </div>

                  {hours.enabled && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                        className="w-24"
                      />
                      <span className="text-gray-500">עד</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* הגדרות מתקדמות */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 text-right">הגדרות מתקדמות</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-right">מרווח בין פגישות (דקות)</Label>
                  <Input
                    type="number"
                    value={calendarSettings.bufferTime}
                    onChange={(e) => setCalendarSettings(prev => ({ ...prev, bufferTime: e.target.value }))}
                    className="text-right"
                    style={{ textAlign: 'right' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-right">מקסימום הזמנות ביום</Label>
                  <Input
                    type="number"
                    value={calendarSettings.maxBookingsPerDay}
                    onChange={(e) => setCalendarSettings(prev => ({ ...prev, maxBookingsPerDay: e.target.value }))}
                    className="text-right"
                    style={{ textAlign: 'right' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-right">הזמנה מראש (ימים)</Label>
                  <Input
                    type="number"
                    value={calendarSettings.advanceBookingDays}
                    onChange={(e) => setCalendarSettings(prev => ({ ...prev, advanceBookingDays: e.target.value }))}
                    className="text-right"
                    style={{ textAlign: 'right' }}
                  />
                </div>

                <div className="flex items-center space-x-2 justify-end">
                  <Label className="text-right cursor-pointer">אישור אוטומטי להזמנות</Label>
                  <Checkbox
                    checked={calendarSettings.autoConfirm}
                    onCheckedChange={(checked) => setCalendarSettings(prev => ({ ...prev, autoConfirm: checked as boolean }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCompleteStep}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "שומר..." : "שמור הגדרות והמשך"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierCalendarStep;
