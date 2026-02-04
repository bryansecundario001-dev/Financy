import { RecordStatus } from "./common";

/* =======================
   USER
======================= */
export interface User {
  id_user: number;
  status: string;
  created_at: string; // ISO date
}

/* =======================
   CATALOG
======================= */
export interface Catalog {
  id_catalog: number;
  type: string;
  code: string;
  name: string;
  status: string;
  created_at: string; // ISO date
}

/* =======================
   DISTRIBUTION CATEGORY
======================= */
export interface DistributionCategory {
  id_distribution_category: number;
  name: string;
  display_order: number | null;
  created_at: string; // ISO date
  status: string;
}

/* =======================
   DISTRIBUTION CONFIGURATION
======================= */
export interface DistributionConfiguration {
  id_distribution_configuration: number;
  user_id: number;
  distribution_category_id: number;
  percentage: number;
  created_at: string; // ISO date
  status: RecordStatus;
}

/* =======================
   DISTRIBUTION BALANCE
======================= */
export interface DistributionBalance {
  id_distribution_balance: number;
  user_id: number;
  distribution_category_id: number;
  balance: number;
  created_at: string; // ISO date
  status: string;
}

/* =======================
   INCOME
======================= */
export interface Income {
  id_income: number;
  user_id: number;
  amount: number;
  catalog_income_type_id: number;
  date: string; // YYYY-MM-DD
  description: string;
  created_at: string; // ISO date
  status: string;
}

/* =======================
   INCOME DISTRIBUTION
======================= */
export interface IncomeDistribution {
  id_income_distribution: number;
  income_id: number;
  distribution_category_id: number;
  amount_assigned: number;
  created_at: string; // ISO date
  status: string;
}

/* =======================
   CONSUMPTION CATEGORY
   (ojo: distribution_category_id es TEXT según tu schema)
======================= */
export interface ConsumptionCategory {
  id_consumption_category: number;
  distribution_category_id: string;
  name: string;
  status: string;
  created_at: string; // ISO date
}

/* =======================
   CONSUMPTION
======================= */
export interface Consumption {
  id_consumption: number;
  user_id: number;
  distribution_category_id: number;
  consumption_category_id: number;
  amount: number;
  description: string | null;
  date: string; // YYYY-MM-DD
  created_at: string; // ISO date
  status: string;
}
