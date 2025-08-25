export interface ClinicInformation {
  id: number;
  title: string | null;
  employeeNumber: string | null;
  npiNumber: string | null;
  department: string | null;
  supervisor: string | null;
  dateHired: string | null;
  dateTerminated: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicInformationCreate {
  title?: string;
  employeeNumber?: string;
  npiNumber?: string;
  department?: string;
  supervisor?: string;
  dateHired?: string;
  dateTerminated?: string;
  userId: number;
}

export interface ClinicInformationUpdate {
  title?: string;
  employeeNumber?: string;
  npiNumber?: string;
  department?: string;
  supervisor?: string;
  dateHired?: string;
  dateTerminated?: string;
}
