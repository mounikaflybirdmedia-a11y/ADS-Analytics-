import { TrendingUp, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">ADS Analytics</div>
                <div className="text-xs text-blue-400">Your Growth, Our Commitment</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Providing professional HR and payroll solutions to help businesses grow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Privacy Policy', 'Terms & Conditions'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">7396122935</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@adsanalytics.in" className="text-gray-400 hover:text-blue-400 transition-colors">
                  support@adsanalytics.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="https://www.adsanalytics.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  www.adsanalytics.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-xs text-gray-500">
            © 2025 ADS Analytics. All rights reserved. | Secure & Trusted Employee Onboarding Portal
          </p>
        </div>
      </div>
    </footer>
  );
}
