"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = require("../../src/domain/entities/Transaction");
describe("Transaction", () => {
    it("creates valid income transaction", () => {
        const tx = new Transaction_1.Transaction({
            id: "t1",
            amount: 100,
            type: "income",
            categoryId: "cat-1",
            description: "Salary",
            occurredAt: new Date("2026-01-01T00:00:00.000Z")
        });
        expect(tx.amount).toBe(100);
        expect(tx.type).toBe("income");
    });
    it("throws when amount <= 0", () => {
        expect(() => new Transaction_1.Transaction({
            id: "t1",
            amount: 0,
            type: "income",
            categoryId: "cat-1",
            description: "Salary",
            occurredAt: new Date()
        })).toThrow("Transaction amount must be greater than 0");
    });
    it("throws when description is missing", () => {
        expect(() => new Transaction_1.Transaction({
            id: "t1",
            amount: 100,
            type: "income",
            categoryId: "cat-1",
            description: "",
            occurredAt: new Date()
        })).toThrow("Transaction description is required");
    });
    it("applies income to balance", () => {
        const tx = new Transaction_1.Transaction({
            id: "t1",
            amount: 50,
            type: "income",
            categoryId: "cat-1",
            description: "Bonus",
            occurredAt: new Date()
        });
        expect(tx.applyTo(10)).toBe(60);
    });
    it("applies expense to balance", () => {
        const tx = new Transaction_1.Transaction({
            id: "t1",
            amount: 20,
            type: "expense",
            categoryId: "cat-2",
            description: "Lunch",
            occurredAt: new Date()
        });
        expect(tx.applyTo(100)).toBe(80);
    });
});
