import Header from "@/components/Header";
import EmailGenerator from "@/components/EmailGenerator";
import EmailInbox from "@/components/EmailInbox";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Hero & Email Generator */}
        <section className="text-center">
          <EmailGenerator />
        </section>

        {/* Email Inbox */}
        <section>
          <EmailInbox />
        </section>

        {/* Features Section */}
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
