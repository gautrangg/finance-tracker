"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = require("../../src/domain/entities/Transaction");
const Wallet_1 = require("../../src/domain/entities/Wallet");
describe("Wallet", () => {
    it("applies transaction and updates balance", () => {
        const wallet = new Wallet_1.Wallet({ id: "w1", name: "Main", balance: 0 });
        const income = new Transaction_1.Transaction({
            id: "t1",
            amount: 100,
            type: "income",
            categoryId: "cat-1",
            description: "Salary",
            occurredAt: new Date()
        });
        wallet.apply(income);
        expect(wallet.balance).toBe(100);
    });
    it("throws when wallet name is empty", () => {
        expect(() => new Wallet_1.Wallet({ id: "w1", name: "", balance: 0 })).toThrow("Wallet name is required");
    });
});
