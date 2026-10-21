---
id: inventory-api-save-item
sidebar_position: 4
title: Save Item
description: Persist inventory item data to the system, including optional image attachment.
hide_title: true
---

## Save Item

**Purpose:** Persist inventory item data to the system, including optional image attachment.

### Signature:

```kotlin
fun saveItem(item: Item, imageUri: String?): Item?
```

#### Parameters:

- `item` (Item): the item to save; an item with an existing identifier is updated.
- `imageUri` (String?): optional URI of an image to attach to the item.

#### Returns:

`Item?`: the saved [Item](../models/inventory.md#item), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun createNewItem(item: Item, imageUri: String?) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val savedItem = inventoryConnector.saveItem(newItem, imageUri)
            
            savedItem?.let {
                withContext(Dispatchers.Main) {
                    showItemCreated(it)
                    refreshItemList()
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to save item: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface InventoryRepository {
    suspend fun saveItem(item: Item, imageUri: String?): Item?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun saveItem(item: Item, imageUri: String?): Item? {
        return try {
            inventoryConnector.saveItem(item, imageUri)
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to save item: ${e.message}")
            null
        }
    }
}
```

