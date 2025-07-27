import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OTPTestPage = () => {
  const sampleEmailContent = `
    <p>Your verification code is: <span class="otp-code otp-numeric" data-otp="123456" title="Click to copy OTP code">123456</span></p>
    <p>Please use this code: <span class="otp-code otp-alphanumeric" data-otp="AB7C9D" title="Click to copy OTP code">AB7C9D</span> to complete verification.</p>
    <p>Verification code: <span class="otp-code otp-verification" data-otp="VERIFY2024" title="Click to copy OTP code">VERIFY2024</span></p>
    <p>Your 8-digit authentication code is: <span class="otp-code otp-numeric" data-otp="98765432" title="Click to copy OTP code">98765432</span></p>
    <p>One-time password: <span class="otp-code otp-alphanumeric" data-otp="X9Y2Z8" title="Click to copy OTP code">X9Y2Z8</span></p>
  `;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>OTP Display Test Page</CardTitle>
            <p className="text-muted-foreground">
              Test page to verify OTP code responsiveness across different screen sizes
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Test in narrow container */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Test in Narrow Container (Mobile Simulation)</h3>
              <div className="max-w-xs border-2 border-dashed border-gray-300 p-4 mx-auto">
                <div 
                  className="email-content-area prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: sampleEmailContent }}
                />
              </div>
            </div>

            {/* Test in medium container */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Test in Medium Container (Tablet)</h3>
              <div className="max-w-md border-2 border-dashed border-gray-300 p-4 mx-auto">
                <div 
                  className="email-content-area prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: sampleEmailContent }}
                />
              </div>
            </div>

            {/* Test in full width */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Test in Full Width (Desktop)</h3>
              <div className="border-2 border-dashed border-gray-300 p-4">
                <div 
                  className="email-content-area prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: sampleEmailContent }}
                />
              </div>
            </div>

            {/* Screen size info */}
            <div className="bg-gray-100 p-4 rounded">
              <h4 className="font-semibold mb-2">Current Screen Info:</h4>
              <p className="text-sm">
                Resize your browser window to test different screen sizes.
                The OTP codes should remain within their containers without horizontal overflow.
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPTestPage;