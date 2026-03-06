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
    //tạo transaction theo entity 
    const transaction = Transaction.create({
      id: `tx-${Date.now()}`,
      amount: input.amount,
      type: input.type,
      categoryId: input.categoryId,
      walletId: input.walletId,
      description: input.description,
      date: input.date || new Date(),
      tags: input.tags || [],
    });
    //check validation của transaction
    if(!transaction.isValid()) {
      throw new Error('Invalid transaction data');
    }
    //lưu transaction vào repository
    await this.transactionRepository.save(transaction);
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      categoryId: transaction.categoryId,
      description: transaction.description,
      date: transaction.date,
      tags: transaction.tags,
    };    
    
  }

  // GetTransactionsUseCase implementation
  async getTransactions(): Promise<GetTransactionsOutput[]> {
    const transactions = await this.transactionRepository.findAll();
    return transactions.map(tx => ({
      id: tx.id,
      amount: tx.amount,
      type: tx.type,
      categoryId: tx.categoryId,
      walletId: tx.walletId,
      description: tx.description,
      date: tx.date,
      tags: tx.tags,
    }));
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
