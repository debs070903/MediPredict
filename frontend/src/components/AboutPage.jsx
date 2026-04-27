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
      title: "Accuracy",
      description:
        "We deliver precise, AI-driven insurance premium predictions to help users plan their finances with confidence.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Leveraging advanced machine learning techniques to simplify and modernize insurance premium estimation.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "User information is safeguarded using robust security practices to ensure data privacy and trust.",
    },
  ];

  const problems = [
    {
      icon: TrendingUp,
      title: "Uncertain Insurance Premiums",
      description:
        "Insurance premiums vary significantly based on multiple factors, making it difficult for individuals to anticipate costs in advance.",
    },
    {
      icon: Shield,
      title: "Lack of Premium Transparency",
      description:
        "Users often struggle to understand expected insurance premiums before purchasing or renewing insurance plans.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#005BEA]/5 via-white to-[#00C6FB]/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
              About MediPredict
            </h1>
            <p className="text-lg text-gray-600">
              Revolutionizing healthcare decision-making in India through
              artificial intelligence and machine learning
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Privacy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] flex items-center justify-center mb-6">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Problems We Solve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Addressing critical challenges in the Indian healthcare system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/5 to-[#00C6FB]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center space-y-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] shadow-lg group-hover:scale-110 transition-transform">
                    <problem.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-[#005BEA] transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Decorative bottom element */}
                  <div className="flex justify-center pt-2">
                    <div className="h-1 w-16 bg-gradient-to-r from-[#005BEA] to-[#00C6FB] rounded-full group-hover:w-24 transition-all"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AI/ML Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How Our AI Works
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  MediPredict uses advanced machine learning models trained on
                  insurance-related and demographic datasets to accurately
                  predict insurance premium amounts.
                </p>

                <p>Our models evaluate key factors such as:</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Age and regional location</li>
                  <li>Body Mass Index (BMI)</li>
                  <li>Smoking status</li>
                  <li>Number of dependents</li>
                </ul>

                <p>
                  The AI continuously improves through learning from new data,
                  ensuring reliable and consistent insurance premium predictions
                  to support informed financial planning.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#005BEA]/20 to-[#00C6FB]/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Insurance premium prediction analytics"
                  className="w-full h-auto"
                />
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
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-4 text-center">
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#005BEA] to-[#00C6FB] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-white/80">Predictions Made</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <p className="text-white/80">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-white/80">Happy Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-white/80">Partner Hospitals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
