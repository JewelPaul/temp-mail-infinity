import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about BravoMail? Need support or want to provide feedback? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        <ContactForm />

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground">
                We typically respond within 24 hours during business days.
              </p>
            </div>
            <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday, 9 AM - 6 PM (UTC)
              </p>
            </div>
            <div className="bg-gradient-card border border-border/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your contact information is kept secure and never shared.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;