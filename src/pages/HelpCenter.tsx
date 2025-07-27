import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Copy, 
  ExternalLink, 
  Inbox, 
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  CheckCircle
} from "lucide-react";

const HelpCenter = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Click on 'New Email'",
      description: "Start by clicking the 'New Email' button to generate a fresh temporary email address.",
      icon: Mail,
      details: "This will create a new disposable email address that's valid for 10 minutes. No registration required!",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700"
    },
    {
      id: 2,
      title: "Copy the Generated Email",
      description: "Copy the email address that appears in the input field using the copy button.",
      icon: Copy,
      details: "The email address is automatically generated and ready to use. Click the copy icon for quick copying.",
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700"
    },
    {
      id: 3,
      title: "Use the Email Address",
      description: "Paste the email address on any website or app that requires email verification.",
      icon: ExternalLink,
      details: "Use this temporary email for signups, downloads, or any service requiring email verification.",
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700"
    },
    {
      id: 4,
      title: "Check Your Inbox",
      description: "Return to BravoMail to receive OTPs, verification links, codes, and messages instantly.",
      icon: Inbox,
      details: "All emails will appear in real-time. Perfect for verification codes, downloads, and one-time links.",
      color: "from-orange-500 to-orange-600",
      hoverColor: "from-orange-600 to-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
              <HelpCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn how to use BravoMail in 4 simple steps. Get temporary emails instantly 
            and protect your privacy with our secure service.
          </p>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Use BravoMail</h2>
            <p className="text-muted-foreground text-lg">
              Follow these simple steps to get started with temporary emails
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connection Line - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-0">
                      <ChevronRight className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  {/* Step Card */}
                  <div
                    className={`
                      relative z-10 group cursor-pointer
                      transform transition-all duration-300 ease-out
                      hover:scale-105 hover:-translate-y-2
                      ${isActive ? 'scale-105 -translate-y-2' : ''}
                    `}
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStep(isActive ? null : step.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {/* 3D Card Effect */}
                    <div className="relative">
                      {/* Shadow layers for 3D effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-900/40 rounded-xl transform translate-x-1 translate-y-1" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-800/50 rounded-xl transform translate-x-0.5 translate-y-0.5" />
                      
                      {/* Main Card */}
                      <div className={`
                        relative bg-gradient-to-br ${isActive ? step.hoverColor : step.color}
                        rounded-xl p-6 border border-white/10 backdrop-blur-sm
                        transition-all duration-300
                        shadow-2xl hover:shadow-3xl
                        ${isActive ? 'shadow-3xl' : ''}
                      `}>
                        {/* Step Number */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary text-sm">
                          {step.id}
                        </div>

                        {/* Icon */}
                        <div className="mb-4 flex justify-center">
                          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-3 text-center">
                          {step.title}
                        </h3>
                        <p className="text-white/90 text-center leading-relaxed">
                          {step.description}
                        </p>

                        {/* Expanded Details */}
                        <div className={`
                          overflow-hidden transition-all duration-300 ease-out
                          ${isActive ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                        `}>
                          <div className="border-t border-white/20 pt-4">
                            <p className="text-white/80 text-sm text-center">
                              {step.details}
                            </p>
                          </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Connection Flow */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex flex-col items-center space-y-2">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
              ))}
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="bg-gradient-card rounded-2xl p-8 border border-border/10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions or need additional support, we're here to help. 
              Check out our other resources or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Try BravoMail Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;