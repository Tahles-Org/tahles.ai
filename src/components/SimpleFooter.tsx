
import React from 'react';

const SimpleFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">תכלס</h3>
            <p className="text-gray-300">
              הפלטפורמה המובילה לחיבור בין לקוחות לספקי שירותים מקצועיים
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים</h4>
            <ul className="space-y-2 text-gray-300">
              <li>איך זה עובד</li>
              <li>הצטרף כספק</li>
              <li>צור קשר</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <div className="space-y-2 text-gray-300">
              <p>📞 03-1234567</p>
              <p>✉️ info@tahles.co.il</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 תכלס. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
