import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (in real implementation, this would send to backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would send this data to your backend
      // which would then forward it to jewelpaul2006@gmail.com
      console.log('Contact form submitted:', {
        ...formData,
        timestamp: new Date().toISOString(),
        // Note: The actual email (jewelpaul2006@gmail.com) is handled server-side only
      });

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-card border-border/20 shadow-intense">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Message Sent Successfully!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out to us. We've received your message and will respond within 24 hours.
              </p>
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card border-border/20 shadow-intense">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Contact Us
        </CardTitle>
        <CardDescription className="text-lg">
          Have a question or need support? We're here to help you with BravoMail.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="bg-background/50 border-border/20 focus:border-primary transition-smooth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-background/50 border-border/20 focus:border-primary transition-smooth"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-background/50 border-border/20 focus:border-primary transition-smooth">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="business">Business Inquiry</SelectItem>
                <SelectItem value="privacy">Privacy Question</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Brief description of your inquiry"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="bg-background/50 border-border/20 focus:border-primary transition-smooth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your inquiry..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              rows={6}
              className="bg-background/50 border-border/20 focus:border-primary transition-smooth resize-none"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-primary hover:shadow-glow transition-smooth px-8 py-3 text-lg"
            >
              <Send className={`w-5 h-5 mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours. For urgent issues, please include "URGENT" in your subject line.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;