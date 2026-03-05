
export interface WalletProps {
  id: string;
  name: string;
  balance: number;
  currency: string;
  description?: string;
  isActive: boolean;
}

export class Wallet {
  constructor(private props: WalletProps) {}

  isValid(): boolean {
    return this.props.name.trim().length > 0 && this.props.balance >= 0;
  }

  canDebit(amount: number): boolean {
    return this.props.balance >= amount;
  }

  addBalance(amount: number): void {
    if (amount > 0) {
      this.props.balance += amount;
    }
  }

  removeBalance(amount: number): boolean {
    if (this.canDebit(amount)) {
      this.props.balance -= amount;
      return true;
    }
    return false;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get balance(): number {
    return this.props.balance;
  }

  get currency(): string {
    return this.props.currency;
  }

  static create(props: WalletProps): Wallet {
    return new Wallet(props);
  }
}
