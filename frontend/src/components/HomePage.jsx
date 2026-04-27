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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage({ onNavigate, isLoggedIn }) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Premium Prediction",
      description:
        "Advanced machine learning models process user data to accurately predict insurance premium amounts."
    },
    {
      icon: Shield,
      title: "Personalized Insurance Estimation",
      description:
        "Generate tailored insurance premium estimates based on individual health and demographic information."
    },
    {
      icon: FileText,
      title: "Instant Premium Calculation",
      description:
        "Receive instant insurance premium predictions through a simple and user-friendly input process."
    },
    {
      icon: TrendingUp,
      title: "Reliable & Consistent Results",
      description:
        "Leverage trained models to deliver stable and consistent insurance premium predictions."
    }
  ];  

  const howItWorks = [
    {
      number: "1",
      icon: Upload,
      title: "Upload Details",
      description:
        "Upload your demographic, medical and lifestyle details to our platform.",
    },
    {
      number: "2",
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced AI analyzes your data using machine learning models trained on millions of records.",
    },
    {
      number: "3",
      icon: FileText,
      title: "Get Predictions",
      description:
        "Receive detailed insurance premium cost estimates tailored to your health profile.",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Better Financial Planning",
      description:
        "Anticipate insurance premium costs in advance and plan your finances with greater confidence.",
    },
    {
      icon: Shield,
      title: "Informed Insurance Decisions",
      description:
        "Choose suitable insurance plans and coverage levels using data-driven premium predictions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#005BEA]/10 to-[#00C6FB]/10 border border-[#005BEA]/20">
                  <Sparkles className="h-4 w-4 text-[#005BEA]" />
                  <span className="text-sm text-[#005BEA]">
                    AI-Powered Insurance Prediction Platform
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Predict Your{" "}
                <span className="bg-linear-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
                  Insurance Premium Costs
                </span>{" "}
                with AI
              </h1>

              <p className="text-lg text-gray-600">
                Upload your details and get instant AI-powered predictions for
                future insurance premium estimates with advanced machine
                learning technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  onClick={() => onNavigate(isLoggedIn ? "dashboard" : "auth")}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Predict Medical Cost
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300 cursor-pointer hover:border-[#005BEA] hover:text-[#005BEA]"
                  onClick={() => onNavigate("auth")}
                >
                  Login / Register
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[#005BEA]">10K+</div>
                  <div className="text-sm text-gray-600">Predictions Made</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#005BEA]">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#005BEA]">5K+</div>
                  <div className="text-sm text-gray-600">Happy Users</div>
                </div>
              </div>
            </div>

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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#005BEA]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00C6FB]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] text-white px-4 py-2 rounded-full text-sm">
                AI-Powered Solutions
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features for Healthcare Predictions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive healthcare prediction tools designed to help you
              make informed medical decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative cursor-pointer">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/10 to-[#00C6FB]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <Card className="relative border-2 border-gray-200 hover:border-[#005BEA]/30 transition-all duration-300 h-full hover:shadow-xl hover:-translate-y-2">
                  {/* Decorative circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#005BEA]/10 to-[#00C6FB]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                  <CardContent className="pb-4">
                    {/* Icon Container with Animation */}
                    <div className="relative mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      {/* Decorative ring */}
                      <div className="absolute -inset-2 border-2 border-[#005BEA]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <CardTitle className="text-2xl mb-3 group-hover:text-[#005BEA] transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple three-step process to get accurate medical cost predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative cursor-pointer">
                <Card className="h-full border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl font-bold bg-gradient-to-br from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent opacity-20">
                        {step.number}
                      </div>
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center">
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#005BEA] to-[#00C6FB]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MediPredict Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#005BEA]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#00C6FB]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-white text-[#005BEA] px-4 py-2 rounded-full text-sm border-2 border-[#005BEA]/20 shadow-sm">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose MediPredict?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Advanced AI technology backed by comprehensive Indian healthcare
              data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  {/* Icon container */}
                  <div className="mb-6 relative inline-block">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-3 border-2 border-dashed border-[#005BEA]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#005BEA] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Decorative element */}
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-[#005BEA] to-[#00C6FB] rounded-full group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA] to-[#00C6FB]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Predict Your Medical Costs?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of users who are making smarter healthcare decisions
            with MediPredict
          </p>
          <Button
            size="lg"
            className="bg-white text-[#005BEA] hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
            onClick={() => onNavigate(isLoggedIn ? "dashboard" : "auth")}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
