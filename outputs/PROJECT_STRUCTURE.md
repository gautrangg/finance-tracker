# Project Structure Guide

## Directory Layout

```
finance-tracker/
├── src/
│   ├── domain/                    ← Business Logic (No Dependencies)
│   │   ├── entities/
│   │   │   ├── Transaction.ts     ← Pure entity, no dependencies
│   │   │   ├── Category.ts
│   │   │   ├── Wallet.ts
│   │   │   └── User.ts
│   │   └── exceptions/
│   │       └── DomainException.ts ← Domain-specific errors
│   │
│   ├── ports/                     ← Boundary Interfaces
│   │   ├── inbound/               ← What drives the system (Use Cases)
│   │   │   ├── CreateTransactionUseCase.ts
│   │   │   ├── GetTransactionsUseCase.ts
│   │   │   └── GetStatisticsUseCase.ts
│   │   │
│   │   └── outbound/              ← What the system needs (Repositories)
│   │       ├── TransactionRepository.ts
│   │       ├── CategoryRepository.ts
│   │       ├── WalletRepository.ts
│   │       └── FileExporter.ts
│   │
│   ├── adapters/                  ← Implementations (Can be swapped)
│   │   ├── in/                    ← Input adapters (Web, CLI, etc)
│   │   │   ├── RestApiAdapter.ts  ← Express API
│   │   │   └── CliAdapter.ts      ← Command Line
│   │   │
│   │   └── out/                   ← Output adapters (DB, File, API, etc)
│   │       ├── InMemoryTransactionRepository.ts
│   │       ├── InMemoryCategoryRepository.ts
│   │       ├── InMemoryWalletRepository.ts
│   │       ├── PostgresTransactionRepository.ts  ← Future
│   │       ├── CsvExporter.ts
│   │       └── EmailNotificationService.ts
│   │
│   ├── application/               ← Orchestration & Use Case Implementation
│   │   ├── FinanceService.ts      ← Implements use cases
│   │   ├── CategoryService.ts
│   │   ├── StatisticsService.ts
│   │   ├── dtos/                  ← Data Transfer Objects
│   │   │   ├── CreateTransactionDTO.ts
│   │   │   ├── TransactionResponseDTO.ts
│   │   │   └── StatisticsDTO.ts
│   │   └── validators/            ← Input Validation
│   │       ├── TransactionValidator.ts
│   │       └── CategoryValidator.ts
│   │
│   ├── config/                    ← Setup & Configuration
│   │   ├── container.ts           ← Dependency Injection
│   │   └── database.ts            ← DB Config (if needed)
│   │
│   └── index.ts                   ← Entry Point
│
├── tests/
│   ├── __tests__/
│   │   ├── unit/                  ← Unit tests (test in isolation)
│   │   │   ├── domain/
│   │   │   │   └── Transaction.test.ts
│   │   │   ├── application/
│   │   │   │   └── FinanceService.test.ts
│   │   │   └── adapters/
│   │   │       └── InMemoryTransactionRepository.test.ts
│   │   │
│   │   └── integration/           ← Integration tests (test layers together)
│   │       └── api.test.ts
│   │
│   └── fixtures/
│       └── testData.ts            ← Shared test data
│
├── outputs/                       ← Documentation
│   ├── QUICK_START.md
│   ├── ARCHITECTURE_DIAGRAM.md
│   ├── MENTOR_REVIEW_CHECKLIST.md
│   └── PROJECT_STRUCTURE.md       ← This file
│
├── dist/                          ← Compiled JavaScript
├── node_modules/                  ← Dependencies
├── .gitignore
├── jest.config.js                 ← Testing config
├── package.json                   ← Dependencies & scripts
├── tsconfig.json                  ← TypeScript config
└── README.md                      ← Project overview
```

## Layer Responsibilities

### 1. Domain Layer (`src/domain/`)
**Purpose**: Pure business logic, zero external dependencies
- **What goes here**: Entities, value objects, domain rules, exceptions
- **What doesn't**: Database code, API code, external service calls
- **Dependencies**: None (imports only from within domain)
- **Tests**: Unit tests (fastest, no setup needed)

### 2. Ports Layer (`src/ports/`)
**Purpose**: Define boundaries (interfaces/contracts)
- **Inbound Ports**: Use cases that drive the system
- **Outbound Ports**: Abstractions the system needs (repositories, services)
- **What goes here**: Interfaces, DTOs, use case definitions
- **What doesn't**: Implementation
- **Dependencies**: May reference domain entities

### 3. Adapters Layer (`src/adapters/`)
**Purpose**: Implement ports and connect to external systems
- **Inbound Adapters** (`in/`): Express, CLI, GraphQL endpoints
- **Outbound Adapters** (`out/`): Databases, file systems, external APIs
- **What goes here**: Concrete implementations of ports
- **What doesn't**: Business logic (goes to domain or application)
- **Dependencies**: Depends on ports and domain

### 4. Application Layer (`src/application/`)
**Purpose**: Orchestrate use cases
- **What goes here**: Service implementations, DTOs, validators
- **What doesn't**: Pure business rules (go to domain)
- **Dependencies**: Depends on ports and domain, never on adapters
- **Key pattern**: Depends on abstractions (interfaces), not implementations

### 5. Config Layer (`src/config/`)
**Purpose**: Wire up the system
- **What goes here**: Dependency injection container, initialization
- **What doesn't**: Business logic
- **Dependencies**: Depends on everything (at the root level)

## Dependency Flow

```
External Systems
    ↓
Adapters (in/)  →  Ports  ←  Adapters (out/)
    ↓                   ↓              ↓
    └───→ Application Service ←───────┘
              ↓
         Domain (Entities, Rules)
```

**Golden Rule**: Dependencies point inward toward the domain.
```
✅ CORRECT:   Adapters → Application → Domain
❌ WRONG:     Domain → Application → Adapters
```

## File Naming Conventions

| Layer | Pattern | Example |
|-------|---------|---------|
| Domain | `{Entity}.ts` | `Transaction.ts`, `Category.ts` |
| Ports (Inbound) | `{UseCase}UseCase.ts` | `CreateTransactionUseCase.ts` |
| Ports (Outbound) | `{Service}.ts` or `{Entity}Repository.ts` | `TransactionRepository.ts` |
| Adapters (In) | `{Name}Adapter.ts` | `RestApiAdapter.ts`, `CliAdapter.ts` |
| Adapters (Out) | `{Implementation}{Entity}Repository.ts` or `{Service}.ts` | `InMemoryTransactionRepository.ts`, `PostgresTransactionRepository.ts` |
| Application Services | `{Domain}Service.ts` | `FinanceService.ts` |
| DTOs | `{Domain}{Purpose}DTO.ts` or `{Domain}{Purpose}Output.ts` | `CreateTransactionDTO.ts` |
| Tests | `{FileBeingTested}.test.ts` | `Transaction.test.ts` |

## Development Workflow

### Adding a New Feature (e.g., Budget Tracking)

1. **Define Domain Entity** (`src/domain/entities/Budget.ts`)
   - Pure business logic only
   - No dependencies

2. **Define Port Interface** (`src/ports/outbound/BudgetRepository.ts`)
   - Contract for persistence
   - What the system needs

3. **Implement Adapter** (`src/adapters/out/InMemoryBudgetRepository.ts`)
   - In-memory for testing first
   - Later: PostgreSQL adapter

4. **Write Application Service** (`src/application/BudgetService.ts`)
   - Orchestrate use cases
   - Depend on ports, not adapters

5. **Define Use Case Interface** (`src/ports/inbound/CreateBudgetUseCase.ts`)
   - What clients can call

6. **Create REST Endpoint** (in `src/adapters/in/RestApiAdapter.ts`)
   - Connect use case to HTTP

7. **Write Tests**
   - Unit: Domain and application logic
   - Integration: Full flow with adapters

## Testing Strategy

### Unit Tests (Fastest)
- Test entities and domain logic in isolation
- No setup needed
- Location: `tests/__tests__/unit/domain/`

### Application Tests
- Test services with mock repositories
- Location: `tests/__tests__/unit/application/`

### Integration Tests (Slowest)
- Test full flow from API to database
- Location: `tests/__tests__/integration/`

### Test Pattern (Arrange-Act-Assert)
```typescript
it('should do something', () => {
  // Arrange: Set up test data
  const input = { /* test data */ };
  
  // Act: Call the function
  const result = service.execute(input);
  
  // Assert: Verify the result
  expect(result).toBe(expected);
});
```

## Next Steps

1. Implement the stub files with actual code
2. Start with domain entities (simplest, no dependencies)
3. Then implement adapters (repositories)
4. Then application services (orchestration)
5. Finally, connect via REST API
6. Write tests as you go
