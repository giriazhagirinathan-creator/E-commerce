// Step 1: Switch to E-Commerce Database
// (In interactive mongosh shell: 'use ecommerceDB')
db = db.getSiblingDB("ecommerceDB");

// Optional: Clear existing collection on re-runs
db.products.drop();

// Step 2: Insert Product Documents with dynamic attributes
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

// Step 3: Fetch products in 'Electronics' with price <= 200
console.log("\n--- Products in 'Electronics' with price <= 200 ---");
db.products.find({
  category: "Electronics",
  price: { $lte: 200 }
}).forEach(printjson);

// Step 4: Update stock after a customer purchase
db.products.updateOne(
  { productId: "PROD101" },
  { $inc: { stockQuantity: -1 } }
);

// Verification: Fetch updated product
console.log("\n--- Product PROD101 after purchase (stockQuantity updated to 44) ---");
db.products.find({ productId: "PROD101" }).forEach(printjson);
