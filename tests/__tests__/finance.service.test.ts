import { InMemoryCategoryRepository } from "../../src/adapters/out/InMemoryCategoryRepository";
import { CsvTransactionExporter } from "../../src/adapters/out/CsvTransactionExporter";
import { InMemoryTransactionRepository } from "../../src/adapters/out/InMemoryTransactionRepository";
import { InMemoryWalletRepository } from "../../src/adapters/out/InMemoryWalletRepository";
import { FinanceService } from "../../src/application/FinanceService";
import { Category } from "../../src/domain/entities/Category";
import { Clock } from "../../src/ports/outbound/Clock";
import { IdGenerator } from "../../src/ports/outbound/IdGenerator";

class FakeIdGenerator implements IdGenerator {
  private index = 0;
  generate(): string {
    this.index += 1;
    return `id-${this.index}`;
  }
}

class FixedClock implements Clock {
  now(): Date {
    return new Date("2026-01-01T00:00:00.000Z");
  }
}

describe("FinanceService", () => {
  const createService = () => {
    const categoryRepo = new InMemoryCategoryRepository([
      new Category({ id: "cat-income", name: "Salary", type: "income" }),
      new Category({ id: "cat-expense", name: "Food", type: "expense" })
    ]);

    return new FinanceService(
      new InMemoryTransactionRepository(),
      categoryRepo,
      new InMemoryWalletRepository(),
      new FakeIdGenerator(),
      new FixedClock(),
      new CsvTransactionExporter()
    );
  };

  it("creates transaction and updates wallet balance", async () => {
    const service = createService();
    const tx = await service.createTransaction({ amount: 1000, type: "income", categoryId: "cat-income", description: "Salary" });
    expect(tx.id).toBe("id-1");
    expect(await service.getBalance()).toBe(1000);
  });

  it("creates expense and reduces balance", async () => {
    const service = createService();
    await service.createTransaction({ amount: 1000, type: "income", categoryId: "cat-income", description: "Salary" });
    await service.createTransaction({ amount: 200, type: "expense", categoryId: "cat-expense", description: "Dinner" });
    expect(await service.getBalance()).toBe(800);
  });

  it("throws if category does not exist", async () => {
    const service = createService();
    await expect(service.createTransaction({ amount: 100, type: "income", categoryId: "missing", description: "No category" })).rejects.toThrow("Category not found");
  });

  it("throws if category type mismatches transaction type", async () => {
    const service = createService();
    await expect(service.createTransaction({ amount: 100, type: "expense", categoryId: "cat-income", description: "Mismatch" })).rejects.toThrow("Transaction type must match category type");
  });

  it("lists transactions", async () => {
    const service = createService();
    await service.createTransaction({ amount: 10, type: "income", categoryId: "cat-income", description: "A" });
    await service.createTransaction({ amount: 5, type: "expense", categoryId: "cat-expense", description: "B" });
    const all = await service.listTransactions();
    expect(all).toHaveLength(2);
  });

  it("creates and lists categories", async () => {
    const service = createService();
    await service.createCategory({ name: "Transport", type: "expense" });
    const categories = await service.listCategories();
    expect(categories.some((c) => c.name === "Transport")).toBe(true);
  });

  it("exports CSV", async () => {
    const service = createService();
    await service.createTransaction({ amount: 150, type: "income", categoryId: "cat-income", description: "Freelance" });
    const csv = await service.exportTransactionsCsv();
    expect(csv).toContain("id,amount,type,categoryId,description,occurredAt");
    expect(csv).toContain("Freelance");
  });

  it("fails on empty category name", async () => {
    const service = createService();
    await expect(service.createCategory({ name: "", type: "expense" })).rejects.toThrow("Category name is required");
  });
});
