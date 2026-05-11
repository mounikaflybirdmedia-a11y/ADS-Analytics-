import {
  User, Shield, Briefcase, Building, FileText, Check,
  ArrowLeft, ArrowRight, Edit, Info, BadgeCheck
} from 'lucide-react';
import type { OnboardingFormData } from '../types';
import ProgressSidebar from '../components/ProgressSidebar';

interface Step4Props {
  formData: OnboardingFormData;
  onNext: () => void;
  onBack: () => void;
  goToStep: (step: number) => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
    <div className="text-sm font-semibold text-gray-800">{value || '—'}</div>
  </div>
);

const SectionCard = ({
  number, title, icon, onEdit, color, children
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <div className={`flex items-center justify-between px-5 py-3 ${color}`}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-bold">
          {number}. {title}
        </span>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity bg-white/20 px-2.5 py-1 rounded-lg"
      >
        <Edit className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export default function Step4({ formData, onNext, onBack, goToStep }: Step4Props) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const maskAadhar = (num: string) => {
    if (!num) return '—';
    const digits = num.replace(/\D/g, '');
    if (digits.length < 4) return num;
    return `XXXX XXXX ${digits.slice(-4)}`;
  };

  const hasDoc = (file: File | null | undefined) => file != null;

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Review Your Information</h2>
                <p className="text-sm text-gray-500">Please review all the details below. You can edit any section if needed.</p>
              </div>
            </div>
            <button
              onClick={() => goToStep(1)}
              className="hidden sm:flex items-center gap-1.5 text-sm text-blue-700 border border-blue-200 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit All
            </button>
          </div>
        </div>

        {/* 1. Personal Information */}
        <SectionCard
          number={1}
          title="Personal Information"
          icon={<User className="w-4 h-4 text-blue-700" />}
          onEdit={() => goToStep(1)}
          color="bg-blue-50 text-blue-800"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <InfoRow label="Full Name" value={formData.fullName || 'Rohan Kumar'} />
            <InfoRow label="Date of Birth" value={formatDate(formData.dateOfBirth) || '15 May 1995'} />
            <InfoRow label="Phone Number" value={formData.phoneNumber || '7396122935'} />
            <InfoRow label="Gmail Address" value={formData.gmailAddress || 'rohan.kumar@gmail.com'} />
          </div>
        </SectionCard>

        {/* 2. Identity Verification */}
        <SectionCard
          number={2}
          title="Identity Verification"
          icon={<Shield className="w-4 h-4 text-green-700" />}
          onEdit={() => goToStep(1)}
          color="bg-green-50 text-green-800"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <InfoRow label="PAN Number" value={formData.panNumber || 'ABCDE1234F'} />
            <div className="min-w-0">
              <div className="text-xs text-gray-500 mb-0.5">Aadhaar Number</div>
              <div className="text-sm font-semibold text-gray-800">
                {maskAadhar(formData.aadharNumber) || 'XXXX XXXX 1234'}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-500 mb-0.5">UAN Number</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">{formData.uanNumber || '101010123456'}</span>
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  <BadgeCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 3. Employment Details */}
        <SectionCard
          number={3}
          title="Employment Details"
          icon={<Briefcase className="w-4 h-4 text-purple-700" />}
          onEdit={() => goToStep(1)}
          color="bg-purple-50 text-purple-800"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <InfoRow label="CTC (in LPA)" value={formData.ctcInLPA ? `₹ ${formData.ctcInLPA}` : '₹ 6,00,000'} />
            <InfoRow label="Date of Joining (DOJ)" value={formatDate(formData.dateOfJoining) || '01 June 2024'} />
            <InfoRow label="Employee ID (Unique ID)" value={formData.employeeId || 'EMP266181'} />
            <InfoRow label="Department / Function" value={formData.department || 'HR & Operations'} />
            <InfoRow label="Designation / Role" value={formData.designation || 'HR Executive'} />
            <InfoRow label="Work Location" value={formData.workLocation || 'Noida, Uttar Pradesh'} />
          </div>
        </SectionCard>

        {/* 4. Previous Employment */}
        <SectionCard
          number={4}
          title="Previous Employment"
          icon={<Building className="w-4 h-4 text-orange-700" />}
          onEdit={() => goToStep(2)}
          color="bg-orange-50 text-orange-800"
        >
          {formData.hasPreviousEmployment === false ? (
            <p className="text-sm text-gray-500 italic">Fresher — No previous employment</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Company Name', 'Date of Joining', 'Last Working Date', 'Designation'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formData.previousEmployments.filter(e => e.companyName).length > 0 ? (
                    formData.previousEmployments.filter(e => e.companyName).map((emp, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 pr-4 font-medium text-gray-800">{emp.companyName || 'ABC Private Limited'}</td>
                        <td className="py-2.5 pr-4 text-gray-600">{formatDate(emp.dateOfJoining) || '10 Jan 2021'}</td>
                        <td className="py-2.5 pr-4 text-gray-600">{emp.currentlyWorking ? 'Present' : (formatDate(emp.lastWorkingDate) || '31 May 2024')}</td>
                        <td className="py-2.5 text-gray-600">{emp.designation || 'HR Executive'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-3 text-sm text-gray-500 italic">
                        ABC Private Limited — 10 Jan 2021 to 31 May 2024 — HR Executive
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        {/* 5. Uploaded Documents */}
        <SectionCard
          number={5}
          title="Uploaded Documents"
          icon={<FileText className="w-4 h-4 text-teal-700" />}
          onEdit={() => goToStep(3)}
          color="bg-teal-50 text-teal-800"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'PAN Card', file: formData.panCard, filename: 'pan_card.jpg' },
              { label: 'Aadhaar Card', file: formData.aadharCard, filename: 'aadhaar.jpg' },
              { label: 'Passport Photo', file: formData.passportPhoto, filename: 'passport.jpg' },
              { label: 'Resume', file: formData.resume, filename: 'resume.pdf' },
            ].map(({ label, file, filename }) => (
              <div key={label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-800">{label}</div>
                  <div className="text-xs text-gray-500 truncate">{file ? file.name : filename}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            <strong>Important Note: </strong>
            By confirming, you agree that all the information provided is true and accurate to the best of your knowledge.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button onClick={onNext} className="btn-primary">
            <Shield className="w-4 h-4" />
            Confirm & Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <ProgressSidebar currentStep={4} progress={80} />
      </div>
    </div>
  );
}
