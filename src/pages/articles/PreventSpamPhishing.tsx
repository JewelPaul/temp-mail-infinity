import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, AlertTriangle, Shield, Filter, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PreventSpamPhishing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
          <span>/</span>
          <span>How Disposable Email Helps Prevent Spam and Phishing</span>
        </nav>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/20 shadow-intense mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 mb-4">
                  Security
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  How Disposable Email Helps Prevent Spam and Phishing
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Spam and phishing attacks are becoming increasingly sophisticated. Learn how temporary email addresses 
                  can protect you from these threats and keep your inbox clean and secure.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    BravoMail Security Team
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    January 10, 2024
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    6 min read
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="bg-gradient-card border-border/20 shadow-intense">
            <CardContent className="p-8 prose prose-lg max-w-none">
              <div className="space-y-8">
                
                <section>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-8 h-8 mr-3 text-destructive" />
                    The Growing Threat of Spam and Phishing
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Every day, billions of spam emails are sent across the internet, with cybercriminals constantly 
                    evolving their tactics to bypass security measures and deceive users. What started as simple 
                    promotional messages has evolved into sophisticated phishing campaigns that can steal personal 
                    information, financial data, and even entire digital identities.
                  </p>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 text-destructive">Alarming Statistics</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Over 45% of all emails sent globally are spam</li>
                      <li>• Phishing attacks increased by 65% in the past year</li>
                      <li>• The average user receives 121 emails per day, with 49% being promotional</li>
                      <li>• Data breaches involving email addresses affect millions annually</li>
                    </ul>
                  </div>
                </section>

                <Separator className="bg-border/20" />

                <section>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <Target className="w-8 h-8 mr-3 text-primary" />
                    How Cybercriminals Target Your Email
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 text-orange-500">Email Harvesting Techniques</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Cybercriminals use various methods to collect email addresses, including scraping websites, 
                        purchasing data from breaches, and using automated tools to generate common email combinations. 
                        Once your email is in their database, it becomes a target for multiple attack vectors.
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Web scraping from public websites and forums</li>
                        <li>• Data broker purchases and dark web marketplaces</li>
                        <li>• Social media profile mining</li>
                        <li>• Dictionary attacks on common email patterns</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 text-red-500">Modern Phishing Tactics</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Today's phishing emails are far more sophisticated than the obvious scams of the past. 
                        Attackers now use advanced social engineering, domain spoofing, and personalization 
                        techniques to make their messages appear legitimate and urgent.
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Impersonation of trusted brands and services</li>
                        <li>• Time-sensitive urgency tactics</li>
                        <li>• Personalized information from previous breaches</li>
                        <li>• Advanced HTML and CSS to mimic legitimate emails</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator className="bg-border/20" />

                <section>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <Shield className="w-8 h-8 mr-3 text-primary" />
                    Disposable Email as Your First Line of Defense
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Temporary email addresses create an effective barrier between your real identity and potential 
                    threats. By using disposable emails for non-critical interactions, you eliminate the risk of 
                    your primary email address being compromised or added to spam lists.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-primary">Protection Mechanisms</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Isolation:</strong> Separates risky interactions from your main email</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Expiration:</strong> Automatically invalidates after a set time period</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Anonymity:</strong> No link to your real identity or personal data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Disposability:</strong> Easy to abandon if compromised</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-secondary">Strategic Use Cases</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Free trial registrations and downloads</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Newsletter subscriptions and promotional content</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>One-time verification codes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Testing unknown or suspicious websites</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator className="bg-border/20" />

                <section>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <Filter className="w-8 h-8 mr-3 text-primary" />
                    Advanced Spam Protection Strategies
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Email Compartmentalization</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Implement a tiered email strategy where different types of accounts serve different purposes. 
                        This approach minimizes risk while maintaining functionality for your digital activities.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                          <h4 className="font-semibold text-primary mb-2">Primary Email</h4>
                          <p className="text-sm text-muted-foreground">Banking, healthcare, work, family</p>
                        </div>
                        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                          <h4 className="font-semibold text-secondary mb-2">Secondary Email</h4>
                          <p className="text-sm text-muted-foreground">Social media, shopping, subscriptions</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <h4 className="font-semibold text-green-500 mb-2">Temporary Email</h4>
                          <p className="text-sm text-muted-foreground">Trials, one-time use, unknown sites</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Recognition and Response</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Even with protective measures in place, it's important to recognize potential threats 
                        and know how to respond appropriately.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-destructive">Red Flags to Watch For:</h4>
                          <ul className="space-y-2 text-muted-foreground text-sm">
                            <li>• Urgent language and deadline pressure</li>
                            <li>• Requests for personal information</li>
                            <li>• Suspicious sender addresses</li>
                            <li>• Poor grammar and spelling</li>
                            <li>• Unexpected attachments or links</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-primary">Protective Actions:</h4>
                          <ul className="space-y-2 text-muted-foreground text-sm">
                            <li>• Verify sender through independent channels</li>
                            <li>• Hover over links without clicking</li>
                            <li>• Use temporary emails for verification</li>
                            <li>• Report suspected phishing attempts</li>
                            <li>• Keep software and security tools updated</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="bg-border/20" />

                <section className="bg-primary/5 border border-primary/20 rounded-lg p-8">
                  <h2 className="text-3xl font-bold mb-4">Build Your Defense Strategy</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Protecting yourself from spam and phishing requires a proactive approach that combines good habits 
                    with the right tools. Temporary email addresses are a simple yet powerful component of a comprehensive 
                    digital security strategy.
                  </p>
                  <div className="bg-background/50 rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-semibold mb-3">Your Action Plan</h3>
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Start using temporary emails for all non-essential online interactions</li>
                      <li>2. Audit your current email exposure and unsubscribe from unnecessary lists</li>
                      <li>3. Implement email compartmentalization with different addresses for different purposes</li>
                      <li>4. Educate yourself on the latest phishing tactics and red flags</li>
                      <li>5. Use additional security measures like two-factor authentication when available</li>
                    </ol>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Remember: every email address you protect is a potential attack vector you've eliminated. 
                    Start implementing these protective measures today to secure your digital communications.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <Link 
              to="/articles/temporary-email-privacy-security"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Privacy & Security
            </Link>
            
            <Link 
              to="/articles/digital-safety-best-practices"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Next Article: Best Practices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PreventSpamPhishing;