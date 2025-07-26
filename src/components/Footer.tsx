import { Github, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import tempMailLogo from "@/assets/tempmail-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border/10 mt-20">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={tempMailLogo} alt="BravoMail" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BravoMail
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
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
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Home</Link></li>
              <li><a href="#features" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Features</a></li>
              <li><a href="#about" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">About</a></li>
              <li><a href="#faq" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Cookie Policy</Link></li>
              <li><Link to="/gdpr" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">GDPR</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Help Center</a></li>
              <li><Link to="/contact" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Contact Us</Link></li>
              <li><a href="#" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">API Docs</a></li>
              <li><a href="#" className="text-base text-muted-foreground hover:text-primary transition-smooth py-1 block">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 mt-12 pt-8">
          <div className="flex flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
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