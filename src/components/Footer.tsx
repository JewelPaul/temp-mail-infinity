import { Github, Twitter, Mail, Heart } from "lucide-react";
import tempMailLogo from "@/assets/tempmail-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={tempMailLogo} alt="BravoMail" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BravoMail
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The most secure and reliable temporary email service. Protect your privacy with BravoMail instant disposable emails.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Home</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">Features</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">About</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-smooth">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">GDPR</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">API Docs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 BravoMail. All rights reserved.
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