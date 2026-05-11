import { useState } from 'react';
import {
  CreditCard, Shield, ArrowLeft, Lock, Check, Info,
  Mail, MessageCircle, Smartphone, Building, Wallet,
  FileText, Upload, User, Briefcase
} from 'lucide-react';
import type { OnboardingFormData } from '../types';

interface Step5Props {
  formData: OnboardingFormData;
  onBack: () => void;
}

const paymentMethods = [
  {
    id: 'upi',
    label: 'UPI',
    description: 'Pay using any UPI app',
    logos: ['Paytm', 'GPay', 'PhonePe'],
    icon: Smartphone,
    logoBg: ['bg-blue-100', 'bg-green-100', 'bg-purple-100'],
    logoColor: ['text-blue-700', 'text-green-700', 'text-purple-700'],
  },
  {
    id: 'card',
    label: 'Debit / Credit Card',
    description: 'Pay using your card',
    logos: ['VISA', 'MasterCard', 'RuPay'],
    icon: CreditCard,
    logoBg: ['bg-blue-100', 'bg-red-100', 'bg-orange-100'],
    logoColor: ['text-blue-800', 'text-red-700', 'text-orange-700'],
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    description: 'Pay using your bank account',
    logos: [],
    icon: Building,
    logoBg: [],
    logoColor: [],
  },
  {
    id: 'wallet',
    label: 'Wallets',
    description: 'Pay using your wallet',
    logos: ['Paytm', 'PhonePe', 'Amazon Pay'],
    icon: Wallet,
    logoBg: ['bg-blue-100', 'bg-purple-100', 'bg-yellow-100'],
    logoColor: ['text-blue-700', 'text-purple-700', 'text-yellow-700'],
  },
];

export default function Step5({ formData, onBack }: Step5Props) {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Onboarding Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thank you! Your onboarding has been submitted successfully. Our team will contact you within 24 working hours.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-6">
            <p className="text-sm text-blue-700">
              A confirmation email will be sent to <strong>{formData.gmailAddress || 'your registered email'}</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/917396122935"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:support@adsanalytics.in"
              className="btn-secondary justify-center"
            >
              <Mail className="w-4 h-4" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header Card */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Complete Your Onboarding</h2>
              <p className="text-sm text-gray-500">Please complete the payment to activate your onboarding process.</p>
            </div>
          </div>

          {/* Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Once the payment is successful, our team will verify your details and start the onboarding process.
            </p>
          </div>
        </div>

        {/* Signup Fee */}
        <div className="card p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 border-b pb-3">Signup Fee Details</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <div className="font-bold text-gray-800">Signup Fee</div>
                <div className="text-xs text-gray-500">One-time payment (Non-refundable)</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
              <Shield className="w-4 h-4 text-green-600" />
              <div className="text-xs font-semibold text-green-700">Secure Transaction</div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-gray-600 mb-4">Choose Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              const isSelected = selectedPayment === method.id;

              return (
                <label
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={isSelected}
                    onChange={() => setSelectedPayment(method.id)}
                    className="flex-shrink-0"
                  />
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-blue-700' : 'text-gray-500'}`} />
                  <div className="font-semibold text-sm text-gray-800 w-36 flex-shrink-0">{method.label}</div>
                  {method.logos.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {method.logos.map((logo, i) => (
                        <span
                          key={logo}
                          className={`text-xs font-bold px-2 py-1 rounded ${method.logoBg[i]} ${method.logoColor[i]}`}
                        >
                          {logo}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="ml-auto text-sm text-gray-500 hidden sm:block">{method.description}</div>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </label>
              );
            })}
          </div>

          {/* Security Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-5 flex items-start gap-2">
            <Lock className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-700">Your payment is 100% secure</p>
              <p className="text-xs text-green-600 mt-0.5">
                We use industry-standard encryption and secure gateways to protect your information.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="card p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I confirm that I have reviewed all the details and agree to the{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-900">terms and conditions</a>.
            </span>
          </label>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md ${
              agreed
                ? 'bg-blue-700 hover:bg-blue-800 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Lock className="w-4 h-4" />
            Proceed to Pay Securely
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* What happens next */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">What happens next?</h3>
                <p className="text-sm text-gray-600">
                  After successful payment, you will receive a confirmation email and our team will contact you within{' '}
                  <strong>24 working hours</strong>.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center justify-center w-20 h-20 flex-shrink-0">
              <div className="relative">
                <FileText className="w-12 h-12 text-blue-200" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Lock, title: 'Fast & Easy', desc: 'Complete your onboarding in just a few minutes', color: 'bg-blue-100 text-blue-700' },
            { icon: Shield, title: 'Secure & Confidential', desc: 'Your data is encrypted and 100% safe', color: 'bg-green-100 text-green-700' },
            { icon: User, title: 'Expert Support', desc: 'Our team is always here to help you', color: 'bg-purple-100 text-purple-700' },
            { icon: Briefcase, title: 'End-to-End Service', desc: 'Complete HR & payroll solutions under one roof', color: 'bg-orange-100 text-orange-700' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card p-4 text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-1">{title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="space-y-4">
          {/* Onboarding Summary */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4">Onboarding Summary</h3>
            {[
              { num: 1, label: 'Information Collection', status: 'Completed' },
              { num: 2, label: 'Employment Details', status: 'Completed' },
              { num: 3, label: 'Document Upload', status: 'Completed' },
              { num: 4, label: 'Review & Confirm', status: 'Completed' },
              { num: 5, label: 'Completion', status: 'Final Step' },
            ].map(item => (
              <div
                key={item.num}
                className={`flex items-start gap-3 p-2.5 rounded-lg mb-1 ${
                  item.num === 5 ? 'bg-blue-50 border border-blue-100' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    item.num === 5 ? 'bg-blue-700 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {item.num === 5 ? '5' : <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className={`text-sm font-medium ${item.num === 5 ? 'text-blue-700' : 'text-gray-800'}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${item.num === 5 ? 'text-blue-500' : 'text-green-600'}`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Secure & Trusted */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4">Secure & Trusted</h3>
            {[
              { icon: Lock, title: 'SSL Encrypted', desc: 'Your data is encrypted and secure' },
              { icon: Shield, title: 'Trusted Payment Gateways', desc: 'We use trusted and reliable payment partners' },
              { icon: Check, title: '100% Safe', desc: 'Your payment and details are protected with us' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 mb-3">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-blue-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{title}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Need Help */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-1">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-4">Our support team is ready to assist you.</p>
            <a
              href="https://wa.me/917396122935"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg mb-3"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium opacity-90">Chat on WhatsApp</div>
                <div className="font-bold text-base leading-tight">7396122935</div>
              </div>
            </a>
            <p className="text-xs text-gray-500 mb-2">or write to us at</p>
            <a
              href="mailto:support@adsanalytics.in"
              className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
            >
              <Mail className="w-4 h-4" />
              support@adsanalytics.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
