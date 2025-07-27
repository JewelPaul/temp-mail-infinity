import { Shield, Zap, Globe, Lock, RefreshCw, Mail } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get a temporary email address in seconds without any registration or signup process."
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your real email stays private. No tracking, no data collection, complete anonymity."
    },
    {
      icon: RefreshCw,
      title: "Unlimited Emails",
      description: "Generate as many temporary emails as you need. No limits, no restrictions."
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Works with any website or service that requires email verification worldwide."
    },
    {
      icon: Lock,
      title: "Auto-Secure",
      description: "Emails automatically expire after 10 minutes for maximum security and privacy."
    },
    {
      icon: Mail,
      title: "Real-time Inbox",
      description: "Receive emails instantly with our real-time inbox updates and notifications."
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">BravoMail</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The most advanced temporary email service with enterprise-grade security and lightning-fast performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-gradient-card border border-border/10 rounded-xl hover:border-primary/20 transition-smooth hover:shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-glow transition-smooth">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Our Goals Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-card border border-border/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Our Growth Goals</h3>
            <p className="text-lg text-muted-foreground mb-6">
              We're committed to building a trusted service step by step, with transparency and real value.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  10,000
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  User Goal This Year
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  Target Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;