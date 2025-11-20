import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";

// Páginas Públicas
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

// Páginas del CRM
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Index";
import Customers from "@/pages/Customers";
import CustomerDetail from "@/pages/CustomerDetail";
import Services from "@/pages/Services";
import Audiences from "@/pages/Audiences";
import CalendarPage from "@/pages/Calendar";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* La ruta "/" ya no es manejada por React. El servidor mostrará public/index.html */}
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