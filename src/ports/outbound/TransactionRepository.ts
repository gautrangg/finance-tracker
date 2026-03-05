/**
 * PORTS LAYER - Outbound Port
 * Define what the core system needs (interface only, no implementation)
 */

import { Transaction } from '../../domain/entities/Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  findByWalletId(walletId: string): Promise<Transaction[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]>;
  update(transaction: Transaction): Promise<void>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
