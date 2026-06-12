import { Card, CardContent } from "../components/ui/card";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#005BEA]">
          Cookie Policy
        </h1>

        <p className="text-gray-600 mt-3">
          Last Updated: June 2026
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. What Are Cookies?
            </h2>

            <p className="text-gray-600">
              Cookies are small text files stored on your device that help
              websites remember information about your visit and improve your
              browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How MediPredict Uses Cookies
            </h2>

            <p className="text-gray-600">
              MediPredict uses cookies and similar technologies to maintain
              user sessions, improve functionality, enhance security, and
              provide a smoother user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Types of Cookies We Use
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                Authentication cookies to keep users logged in securely.
              </li>

              <li>
                Session cookies to maintain application functionality during a
                visit.
              </li>

              <li>
                Preference cookies to remember selected settings and user
                preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Third-Party Cookies
            </h2>

            <p className="text-gray-600">
              MediPredict may use trusted third-party services for analytics,
              hosting, or performance monitoring. Such services may place their
              own cookies subject to their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Managing Cookies
            </h2>

            <p className="text-gray-600">
              Most web browsers allow users to control, disable, or delete
              cookies through browser settings. Disabling cookies may affect
              certain features of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Academic Project Notice
            </h2>

            <p className="text-gray-600">
              MediPredict is a final-year academic project developed for
              educational and research purposes. Cookie usage is limited to
              functionality, authentication, and user experience enhancement.
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