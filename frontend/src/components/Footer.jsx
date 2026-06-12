import React from "react";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-gradient-to-br from-[#005BEA] to-[#00C6FB] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Activity className="h-6 w-6 text-white" />
              </div>

              <span className="font-semibold text-lg">
                MediPredict
              </span>
            </div>

            <p className="text-white/80 text-sm">
              AI-powered medical cost prediction and insurance estimation
              platform for smarter healthcare decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.("home")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("about")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("features")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("contact")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.("privacy-policy")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("terms-of-service")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("cookie-policy")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate?.("disclaimer")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                teammedipredict@gmail.com
              </li>

              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                +91 98363 08844
              </li>

              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                Kolkata, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <p>&copy; 2026 MediPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}