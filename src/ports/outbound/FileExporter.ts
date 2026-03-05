/**
 * PORTS LAYER - Outbound Port
 * Abstraction for exporting data to files
 */

import { Transaction } from '../../domain/entities/Transaction';

export interface FileExporter {
  exportTransactions(transactions: Transaction[], filename: string): Promise<string>;
  supportedFormats(): string[];
}
