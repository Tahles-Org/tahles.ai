
import React from 'react';
import { Search, Users, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'חפשו והשוו',
      description: 'מצאו את הספק המושלם מתוך מאות אפשרויות מוודקות'
    },
    {
      icon: Users,
      title: 'בצעו הזמנה',
      description: 'הזמינו את השירותים הנחוצים לכם, בקלות, במחיר אטרקטיבי, בלי לשבור את הראש ובלי לבזבז זמן יקר'
    },
    {
      icon: CheckCircle,
      title: 'קבלו את השירות',
      description: 'נהנים משירות מנצח, ספקים מחייכים והזדמנות מעולה לשנות את אופן הפקת האירועים הבאים שלכם, עם קאשבק חוזר לשימוש באתר - למי שמדרג'
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">לקוחות בוחרים תכלס כי...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
