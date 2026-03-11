
export interface DeleteTransactionInput{
    id: string;
}

export interface DeleteTransactionOutput{
    success: boolean;
    message: string;
}

export interface DeleteTransactionUseCase {
    deleteTransaction(input: DeleteTransactionInput):Promise<DeleteTransactionOutput>;
}