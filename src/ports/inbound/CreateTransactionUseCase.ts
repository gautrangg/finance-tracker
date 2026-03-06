/**
 * PORTS LAYER - Inbound Port
 * Define use cases that drive the application
 */

export interface CreateTransactionInput {
  id?: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  categoryId: string;
  walletId: string;
  description: string;
  date?: Date;
  tags?: string[];
}

export interface CreateTransactionOutput {
  id: string;
  amount: number;
  type: string;
  categoryId: string;
  description: string;
  date: Date;
  tags: string[];
}

export interface CreateTransactionUseCase {
  execute(input: CreateTransactionInput): Promise<CreateTransactionOutput>;
}
