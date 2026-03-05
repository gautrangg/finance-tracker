/**
 * ADAPTERS LAYER - Outbound Adapter
 * CSV export implementation
 */

import { FileExporter } from '../../ports/outbound/FileExporter';
import { Transaction } from '../../domain/entities/Transaction';

export class CsvExporter implements FileExporter {
  async exportTransactions(transactions: Transaction[], filename: string): Promise<string> {
    // Implementation here
    return '';
  }

  supportedFormats(): string[] {
    return ['csv'];
  }
}
