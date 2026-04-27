import React from "react";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#005BEA] to-[#00C6FB] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span>MediPredict</span>
            </div>
            <p className="text-white/80 text-sm">
              AI-powered medical cost prediction and insurance estimation platform for smarter healthcare decisions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Cookie Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300">Disclaimer</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                support@medipredict.com
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                +91 1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <p>&copy; 2025 MediPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

