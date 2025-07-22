
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Users, CheckCircle, Star, Shield, Clock } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Search,
      title: 'חפשו והשוו',
      description: 'מצאו את הספק המושלם מתוך מאות אפשרויות מוודקות',
      details: 'השתמשו במנוע החיפוש המתקדם שלנו כדי למצוא ספקים לפי אזור, תקציב, סגנון ועוד פרמטרים'
    },
    {
      icon: Users,
      title: 'צרו קשר',
      description: 'פנו ישירות לספקים וקבלו הצעות מחיר מותאמות',
      details: 'צרו קשר עם הספקים שבחרתם בקליק אחד וקבלו הצעות מחיר מפורטות תוך 24 שעות'
    },
    {
      icon: CheckCircle,
      title: 'הזמינו בביטחון',
      description: 'סגרו את העסקה בביטחון מלא עם ערבות להחזר כספי',
      details: 'כל ההזמנות מובטחות במערכת הגנת הצרכן שלנו עם אפשרות ביטול עד 48 שעות לפני האירוע'
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: 'ספקים מוודקים',
      description: 'כל הספקים עברו בדיקה יסודית וקיבלו אישור איכות'
    },
    {
      icon: Shield,
      title: 'ביטוח מלא',
      description: 'כל הזמנה מכוסה בביטוח מקיף נגד נזקים או ביטולים'
    },
    {
      icon: Clock,
      title: 'זמינות 24/7',
      description: 'שירות לקוחות זמין בכל שעה לכל שאלה או בעיה'
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">איך זה עובד?</h1>
            <p className="text-xl mb-8 text-blue-100">
              המדריך המלא לקבלת השירותים הטובים ביותר לאירוע שלכם
            </p>
          </div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">3 צעדים פשוטים לאירוע מושלם</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <p className="text-sm text-gray-600">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">למה לבחור בנו?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">שאלות נפוצות</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">כמה זמן לוקח לקבל הצעת מחיר?</h3>
              <p className="text-muted-foreground">רוב הספקים מגיבים תוך 24 שעות. ספקים מובילים עונים תוך מספר שעות.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">האם יש עמלות נסתרות?</h3>
              <p className="text-muted-foreground">לא! כל המחירים שקופים וברורים. אין עמלות נסתרות או תוספות לא צפויות.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">מה קורה אם הספק מבטל?</h3>
              <p className="text-muted-foreground">במקרה נדיר של ביטול מצד הספק, אנחנו נמצא לכם חלופה מתאימה או נחזיר את הכסף במלואו.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
