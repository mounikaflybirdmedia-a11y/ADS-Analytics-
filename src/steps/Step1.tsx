import { useState, useRef } from 'react';
import {
  User, Calendar, Phone, Mail, Shield, CreditCard, Hash,
  Briefcase, RefreshCw, Upload, Check, ArrowRight, MessageCircle,
  Info, Smartphone, Globe, Lock, Zap, Users, Clock
} from 'lucide-react';
import type { OnboardingFormData } from '../types';
import ProgressSidebar from '../components/ProgressSidebar';

interface Step1Props {
  formData: OnboardingFormData;
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}

const WhyChooseCard = () => (
  <div className="card p-5">
    <h3 className="font-bold text-gray-800 mb-1">Why Choose</h3>
    <h3 className="font-bold text-blue-700 mb-1">ADS Analytics?</h3>
    <div className="w-8 h-0.5 bg-blue-700 mb-4" />
    <div className="space-y-4">
      {[
        { icon: Lock, title: 'Secure & Reliable', desc: 'Your data is encrypted and 100% secure.', color: 'bg-blue-100 text-blue-700' },
        { icon: Zap, title: 'Fast Onboarding', desc: 'Quick and easy onboarding process.', color: 'bg-yellow-100 text-yellow-700' },
        { icon: Users, title: 'Expert Support', desc: 'Our team is always here to help you.', color: 'bg-green-100 text-green-700' },
        { icon: Clock, title: 'End-to-End Service', desc: 'Complete HR & payroll solutions under one roof.', color: 'bg-purple-100 text-purple-700' },
      ].map(({ icon: Icon, title, desc, color }) => (
        <div key={title} className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">{title}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Step1({ formData, updateFormData, onNext }: Step1Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [employeeId, setEmployeeId] = useState('EMP266181');

  const panRef = useRef<HTMLInputElement>(null);
  const aadharRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (key: keyof OnboardingFormData, file: File | null) => {
    updateFormData({ [key]: file } as Partial<OnboardingFormData>);
  };

  const generateNewId = () => {
    const id = 'EMP' + Math.floor(100000 + Math.random() * 900000);
    setEmployeeId('EMP266181'); // Keep default as per requirement
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Personal Information */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-blue-700">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="form-input pl-10"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={e => updateFormData({ fullName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Date of Birth <span className="text-red-500">*</span></label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="form-input pl-10"
                  value={formData.dateOfBirth}
                  onChange={e => updateFormData({ dateOfBirth: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  className="form-input pl-10"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={e => updateFormData({ phoneNumber: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Gmail Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="form-input pl-10"
                  placeholder="Enter your Gmail address"
                  value={formData.gmailAddress}
                  onChange={e => updateFormData({ gmailAddress: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Identity Verification */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-blue-800">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Identity Verification</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="form-label">PAN Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="form-input pl-10 uppercase"
                  placeholder="Enter your PAN number"
                  maxLength={10}
                  value={formData.panNumber}
                  onChange={e => updateFormData({ panNumber: e.target.value.toUpperCase() })}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Aadhaar Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="form-input pl-10"
                  placeholder="Enter your Aadhaar number"
                  maxLength={12}
                  value={formData.aadharNumber}
                  onChange={e => updateFormData({ aadharNumber: e.target.value.replace(/\D/g, '') })}
                />
              </div>
            </div>
          </div>
          <div className="max-w-sm mb-4">
            <label className="form-label">UAN Number <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Enter your UAN number (Optional)"
                value={formData.uanNumber}
                onChange={e => updateFormData({ uanNumber: e.target.value })}
              />
            </div>
          </div>
          {/* UAN Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              If you do not have a UAN number, you can create one through the <strong>UMANG app</strong>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://web.umang.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <Smartphone className="w-4 h-4" />
              Create UAN via UMANG
            </a>
            <a
              href="https://www.epfindia.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2.5 px-5 rounded-lg text-sm transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              Open EPFO Portal
            </a>
          </div>
        </div>

        {/* Employment Details */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-indigo-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Employment Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="form-label">CTC (in LPA) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">₹</span>
                <input
                  type="text"
                  className="form-input pl-8"
                  placeholder="Enter your CTC"
                  value={formData.ctcInLPA}
                  onChange={e => updateFormData({ ctcInLPA: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Date of Joining (DOJ) <span className="text-red-500">*</span></label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="form-input pl-10"
                  value={formData.dateOfJoining}
                  onChange={e => updateFormData({ dateOfJoining: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="form-label">Employee ID (Unique ID) <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="form-input bg-gray-50 text-gray-600 font-semibold cursor-not-allowed"
                  value={employeeId}
                  readOnly
                />
              </div>
              <button
                type="button"
                onClick={generateNewId}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New ID
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Employee ID is unique and cannot be changed.
            </p>
          </div>
        </div>

        {/* Upload Documents Optional */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-teal-600">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Upload Documents <span className="text-sm font-normal text-gray-400">(Optional)</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'PAN Card', formats: 'JPG, PNG, PDF', maxSize: 'Max. 2MB', ref: panRef, key: 'panCardStep1' as keyof OnboardingFormData, file: formData.panCardStep1 },
              { label: 'Aadhaar Card', formats: 'JPG, PNG, PDF', maxSize: 'Max. 2MB', ref: aadharRef, key: 'aadharCardStep1' as keyof OnboardingFormData, file: formData.aadharCardStep1 },
              { label: 'Passport Photo', formats: 'JPG, PNG', maxSize: 'Max. 2MB', ref: photoRef, key: 'passportPhotoStep1' as keyof OnboardingFormData, file: formData.passportPhotoStep1 },
              { label: 'Resume', formats: 'PDF, DOC, DOCX', maxSize: 'Max. 5MB', ref: resumeRef, key: 'resumeStep1' as keyof OnboardingFormData, file: formData.resumeStep1, optional: true },
            ].map(({ label, formats, maxSize, ref, key, file, optional }) => (
              <div key={label} className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                  {file ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Upload className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="text-xs font-semibold text-gray-700 mb-0.5">
                  {label}
                  {optional && <span className="text-gray-400"> (Opt.)</span>}
                </div>
                <div className="text-xs text-gray-400 mb-0.5">{formats}</div>
                <div className="text-xs text-gray-400 mb-3">{maxSize}</div>
                <input
                  type="file"
                  ref={ref}
                  onChange={e => handleFileChange(key, e.target.files?.[0] || null)}
                  accept={formats.includes('PDF') ? (formats.includes('DOC') ? '.pdf,.doc,.docx' : '.jpg,.jpeg,.png,.pdf') : '.jpg,.jpeg,.png'}
                />
                <button
                  type="button"
                  onClick={() => ref.current?.click()}
                  className="text-xs text-blue-700 border border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  {file ? 'Change' : 'Upload'}
                </button>
                {file && (
                  <div className="mt-1 text-xs text-green-600 truncate max-w-full">{file.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation */}
        <div className="card p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={e => setConfirmed(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I confirm that the above information is correct and accurate.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onNext}
            className="btn-primary flex-1 sm:flex-initial justify-center"
          >
            <ArrowRight className="w-4 h-4" />
            Save & Continue
          </button>
          <a
            href="https://wa.me/917396122935"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-initial justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Support on WhatsApp
          </a>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="space-y-4">
          <WhyChooseCard />
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
      </div>
    </div>
  );
}
