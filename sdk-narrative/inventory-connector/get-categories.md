---
id: inventory-api-get-categories
sidebar_position: 6
title: Get Categories
description: Retrieves all available inventory categories.
hide_title: true
---

## Get Categories

**Purpose:** Fetch the complete list of categories for organizing inventory items.

### Signature:

```kotlin
fun getCategories(): List<Category>?
```

#### Parameters:
None

#### Returns:
`List<Category>?`: A list of [`Category`](../models/models-inventory#category), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadCategories() {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val categories = inventoryConnector.getCategories()
            categories?.let {
                withContext(Dispatchers.Main) {
                    populateCategorySpinner(it)
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load categories: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface InventoryRepository {
    suspend fun getCategories(): List<Category>?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun getCategories(): List<Category> {
        return try {
            inventoryConnector.getCategories() ?: emptyList()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get categories: ${e.message}")
            emptyList()
        }
    }
}
```