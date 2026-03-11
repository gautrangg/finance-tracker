/**
 * PORTS LAYER - Inbound Port
 */

export interface GetTransactionsOutput {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  categoryId: string;
  walletId: string;
  description: string;
  date: Date;
  tags: string[];
}

export interface GetTransactionsUseCase {
  getTransactions(): Promise<GetTransactionsOutput[]>;
}
