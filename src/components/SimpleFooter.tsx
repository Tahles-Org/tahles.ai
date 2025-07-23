
import React from 'react';

const SimpleFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">תכלס</h3>
          <p className="text-gray-300 mb-4">
            פלטפורמת הספקים הגדולה בישראל - מחברת בין לקוחות לספקים באמינות ובמקצועיות
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse">
            <a href="#" className="text-gray-300 hover:text-white">אודות</a>
            <a href="#" className="text-gray-300 hover:text-white">צור קשר</a>
            <a href="#" className="text-gray-300 hover:text-white">תנאי שימוש</a>
            <a href="#" className="text-gray-300 hover:text-white">מדיניות פרטיות</a>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            © 2024 תכלס. כל הזכויות שמורות.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
