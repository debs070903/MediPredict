import React, { useState } from "react";

import {
  Activity,
  Mail,
  Lock,
  User,
  ArrowLeft,
} from "lucide-react";

import { Button } from "./ui/button";

import { Input } from "./ui/input";

import { Label } from "./ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

import { api } from "../services/api";

import { toast } from "sonner";

export function AuthPage({
  onNavigate,
  onAuthSuccess,
}) {

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [signupName, setSignupName] =
    useState("");

  const [signupEmail, setSignupEmail] =
    useState("");

  const [signupPassword, setSignupPassword] =
    useState("");

  const [
    signupConfirmPassword,
    setSignupConfirmPassword,
  ] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    setIsSubmitting(true);

    try {

      const response = await api.login({
        email: loginEmail,
        password: loginPassword,
      });

      onAuthSuccess(response);

      toast.success("Logged in successfully");

    } catch (error) {

      setErrorMessage(
        error.message || "Unable to login"
      );

      toast.error(
        error.message || "Unable to login"
      );

    } finally {

      setIsSubmitting(false);

    }
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    if (
      signupPassword !== signupConfirmPassword
    ) {

      setErrorMessage(
        "Passwords do not match"
      );

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    setIsSubmitting(true);

    try {

      const response = await api.register({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      onAuthSuccess(response);

      toast.success(
        "Account created successfully"
      );

    } catch (error) {

      setErrorMessage(
        error.message ||
          "Unable to create account"
      );

      toast.error(
        error.message ||
          "Unable to create account"
      );

    } finally {

      setIsSubmitting(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* TOP SECTION */}
        <div className="mb-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => onNavigate("home")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#005BEA] hover:text-[#0047B8] transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Home
          </button>

          {/* LOGO */}
          <div className="text-center">

            <div className="inline-flex items-center justify-center gap-2 mb-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] shadow-lg">

                <Activity className="h-7 w-7 text-white" />

              </div>

              <span className="text-2xl font-bold bg-gradient-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">

                MediPredict

              </span>

            </div>

            <p className="text-gray-600">

              Welcome back! Please login to your account

            </p>

            {errorMessage ? (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

          </div>

        </div>

        {/* AUTH CARD */}
        <Card className="border-2 shadow-2xl rounded-3xl overflow-hidden">

          <CardHeader className="space-y-2 bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">

            <CardTitle className="text-3xl text-center">
              Account Access
            </CardTitle>

            <CardDescription className="text-center text-base">
              Login or create a new account
              to continue
            </CardDescription>

          </CardHeader>

          <CardContent className="pt-6">

            <Tabs
              defaultValue="login"
              className="w-full"
            >

              {/* TABS */}
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">

                <TabsTrigger
                  value="login"
                  className="cursor-pointer transition-all"
                >
                  Login
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="cursor-pointer transition-all"
                >
                  Sign Up
                </TabsTrigger>

              </TabsList>

              {/* ================= LOGIN ================= */}

              <TabsContent value="login">

                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                >

                  {/* EMAIL */}
                  <div className="space-y-2">

                    <Label htmlFor="login-email">
                      Email
                    </Label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10 h-11"
                        value={loginEmail}
                        onChange={(e) =>
                          setLoginEmail(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">

                    <Label htmlFor="login-password">
                      Password
                    </Label>

                    <div className="relative">

                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11"
                        value={loginPassword}
                        onChange={(e) =>
                          setLoginPassword(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* OPTIONS */}
                  <div className="flex items-center justify-between text-sm">

                    <a
                      href="#"
                      className="text-[#005BEA] hover:underline"
                    >
                      Forgot password?
                    </a>

                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Logging in..."
                      : "Login"}
                  </Button>

                </form>

              </TabsContent>

              {/* ================= SIGNUP ================= */}

              <TabsContent value="signup">

                <form
                  onSubmit={handleSignup}
                  className="space-y-5"
                >

                  {/* NAME */}
                  <div className="space-y-2">

                    <Label htmlFor="signup-name">
                      Full Name
                    </Label>

                    <div className="relative">

                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-11"
                        value={signupName}
                        onChange={(e) =>
                          setSignupName(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">

                    <Label htmlFor="signup-email">
                      Email
                    </Label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10 h-11"
                        value={signupEmail}
                        onChange={(e) =>
                          setSignupEmail(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">

                    <Label htmlFor="signup-password">
                      Password
                    </Label>

                    <div className="relative">

                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11"
                        value={signupPassword}
                        onChange={(e) =>
                          setSignupPassword(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="space-y-2">

                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>

                    <div className="relative">

                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11"
                        value={
                          signupConfirmPassword
                        }
                        onChange={(e) =>
                          setSignupConfirmPassword(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* TERMS */}
                  <div className="text-sm text-gray-600">

                    <label className="flex items-start gap-2 cursor-pointer">

                      <input
                        type="checkbox"
                        className="mt-1 rounded cursor-pointer"
                        required
                      />

                      <span>
                        I agree to the{" "}

                        <a
                          href="#"
                          className="text-[#005BEA] hover:underline"
                        >
                          Terms of Service
                        </a>{" "}

                        and{" "}

                        <a
                          href="#"
                          className="text-[#005BEA] hover:underline"
                        >
                          Privacy Policy
                        </a>

                      </span>

                    </label>

                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Creating Account..."
                      : "Create Account"}
                  </Button>

                </form>

              </TabsContent>

            </Tabs>

          </CardContent>

        </Card>

        {/* FOOTER */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Protected by industry-standard
          encryption and security
        </p>

      </div>

    </div>
  );
}