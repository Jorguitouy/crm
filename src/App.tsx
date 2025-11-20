import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";

// Páginas Públicas
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

// Páginas del CRM
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/app/Dashboard";
import Customers from "@/pages/app/Customers";
import CustomerDetail from "@/pages/app/CustomerDetail";
import Services from "@/pages/app/Services";
import Audiences from "@/pages/app/Audiences";
import CalendarPage from "@/pages/app/Calendar";
import Settings from "@/pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas Privadas del CRM */}
            <Route path="/app" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/:id" element={<CustomerDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="audiences" element={<Audiences />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;