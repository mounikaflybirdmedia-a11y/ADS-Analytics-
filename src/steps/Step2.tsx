import { useState } from 'react';
import { Briefcase, Info, Plus, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import type { OnboardingFormData, PreviousEmployment } from '../types';
import ProgressSidebar from '../components/ProgressSidebar';

interface Step2Props {
  formData: OnboardingFormData;
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const emptyEmployment: PreviousEmployment = {
  companyName: '',
  dateOfJoining: '',
  lastWorkingDate: '',
  currentlyWorking: false,
  designation: '',
  employmentType: '',
  reasonForLeaving: '',
};

export default function Step2({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const [hasPrevEmployment, setHasPrevEmployment] = useState<boolean>(
    formData.hasPreviousEmployment === null ? true : formData.hasPreviousEmployment
  );

  const employments = formData.previousEmployments;

  const updateEmployment = (index: number, key: keyof PreviousEmployment, value: string | boolean) => {
    const updated = employments.map((emp, i) =>
      i === index ? { ...emp, [key]: value } : emp
    );
    updateFormData({ previousEmployments: updated });
  };

  const addEmployment = () => {
    updateFormData({ previousEmployments: [...employments, { ...emptyEmployment }] });
  };

  const handleHasEmploymentChange = (val: boolean) => {
    setHasPrevEmployment(val);
    updateFormData({ hasPreviousEmployment: val });
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header Card */}
        <div className="card p-6">
          <div className="section-header">
            <div className="section-icon bg-blue-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Previous Employment Details</h2>
              <p className="text-sm text-gray-500">Please provide details of your previous employment (if any)</p>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              If you are a fresher, please select <strong>"No"</strong> below and click Save & Continue.
            </p>
          </div>

          {/* Radio Buttons */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Have you worked with any organization before?</p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPrevEmp"
                  checked={hasPrevEmployment === true}
                  onChange={() => handleHasEmploymentChange(true)}
                />
                <span className="text-sm font-medium text-gray-700">Yes, I have worked before</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPrevEmp"
                  checked={hasPrevEmployment === false}
                  onChange={() => handleHasEmploymentChange(false)}
                />
                <span className="text-sm font-medium text-gray-700">No, I am a fresher</span>
              </label>
            </div>
          </div>

          {/* Employment Forms */}
          {hasPrevEmployment && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-gray-800">Add Previous Employment</h3>
              {employments.map((emp, index) => (
                <div key={index} className={`${index > 0 ? 'border-t pt-6' : ''}`}>
                  {index > 0 && (
                    <h4 className="text-sm font-semibold text-gray-600 mb-4">Employment #{index + 1}</h4>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="form-label">Company Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          className="form-input pl-10"
                          placeholder="Enter company name"
                          value={emp.companyName}
                          onChange={e => updateEmployment(index, 'companyName', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Date of Joining <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        className="form-input"
                        placeholder="DD / MM / YYYY"
                        value={emp.dateOfJoining}
                        onChange={e => updateEmployment(index, 'dateOfJoining', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label">Last Working Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        className="form-input"
                        placeholder="DD / MM / YYYY"
                        value={emp.lastWorkingDate}
                        disabled={emp.currentlyWorking}
                        onChange={e => updateEmployment(index, 'lastWorkingDate', e.target.value)}
                      />
                      {emp.currentlyWorking && (
                        <p className="text-xs text-blue-600 mt-1">If currently working, select "Present"</p>
                      )}
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emp.currentlyWorking}
                          onChange={e => updateEmployment(index, 'currentlyWorking', e.target.checked)}
                        />
                        <span className="text-xs text-gray-600">I am currently working here</span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="form-label">Designation / Role <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your designation"
                        value={emp.designation}
                        onChange={e => updateEmployment(index, 'designation', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label">Employment Type</label>
                      <select
                        className="form-input"
                        value={emp.employmentType}
                        onChange={e => updateEmployment(index, 'employmentType', e.target.value)}
                      >
                        <option value="">Select employment type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Reason for Leaving</label>
                      <select
                        className="form-input"
                        value={emp.reasonForLeaving}
                        onChange={e => updateEmployment(index, 'reasonForLeaving', e.target.value)}
                      >
                        <option value="">Select reason (if applicable)</option>
                        <option value="Better Opportunity">Better Opportunity</option>
                        <option value="Higher Studies">Higher Studies</option>
                        <option value="Relocation">Relocation</option>
                        <option value="Salary">Salary</option>
                        <option value="Personal Reasons">Personal Reasons</option>
                        <option value="Company Closure">Company Closure</option>
                        <option value="Contract Ended">Contract Ended</option>
                        <option value="Currently Working">Currently Working</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEmployment}
                className="flex items-center gap-2 text-blue-700 border border-blue-300 hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Employment
              </button>
            </div>
          )}
        </div>

        {/* Help Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Why we need this information?</p>
            <p className="text-sm text-gray-600 mt-1">
              This helps us understand your professional background and ensure a smooth onboarding experience.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
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
        <ProgressSidebar currentStep={2} progress={40} />
      </div>
    </div>
  );
}
