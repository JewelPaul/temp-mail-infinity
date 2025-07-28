import { useState, useEffect } from "react";
import Header from "@/components/Header";
import EmailGenerator from "@/components/EmailGenerator";
import EmailInbox from "@/components/EmailInbox";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import EzoicAd from "@/components/EzoicAd";
import { adSlots, showEzoicAds, initializeEzoic } from "@/lib/ezoic-config";
import { EmailAccount } from "@/services/mailApi";

const Index = () => {
  const [currentAccount, setCurrentAccount] = useState<EmailAccount | null>(null);

  // Initialize Ezoic and show ads when component mounts
  useEffect(() => {
    initializeEzoic();
    
    // Show all ads after a short delay to ensure Ezoic is ready
    const timer = setTimeout(() => {
      showEzoicAds();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Advertisement - Header Leaderboard */}
        <section className="flex justify-center">
          <EzoicAd 
            id={adSlots.header.id}
            className="w-full max-w-4xl"
            style={{ minHeight: adSlots.header.minHeight }}
            size={adSlots.header.size}
          />
        </section>

        {/* Hero & Email Generator */}
        <section className="text-center">
          <EmailGenerator onEmailChange={setCurrentAccount} />
        </section>

        {/* Email Inbox */}
        <section>
          <EmailInbox currentAccount={currentAccount} />
        </section>

        {/* Advertisement - Main Content Banner */}
        <section className="flex justify-center">
          <EzoicAd 
            id={adSlots.main.id}
            className="w-full max-w-4xl"
            style={{ minHeight: adSlots.main.minHeight }}
            size={adSlots.main.size}
          />
        </section>

        {/* Features Section */}
        <Features />

        {/* Advertisement - Footer Rectangle */}
        <section className="flex justify-center">
          <EzoicAd 
            id={adSlots.footer.id}
            className="w-full max-w-lg"
            style={{ minHeight: adSlots.footer.minHeight }}
            size={adSlots.footer.size}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
