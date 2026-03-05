/**
 * PORTS LAYER - Outbound Port
 */

import { Category } from '../../domain/entities/Category';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findByType(type: 'income' | 'expense'): Promise<Category[]>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<boolean>;
}
