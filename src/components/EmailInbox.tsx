import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Eye, Inbox, AlertCircle, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mailApi, EmailAccount, EmailMessage, EmailContent } from "@/services/mailApi";
import EmailViewer from "./EmailViewer";

interface EmailInboxProps {
  currentAccount: EmailAccount | null;
}

const EmailInbox = ({ currentAccount }: EmailInboxProps) => {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<EmailContent | null>(null);
  const [loadingEmailId, setLoadingEmailId] = useState<string>("");
  const [demoMode, setDemoMode] = useState(false);
  const { toast } = useToast();

  // Demo data for testing purposes
  const demoEmails: EmailMessage[] = [
    {
      id: "demo1",
      from: { name: "GitHub", address: "noreply@github.com" },
      subject: "Your verification code is 123456",
      intro: "Use this code to verify your account: 123456. This code will expire in 10 minutes.",
      seen: false,
      createdAt: new Date().toISOString(),
      size: 1024
    },
    {
      id: "demo2", 
      from: { name: "PayPal", address: "service@paypal.com" },
      subject: "Security Alert - New login detected",
      intro: "We detected a new login to your account from a new device. If this wasn't you, please secure your account immediately.",
      seen: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      size: 2048
    },
    {
      id: "demo3",
      from: { name: "Amazon", address: "account-update@amazon.com" },
      subject: "Your order has been shipped",
      intro: "Good news! Your recent order has been shipped and is on its way to you. Track your package using the link below.",
      seen: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(), 
      size: 1536
    }
  ];

  const getDemoEmailContent = (id: string): EmailContent => {
    const email = demoEmails.find(e => e.id === id);
    if (!email) throw new Error("Email not found");
    
    return {
      ...email,
      html: [`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">${email.subject}</h2>
        <p>${email.intro}</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>This is a demo email to showcase the in-app email viewer functionality.</strong></p>
          <p>In a real scenario, this would be the actual email content from the mail server.</p>
        </div>
        <p>Best regards,<br>${email.from.name}</p>
      </div>`],
      text: `${email.subject}\n\n${email.intro}\n\nThis is a demo email to showcase the in-app email viewer functionality.\n\nBest regards,\n${email.from.name}`
    };
  };

  // Auto-refresh emails every 10 seconds when account is available
  useEffect(() => {
    if (!currentAccount && !demoMode) {
      setEmails([]);
      return;
    }

    const fetchEmails = async () => {
      try {
        setError("");
        if (demoMode) {
          setEmails(demoEmails);
        } else {
          const messages = await mailApi.getMessages();
          setEmails(messages);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch emails";
        setError(errorMessage);
      }
    };

    // Initial fetch
    fetchEmails();

    if (!demoMode) {
      // Set up auto-refresh only for real API
      const interval = setInterval(fetchEmails, 10000);
      return () => clearInterval(interval);
    }
  }, [currentAccount, demoMode]);

  const refreshInbox = async () => {
    if (!currentAccount && !demoMode) return;
    
    setIsRefreshing(true);
    setError("");
    
    try {
      let messages;
      if (demoMode) {
        messages = demoEmails;
      } else {
        messages = await mailApi.getMessages();
      }
      setEmails(messages);
      
      toast({
        title: "Inbox refreshed",
        description: `Found ${messages.length} emails.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to refresh inbox";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEmailClick = async (email: EmailMessage) => {
    setLoadingEmailId(email.id);
    try {
      let content;
      if (demoMode) {
        content = getDemoEmailContent(email.id);
      } else {
        content = await mailApi.getMessage(email.id);
      }
      setSelectedEmail(content);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load email content",
        variant: "destructive",
      });
    } finally {
      setLoadingEmailId("");
    }
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  const startDemo = () => {
    setDemoMode(true);
    setEmails(demoEmails);
    toast({
      title: "Demo Mode Activated",
      description: "Click on any email to see the in-app viewer!",
    });
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {selectedEmail ? (
        <EmailViewer email={selectedEmail} onBack={handleBackToInbox} />
      ) : (
      <Card className="bg-gradient-card border-border/20 shadow-intense">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Inbox className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-xl">Email Inbox</CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentAccount || demoMode ? `${emails.filter(email => !email.seen).length} unread messages` : 'Generate an email to start receiving messages'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!currentAccount && !demoMode && (
              <Button
                onClick={startDemo}
                variant="default"
                size="sm"
                className="bg-gradient-primary hover:shadow-glow transition-smooth"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Try Demo
              </Button>
            )}
            <Button
              onClick={refreshInbox}
              disabled={isRefreshing || (!currentAccount && !demoMode)}
              variant="outline"
              size="sm"
              className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!currentAccount && !demoMode ? (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No active email</h3>

              <p className="text-base text-muted-foreground">
                Generate a temporary email address to start receiving messages
              </p>
              <Button
                onClick={startDemo}
                variant="outline"
                className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Try Demo Mode
              </Button>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No emails yet</h3>
              <p className="text-base text-muted-foreground">
                Your inbox is empty. New emails will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`group p-4 rounded-lg border border-border/20 transition-all hover:shadow-md hover:border-primary/20 cursor-pointer ${
                    email.seen ? 'bg-background/30' : 'bg-background/60 border-primary/30'
                  }`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-medium text-sm truncate">{email.from.address}</p>
                        {!email.seen && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-base mb-2 truncate">{email.subject}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{email.intro}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(email.createdAt)}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {loadingEmailId === email.id ? (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default EmailInbox;