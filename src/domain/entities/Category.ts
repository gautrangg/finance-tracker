
export interface CategoryProps {
  id: string;
  name: string;
  description?: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
}

export class Category {
  constructor(private props: CategoryProps) {}

  isValid(): boolean {
    return this.props.name.trim().length > 0 && ['income', 'expense'].includes(this.props.type);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): string {
    return this.props.type;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  static create(props: CategoryProps): Category {
    return new Category(props);
  }
}
