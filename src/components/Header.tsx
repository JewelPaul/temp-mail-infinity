import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import tempMailLogo from "@/assets/tempmail-logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-gradient-card border-b border-border/10 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={tempMailLogo} alt="BravoMail" className="w-8 h-8" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BravoMail
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-smooth">
              FAQ
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden w-11 h-11 p-0"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/10">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#features" 
                className="text-muted-foreground hover:text-primary transition-smooth text-lg py-2"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-primary transition-smooth text-lg py-2"
                onClick={closeMobileMenu}
              >
                About
              </a>
              <a 
                href="#faq" 
                className="text-muted-foreground hover:text-primary transition-smooth text-lg py-2"
                onClick={closeMobileMenu}
              >
                FAQ
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;