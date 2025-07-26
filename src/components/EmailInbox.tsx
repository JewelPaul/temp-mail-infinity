import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Eye, Inbox, AlertCircle } from "lucide-react";
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
  const { toast } = useToast();

  // Auto-refresh emails every 10 seconds when account is available
  useEffect(() => {
    if (!currentAccount) {
      setEmails([]);
      return;
    }

    const fetchEmails = async () => {
      try {
        setError("");
        const messages = await mailApi.getMessages();
        setEmails(messages);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch emails";
        setError(errorMessage);
      }
    };

    // Initial fetch
    fetchEmails();

    // Set up auto-refresh
    const interval = setInterval(fetchEmails, 10000);
    return () => clearInterval(interval);
  }, [currentAccount]);

  const refreshInbox = async () => {
    if (!currentAccount) return;
    
    setIsRefreshing(true);
    setError("");
    
    try {
      const messages = await mailApi.getMessages();
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
      const content = await mailApi.getMessage(email.id);
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
                {currentAccount ? `${emails.filter(email => !email.seen).length} unread messages` : 'Generate an email to start receiving messages'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={refreshInbox}
              disabled={isRefreshing || !currentAccount}
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

          {!currentAccount ? (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No active email</h3>
              <p className="text-base text-muted-foreground">
                Generate a temporary email address to start receiving messages
              </p>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No emails yet</h3>
              <p className="text-base text-muted-foreground">
                Waiting for new messages... Your inbox will update automatically when emails arrive.
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