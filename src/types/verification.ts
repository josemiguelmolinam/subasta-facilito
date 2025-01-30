export interface BusinessVerification {
  companyName: string;
  taxId: string;
  address: string;
  documents: string[];
  legalRepresentative: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'error';
  icon: React.ComponentType;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  verified: boolean;
}