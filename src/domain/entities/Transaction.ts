/**
 * DOMAIN LAYER - Transaction Entity
 * Pure business logic, no external dependencies
 */

export interface TransactionProps {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  categoryId: string;
  walletId: string;
  description: string;
  date: Date;
  isRecurring?: boolean;
  tags?: string[];
}

export class Transaction {
  constructor(private props: TransactionProps) {}

  // Business Logic - Pure Domain Rules
  isValid(): boolean {
    return this.amount > 0 && this.description.trim().length > 0;
  }

  isExpense(): boolean {
    return this.props.type === 'expense';
  }

  isIncome(): boolean {
    return this.props.type === 'income';
  }

  canBeCancelled(): boolean {
    const daysSinceTransaction = this.daysSince();
    return daysSinceTransaction <= 30;
  }

  private daysSince(): number {
    const now = new Date();
    const diff = now.getTime() - this.props.date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get amount(): number {
    return this.props.amount;
  }

  get type(): 'income' | 'expense' | 'transfer' {
    return this.props.type;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get walletId(): string {
    return this.props.walletId;
  }

  get description(): string {
    return this.props.description;
  }

  get date(): Date {
    return this.props.date;
  }

  get tags(): string[] {
    return this.props.tags || [];
  }



  static update(existing: Transaction, props: Partial<TransactionProps>): Transaction {
    return new Transaction({
      id: existing.id,
      amount: props.amount ?? existing.amount,
      type: props.type ?? existing.type,
      categoryId: props.categoryId ?? existing.categoryId,
      walletId: props.walletId ?? existing.walletId,
      description: props.description ?? existing.description,
      date: props.date ?? existing.date,
      tags: props.tags ?? existing.tags,
    });
  }
}
