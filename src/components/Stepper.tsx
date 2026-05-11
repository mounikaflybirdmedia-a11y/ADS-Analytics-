import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  stepTitles: string[];
}

export default function Stepper({ currentStep, stepTitles }: StepperProps) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={stepNum} className="flex items-center flex-1">
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white shadow-md shadow-green-200'
                      : isActive
                      ? 'bg-blue-700 text-white shadow-md shadow-blue-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                <div
                  className={`mt-2 text-xs font-medium text-center max-w-[90px] leading-tight ${
                    isActive ? 'text-blue-700' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {title}
                </div>
              </div>

              {/* Connector Line */}
              {index < stepTitles.length - 1 && (
                <div
                  className={`step-line mx-2 transition-all duration-300 ${
                    stepNum < currentStep ? 'bg-green-400' : stepNum === currentStep ? 'bg-blue-300' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
