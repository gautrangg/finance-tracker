/**
 * APPLICATION LAYER - Service
 * Orchestrates use cases, depends on abstractions (interfaces)
 */

import { Transaction } from '../domain/entities/Transaction';
import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { CategoryRepository } from '../ports/outbound/CategoryRepository';
import { WalletRepository } from '../ports/outbound/WalletRepository';
import {
  CreateTransactionUseCase,
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../ports/inbound/CreateTransactionUseCase';
import {
  GetTransactionsUseCase,
  GetTransactionsOutput,
} from '../ports/inbound/GetTransactionsUseCase';


export class FinanceService
  implements CreateTransactionUseCase, GetTransactionsUseCase
{
  constructor(
    private transactionRepository: TransactionRepository,
    private categoryRepository: CategoryRepository,
    private walletRepository: WalletRepository,
  ) {}

  // CreateTransactionUseCase implementation
  async execute(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
    // Implementation here: CreateTransactionUseCase
    throw new Error('Not implemented');
  }

  // GetTransactionsUseCase implementation
  async getTransactions(): Promise<GetTransactionsOutput[]> {
    // Implementation here
    throw new Error('Not implemented');
  }

  // GetStatisticsUseCase implementation

  async deleteTransaction(id: string): Promise<boolean> {
    // Additional use case
    return false;
  }

  async updateTransaction(id: string, updates: Partial<CreateTransactionInput>): Promise<void> {
    // Additional use case
  }
}
