# QUICK_START

1. Install dependencies
```bash
npm install
```

2. Verify all tests
```bash
npm test
```

3. Run API
```bash
npm run build && npm start
```

4. Quick API test
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
