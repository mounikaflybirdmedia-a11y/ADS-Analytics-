import { useRef } from 'react';
import {
  FileText, Upload, Info, ArrowLeft, ArrowRight,
  Check, X, Lock, Users
} from 'lucide-react';
import type { OnboardingFormData } from '../types';
import ProgressSidebar from '../components/ProgressSidebar';

interface Step3Props {
  formData: OnboardingFormData;
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface UploadDoc {
  label: string;
  description: string;
  format: string;
  key: keyof OnboardingFormData;
  required: boolean;
  accept: string;
  icon: React.ReactNode;
  iconBg: string;
}



export default function Step3({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const panRef = useRef<HTMLInputElement>(null);
  const aadharRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const refs = { panCard: panRef, aadharCard: aadharRef, passportPhoto: photoRef, resume: resumeRef };

  const docs: UploadDoc[] = [
    {
      label: 'PAN Card',
      description: 'Upload clear front side of your PAN card',
      format: 'Format: JPG, PNG, PDF',
      key: 'panCard',
      required: true,
      accept: '.jpg,.jpeg,.png,.pdf',
      iconBg: 'bg-blue-100',
      icon: <FileText className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Aadhaar Card',
      description: 'Upload clear front side of your Aadhaar card',
      format: 'Format: JPG, PNG, PDF',
      key: 'aadharCard',
      required: true,
      accept: '.jpg,.jpeg,.png,.pdf',
      iconBg: 'bg-orange-100',
      icon: <FileText className="w-6 h-6 text-orange-600" />,
    },
    {
      label: 'Passport Size Photo',
      description: 'Recent passport size photo with white background',
      format: 'Format: JPG, PNG',
      key: 'passportPhoto',
      required: true,
      accept: '.jpg,.jpeg,.png',
      iconBg: 'bg-purple-100',
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
    {
      label: 'Resume',
      description: 'Upload your updated resume',
      format: 'Format: PDF, DOC, DOCX',
      key: 'resume',
      required: false,
      accept: '.pdf,.doc,.docx',
      iconBg: 'bg-teal-100',
      icon: <FileText className="w-6 h-6 text-teal-600" />,
    },
  ];

  const handleFileChange = (key: keyof OnboardingFormData, file: File | null) => {
    updateFormData({ [key]: file } as Partial<OnboardingFormData>);
  };

  const getFile = (key: keyof OnboardingFormData): File | null => {
    return formData[key] as File | null;
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header Card */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-blue-700">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Upload Required Documents</h2>
              <p className="text-sm text-gray-500">Please upload clear and valid documents. All files are secure and encrypted.</p>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-700 font-medium">Accepted formats: JPG, JPEG, PNG, PDF</span>
            </div>
            <div className="h-4 w-px bg-blue-300 hidden sm:block" />
            <span className="text-sm text-blue-600">Max file size: 5MB per file</span>
          </div>

          {/* Upload Cards */}
          <div className="space-y-4">
            {docs.map((doc) => {
              const file = getFile(doc.key);
              const ref = refs[doc.key as keyof typeof refs];

              return (
                <div key={doc.label} className="upload-card">
                  {/* Left: Icon + Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.iconBg}`}>
                      {doc.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-800">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-0.5">*</span>}
                        {!doc.required && <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{doc.description}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{doc.format}</div>
                      {file && (
                        <div className="flex items-center gap-1 mt-1">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600 truncate max-w-[200px]">{file.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Upload Button */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <input
                      type="file"
                      ref={ref}
                      accept={doc.accept}
                      onChange={e => handleFileChange(doc.key, e.target.files?.[0] || null)}
                    />
                    <div
                      className={`drop-zone w-36 cursor-pointer`}
                      onClick={() => ref.current?.click()}
                    >
                      <Upload className={`w-6 h-6 mx-auto mb-1 ${file ? 'text-green-500' : 'text-blue-500'}`} />
                      <div className="text-xs font-medium text-blue-700">{file ? 'Change File' : 'Upload File'}</div>
                      <div className="text-xs text-gray-400">or drag and drop</div>
                    </div>
                    {file && (
                      <button
                        type="button"
                        onClick={() => handleFileChange(doc.key, null)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-6 flex items-start gap-2">
            <Lock className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-700">Your data is safe with us</p>
              <p className="text-xs text-green-600 mt-0.5">
                We use industry-standard encryption to protect your documents and personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button onClick={onNext} className="btn-primary">
            Save & Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <ProgressSidebar currentStep={3} progress={60} />
      </div>
    </div>
  );
}
