export interface EmergencyContact {
  id: number;
  name: string;
  relationship: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContactCreate {
  name: string;
  relationship?: string;
  phone?: string;
  email?: string;
  address?: string;
  userId: number;
}

export interface EmergencyContactUpdate {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
  address?: string;
}
