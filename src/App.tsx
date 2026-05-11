import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Stepper from './components/Stepper';
import Footer from './components/Footer';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import type { OnboardingFormData } from './types';

const initialFormData: OnboardingFormData = {
  fullName: '',
  dateOfBirth: '',
  phoneNumber: '',
  gmailAddress: '',
  panNumber: '',
  aadharNumber: '',
  uanNumber: '',
  ctcInLPA: '',
  dateOfJoining: '',
  employeeId: 'EMP266181',
  department: '',
  designation: '',
  workLocation: '',
  panCard: null,
  aadharCard: null,
  passportPhoto: null,
  resume: null,
  panCardStep1: null,
  aadharCardStep1: null,
  passportPhotoStep1: null,
  resumeStep1: null,
  hasPreviousEmployment: null,
  previousEmployments: [
    {
      companyName: '',
      dateOfJoining: '',
      lastWorkingDate: '',
      currentlyWorking: false,
      designation: '',
      employmentType: '',
      reasonForLeaving: '',
    },
  ],
};

const stepTitles = [
  'Information Collection',
  'Employment Details',
  'Document Upload',
  'Review & Confirm',
  'Completion',
];

const stepSubtitles = [
  'Please provide the required information to get started',
  'Please provide the required information to continue',
  'Please upload the required documents to continue',
  'Review your information before final submission',
  'One last step! Complete the payment to finish your onboarding.',
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  const updateFormData = (updates: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <Step4 formData={formData} onNext={nextStep} onBack={prevStep} goToStep={goToStep} />;
      case 5:
        return <Step5 formData={formData} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <HeroSection
        currentStep={currentStep}
        title="Employee Onboarding"
        subtitle={stepSubtitles[currentStep - 1]}
      />
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stepper currentStep={currentStep} stepTitles={stepTitles} />
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
