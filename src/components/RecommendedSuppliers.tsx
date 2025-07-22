
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';

const RecommendedSuppliers = () => {
  const suppliers = [
    {
      id: 1,
      name: 'סטודיו צילום מקצועי',
      category: 'צילום',
      rating: 4.8,
      reviews: 124,
      startingPrice: 2500,
      image: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400',
      location: 'תל אביב'
    },
    {
      id: 2,
      name: 'DJ אלכס - מוזיקה לאירועים',
      category: 'מוזיקה',
      rating: 4.9,
      reviews: 89,
      startingPrice: 1800,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      location: 'ירושלים'
    },
    {
      id: 3,
      name: 'אולם אירועים גלריה',
      category: 'לוקיישנים',
      rating: 4.7,
      reviews: 156,
      startingPrice: 5000,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
      location: 'חיפה'
    },
    {
      id: 4,
      name: 'שף פרטי למסיבות',
      category: 'מזון',
      rating: 4.6,
      reviews: 67,
      startingPrice: 1200,
      image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=400',
      location: 'רמת גן'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">הספקים הכי מדורגים השבוע</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={supplier.image} 
                  alt={supplier.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                  {supplier.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{supplier.name}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{supplier.rating}</span>
                  <span className="text-sm text-muted-foreground">({supplier.reviews})</span>
                </div>

                <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{supplier.location}</span>
                </div>

                <div className="text-lg font-bold text-primary">
                  החל מ-₪{supplier.startingPrice.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSuppliers;
