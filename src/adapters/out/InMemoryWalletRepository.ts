/**
 * ADAPTERS LAYER - Outbound Adapter
 */

import { WalletRepository } from '../../ports/outbound/WalletRepository';
import { Wallet } from '../../domain/entities/Wallet';

export class InMemoryWalletRepository implements WalletRepository {
  private wallets: Map<string, Wallet> = new Map();

  async save(wallet: Wallet): Promise<void> {
    // Implementation here
  }

  async findById(id: string): Promise<Wallet | null> {
    // Implementation here
    return null;
  }

  async findAll(): Promise<Wallet[]> {
    // Implementation here
    return [];
  }

  async update(wallet: Wallet): Promise<void> {
    // Implementation here
  }

  async delete(id: string): Promise<boolean> {
    // Implementation here
    return false;
  }
}
