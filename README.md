# Personal Finance Tracker

A professional TypeScript application demonstrating Hexagonal Architecture (Ports & Adapters pattern).

## Project Structure

```
finance-tracker/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Transaction.ts
│   │   │   ├── Category.ts
│   │   │   ├── Wallet.ts
│   │   │   └── User.ts
│   │   └── exceptions/
│   │       └── DomainException.ts
│   ├── ports/
│   │   ├── inbound/
│   │   │   ├── CreateTransactionUseCase.ts
│   │   │   ├── GetTransactionsUseCase.ts
│   │   │   ├── DeleteTransactionUseCase.ts
│   │   │   └── GetStatisticsUseCase.ts
│   │   └── outbound/
│   │       ├── TransactionRepository.ts
│   │       ├── CategoryRepository.ts
│   │       ├── WalletRepository.ts
│   │       ├── UserRepository.ts
│   │       ├── FileExporter.ts
│   │       └── NotificationService.ts
│   ├── adapters/
│   │   ├── in/
│   │   │   ├── RestApiAdapter.ts
│   │   │   └── CliAdapter.ts
│   │   └── out/
│   │       ├── InMemoryTransactionRepository.ts
│   │       ├── InMemoryCategoryRepository.ts
│   │       ├── InMemoryWalletRepository.ts
│   │       ├── PostgresTransactionRepository.ts
│   │       ├── CsvExporter.ts
│   │       └── EmailNotificationService.ts
│   ├── application/
│   │   ├── FinanceService.ts
│   │   ├── CategoryService.ts
│   │   ├── StatisticsService.ts
│   │   ├── dtos/
│   │   │   ├── CreateTransactionDTO.ts
│   │   │   ├── TransactionResponseDTO.ts
│   │   │   └── StatisticsDTO.ts
│   │   └── validators/
│   │       ├── TransactionValidator.ts
│   │       └── CategoryValidator.ts
│   ├── config/
│   │   ├── container.ts
│   │   └── database.ts
│   └── index.ts
├── tests/
│   ├── __tests__/
│   │   ├── unit/
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   └── adapters/
│   │   └── integration/
│   │       └── api.test.ts
│   └── fixtures/
│       └── testData.ts
├── outputs/
│   ├── QUICK_START.md
│   ├── ARCHITECTURE_DIAGRAM.md
│   └── MENTOR_REVIEW_CHECKLIST.md
├── dist/
├── package.json
├── tsconfig.json
├── jest.config.js
└── .gitignore
```

## Key Principles

- **Domain Layer**: Pure business logic, zero external dependencies
- **Ports**: Define boundaries (interfaces only)
- **Adapters**: Implement ports (can be swapped)
- **Application Service**: Orchestrates use cases
- **Dependency Flow**: Points inward toward domain

## Getting Started

```bash
npm install
npm test
npm run build
npm start

Quick API test
```bash
curl -X POST http://localhost:3000/api/transactions \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "type": "income",
    "categoryId": "cat-1",
    "description": "Monthly salary"
  }'
```
```

## Architecture

See `outputs/ARCHITECTURE_DIAGRAM.md` for visual explanation.
