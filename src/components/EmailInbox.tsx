import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ExternalLink, Trash2, Inbox, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mailApi, EmailAccount, EmailMessage } from "@/services/mailApi";

interface EmailInboxProps {
  currentAccount: EmailAccount | null;
}

const EmailInbox = ({ currentAccount }: EmailInboxProps) => {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string>("");
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
      <Card className="bg-gradient-card border-border/20 shadow-intense">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Inbox className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">Email Inbox</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {currentAccount ? `${emails.filter(email => !email.seen).length} unread messages` : 'Generate an email to start receiving messages'}
              </p>
            </div>
          </div>
          
          <Button
            onClick={refreshInbox}
            disabled={isRefreshing || !currentAccount}
            variant="outline"
            size="sm"
            className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth h-10 min-w-[100px]"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
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
              <p className="text-sm sm:text-base text-muted-foreground">
                Generate a temporary email address to start receiving messages
              </p>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No emails yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
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
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-medium text-sm truncate">{email.from.address}</p>
                        {!email.seen && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-2 truncate">{email.subject}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{email.intro}</p>
                      <p className="text-xs text-muted-foreground">{formatTimestamp(email.createdAt)}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 hover:bg-primary/10 flex-shrink-0"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            const content = await mailApi.getMessage(email.id);
                            // Open email content in a new tab or modal
                            const newWindow = window.open('', '_blank');
                            if (newWindow) {
                              newWindow.document.write(`
                                <html>
                                  <head><title>${content.subject}</title></head>
                                  <body style="font-family: Arial, sans-serif; padding: 20px;">
                                    <h2>${content.subject}</h2>
                                    <p><strong>From:</strong> ${content.from.address}</p>
                                    <hr>
                                    ${content.html?.join('') || content.text || content.intro}
                                  </body>
                                </html>
                              `);
                            }
                          } catch (err) {
                            toast({
                              title: "Error",
                              description: "Failed to open email",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInbox;