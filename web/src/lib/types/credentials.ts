export type CredentialName =
  | 'CPR_TRAINING'
  | 'MEDICAL_TRAINING'
  | 'PHYSIOTHERAPY';

export interface Credential {
  id: number;
  credentialName: CredentialName;
  issueDate: string | null;
  expireDate: string | null;
  note: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialCreate {
  credentialName: CredentialName;
  issueDate?: string;
  expireDate?: string;
  note?: string;
  userId: number;
}

export interface CredentialUpdate {
  credentialName?: CredentialName;
  issueDate?: string;
  expireDate?: string;
  note?: string;
}
