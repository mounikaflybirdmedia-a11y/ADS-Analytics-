import { Shield } from 'lucide-react';

interface HeroSectionProps {
  currentStep: number;
  title: string;
  subtitle: string;
}

export default function HeroSection({ currentStep, title, subtitle }: HeroSectionProps) {
  const isPayment = currentStep === 5;

  return (
    <div className="hero-gradient text-white py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
            <p className="text-blue-200 text-sm sm:text-base">{subtitle}</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
            <Shield className="w-5 h-5 text-blue-200" />
            <div>
              <div className="text-sm font-bold text-white">
                {isPayment ? '100% Secure Payment' : '100% Secure'}
              </div>
              <div className="text-xs text-blue-200">
                {isPayment ? 'Your transaction is safe with us' : 'Your data is safe with us'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
