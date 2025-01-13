import { Home, BarChart2, Search, TrendingUp, Briefcase, BookOpen, User, TrendingDown } from 'lucide-react';
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import StockSearch from "./pages/StockSearch";
import Prediction from "./pages/Prediction";
import Portfolio from "./pages/Portfolio";
import LearningCenter from "./pages/LearningCenter";
import UserProfile from "./pages/UserProfile";
import StockPrediction from "./pages/StockPrediction";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <HomePage />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: BarChart2,
    page: <Dashboard />,
  },
  {
    title: "Stock Search",
    to: "/stock-search",
    icon: Search,
    page: <StockSearch />,
  },
  {
    title: "Prediction",
    to: "/prediction",
    icon: TrendingUp,
    page: <Prediction />,
  },
  {
    title: "Portfolio",
    to: "/portfolio",
    icon: Briefcase,
    page: <Portfolio />,
  },
  {
    title: "Learning Center",
    to: "/learning-center",
    icon: BookOpen,
    page: <LearningCenter />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <UserProfile />,
  },
  {
    title: "Predict",
    to: "/stock-prediction",
    icon: TrendingDown,
    page: <StockPrediction />,
  },
];