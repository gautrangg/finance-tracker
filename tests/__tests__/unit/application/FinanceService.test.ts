/**
 * UNIT TESTS - Application Layer
 */

import { FinanceService } from '../../../src/application/FinanceService';
import { InMemoryTransactionRepository } from '../../../src/adapters/out/InMemoryTransactionRepository';
import { InMemoryCategoryRepository } from '../../../src/adapters/out/InMemoryCategoryRepository';
import { InMemoryWalletRepository } from '../../../src/adapters/out/InMemoryWalletRepository';

describe('FinanceService', () => {
  let financeService: FinanceService;

  beforeEach(() => {
    const transactionRepository = new InMemoryTransactionRepository();
    const categoryRepository = new InMemoryCategoryRepository();
    const walletRepository = new InMemoryWalletRepository();

    financeService = new FinanceService(
      transactionRepository,
      categoryRepository,
      walletRepository,
    );
  });

  it('should create a transaction', async () => {
    // Setup
    // Act
    // Assert
  });

  it('should get all transactions', async () => {
    // Setup
    // Act
    // Assert
  });

  it('should get statistics', async () => {
    // Setup
    // Act
    // Assert
  });
});
