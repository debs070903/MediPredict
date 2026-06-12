import { Card, CardContent } from "../components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#005BEA]">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mt-3">
          Last Updated: June 2026
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>

            <p className="text-gray-600">
              MediPredict may collect account information, premium prediction
              inputs, prediction history, and system usage information required
              to provide premium estimation services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Information
            </h2>

            <p className="text-gray-600">
              The collected information is used to generate insurance premium
              predictions, provide explainable AI insights, maintain prediction
              history, improve platform performance, and enhance the overall
              user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Data Storage & Security
            </h2>

            <p className="text-gray-600">
              User information is stored securely and access is restricted to
              authorized system components. Reasonable security measures are
              implemented to protect data against unauthorized access,
              disclosure, or modification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Third-Party Sharing
            </h2>

            <p className="text-gray-600">
              MediPredict does not sell user information. Data may only be used
              internally for prediction generation, analytics, and academic
              evaluation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. User Rights
            </h2>

            <p className="text-gray-600">
              Users may request deletion of their account data, prediction
              records, and stored information by contacting the MediPredict
              team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Academic Project Notice
            </h2>

            <p className="text-gray-600">
              MediPredict is a final-year academic project developed for
              educational and research purposes. The platform is intended to
              demonstrate machine learning, explainable AI, and full-stack
              software engineering concepts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Contact Information
            </h2>

            <p className="text-gray-600">
              Email: teammedipredict@gmail.com
              <br />
              Phone: +91 98363 08844
              <br />
              Location: Kolkata, India
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}