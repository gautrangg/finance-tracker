/**
 * DOMAIN LAYER - Custom Exceptions
 */

export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class InvalidTransactionException extends DomainException {
  constructor(message: string = 'Invalid transaction') {
    super(message);
    this.name = 'InvalidTransactionException';
  }
}

export class InsufficientBalanceException extends DomainException {
  constructor(message: string = 'Insufficient balance') {
    super(message);
    this.name = 'InsufficientBalanceException';
  }
}

export class CategoryNotFoundException extends DomainException {
  constructor(categoryId: string) {
    super(`Category with id ${categoryId} not found`);
    this.name = 'CategoryNotFoundException';
  }
}

export class WalletNotFoundException extends DomainException {
  constructor(walletId: string) {
    super(`Wallet with id ${walletId} not found`);
    this.name = 'WalletNotFoundException';
  }
}
