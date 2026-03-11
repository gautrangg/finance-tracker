/**
 * ADAPTERS LAYER - Inbound Adapter
 * Express REST API adapter
 */

import express, { Express, Request, Response } from 'express';
import { CreateTransactionUseCase, CreateTransactionInput } from '../../ports/inbound/CreateTransactionUseCase';
import { GetTransactionsUseCase } from '../../ports/inbound/GetTransactionsUseCase';
import { UpdateTransactionUseCase } from '../../ports/inbound/UpdateTransactionUseCase';
import { DeleteTransactionUseCase } from '../../ports/inbound/DeleteTransactionUseCase';
import { GetBalanceUseCase } from '../../ports/inbound/GetBalanceUseCase';
export class RestApiAdapter {
  private app: Express;
  
  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private getTransactionsUseCase: GetTransactionsUseCase,
    private updateTransactionUseCase: UpdateTransactionUseCase,
    private deleteTransactionUseCase: DeleteTransactionUseCase,
    private getBalanceUseCase: GetBalanceUseCase,
  ) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.post('/api/transactions', this.createTransaction.bind(this));
    this.app.get('/api/transactions', this.getTransactions.bind(this));
    this.app.put('/api/transactions/:id',this.updateTransaction.bind(this));
    this.app.delete('/api/transactions/delete/:id',this.deleteTransaction.bind(this));
    this.app.get('/api/transactions/balance',this.getBalance.bind(this));
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Finance Tracker API running on http://localhost:${port}`);
    });
  }

  private async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createTransactionUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  private async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getTransactionsUseCase.getTransactions();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
    private async updateTransaction(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.updateTransactionUseCase.updateTransaction({
        id: req.params.id,
        ...req.body,
      });
      res.status(200).json(result);
    } catch (error) {
      const msg = (error as Error).message;
      if(msg === 'Undefined transaction!'){
        res.status(404).json({ error: (error as Error).message });
      }else
      res.status(400).json({ error: (error as Error).message });
    }
  }
  private async deleteTransaction(req: Request, res: Response): Promise<void>{
    const result = await this.deleteTransactionUseCase.deleteTransaction({
      id: req.params.id
    });
    try {
      if(!result.success){
        res.status(404).json(result);
      }else
        res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message})
    }
  }

  private async getBalance(req: Request, res: Response): Promise<void>{
      try {
        const result = await this.getBalanceUseCase.getBalance();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({error: (error as Error)});
      }
  }
}