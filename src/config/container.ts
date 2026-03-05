/**
 * CONFIG LAYER - Dependency Injection Container
 * Wires up all dependencies
 */

import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { CategoryRepository } from '../ports/outbound/CategoryRepository';
import { WalletRepository } from '../ports/outbound/WalletRepository';
import { InMemoryTransactionRepository } from '../adapters/out/InMemoryTransactionRepository';
import { InMemoryCategoryRepository } from '../adapters/out/InMemoryCategoryRepository';
import { InMemoryWalletRepository } from '../adapters/out/InMemoryWalletRepository';
import { FinanceService } from '../application/FinanceService';

export class Container {
  private transactionRepository: TransactionRepository;
  private categoryRepository: CategoryRepository;
  private walletRepository: WalletRepository;

  constructor() {
    // Initialize repositories (can switch to PostgreSQL later)
    this.transactionRepository = new InMemoryTransactionRepository();
    this.categoryRepository = new InMemoryCategoryRepository();
    this.walletRepository = new InMemoryWalletRepository();
  }

  getFinanceService(): FinanceService {
    return new FinanceService(
      this.transactionRepository,
      this.categoryRepository,
      this.walletRepository,
    );
  }

  getTransactionRepository(): TransactionRepository {
    return this.transactionRepository;
  }

  getCategoryRepository(): CategoryRepository {
    return this.categoryRepository;
  }

  getWalletRepository(): WalletRepository {
    return this.walletRepository;
  }
}

export const container = new Container();
