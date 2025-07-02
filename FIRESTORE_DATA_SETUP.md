# Firestore Data Setup Guide

This guide provides instructions for setting up the Firestore `products` collection, which is necessary for the Store Keeper application to display product data.

## Instructions:

1.  **Go to your Firebase project console.**
2.  **Navigate to Firestore Database.**
3.  **Click "+ Start collection".**
4.  **Enter `products` as the Collection ID.**
5.  **Add a few documents to this collection.** For each document:
    *   Click "Auto-ID" for the Document ID.
    *   Add the following fields:
        *   `name` (Type: `string`, Value: e.g., "Indomie Noodles")
        *   `sellingPrice` (Type: `number`, Value: e.g., 250)
        *   `stockQuantity` (Type: `number`, Value: e.g., 150)
    *   Add 2-3 different products so you have data to display.

**Example Document Structure:**

```json
{
  "name": "Indomie Noodles",
  "sellingPrice": 250,
  "stockQuantity": 150
}
```

Once you have added the products, the application should automatically display them on the Products screen. You can test the real-time feature by changing the values in the Firestore console; the changes should reflect instantly in the web application.