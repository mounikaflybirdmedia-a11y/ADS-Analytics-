import { TrendingUp, Headphones, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-blue-800">ADS Analytics</div>
              <div className="text-xs text-gray-500 leading-tight">Your Growth, Our Commitment</div>
            </div>
          </div>

          {/* Need Help */}
          <a
            href="https://wa.me/917396122935"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Headphones className="w-4 h-4 text-blue-700" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-gray-800">Need Help?</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-green-500" />
                Chat with us on WhatsApp
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
