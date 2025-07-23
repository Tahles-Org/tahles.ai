
import React from 'react';
import { Button } from '@/components/ui/button';

const SimpleHeader = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">תכלס</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            התחברות
          </Button>
          <Button variant="outline" size="sm">
            הרשמה
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
            הצטרף כספק
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
