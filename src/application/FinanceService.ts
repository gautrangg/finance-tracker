/**
 * APPLICATION LAYER - Service
 * Orchestrates use cases, depends on abstractions (interfaces)
 */

import { Transaction } from '../domain/entities/Transaction';
import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { CategoryRepository } from '../ports/outbound/CategoryRepository';
import { WalletRepository } from '../ports/outbound/WalletRepository';
import {
  CreateTransactionUseCase,
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../ports/inbound/CreateTransactionUseCase';
import {
  GetTransactionsUseCase,
  GetTransactionsOutput,
} from '../ports/inbound/GetTransactionsUseCase';
import {
  UpdateTransactionUseCase, 
  UpdateTransactionInput,
  UpdateTransactionOutput } from '../ports/inbound/UpdateTransactionUseCase';
import {
  DeleteTransactionUseCase,
  DeleteTransactionInput,
  DeleteTransactionOutput } from '../ports/inbound/DeleteTransactionUseCase';
import { GetBalanceOuput } from '../ports/inbound/GetBalanceUseCase';
export class FinanceService
  implements CreateTransactionUseCase, GetTransactionsUseCase, UpdateTransactionUseCase
{
  constructor(
    private transactionRepository: TransactionRepository,
    private categoryRepository: CategoryRepository,
    private walletRepository: WalletRepository,
  ) {}

  // CreateTransactionUseCase implementation
  async execute(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
    //tạo transaction theo entity 
    const transaction = new Transaction({
      id: input.id || `tx-${Date.now()}`,
      amount: input.amount,
      type: input.type,
      categoryId: input.categoryId,
      walletId: input.walletId,
      description: input.description,
      date: input.date || new Date(),
      tags: input.tags || [],
    });
    // const transaction = Transaction.create({
    //   id: `tx-${Date.now()}`,
    //   amount: input.amount,
    //   type: input.type,
    //   categoryId: input.categoryId,
    //   walletId: input.walletId,
    //   description: input.description,
    //   date: input.date || new Date(),
    //   tags: input.tags || [],
    // });
    //check validation của transaction
    if(!transaction.isValid()) {
      throw new Error('Invalid transaction data');
    }
    if(!transaction.isExpense() && !transaction.isIncome()){
      throw new Error('Type must be "income" or "expense"');
    }
    //lưu transaction vào repository
    await this.transactionRepository.save(transaction);
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      categoryId: transaction.categoryId,
      description: transaction.description,
      date: transaction.date,
      tags: transaction.tags,
    };    
    
  }

  // GetTransactionsUseCase implementation
  async getTransactions(): Promise<GetTransactionsOutput[]> {
    const transactions = await this.transactionRepository.findAll();
    return transactions.map(tx => ({
      id: tx.id,
      amount: tx.amount,
      type: tx.type,
      categoryId: tx.categoryId,
      walletId: tx.walletId,
      description: tx.description,
      date: tx.date,
      tags: tx.tags,
    }));
  }

  // GetStatisticsUseCase implementation

  async deleteTransaction(input: DeleteTransactionInput): Promise<DeleteTransactionOutput> {
    const exsisting = await this.transactionRepository.findById(input.id);
    if(!exsisting){
      return {success: false, message: 'Undefined transaction!'};
    }
    await this.transactionRepository.delete(input.id);
    return {success: true, message: 'Delete transaction succesfully!'}
  }

  async updateTransaction(input: UpdateTransactionInput): Promise<UpdateTransactionOutput> {
    //1. Lấy transaction với id, check tồn tại
    const exsisting = await this.transactionRepository.findById(input.id);
    if(!exsisting){
       throw new Error("Undefined transaction!") ;
    }
    //2.Update với id đã chọn
    const updated = Transaction.update(exsisting,{
      amount:input.amount,
      type: input.type,
      categoryId: input.categoryId,
      walletId: input.walletId,
      description: input.description,
      date: input.date,
      tags: input.tags,
    });
    //Check input hợp lệ
    if(!updated.isValid()){
      throw new Error('Invalid transaction input data!');
    }
    //Lưu vào repository
    await this.transactionRepository.update(updated);
    //Trả về kqua
    return {
      id: updated.id,
      amount:updated.amount,
      type: updated.type,
      categoryId: updated.categoryId,
      description: updated.description,
      date: updated.date,
      tags: updated.tags,
    }
  }
  async getBalance(): Promise<GetBalanceOuput>{
      const transactions = await this.transactionRepository.findAll();
      let totalIncome = 0;
      let totalExpense = 0;
      
      for(const tx of transactions) {
        if(tx.isIncome()){
          totalIncome += tx.amount;
        }
        if(tx.isExpense()){
          totalExpense += tx.amount;
        }
      }
      return {totalIncome,
              totalExpense,
              balance: totalIncome - totalExpense
  }
  }
}
