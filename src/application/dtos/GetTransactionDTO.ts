/**
 * APPLICATION LAYER - Data Transfer Object
 */

export class GetTransactionDTO {
  constructor(
    readonly id: string,
    readonly amount: number,
    readonly type: 'income' | 'expense' | 'transfer',
    readonly categoryId: string,
    readonly walletId: string,
    readonly description: string,
    readonly date: Date,
    readonly tags: string[],
  ) {}
}

