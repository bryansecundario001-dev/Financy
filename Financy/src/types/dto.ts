import { RecordStatus } from "./common";

export interface CreateUserDTO {
  status: RecordStatus;
  created_at: string;
}

export interface CreateCatalogDTO {
  type: string;
  code: string;
  name: string;
  status: 'ACTIVO' | 'INACTIVO';
  created_at: string;
}


export interface CreateDistributionCategoryDTO {
  name: string;
  display_order?: number | null;
  status: RecordStatus;
  created_at: string;
}

export interface CreateDistributionConfigurationDTO {
  user_id: number;
  distribution_category_id: number;
  percentage: number;
  status: RecordStatus;
  created_at: string;
}

export interface CreateDistributionBalanceDTO {
  user_id: number;
  distribution_category_id: number;
  balance: number;
  status: RecordStatus;
  created_at: string;
}

export interface CreateIncomeDTO {
  user_id: number;
  amount: number;
  catalog_income_type_id: number;
  date: string; // YYYY-MM-DD
  description: string;
  status: RecordStatus;
  created_at: string;
}

export interface CreateIncomeDistributionDTO {
  income_id: number;
  distribution_category_id: number;
  amount_assigned: number;
  status: RecordStatus;
  created_at: string;
}

export interface CreateConsumptionCategoryDTO {
  distribution_category_id: string;
  name: string;
  status: RecordStatus;
  created_at: string;
}

export interface CreateConsumptionDTO {
  user_id: number;
  distribution_category_id: number;
  consumption_category_id: number;
  amount: number;
  description?: string | null;
  date: string; // YYYY-MM-DD
  status: RecordStatus;
  created_at: string;
}

export interface DistributionPercentageDTO {
  distribution_category_id: number;
  percentage: number;
}
