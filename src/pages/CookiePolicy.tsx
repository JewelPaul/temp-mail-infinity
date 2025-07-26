import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12">
        <Card className="max-w-4xl mx-auto bg-gradient-card border-border/20 shadow-intense">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Cookie Policy
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-4">
              Last updated: January 2025
            </p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                BravoMail uses cookies and similar tracking technologies to improve your experience on our website. We use a minimal approach to cookies, focusing only on essential functionality and user experience enhancement.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Our Privacy-First Approach:</h3>
                <p className="text-sm text-muted-foreground">
                  We use minimal cookies and never store personal information in cookies. Our temporary email service is designed to work without requiring extensive tracking.
                </p>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.1 Essential Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies are necessary for the website to function properly and cannot be switched off in our systems.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Session management for temporary email generation</li>
                    <li>Security tokens for API authentication</li>
                    <li>Basic functionality and navigation</li>
                  </ul>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.2 Performance Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies collect anonymous information about how visitors use our website to help us improve performance.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Page load times and performance metrics</li>
                    <li>Error tracking and debugging information</li>
                    <li>Usage analytics (anonymized)</li>
                  </ul>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.3 Functional Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies enable enhanced functionality and personalization without storing personal information.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Theme preferences (dark/light mode)</li>
                    <li>Language settings</li>
                    <li>User interface preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party services that set cookies on our website. These services are carefully selected and configured to minimize data collection:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Content Delivery Networks (CDN):</strong> For faster loading of website resources</li>
                <li><strong>Security Services:</strong> For protection against malicious attacks</li>
                <li><strong>Analytics (if enabled):</strong> For understanding website usage patterns (anonymized)</li>
              </ul>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Cookie Duration</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our cookies have different lifespans based on their purpose:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Session Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Expire when you close your browser. Used for essential functionality.
                  </p>
                </div>
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Persistent Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remain for a specified period (usually 30 days or less) to remember your preferences.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.1 Browser Settings</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Most web browsers allow you to control cookies through their settings preferences. You can:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Block all cookies</li>
                    <li>Accept only first-party cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set notifications for when cookies are being sent</li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">⚠️ Important Notice:</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Disabling essential cookies may affect the functionality of BravoMail and prevent you from using our temporary email service properly.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Browser-Specific Cookie Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Chrome</h3>
                  <p className="text-sm text-muted-foreground">
                    Settings → Privacy and Security → Cookies and other site data
                  </p>
                </div>
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Firefox</h3>
                  <p className="text-sm text-muted-foreground">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Safari</h3>
                  <p className="text-sm text-muted-foreground">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Edge</h3>
                  <p className="text-sm text-muted-foreground">
                    Settings → Cookies and site permissions → Cookies and site data
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us through our contact form on the website.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;