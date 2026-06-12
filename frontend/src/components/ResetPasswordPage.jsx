import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { api } from "../services/api";

export function ResetPasswordPage({ onNavigate }) {

    const [token, setToken] = useState(
        new URLSearchParams(
          window.location.search
        ).get("token") || ""
      );

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      await api.resetPassword({
        token,
        newPassword: password,
      });

      toast.success(
        "Password updated successfully"
      );

      onNavigate("auth");

    } catch (error) {

      toast.error(
        error.message ||
          "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle>
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              Reset Password
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}