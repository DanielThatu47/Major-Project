import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { 
  Home, 
  BarChart2, 
  Search, 
  TrendingUp, 
  Briefcase, 
  BookOpen, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();  // Assuming `user.name` provides the user's name
  const navigate = useNavigate();

  const authenticatedNavItems = [
    { to: '/dashboard', icon: BarChart2, label: 'Dashboard' },
    { to: '/stock-search', icon: Search, label: 'Stock Search' },
    { to: '/prediction', icon: TrendingUp, label: 'Prediction' },
    { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/learning-center', icon: BookOpen, label: 'Learning Center' },
  ];

  const publicNavItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/about', icon: User, label: 'About' },
    { to: '/contact', icon: BookOpen, label: 'Contact' },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the mobile menu after navigation
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close the mobile menu after logout
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger className="mr-4">
                  <Avatar className="bg-blue-600 text-white rounded-full">
                    <AvatarImage
                      src={user?.profileImage || ""}
                      alt="User Avatar"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full cursor-pointer">
                      {user?.name && user.name.length > 0 ? user.name[0].toUpperCase() : "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => handleNavigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Link to="/" className="text-xl font-bold text-blue-600">StockBuddy</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => handleNavigate(item.to)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => handleNavigate('/login')}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => handleNavigate('/signup')}
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => handleNavigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
