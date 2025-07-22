import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin } from 'lucide-react';

const CategorySliders = () => {
  // Mock data for suppliers
  const topSuppliers = [
    {
      id: 1,
      name: "סטודיו פלוס",
      category: "צילום",
      rating: 4.9,
      reviews: 127,
      price: "מ-2,500 ₪",
      image: "/placeholder.svg",
      responseTime: "תוך שעה",
      location: "תל אביב"
    },
    {
      id: 2,
      name: "DJ מקצועי",
      category: "מוזיקה",
      rating: 4.8,
      reviews: 89,
      price: "מ-1,800 ₪", 
      image: "/placeholder.svg",
      responseTime: "תוך 30 דקות",
      location: "ירושלים"
    },
    {
      id: 3,
      name: "אולם רויאל",
      category: "אולמות",
      rating: 4.7,
      reviews: 203,
      price: "מ-15,000 ₪",
      image: "/placeholder.svg", 
      responseTime: "תוך יום",
      location: "רמת גן"
    }
  ];

  const ourRecommendations = [
    {
      id: 1,
      name: "חבילת חתונה VIP",
      description: "פתרון מלא לחתונה - צילום, DJ ואולם",
      originalPrice: "45,000 ₪",
      discountPrice: "38,000 ₪",
      image: "/placeholder.svg",
      savings: "7,000 ₪ חיסכון"
    },
    {
      id: 2,
      name: "חבילת בר מצווה",
      description: "כל מה שצריך לבר מצווה מושלם",
      originalPrice: "25,000 ₪", 
      discountPrice: "21,000 ₪",
      image: "/placeholder.svg",
      savings: "4,000 ₪ חיסכון"
    }
  ];

  const newInSystem = [
    {
      id: 1,
      name: "דרון צילום מתקדם",
      category: "צילום אווירי",
      badge: "חדש",
      price: "מ-800 ₪",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "תאורה חכמה",
      category: "תאורה ואפקטים",
      badge: "פופולרי",
      price: "מ-1,200 ₪",
      image: "/placeholder.svg"
    }
  ];

  const SupplierCard = ({ supplier }: { supplier: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer min-w-80">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img 
            src={supplier.image} 
            alt={supplier.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{supplier.name}</h3>
                <p className="text-sm text-muted-foreground">{supplier.category}</p>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{supplier.rating}</span>
                  <span className="text-sm text-muted-foreground">({supplier.reviews})</span>
                </div>
                <p className="font-bold text-orange-600">{supplier.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{supplier.responseTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{supplier.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RecommendationCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer min-w-80">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-600">{item.discountPrice}</span>
              <span className="text-sm line-through text-muted-foreground">{item.originalPrice}</span>
            </div>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
              {item.savings}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const NewItemCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer min-w-64">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-32 rounded-lg object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${item.badge === 'חדש' ? 'bg-blue-500' : 'bg-orange-500'}`}>
            {item.badge}
          </Badge>
        </div>
        <h3 className="font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
        <p className="font-bold text-orange-600">{item.price}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-16">
      {/* Top Suppliers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">הספקים המדורגים השבוע</h2>
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {topSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Recommendations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ההמלצות שלנו</h2>
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {ourRecommendations.map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* New in System */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">חדש במערכת תכלס</h2>
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {newInSystem.map((item) => (
              <NewItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategorySliders;