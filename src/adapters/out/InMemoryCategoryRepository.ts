/**
 * ADAPTERS LAYER - Outbound Adapter
 */

import { CategoryRepository } from '../../ports/outbound/CategoryRepository';
import { Category } from '../../domain/entities/Category';

export class InMemoryCategoryRepository implements CategoryRepository {
  private categories: Map<string, Category> = new Map();

  async save(category: Category): Promise<void> {
    // Implementation here
  }

  async findById(id: string): Promise<Category | null> {
    // Implementation here
    return null;
  }

  async findAll(): Promise<Category[]> {
    // Implementation here
    return [];
  }

  async findByType(type: 'income' | 'expense'): Promise<Category[]> {
    // Implementation here
    return [];
  }

  async update(category: Category): Promise<void> {
    // Implementation here
  }

  async delete(id: string): Promise<boolean> {
    // Implementation here
    return false;
  }
}
