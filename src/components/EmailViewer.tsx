import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Copy, Check } from "lucide-react";
import { EmailContent } from "@/services/mailApi";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { detectOTPs, highlightOTPs } from "@/utils/otpDetection";

interface EmailViewerProps {
  email: EmailContent;
  onBack: () => void;
}

const EmailViewer = ({ email, onBack }: EmailViewerProps) => {
  const [copiedOTP, setCopiedOTP] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Handle OTP copy functionality
  const handleOTPCopy = async (otpCode: string) => {
    try {
      await navigator.clipboard.writeText(otpCode);
      setCopiedOTP(otpCode);
      toast({
        title: "OTP Copied!",
        description: `Code "${otpCode}" copied to clipboard`,
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedOTP(""), 2000);
    } catch (err) {
      console.error('Failed to copy OTP:', err);
      toast({
        title: "Copy Failed",
        description: "Unable to copy OTP to clipboard",
        variant: "destructive",
      });
    }
  };

  // Set up click handlers for OTP codes after content is rendered
  useEffect(() => {
    if (!contentRef.current) return;

    const otpElements = contentRef.current.querySelectorAll('.otp-code');
    
    const handleOTPClick = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      
      const otpElement = event.target as HTMLElement;
      const otpCode = otpElement.getAttribute('data-otp') || otpElement.textContent || '';
      
      if (otpCode) {
        handleOTPCopy(otpCode);
      }
    };

    otpElements.forEach(element => {
      element.addEventListener('click', handleOTPClick);
    });

    // Cleanup
    return () => {
      otpElements.forEach(element => {
        element.removeEventListener('click', handleOTPClick);
      });
    };
  }, [email.html, email.text]);

  // Process email content to highlight OTPs
  const processEmailContent = () => {
    if (email.html && email.html.length > 0) {
      const htmlContent = email.html.join('');
      return highlightOTPs(htmlContent);
    } else if (email.text) {
      // For plain text, convert to HTML and then highlight
      const htmlContent = email.text.replace(/\n/g, '<br>');
      return highlightOTPs(htmlContent);
    } else {
      // Fallback to intro
      const htmlContent = email.intro.replace(/\n/g, '<br>');
      return highlightOTPs(htmlContent);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border/20 shadow-intense">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="flex items-center space-x-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="bg-background/50 border-border/20 hover:bg-primary/10 transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inbox
            </Button>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Email Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Received {formatTimestamp(email.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Headers */}
          <div className="space-y-4 p-4 bg-background/30 rounded-lg border border-border/20">
            <div>
              <label className="text-sm font-medium text-muted-foreground">From:</label>
              <p className="text-sm font-medium">{email.from.name || email.from.address}</p>
              <p className="text-xs text-muted-foreground">{email.from.address}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subject:</label>
              <p className="text-lg font-semibold">{email.subject}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date:</label>
              <p className="text-sm">{formatTimestamp(email.createdAt)}</p>
            </div>
          </div>

          {/* Email Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Message Content</h3>
            
            {/* Enhanced content with OTP detection */}
            <div 
              ref={contentRef}
              className="email-content-area inbox-selectable prose prose-sm max-w-none"
              data-allow-selection="true"
            >
              <div 
                className="p-4 bg-background/30 rounded-lg border border-border/20 min-h-[200px] select-text"
                dangerouslySetInnerHTML={{ 
                  __html: processEmailContent()
                }}
              />
            </div>
          </div>

          {/* Email Info */}
          <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/20">
            <span>Email ID: {email.id}</span>
            <span>Size: {(email.size / 1024).toFixed(1)} KB</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailViewer;