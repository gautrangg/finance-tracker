/**
 * APPLICATION LAYER - Data Transfer Object
 */

export class CreateTransactionDTO {
  constructor(
    readonly amount: number,
    readonly type: 'income' | 'expense' | 'transfer',
    readonly categoryId: string,
    readonly walletId: string,
    readonly description: string,
    readonly date?: Date,
    readonly tags?: string[],
  ) {}

  validate(): boolean {
    return this.amount > 0 && this.description.trim().length > 0;
  }
}
