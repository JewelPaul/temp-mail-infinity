import { Shield, Zap, Globe, Lock, RefreshCw, Mail, Users, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {

  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "We built BravoMail with privacy as our core principle. No data collection, no tracking, no compromises."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate temporary emails instantly with our optimized infrastructure and global CDN."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Available worldwide with multiple domain options and universal compatibility."
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "Built with enterprise-grade security and automatic data expiry for maximum protection."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-20">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="bg-gradient-hero bg-clip-text text-transparent">BravoMail</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              BravoMail is the most secure and user-friendly temporary email service, designed to protect your privacy 
              while providing a seamless experience for all your temporary email needs.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In today's digital world, privacy is more important than ever. We created BravoMail to give you complete 
                control over your online identity by providing secure, temporary email addresses that protect your real 
                email from spam, tracking, and unwanted communications.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that privacy should be simple, accessible, and free for everyone. That's why BravoMail requires 
                no registration, stores no personal data, and automatically deletes all emails after expiry.
              </p>
            </div>
            <div className="bg-gradient-card border border-border/10 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">Privacy by Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every aspect of BravoMail is built with privacy in mind. We don't just protect your data - we don't collect it in the first place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Building Trust Through Transparency
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building BravoMail step by step, with real users and honest growth
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-card border border-border/10 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">Our Growth Journey</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We believe in honest growth and building trust with our users. Instead of inflated numbers, 
                  we're focused on providing real value and reaching meaningful milestones together.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      10K
                    </div>
                    <div className="font-semibold text-foreground mb-1">
                      User Goal 2024
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Growing our community
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      99.9%
                    </div>
                    <div className="font-semibold text-foreground mb-1">
                      Uptime Target
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Reliable service goal
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      0
                    </div>
                    <div className="font-semibold text-foreground mb-1">
                      Personal Data
                    </div>
                    <div className="text-sm text-muted-foreground">
                      We don't store it
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up with modern technology and user privacy as our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-card border border-border/10 rounded-xl hover:border-primary/20 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Built with Passion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              BravoMail is developed by a dedicated team of privacy advocates and software engineers 
              who believe in making the internet a safer place for everyone.
            </p>
            
            <div className="bg-gradient-card border border-border/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground italic leading-relaxed">
                "We built BravoMail because we believe privacy shouldn't be a luxury. In a world where your 
                email address is constantly requested and potentially misused, everyone deserves a simple, 
                secure way to protect their digital identity."
              </p>
              <div className="mt-6 pt-6 border-t border-border/10">
                <p className="font-semibold text-foreground">— The BravoMail Team</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;