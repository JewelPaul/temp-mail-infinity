import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, ExternalLink, Trash2, RefreshCw } from "lucide-react";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
}

const EmailInbox = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      from: "noreply@github.com",
      subject: "Verify your account",
      preview: "Please click the link below to verify your GitHub account...",
      timestamp: "2 min ago",
      isRead: false,
    },
    {
      id: "2", 
      from: "team@figma.com",
      subject: "Welcome to Figma!",
      preview: "Thanks for signing up! Here's how to get started with Figma...",
      timestamp: "5 min ago",
      isRead: false,
    },
    {
      id: "3",
      from: "security@discord.com",
      subject: "New login detected",
      preview: "We detected a new login to your Discord account from...",
      timestamp: "12 min ago",
      isRead: true,
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshInbox = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const markAsRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isRead: true } : email
    ));
  };

  const deleteEmail = (id: string) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  const unreadCount = emails.filter(email => !email.isRead).length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border/20 shadow-intense">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-2xl">Inbox</CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button
              onClick={refreshInbox}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Checking...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-2">
          {emails.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No emails yet</h3>
              <p className="text-muted-foreground">
                Emails sent to your temporary address will appear here
              </p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className={`group p-4 rounded-lg border transition-smooth cursor-pointer ${
                  email.isRead 
                    ? 'bg-background/30 border-border/10 hover:bg-background/50' 
                    : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                }`}
                onClick={() => markAsRead(email.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-semibold ${email.isRead ? 'text-foreground' : 'text-primary'}`}>
                        {email.from}
                      </span>
                      {!email.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                      )}
                    </div>
                    
                    <h4 className={`font-medium mb-1 ${email.isRead ? 'text-foreground' : 'text-foreground'}`}>
                      {email.subject}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {email.preview}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-smooth">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-primary/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEmail(email.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInbox;