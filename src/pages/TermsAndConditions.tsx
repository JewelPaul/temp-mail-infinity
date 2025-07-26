import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12">
        <Card className="max-w-4xl mx-auto bg-gradient-card border-border/20 shadow-intense">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Terms and Conditions
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-4">
              Last updated: January 2025
            </p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using BravoMail ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily access BravoMail for personal, non-commercial transitory use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                BravoMail provides temporary email addresses for users to protect their privacy when registering for websites or services. The service is provided "as is" without any warranties of any kind.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Important Notice:</h3>
                <p className="text-sm text-muted-foreground">
                  Temporary email addresses automatically expire after 10 minutes. All emails received in temporary accounts are permanently deleted and cannot be recovered.
                </p>
              </div>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may not use BravoMail for any unlawful purpose or to solicit others to perform unlawful acts. Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Illegal activities or promotion of illegal activities</li>
                <li>Violation of international, federal, or state regulations</li>
                <li>Harassment, abuse, or harm to another person</li>
                <li>Spam or unsolicited email generation</li>
                <li>Attempts to circumvent security measures</li>
                <li>Collection of personal information without consent</li>
              </ul>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We respect your privacy and are committed to protecting your personal data. Our detailed privacy practices are outlined in our Privacy Policy. By using BravoMail, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on BravoMail are provided on an 'as is' basis. BravoMail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall BravoMail or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use BravoMail, even if BravoMail or a BravoMail authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                BravoMail may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <Separator className="bg-border/20" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us through our contact form on the website.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;