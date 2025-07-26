import tempMailLogo from "@/assets/tempmail-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-gradient-card border-b border-border/10 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={tempMailLogo} alt="BravoMail" className="w-8 h-8" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BravoMail
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
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
        </div>
      </div>
    </header>
  );
};

export default Header;