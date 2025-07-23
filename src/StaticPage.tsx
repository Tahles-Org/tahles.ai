
import React from 'react';

const StaticPage = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">תכלס</h1>
            <nav className="space-x-6 space-x-reverse">
              <a href="#" className="text-gray-600 hover:text-gray-900">בית</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">קטגוריות</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">צור קשר</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">מצא את הספק המושלם</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            פלטפורמת הספקים הגדולה בישראל - הכל במקום אחד
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="חיפוש ספקים..."
                className="flex-1 px-4 py-3 rounded-r-lg border-0 text-gray-900"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-l-lg font-medium">
                חפש
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">הקטגוריות שלנו</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-lg font-semibold">מכוניות</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold">נדל״ן</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-lg font-semibold">שירותים</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="text-lg font-semibold">אוכל</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-semibold">עסקים</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold">אירועים</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-lg font-semibold">בריאות</h3>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-semibold">חינוך</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">איך זה עובד</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">חפש</h3>
              <p className="text-gray-600">מצא את הספק המתאים לך מתוך אלפי ספקים</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">צור קשר</h3>
              <p className="text-gray-600">התחבר ישירות עם הספק וקבל הצעת מחיר</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">סגור עסקה</h3>
              <p className="text-gray-600">סגור את העסקה והתחל לעבוד עם הספק</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">תכלס</h3>
              <p className="text-gray-400">פלטפורמת הספקים הגדולה בישראל</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">קישורים</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">בית</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">קטגוריות</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">איך זה עובד</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ספקים</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">הרשמה</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">התחברות</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">מדריך</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">צור קשר</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">info@tachles.co.il</li>
                <li className="text-gray-400">03-1234567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 תכלס. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StaticPage;
