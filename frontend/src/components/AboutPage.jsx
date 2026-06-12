import { Target, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutPage() {
  const team = [
    {
      name: "Sukalyan Roy",
      role: "ML and Research",
      image: "/assets/Suka.webp",
    },
    {
      name: "Debanik Dutta",
      role: "Frontend, ML and Research",
      image: "/assets/Debanik.webp",
    },
    {
      name: "Soumyadeepta Manna",
      role: "Frontend and Research",
      image: "/assets/Manna.webp",
    },
    {
      name: "Soumyadip Sadhukhan",
      role: "Backend and Research",
      image: "/assets/Sadhukhan.webp",
    },
    {
      name: "Swarnava Chatterjee",
      role: "Backend and Research",
      image: "/assets/Swarnava.webp",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make insurance premium estimation more transparent, understandable and accessible through machine learning and explainable AI.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description:
        "To empower individuals with data-driven insights that support smarter healthcare and financial planning decisions.",
    },
    {
      icon: Shield,
      title: "Our Commitment",
      description:
        "To deliver reliable predictions while maintaining transparency, privacy and trust throughout the decision-making process.",
    },
  ];

  const problems = [
    {
      icon: TrendingUp,
      title: "Unpredictable Premium Costs",
      description:
        "Insurance premiums are influenced by numerous health, lifestyle and demographic factors, making future costs difficult to estimate.",
    },
    {
      icon: Shield,
      title: "Limited Cost Transparency",
      description:
        "Many individuals lack visibility into why premiums increase or decrease, creating uncertainty during financial planning.",
    },
    {
      icon: Lightbulb,
      title: "Complex Risk Assessment",
      description:
        "Understanding how personal health indicators affect insurance pricing can be challenging without analytical tools.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5 py-10 md:py-16">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#005BEA]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00C6FB]/10 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 shadow-sm mb-8">
              <Shield className="h-4 w-4 text-[#005BEA]" />

              <span className="text-sm font-medium text-[#005BEA]">
                AI-Powered Healthcare Analytics Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Building Transparency in{" "}
              <span className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
                Insurance Premium Prediction
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              MediPredict combines machine learning, healthcare analytics and
              explainable AI to estimate insurance premiums while helping users
              understand the factors that influence their predicted costs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="rounded-full bg-white px-5 py-3 shadow-md border">
                <span className="font-medium text-gray-700">
                  Explainable AI
                </span>
              </div>

              <div className="rounded-full bg-white px-5 py-3 shadow-md border">
                <span className="font-medium text-gray-700">
                  Machine Learning
                </span>
              </div>

              <div className="rounded-full bg-white px-5 py-3 shadow-md border">
                <span className="font-medium text-gray-700">
                  Healthcare Analytics
                </span>
              </div>

              <div className="rounded-full bg-white px-5 py-3 shadow-md border">
                <span className="font-medium text-gray-700">
                  Premium Estimation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Drives MediPredict
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform was built to bridge the gap between complex
              healthcare costs and understandable financial planning through
              artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center mb-6 shadow-lg">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>

                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Challenges We Address
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Healthcare insurance pricing is often difficult to understand.
              MediPredict aims to simplify this process using explainable
              machine learning and healthcare analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center mb-6 shadow-lg">
                    <problem.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#005BEA] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>

                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-[#005BEA] to-[#00C6FB] rounded-full group-hover:w-24 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How MediPredict Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How MediPredict Works
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our machine learning pipeline transforms healthcare and lifestyle
              information into transparent insurance premium predictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* STEP 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl p-8 h-full border">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center text-white text-xl font-bold mb-6">
                  1
                </div>

                <h3 className="text-xl font-bold mb-3">Data Collection</h3>

                <p className="text-gray-600">
                  Demographic, lifestyle, medical and clinical information are
                  securely collected from the user.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div>
              <div className="bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl p-8 h-full border">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center text-white text-xl font-bold mb-6">
                  2
                </div>

                <h3 className="text-xl font-bold mb-3">Feature Processing</h3>

                <p className="text-gray-600">
                  More than 37 healthcare and risk indicators are transformed
                  into machine-learning-ready features.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div>
              <div className="bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl p-8 h-full border">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center text-white text-xl font-bold mb-6">
                  3
                </div>

                <h3 className="text-xl font-bold mb-3">AI Prediction</h3>

                <p className="text-gray-600">
                  HistGradientBoosting models trained on 100K+ samples generate
                  premium estimates based on risk patterns.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div>
              <div className="bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl p-8 h-full border">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center text-white text-xl font-bold mb-6">
                  4
                </div>

                <h3 className="text-xl font-bold mb-3">Explainable Results</h3>

                <p className="text-gray-600">
                  SHAP-based explanations reveal which factors increased or
                  reduced the predicted premium.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#005BEA] to-[#00C6FB] p-10 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Built for Transparency</h3>

            <p className="max-w-3xl mx-auto text-white/90">
              Unlike traditional black-box estimators, MediPredict provides a
              detailed breakdown of the factors influencing every prediction,
              enabling users to better understand healthcare insurance costs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Declaration */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl p-10 border shadow-xl bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  Research & Development Team
                </h2>

                <p className="text-gray-600 text-lg">
                  MediPredict is a research-driven healthcare analytics platform
                  developed using machine learning, explainable AI, and
                  full-stack software engineering. Our goal is to provide
                  transparent and reliable insurance premium predictions while
                  helping users better understand the factors influencing
                  healthcare costs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow text-center">
                  <h3 className="text-xl font-bold text-[#005BEA] mb-2">
                    Machine Learning
                  </h3>

                  <p className="text-gray-600">
                    Model development, feature engineering, evaluation and
                    explainable AI research.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow text-center">
                  <h3 className="text-xl font-bold text-[#005BEA] mb-2">
                    Full Stack Development
                  </h3>

                  <p className="text-gray-600">
                    Modern React frontend and Spring Boot microservice
                    architecture.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow text-center">
                  <h3 className="text-xl font-bold text-[#005BEA] mb-2">
                    Research
                  </h3>

                  <p className="text-gray-600">
                    Dataset preparation, experimentation, model validation and
                    healthcare analytics research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet The Team Behind MediPredict
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              A multidisciplinary team combining machine learning, healthcare
              analytics, software engineering and research to build an
              explainable insurance premium prediction platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="text-center py-5">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>

                  <p className="text-sm text-[#005BEA] font-medium">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Statistics */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#005BEA] to-[#00C6FB] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research Highlights
            </h2>

            <p className="text-white/80 max-w-2xl mx-auto">
              Built using large-scale healthcare datasets and explainable
              machine learning techniques for transparent premium estimation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3">100K+</div>

              <p className="text-white/80 text-sm md:text-base">
                Training Samples
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3">6</div>

              <p className="text-white/80 text-sm md:text-base">
                Datasets Used
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3">37+</div>

              <p className="text-white/80 text-sm md:text-base">
                Features Used
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3">100%</div>

              <p className="text-white/80 text-sm md:text-base">
                Explainable AI
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
