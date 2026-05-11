// Shared types for the onboarding portal

export interface OnboardingFormData {
  // Step 1 - Personal Info
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gmailAddress: string;
  // Identity Verification
  panNumber: string;
  aadharNumber: string;
  uanNumber: string;
  // Employment Details
  ctcInLPA: string;
  dateOfJoining: string;
  employeeId: string;
  department: string;
  designation: string;
  workLocation: string;
  // Documents Step 3
  panCard: File | null;
  aadharCard: File | null;
  passportPhoto: File | null;
  resume: File | null;
  // Documents Step 1 optional
  panCardStep1: File | null;
  aadharCardStep1: File | null;
  passportPhotoStep1: File | null;
  resumeStep1: File | null;
  // Step 2 - Employment
  hasPreviousEmployment: boolean | null;
  previousEmployments: PreviousEmployment[];
}

export interface PreviousEmployment {
  companyName: string;
  dateOfJoining: string;
  lastWorkingDate: string;
  currentlyWorking: boolean;
  designation: string;
  employmentType: string;
  reasonForLeaving: string;
}
