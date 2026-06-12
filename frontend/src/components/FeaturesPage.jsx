import { Card, CardContent } from "../components/ui/card";
import { Brain, BarChart3, Shield, History, Activity, Sparkles } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Premium Prediction",
      description:
        "Predict insurance premiums using a machine learning model trained on healthcare and demographic factors.",
    },
    {
      icon: Sparkles,
      title: "Explainable AI",
      description:
        "Understand exactly which factors increased or reduced your premium through transparent model explanations.",
    },
    {
      icon: Activity,
      title: "Premium Impact Analysis",
      description:
        "View how individual health, lifestyle, and risk factors contribute to the final premium estimate.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Monitor premium trends, prediction statistics, and historical insights through interactive visualizations.",
    },
    {
      icon: History,
      title: "Prediction History",
      description:
        "Access and review previous premium predictions along with detailed model explanations.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "User accounts and prediction records are protected through secure authentication mechanisms.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#005BEA]">Features</h1>

        <p className="text-gray-600 mt-3">
          Discover the capabilities of MediPredict's machine learning powered
          insurance premium prediction platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <Icon className="h-10 w-10 text-[#005BEA] mb-4" />

                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}