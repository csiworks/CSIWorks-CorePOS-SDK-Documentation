---
id: inventory-api-get-item
sidebar_position: 2
title: Get Item
description: Retrieves a single inventory item by its ID.
hide_title: true
---

## Get Items

**Purpose:** Fetch detailed information for a specific inventory item.

### Signature:

```kotlin
fun getItem(itemId: String): Item?
```

#### Parameters:
`itemId` (String): Unique **UUID** identifier of the item to retrieve

#### Returns:
`Item?`: The inventory [`Item`](../models/models-inventory#item), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadItemDetails(itemId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val item = inventoryConnector.getItem(itemId)
            item?.let {
                withContext(Dispatchers.Main) {
                    displayItemDetails(it)
                }
            } ?: run {
                withContext(Dispatchers.Main) {
                    showItemNotFound()
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load item: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface InventoryRepository {
    suspend fun getItem(itemId: String): Item?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    override suspend fun getItem(itemId: String): Item? {
      return try {
        inventoryConnector.getItem(itemId)
      } catch (e: Exception) {
        Log.e("InventoryRepo", "Failed to get item: ${e.message}")
        null
      }
    }
}
```