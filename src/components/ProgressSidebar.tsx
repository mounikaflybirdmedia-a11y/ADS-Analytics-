import { Check } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

interface ProgressSidebarProps {
  currentStep: number;
  progress: number;
}

const steps = [
  { num: 1, label: 'Information Collection' },
  { num: 2, label: 'Employment Details' },
  { num: 3, label: 'Document Upload' },
  { num: 4, label: 'Review & Confirm' },
  { num: 5, label: 'Completion' },
];

const stepLabels = [
  'Information Collection',
  'Employment Details',
  'Document Upload',
  'Review & Confirm',
  'Completion',
];

export default function ProgressSidebar({ currentStep, progress }: ProgressSidebarProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Progress Card */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-4">Your Progress</h3>
        <div className="flex flex-col items-center mb-4">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring-circle"
            />
            <text
              x="60"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold"
              fontSize="18"
              fontWeight="700"
              fill="#1d4ed8"
              fontFamily="Inter, sans-serif"
            >
              {progress}%
            </text>
          </svg>
          <div className="text-center mt-1">
            <div className="text-sm font-semibold text-gray-700">Step {currentStep} of 5</div>
            <div className="text-xs text-gray-500">{stepLabels[currentStep - 1]}</div>
          </div>
        </div>
      </div>

      {/* Onboarding Journey */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-4">Onboarding Journey</h3>
        <div className="space-y-1">
          {steps.map((step) => {
            const isCompleted = step.num < currentStep;
            const isActive = step.num === currentStep;
            const isPending = step.num > currentStep;

            return (
              <div
                key={step.num}
                className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 border border-blue-100' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <div>
                  <div
                    className={`text-sm font-medium ${
                      isActive ? 'text-blue-700' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`text-xs ${
                      isCompleted ? 'text-green-600' : isActive ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Need Help */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-1">Need Help?</h3>
        <p className="text-xs text-gray-500 mb-4">Our support team is ready to assist you.</p>
        <a
          href="https://wa.me/917396122935"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium opacity-90">Chat on WhatsApp</div>
            <div className="font-bold text-base leading-tight">7396122935</div>
          </div>
        </a>
      </div>
    </div>
  );
}
