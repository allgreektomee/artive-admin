import { BaseEntry, BaseDetail } from "../models/BaseEntry";

export interface IBaseRepository {
  fetchAll(category?: string): Promise<BaseEntry[]>;
  fetchById(id: string | number): Promise<BaseDetail>;
}
