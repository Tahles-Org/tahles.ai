
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import AppHealthCheck from "@/components/AppHealthCheck";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import SupplierRegisterPage from "./pages/SupplierRegisterPage";
import SupplierOnboardingPage from "./pages/SupplierOnboardingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log(`🔄 Query retry attempt ${failureCount}:`, error);
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App = () => {
  console.log('🚀 App component rendering');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppHealthCheck />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/subcategory/:subcategoryId" element={<SubcategoryPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/supplier/register" element={<SupplierRegisterPage />} />
              <Route path="/supplier/onboarding/:step" element={<SupplierOnboardingPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
