import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Mail, Clock, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mailApi, EmailAccount } from "@/services/mailApi";

interface EmailGeneratorProps {
  onEmailChange?: (account: EmailAccount | null) => void;
}

const EmailGenerator = ({ onEmailChange }: EmailGeneratorProps) => {
  const [currentAccount, setCurrentAccount] = useState<EmailAccount | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [apiMode, setApiMode] = useState<'mock' | 'real'>('mock');
  const { toast } = useToast();

  // Generate initial email on component mount
  useEffect(() => {
    setApiMode(mailApi.getApiMode());
    generateNewEmail();
  }, []);

  const generateNewEmail = async () => {
    setIsGenerating(true);
    setError("");
    
    try {
      // Delete previous account if exists
      if (currentAccount) {
        await mailApi.deleteAccount();
      }
      
      // Create new account
      const newAccount = await mailApi.createAccount();
      setCurrentAccount(newAccount);
      onEmailChange?.(newAccount);
      
      toast({
        title: "New email generated!",
        description: "Your temporary email is ready to use.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate email";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!currentAccount) return;
    
    try {
      await navigator.clipboard.writeText(currentAccount.address);
      toast({
        title: "Copied!",
        description: "Email address copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 animate-slide-up">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full shadow-glow mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
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
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-base text-muted-foreground">Valid for 10 minutes</p>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  {apiMode === 'real' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Real Email Service
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <Badge variant="outline" className="text-amber-600 border-amber-600">
                        Demo Mode
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Email Display */}
            <div className="flex flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  value={currentAccount?.address || "Generating..."}
                  readOnly
                  className="text-lg font-mono text-center bg-background/50 border-border/20 focus:border-primary transition-smooth h-14"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-md pointer-events-none" />
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  disabled={!currentAccount || isGenerating}
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
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base">Auto-Expiry</h3>
                  <p className="text-sm text-muted-foreground">Emails auto-delete after 10 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">No registration or personal data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 border border-border/10">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base">Unlimited</h3>
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