import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import tempMailLogo from "@/assets/bravomail-logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-gradient-card border-b border-border/10 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-smooth">
            <img src={tempMailLogo} alt="BravoMail" className="w-10 h-6" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BravoMail
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-primary transition-smooth">
              FAQ
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-smooth"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/10">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/#features" 
                className="text-muted-foreground hover:text-primary transition-smooth py-2 text-lg"
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-smooth py-2 text-lg"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/faq" 
                className="text-muted-foreground hover:text-primary transition-smooth py-2 text-lg"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-smooth py-2 text-lg"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;