/**
 * Input/Output difinition for the data
 * UpdateTransactionUseCase definition for behavior
 * !!!!
 * If dont have TransactionUseCase like you have food but you dont have recipe
 */

export interface UpdateTransactionInput {
    id: string;
    amount?: number;
    type?: 'income' | 'expense' | 'transfer';
    categoryId?: string;
    walletId?: string;
    description?: string;
    date?: Date;
    tags?: string[];
  }

export interface UpdateTransactionOutput {
    id: string;
    amount: number;
    type: 'income' | 'expense' | 'transfer';
    categoryId: string;
    description: string;
    date: Date;
    tags: string[];
  }

export interface UpdateTransactionUseCase {
    updateTransaction(input: UpdateTransactionInput): Promise<UpdateTransactionOutput>;
  }