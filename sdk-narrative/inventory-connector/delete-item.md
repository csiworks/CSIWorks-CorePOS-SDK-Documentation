---
id: inventory-api-delete-item
sidebar_position: 5
title: Delete item
description: Removes an inventory item from the system.
hide_title: true
---

## Delete Item

**Purpose:** Permanently delete an inventory item by its ID.

### Signature:

```kotlin
fun deleteItem(itemId: String)
```

#### Parameters:
`itemId` (String): Unique **UUID** identifier of the item to retrieve

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun deleteItem(itemId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            inventoryConnector.deleteItem(itemId)
            withContext(Dispatchers.Main) {
                showItemDeleted()
                refreshItemList()
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to delete item: ${e.message}")
            withContext(Dispatchers.Main) {
                showDeleteError()
             }
        }   
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface InventoryRepository {
    suspend fun deleteItem(itemId: String)
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun deleteItem(itemId: String): Boolean {
        return try {
            inventoryConnector.deleteItem(itemId)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to delete item: ${e.message}")
            false
        }
    }
}
```