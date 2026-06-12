import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { api } from "../services/api";

export function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.forgotPassword({
        email,
      });

      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <button
            onClick={() => onNavigate("auth")}
            className="flex items-center gap-2 text-[#005BEA] mb-4"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>

          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
