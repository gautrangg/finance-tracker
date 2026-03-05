/**
 * PORTS LAYER - Outbound Port
 */

import { Wallet } from '../../domain/entities/Wallet';

export interface WalletRepository {
  save(wallet: Wallet): Promise<void>;
  findById(id: string): Promise<Wallet | null>;
  findAll(): Promise<Wallet[]>;
  update(wallet: Wallet): Promise<void>;
  delete(id: string): Promise<boolean>;
}
