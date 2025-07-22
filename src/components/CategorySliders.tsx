
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';

const CategorySliders = () => {
  // Mock data for our recommendations - חבילות מומלצות
  const ourRecommendations = [
    {
      id: 1,
      name: "חבילת חתונה VIP",
      category: "חבילות חתונה",
      description: "פתרון מלא לחתונה - צילום, DJ ואולם",
      originalPrice: "45,000 ₪",
      discountPrice: "38,000 ₪",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      savings: "7,000 ₪ חיסכון",
      rating: 4.9,
      reviews: 156,
      location: "תל אביב"
    },
    {
      id: 2,
      name: "חבילת בר מצווה מושלמת",
      category: "חבילות בר מצווה",
      description: "כל מה שצריך לבר מצווה מושלם",
      originalPrice: "25,000 ₪", 
      discountPrice: "21,000 ₪",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400",
      savings: "4,000 ₪ חיסכון",
      rating: 4.8,
      reviews: 89,
      location: "ירושלים"
    },
    {
      id: 3,
      name: "חבילת יום הולדת מיוחדת",
      category: "חבילות יום הולדת",
      description: "חגיגה בלתי נשכחת ליום הולדת",
      originalPrice: "15,000 ₪",
      discountPrice: "12,500 ₪",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
      savings: "2,500 ₪ חיסכון",
      rating: 4.7,
      reviews: 134,
      location: "חיפה"
    },
    {
      id: 4,
      name: "חבילת אירוע עסקי",
      category: "אירועים עסקיים",
      description: "פתרון מקצועי לאירועי חברה",
      originalPrice: "35,000 ₪",
      discountPrice: "29,000 ₪",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      savings: "6,000 ₪ חיסכון",
      rating: 4.6,
      reviews: 78,
      location: "רמת גן"
    },
    {
      id: 5,
      name: "חבילת חתונה כפרית",
      category: "חתונות כפריות",
      description: "חתונה רומנטית בטבע",
      originalPrice: "40,000 ₪",
      discountPrice: "34,000 ₪",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
      savings: "6,000 ₪ חיסכון",
      rating: 4.9,
      reviews: 203,
      location: "גליל"
    },
    {
      id: 6,
      name: "חבילת אירוע קונספט",
      category: "אירועי קונספט",
      description: "אירוע מיוחד עם עיצוב קונספטואלי",
      originalPrice: "50,000 ₪",
      discountPrice: "42,000 ₪",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      savings: "8,000 ₪ חיסכון",
      rating: 4.8,
      reviews: 167,
      location: "תל אביב"
    }
  ];

  // Mock data for innovations - חידושים בתכלס
  const innovations = [
    {
      id: 1,
      name: "צילום דרון 4K מתקדם",
      category: "צילום אווירי",
      badge: "חדש",
      startingPrice: 800,
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400",
      rating: 4.9,
      reviews: 45,
      location: "ארצי"
    },
    {
      id: 2,
      name: "תאורה חכמה ואפקטים",
      category: "תאורה ואפקטים",
      badge: "פופולרי",
      startingPrice: 1200,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400",
      rating: 4.8,
      reviews: 78,
      location: "תל אביב"
    },
    {
      id: 3,
      name: "DJ עם ציוד VR",
      category: "מוזיקה וטכנולוגיה",
      badge: "חדש",
      startingPrice: 2500,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      rating: 4.7,
      reviews: 62,
      location: "ירושלים"
    },
    {
      id: 4,
      name: "קונספט מטבח מולקולרי",
      category: "קולינריה מתקדמת",
      badge: "חדש",
      startingPrice: 3500,
      image: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=400",
      rating: 4.9,
      reviews: 34,
      location: "תל אביב"
    },
    {
      id: 5,
      name: "פינת קוקטיילים מקצועית",
      category: "משקאות ובר",
      badge: "פופולרי",
      startingPrice: 1500,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
      rating: 4.6,
      reviews: 89,
      location: "חיפה"
    },
    {
      id: 6,
      name: "סטודיו 360 לצילום",
      category: "צילום מתקדם",
      badge: "חדש",
      startingPrice: 2200,
      image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400",
      rating: 4.8,
      reviews: 56,
      location: "רמת גן"
    },
    {
      id: 7,
      name: "הפקת אירועים וירטואליים",
      category: "טכנולוגיה",
      badge: "חדש",
      startingPrice: 4000,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      rating: 4.7,
      reviews: 23,
      location: "ארצי"
    },
    {
      id: 8,
      name: "קיר פרחים אינטראקטיבי",
      category: "עיצוב וחוויה",
      badge: "פופולרי",
      startingPrice: 1800,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
      rating: 4.9,
      reviews: 112,
      location: "תל אביב"
    }
  ];

  const RecommendationCard = ({ item }: { item: any }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          {item.category}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{item.rating}</span>
          <span className="text-xs text-muted-foreground">({item.reviews})</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-orange-600">{item.discountPrice}</span>
          <span className="text-sm line-through text-muted-foreground">{item.originalPrice}</span>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {item.savings}
        </Badge>
      </CardContent>
    </Card>
  );

  const InnovationCard = ({ item }: { item: any }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          {item.category}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{item.rating}</span>
          <span className="text-xs text-muted-foreground">({item.reviews})</span>
        </div>
        <Badge className={`absolute top-12 right-3 ${item.badge === 'חדש' ? 'bg-blue-500' : 'bg-orange-500'}`}>
          {item.badge}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
        
        <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>

        <div className="text-lg font-bold text-primary">
          החל מ-₪{item.startingPrice.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Our Recommendations */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">ההמלצות שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ourRecommendations.slice(0, 6).map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              עוד המלצות
            </Button>
          </div>
        </div>
      </section>

      {/* Innovations in Takhles */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">חידושים בתכלס</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {innovations.slice(0, 8).map((item) => (
              <InnovationCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              עוד חידושים
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategorySliders;
