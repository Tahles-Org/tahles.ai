
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import CategorySliders from '@/components/CategorySliders';
import HowItWorks from '@/components/HowItWorks';
import RecommendedSuppliers from '@/components/RecommendedSuppliers';
import Footer from '@/components/Footer';

const Index = () => {
  console.log('🔍 Index page is rendering - this should appear in browser console');
  console.log('📊 Current timestamp:', new Date().toISOString());
  
  React.useEffect(() => {
    console.log('✅ Index page mounted successfully');
    console.log('🌐 Window location:', window.location.href);
    console.log('📱 User agent:', navigator.userAgent);
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <HeroSection />
      <CategoriesGrid categories={[]} isLoading={false} />
      <CategorySliders />
      <HowItWorks />
      <RecommendedSuppliers />
      <Footer />
    </div>
  );
};

export default Index;
