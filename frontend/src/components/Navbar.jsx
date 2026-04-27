import React, { useState } from "react";
import { Activity, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar({ onNavigate, currentPage, isLoggedIn, onLogout, user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300" 
          onClick={() => handleNavigation('home')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#005BEA] to-[#00C6FB] hover:shadow-lg transition-shadow">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
            MediPredict
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={() => handleNavigation('home')}
            className={`transition-all duration-300 cursor-pointer hover:scale-105 ${currentPage === 'home' ? 'text-[#005BEA]' : 'text-gray-600 hover:text-[#005BEA]'}`}
          >
            Home
          </Button>
          <Button 
            variant="ghost"
            onClick={() => handleNavigation('about')}
            className={`transition-all duration-300 cursor-pointer hover:scale-105 ${currentPage === 'about' ? 'text-[#005BEA]' : 'text-gray-600 hover:text-[#005BEA]'}`}
          >
            About
          </Button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name || "User"}</div>
                <div className="text-xs text-gray-500">{user?.email || ""}</div>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleNavigation("dashboard")}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                onClick={() => handleNavigation('auth')}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
              >
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                onClick={() => handleNavigation('auth')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('home')}
              className={`w-full justify-start transition-all duration-300 cursor-pointer ${currentPage === 'home' ? 'text-[#005BEA] bg-blue-50' : 'text-gray-600 hover:text-[#005BEA] hover:bg-gray-50'}`}
            >
              Home
            </Button>
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('about')}
              className={`w-full justify-start transition-all duration-300 cursor-pointer ${currentPage === 'about' ? 'text-[#005BEA] bg-blue-50' : 'text-gray-600 hover:text-[#005BEA] hover:bg-gray-50'}`}
            >
              About
            </Button>
            <div className="pt-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleNavigation('dashboard')}
                    className="w-full cursor-pointer hover:bg-gray-50 transition-all duration-300"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={onLogout}
                    className="w-full cursor-pointer transition-all duration-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleNavigation('auth')}
                    className="w-full cursor-pointer hover:bg-gray-50 transition-all duration-300"
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                    onClick={() => handleNavigation('auth')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
