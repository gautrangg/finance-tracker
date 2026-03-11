
export interface GetBalanceOuput{
    totalIncome: number;
    totalExpense:  number;
    balance:number;
}

export interface GetBalanceUseCase {
    getBalance(): Promise<GetBalanceOuput>;
}