---
id: inventory-api-get-items
sidebar_position: 3
title: Get Items
description: Retrieves a list of items.
hide_title: true
---

## Get Items

**Purpose:** Retrieves a list of inventory items with optional filtering. Fetch all items or a filtered subset from the inventory system.

### Signature:

```kotlin
fun getItems(filter: ItemFilter? = null): List<Item>?
```

#### Parameters:
`filter` (optional): [`ItemFilter`](../models/models-inventory#itemfilter) - Filter criteria to limit results

#### Returns:
`List<Item>?`: A list of [`Item`](../models/models-inventory#item) matching the criteria, or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
    private fun loadItems() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                // Get all items
                val allItems = inventoryConnector.getItems()
                
                // Get filtered items by category
                val filter = ItemFilter(categoryId = "electronics")
                val filteredItems = inventoryConnector.getItems(filter)
                
                withContext(Dispatchers.Main) {
                    updateItemList(allItems ?: emptyList())
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load items: ${e.message}")
            }
        }
    }
```

### Best Practice with Repository Pattern::
```kotlin
interface InventoryRepository {
    suspend fun getItems(filter: ItemFilter? = null): List<Item>?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun getItems(filter: ItemFilter?): List<Item> {
        return try {
            inventoryConnector.getItems(filter) ?: emptyList()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get items: ${e.message}")
            emptyList()
        }
    }
}
```