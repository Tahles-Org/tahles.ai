import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Mic, Music, Drama, Gift, Users2, PartyPopper, Clapperboard, Gamepad2 } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [activeFilter, setActiveFilter] = useState('שעירה יציאה');

  // Subcategories based on the reference image
  const subcategories = [
    { id: 1, name: 'זמרים', icon: Mic, count: 47 },
    { id: 2, name: 'זגים', icon: Users2, count: 23 },
    { id: 3, name: 'ליקנוט', icon: Music, count: 31 },
    { id: 4, name: 'סטנדאפיסטים', icon: Drama, count: 18 },
    { id: 5, name: 'שחקנים', icon: Clapperboard, count: 29 },
    { id: 6, name: 'אמני חושים', icon: Gift, count: 15 },
    { id: 7, name: 'תיאטרון', icon: Drama, count: 12 },
    { id: 8, name: 'קרקס', icon: PartyPopper, count: 8 },
    { id: 9, name: 'מיצגים', icon: Users, count: 21 },
    { id: 10, name: 'תקליטנים', icon: Music, count: 56 },
    { id: 11, name: 'קריוקי', icon: Mic, count: 19 },
    { id: 12, name: 'קוסמים', icon: Gamepad2, count: 34 }
  ];

  const filters = ['שעירה יציאה', 'מחאות'];

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: "אלי כהן - זמר",
      category: "זמרים",
      rating: 4.9,
      reviews: 89,
      location: "תל אביב",
      responseTime: "תוך שעה",
      price: "מ-3,500 ₪",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 2, 
      name: "להקת הרוח",
      category: "זגים",
      rating: 4.8,
      reviews: 127,
      location: "ירושלים", 
      responseTime: "תוך 2 שעות",
      price: "מ-5,000 ₪",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 3,
      name: "DJ פרו",
      category: "תקליטנים",
      rating: 4.7,
      reviews: 203,
      location: "חיפה",
      responseTime: "תוך יום",
      price: "מ-2,800 ₪", 
      image: "/placeholder.svg",
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                מה המופע המבוקש?
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                לורם איפסום דולור סיט אמט, קונסקטורור אדיפיסינג אליט לורם איפסום דולור סיט אמט, אמת.
              </p>
              
              {/* Filters */}
              <div className="flex justify-center gap-4 mb-8">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    className={`${
                      activeFilter === filter 
                        ? "bg-white text-blue-900 hover:bg-gray-100" 
                        : "border-white text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {subcategories.map((subcategory) => {
                const IconComponent = subcategory.icon;
                
                return (
                  <Card 
                    key={subcategory.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-white"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{subcategory.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subcategory.count} ספקים זמינים
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Suppliers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">הספקים המובילים בקטגוריה</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {suppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={supplier.image} 
                        alt={supplier.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {supplier.name}
                              {supplier.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  מאומת
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{supplier.rating}</span>
                          <span className="text-sm text-muted-foreground">({supplier.reviews} ביקורות)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{supplier.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-orange-600">{supplier.price}</span>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        צור קשר
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">לא מצאתם מה שחיפשתם?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              דברו איתנו ונעזור לכם למצוא את הספק המושלם לאירוע שלכם
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                צרו קשר
              </Button>
              <Button size="lg" variant="outline">
                חזרה לעמוד הראשי
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;