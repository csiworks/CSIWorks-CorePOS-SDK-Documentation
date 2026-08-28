---
id: inventory-api-update-item-stock-quantity
sidebar_position: 13
title: Update Item Stock Quantity
description: Updates the stock quantity for an item.
hide_title: true
---

## Update Item Stock Quantity

**Purpose:** Update the stock quantity for a specific inventory item.

### Signature:

```kotlin
fun updateItemStockQuantity(itemId: String, quantity: Double)
```

#### Parameters:
- `itemId` (String): Unique **UUID** identifier of the item
- `quantity` (Double): New stock quantity value

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun updateStock(itemId: String, newQuantity: Double) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            inventoryConnector.updateItemStockQuantity(itemId, newQuantity)
            withContext(Dispatchers.Main) {
                showStockUpdated()
                refreshItemList()
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to update stock: ${e.message}")
            withContext(Dispatchers.Main) {
                showUpdateError()
            }
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun updateItemStockQuantity(itemId: String, quantity: Double): Boolean
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun updateItemStockQuantity(itemId: String, quantity: Double): Boolean {
        return try {
            inventoryConnector.updateItemquaupdateItemStockQuantityntity(itemId, quantity)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to update stock quantity: ${e.message}")
            false
        }
    }
}
```