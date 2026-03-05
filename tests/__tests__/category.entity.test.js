"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../src/domain/entities/Category");
describe("Category", () => {
    it("creates a valid category", () => {
        const category = new Category_1.Category({ id: "c1", name: "Salary", type: "income" });
        expect(category.name).toBe("Salary");
        expect(category.type).toBe("income");
    });
    it("throws when name is empty", () => {
        expect(() => new Category_1.Category({ id: "c1", name: "", type: "expense" })).toThrow("Category name is required");
    });
});
