
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySliders from '@/components/CategorySliders';
import RecommendedSuppliers from '@/components/RecommendedSuppliers';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main>
        <HeroSection />
        <CategorySliders />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
