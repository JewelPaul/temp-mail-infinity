import { Github, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import tempMailLogo from "@/assets/bravomail-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <img src={tempMailLogo} alt="BravoMail" className="w-10 h-6" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BravoMail
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The most secure and reliable temporary email service. Protect your privacy with BravoMail instant disposable emails.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/pauljewel25" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth p-2"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/JewelPaul" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth p-2"
                aria-label="Visit our GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Home</Link></li>
              <li><a href="#features" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Features</a></li>
              <li><a href="#about" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">About</a></li>
              <li><a href="#faq" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Cookie Policy</Link></li>

            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help-center" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Help Center</Link></li>
              <li><Link to="/contact" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Contact Us</Link></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">API Docs</a></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © 2025 BravoMail. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for privacy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;