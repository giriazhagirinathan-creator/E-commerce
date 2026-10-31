# Lab 4: E-Commerce Product Database (MongoDB)

This project demonstrates document-oriented data modeling with dynamic/polymorphic attributes, document filtering, and atomic field updates using MongoDB.

---

## 📁 Repository Contents

| File | Description |
| :--- | :--- |
| [`ecommerce.js`](file:///c:/Users/User/OneDrive/Desktop/lab4/ecommerce.js) | Main runnable MongoDB script (database selection, data insertion with dynamic attributes, querying, and updating). |
| [`README.md`](file:///c:/Users/User/OneDrive/Desktop/lab4/README.md) | Project overview, schema design, and execution instructions. |

---

## 🗄️ Database Schema & Data Modeling

### 1. Database
- **Name:** `ecommerceDB`

### 2. `products` Collection
Stores product documents with **dynamic/polymorphic attributes** (different products can have custom fields under `attributes` without requiring schema migrations):

#### Product 1: Electronics Document
```json
{
  "productId": "PROD101",
  "title": "Wireless Noise-Canceling Headphones",
  "category": "Electronics",
  "price": 199.99,
  "stockQuantity": 45,
  "ratings": 4.7,
  "attributes": {
    "brand": "AudioTech",
    "color": "Black",
    "batteryLife": "30 hours"
  }
}
```

#### Product 2: Footwear Document
```json
{
  "productId": "PROD102",
  "title": "Running Shoes",
  "category": "Footwear",
  "price": 89.50,
  "stockQuantity": 120,
  "ratings": 4.4,
  "attributes": {
    "brand": "RunFast",
    "sizesAvailable": [8, 9, 10, 11],
    "material": "Mesh"
  }
}
```

---

## 🚀 How to Run

### Option 1: Run directly from the Terminal (Recommended)

Execute the script directly via `mongosh`:

```bash
mongosh ecommerce.js
```

### Option 2: Interactive MongoDB Shell (`mongosh`)

1. Open `mongosh`:
   ```bash
   mongosh
   ```
2. Switch to the database:
   ```javascript
   use ecommerceDB;
   ```
3. Run the operations:
   ```javascript
   // Insert products
   db.products.insertMany([
     {
       productId: "PROD101",
       title: "Wireless Noise-Canceling Headphones",
       category: "Electronics",
       price: 199.99,
       stockQuantity: 45,
       ratings: 4.7,
       attributes: {
         brand: "AudioTech",
         color: "Black",
         batteryLife: "30 hours"
       }
     },
     {
       productId: "PROD102",
       title: "Running Shoes",
       category: "Footwear",
       price: 89.50,
       stockQuantity: 120,
       ratings: 4.4,
       attributes: {
         brand: "RunFast",
         sizesAvailable: [8, 9, 10, 11],
         material: "Mesh"
       }
     }
   ]);

   // Query electronics with price <= 200
   db.products.find({
     category: "Electronics",
     price: { $lte: 200 }
   }).pretty();

   // Update stock after purchase
   db.products.updateOne(
     { productId: "PROD101" },
     { $inc: { stockQuantity: -1 } }
   );
   ```

### Option 3: Using MongoDB Compass

1. Connect to `mongodb://localhost:27017`.
2. Open the **_MONGOSH** tab at the bottom.
3. Paste the commands and press Enter.

---

## 🔍 Key Operations Explained

1. **Filtering by Category & Comparison Operator (`$lte`):**
   ```javascript
   db.products.find({
     category: "Electronics",
     price: { $lte: 200 }
   }).pretty();
   ```
   Retrieves all items belonging to `Electronics` whose `price` is less than or equal to `200`.

2. **Atomic Field Increment / Decrement (`$inc`):**
   ```javascript
   db.products.updateOne(
     { productId: "PROD101" },
     { $inc: { stockQuantity: -1 } }
   );
   ```
   Decrements `stockQuantity` by `1` atomically when an item is purchased, avoiding race conditions.

