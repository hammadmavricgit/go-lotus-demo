export interface StaffHours {
  id: number;
  expectedHours: number | null;
  maxHours: number | null;
  maxOvertimeHours: number | null;
  supervisedHours: number | null;
  vacationTimeAlloted: number | null;
  sickTimeAlloted: number | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface StaffHoursCreate {
  expectedHours?: number;
  maxHours?: number;
  maxOvertimeHours?: number;
  supervisedHours?: number;
  vacationTimeAlloted?: number;
  sickTimeAlloted?: number;
  userId: number;
}

export interface StaffHoursUpdate {
  expectedHours?: number;
  maxHours?: number;
  maxOvertimeHours?: number;
  supervisedHours?: number;
  vacationTimeAlloted?: number;
  sickTimeAlloted?: number;
}
