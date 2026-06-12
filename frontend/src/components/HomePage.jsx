import React from "react";

import {
  Activity,
  Brain,
  CheckCircle2,
  FileText,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";

import { Button } from "./ui/button";

import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage({ onNavigate, isLoggedIn }) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Premium Prediction",
      description:
        "Advanced machine learning models process user data to accurately predict insurance premium amounts.",
    },

    {
      icon: Shield,
      title: "Personalized Insurance Estimation",
      description:
        "Generate tailored insurance premium estimates based on individual health and demographic information.",
    },

    {
      icon: FileText,
      title: "Instant Premium Calculation",
      description:
        "Receive instant insurance premium predictions through a simple and user-friendly input process.",
    },

    {
      icon: TrendingUp,
      title: "Reliable & Consistent Results",
      description:
        "Leverage trained models to deliver stable and consistent insurance premium predictions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
              {/* BADGE */}
              <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#005BEA]/10 to-[#00C6FB]/10 border border-[#005BEA]/20">
                  <Sparkles className="h-4 w-4 text-[#005BEA]" />

                  <span className="text-sm text-[#005BEA]">
                    AI-Powered Insurance Prediction Platform
                  </span>
                </div>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Predict Your{" "}
                <span className="bg-linear-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
                  Insurance Premium Costs
                </span>{" "}
                with AI
              </h1>

              {/* DESCRIPTION */}
              <p className="text-lg text-gray-600">
                Upload your details and get instant AI-powered predictions for
                future insurance premium estimates with advanced machine
                learning technology.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* PRIMARY BUTTON */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  onClick={() => onNavigate(isLoggedIn ? "dashboard" : "auth")}
                >
                  <Activity className="mr-2 h-5 w-5" />

                  {isLoggedIn ? "Go To Dashboard" : "Predict Medical Cost"}
                </Button>

                {/* LOGIN BUTTON ONLY IF LOGGED OUT */}
                {!isLoggedIn && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:scale-105 transition-all duration-300 cursor-pointer hover:border-[#005BEA] hover:text-[#005BEA]"
                    onClick={() => onNavigate("auth")}
                  >
                    Login / Register
                  </Button>
                )}
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#005BEA]">100K+</div>

                  <div className="text-sm text-gray-600">Training Samples</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#005BEA]">6</div>

                  <div className="text-sm text-gray-600">Datasets Used</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#005BEA]">37+</div>

                  <div className="text-sm text-gray-600">Features Used</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#005BEA]">100%</div>

                  <div className="text-sm text-gray-600">Explainable AI</div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/20 to-[#00C6FB]/20 rounded-3xl blur-3xl"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEFJfGVufDF8fHx8MTc2MjU5MTM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Medical AI Technology"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REST OF PAGE REMAINS SAME */}
    </div>
  );
}
