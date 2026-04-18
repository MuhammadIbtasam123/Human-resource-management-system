import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email) { toast.error("Please enter your email."); return; }
    setSent(true);
    toast.success("Password reset link sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{sent ? "Check Your Email" : "Forgot Password"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {sent ? `We sent a reset link to ${email}` : "Enter your email and we'll send you a reset link"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!sent ? (
            <>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@clarisync.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="w-full bg-primary text-primary-foreground" onClick={handleSubmit}>Send Reset Link</Button>
            </>
          ) : (
            <Button className="w-full" variant="outline" onClick={() => setSent(false)}>Resend Email</Button>
          )}
          <Button variant="link" className="w-full text-muted-foreground" onClick={() => navigate("/login")}>
            <ArrowLeft className="h-4 w-4 mr-1" />Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
