import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const GDPRCompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12">
        <Card className="max-w-4xl mx-auto bg-gradient-card border-border/20 shadow-intense">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              GDPR Compliance
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-4">
              General Data Protection Regulation Compliance Information
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Last updated: January 2025
            </p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Our Commitment to GDPR</h2>
              <p className="text-muted-foreground leading-relaxed">
                BravoMail is committed to protecting your personal data and respecting your privacy rights under the General Data Protection Regulation (GDPR). This page outlines how we comply with GDPR requirements and what rights you have regarding your personal data.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Privacy by Design:</h3>
                <p className="text-sm text-muted-foreground">
                  Our temporary email service is built with privacy as a core principle. We collect minimal data and automatically delete it to ensure maximum privacy protection.
                </p>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Your Rights Under GDPR</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a data subject under GDPR, you have the following rights regarding your personal data:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Information</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to be informed about the collection and use of your personal data. This information is provided through our Privacy Policy and this GDPR compliance page.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right of Access</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to request access to your personal data and receive information about how we process it.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Rectification</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to request correction of inaccurate or incomplete personal data we hold about you.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Erasure</h3>
                  <p className="text-sm text-muted-foreground">
                    Also known as the "right to be forgotten," you can request deletion of your personal data under certain circumstances.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Restrict Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to request restriction of processing of your personal data under certain circumstances.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Data Portability</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to receive your personal data in a structured, commonly used format and transmit it to another controller.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Object</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to object to processing of your personal data for direct marketing purposes or legitimate interests.
                  </p>
                </div>

                <div className="border border-border/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Right to Withdraw Consent</h3>
                  <p className="text-sm text-muted-foreground">
                    Where processing is based on consent, you have the right to withdraw your consent at any time.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. How We Comply with GDPR</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.1 Lawful Basis for Processing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We process personal data based on the following lawful bases:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                    <li><strong>Legitimate Interest:</strong> For providing our temporary email service and ensuring security</li>
                    <li><strong>Consent:</strong> For optional features and communications (where applicable)</li>
                    <li><strong>Legal Obligation:</strong> For compliance with applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.2 Data Minimization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect and process only the minimum amount of personal data necessary for our legitimate purposes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                    <li>No registration or account creation required</li>
                    <li>Temporary email addresses are randomly generated</li>
                    <li>Minimal logging for security and performance purposes</li>
                    <li>No tracking of personal browsing habits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">3.3 Data Retention</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement strict data retention policies:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                    <li>Temporary emails expire after 10 minutes</li>
                    <li>Email content is permanently deleted upon expiration</li>
                    <li>Security logs are anonymized and retained for limited periods</li>
                    <li>No permanent storage of personal communications</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use of adequacy decisions by the European Commission</li>
                <li>Implementation of Standard Contractual Clauses (SCCs)</li>
                <li>Binding Corporate Rules (where applicable)</li>
                <li>Certification mechanisms and codes of conduct</li>
              </ul>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Security Measures</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to ensure data security:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Technical Measures</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Secure data transmission (HTTPS)</li>
                    <li>• Regular security updates</li>
                    <li>• Automated data purging</li>
                  </ul>
                </div>
                <div className="border border-border/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Organizational Measures</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Access controls and authentication</li>
                    <li>• Staff training on data protection</li>
                    <li>• Regular security assessments</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Data Breach Procedures</h2>
              <p className="text-muted-foreground leading-relaxed">
                In the unlikely event of a data breach affecting personal data, we will:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Notify the relevant supervisory authority within 72 hours (where required)</li>
                <li>Inform affected individuals if there is a high risk to their rights and freedoms</li>
                <li>Document the breach and our response measures</li>
                <li>Take immediate steps to contain and remedy the breach</li>
                <li>Review and improve our security measures</li>
              </ul>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Exercising Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of your GDPR rights, please contact us through our contact form. We will respond to your request within one month of receipt. For complex requests, we may extend this period by up to two additional months.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">✓ Easy Data Management:</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Due to our privacy-first design, most data is automatically deleted after 10 minutes, giving you natural data protection without complex procedures.
                </p>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Supervisory Authority</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to lodge a complaint with a supervisory authority if you believe we have processed your personal data unlawfully. You can contact your local data protection authority or the lead supervisory authority in your jurisdiction.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Contact Our Data Protection Officer</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about our GDPR compliance or to exercise your rights under GDPR, please contact us through our contact form on the website. We take all data protection inquiries seriously and will respond promptly.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default GDPRCompliance;