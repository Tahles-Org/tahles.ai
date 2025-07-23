
import React from 'react';

const SimpleHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
          פתרונות הפקה במרחק לחיצה
        </h1>
        <p className="text-xl lg:text-2xl mb-8 text-blue-100">
          הספקים המובילים לכל אירוע - במחיר מנצח והזמנה מיידית
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-lg">מוכן לפרסום! 🚀</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;
