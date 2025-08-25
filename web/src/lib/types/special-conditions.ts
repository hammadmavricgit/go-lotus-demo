export interface SpecialCondition {
  id: number;
  condition: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialConditionCreate {
  condition: string;
}

export interface SpecialConditionUpdate {
  condition?: string;
}

export interface StaffSpecialCondition {
  id: number;
  userId: number;
  specialConditionId: number;
  specialCondition: SpecialCondition;
  createdAt: string;
  updatedAt: string;
}
