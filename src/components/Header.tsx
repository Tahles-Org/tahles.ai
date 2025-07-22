
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
// import tahlesLogo from '@/assets/tahles-logo.png';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">תכלס</h1>
          </a>
        </div>

        {/* Navigation & Search */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              בית
            </a>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="חיפוש ספקים, מוצרים, קטגוריות..."
                className="w-64 pr-10 h-9"
              />
            </div>
            
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              איך זה עובד
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              צור קשר
            </a>
          </nav>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            הרשמה/התחברות
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            הצטרף כספק
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
