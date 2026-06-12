import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#005BEA]">Contact Us</h1>

        <p className="text-gray-600 mt-3">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CONTACT FORM */}

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Send a Message</h2>

            <Input placeholder="Your Name" />

            <Input type="email" placeholder="Your Email" />

            <Textarea
              placeholder="Type your message here..."
              className="min-h-[140px]"
            />

            <Button className="w-full">
              Send Message
            </Button>

            <p className="text-xs text-gray-500 text-center">
              This form is currently for demonstration purposes.
            </p>
          </CardContent>
        </Card>

        {/* CONTACT DETAILS */}

        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Project Information</h2>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#005BEA] mt-1" />

              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">
                  teammedipredict@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#005BEA] mt-1" />

              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">
                  +91 98363 08844
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#005BEA] mt-1" />

              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">
                  Kolkata, India
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold text-[#005BEA]">
                MediPredict
              </p>

              <p className="text-sm text-gray-600 mt-2">
                An AI-powered insurance premium prediction platform designed
                to improve transparency and understanding of insurance pricing
                through explainable machine learning.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}