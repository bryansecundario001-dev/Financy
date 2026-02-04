export type RecordStatus = 'ACTIVO' | 'INACTIVO';

export interface BaseEntity {
  status: RecordStatus;
  created_at: string;
}
