import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import StockSearch from "./pages/StockSearch";
import Prediction from "./pages/Prediction";
import Portfolio from "./pages/Portfolio";
import LearningCenter from "./pages/LearningCenter";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import StockPrediction from './pages/StockPrediction';
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stock-search" 
                  element={
                    <ProtectedRoute>
                      <StockSearch />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/prediction" 
                  element={
                    <ProtectedRoute>
                      <Prediction />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/portfolio" 
                  element={
                    <ProtectedRoute>
                      <Portfolio />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/learning-center" 
                  element={
                    <ProtectedRoute>
                      <LearningCenter />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stock-prediction" 
                  element={
                    <ProtectedRoute>
                      <StockPrediction />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
