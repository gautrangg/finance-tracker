/**
 * ADAPTERS LAYER - Outbound Adapter
 * In-memory implementation for testing
 */

import { TransactionRepository } from '../../ports/outbound/TransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';
import { IdGenerator } from '../../ports/outbound/IdGenerator';

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Map<string, Transaction> = new Map();
  
  constructor(private idGenarator?: IdGenerator) {}

  async save(transaction: Transaction): Promise<void> {
    if(!transaction.id) {
      throw new Error('Transaction must have an id');
    }
    this.transactions.set(transaction.id, transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    // Implementation here
    return null;
  }

  async findAll(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async findByWalletId(walletId: string): Promise<Transaction[]> {
    // Implementation here
    return [];
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    // Implementation here
    return [];
  }

  async update(transaction: Transaction): Promise<void> {
    // Implementation here
  }

  async delete(id: string): Promise<boolean> {
    // Implementation here
    return false;
  }

  async count(): Promise<number> {
    // Implementation here
    return 0;
  }
}
