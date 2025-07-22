
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">תחלים</h3>
            <p className="text-gray-300 mb-4">
              הפלטפורמה המובילה לחיבור בין לקוחות לספקי שירותים מקצועיים
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400 transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-300 transition-colors" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">קטגוריות</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">הרצאות והכשרות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">טיולים ואטרקציות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">לוקיישנים</a></li>
              <li><a href="#" className="hover:text-white transition-colors">מזון ומשקאות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">שירותי הפקה</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">איך זה עובד</a></li>
              <li><a href="#" className="hover:text-white transition-colors">הצטרף כספק</a></li>
              <li><a href="#" className="hover:text-white transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">שאלות נפוצות</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>03-1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>info@tahles.co.il</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 תחלים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
