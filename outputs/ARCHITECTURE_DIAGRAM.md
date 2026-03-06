# ARCHITECTURE_DIAGRAM

```text
REST API / CSV / Other interfaces
             |
             v
        Adapters Layer
             |
             v
        Ports (Interfaces)
             |
             v
      Application Service
             |
             v
         Domain Layer
```

Dependency direction: outer layers depend on inner layers.

Flow api run :
1. npm start
   ↓
2. node dist/index.js
   ↓
3. src/index.ts
   - const container = new Container()
   - const financeService = container.getFinanceService()
   - const apiAdapter = new RestApiAdapter(financeService)
   - apiAdapter.start(3000)
   ↓
4. Container (src/config/container.ts)
   - Tạo InMemoryTransactionRepository()
   - Tạo InMemoryCategoryRepository()
   - Tạo InMemoryWalletRepository()
   - Tạo FinanceService(repositories)
   - Return FinanceService
   ↓
5. RestApiAdapter (src/adapters/in/RestApiAdapter.ts)
   - setupMiddleware() - express.json()
   - setupRoutes()
     - POST /api/transactions → this.createTransaction()
   - app.listen(3000)
   ↓
6. Client gửi: POST /api/transactions
   Body: { amount: 2000, type: "expense", ... }
   ↓
7. RestApiAdapter.createTransaction(req, res)
   - req.body = { amount: 2000, type: "expense", ... }
   - Gọi: this.createTransactionUseCase.execute(req.body)
   ↓
8. FinanceService.execute(input)
   - Transaction.create({ id, amount, type, ... })
   ↓
9. src/domain/entities/Transaction.ts
   - new Transaction(props)
   - isValid() → return amount > 0
   ↓
10. FinanceService tiếp tục
    - if (!transaction.isValid()) throw Error
    - await this.transactionRepository.save(transaction)
    ↓
11. InMemoryTransactionRepository.save(transaction)
    - this.transactions.set(transaction.id, transaction)
    - Lưu vào Map
    ↓
12. FinanceService return
    - { id, amount, type, categoryId, description, date }
    ↓
13. RestApiAdapter.createTransaction
    - res.status(201).json(result)
    ↓
14. Client nhận response:
    { "id": "tx-1234", "amount": 2000, "type": "expense", ... }