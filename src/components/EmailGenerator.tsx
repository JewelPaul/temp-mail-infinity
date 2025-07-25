import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Mail, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailGenerator = () => {
  const [currentEmail, setCurrentEmail] = useState("user123@tempmail.pro");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewEmail = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 10);
      setCurrentEmail(`${randomString}@tempmail.pro`);
      setIsGenerating(false);
      toast({
        title: "New email generated!",
        description: "Your temporary email is ready to use.",
      });
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentEmail);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 animate-slide-up">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full shadow-glow mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Instant Temporary Email
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate unlimited temporary email addresses instantly. Keep your real email private and secure from spam.
        </p>
      </div>

      {/* Email Generator Card */}
      <Card className="bg-gradient-card border-border/20 shadow-intense">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Your Temporary Email</h2>
              <p className="text-muted-foreground">Valid for 60 minutes • Auto-refreshes</p>
            </div>

            {/* Email Display */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  value={currentEmail}
                  readOnly
                  className="text-lg font-mono text-center bg-background/50 border-border/20 focus:border-primary transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-md pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={generateNewEmail}
                  disabled={isGenerating}
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating...' : 'New Email'}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Auto-Expiry</h3>
                  <p className="text-sm text-muted-foreground">Emails auto-delete after 60 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">No registration or personal data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Unlimited</h3>
                  <p className="text-sm text-muted-foreground">Generate as many as you need</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailGenerator;