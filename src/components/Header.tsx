import { Button } from "@/components/ui/button";
import { Mail, Zap, RefreshCw } from "lucide-react";
import tempMailLogo from "@/assets/tempmail-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-gradient-card border-b border-border/10 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={tempMailLogo} alt="TempMail" className="w-8 h-8" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TempMail Pro
            </h1>
          </div>

          {/* Navigation */}
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
              <Zap className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;