---
id: inventory-api-delete-category
sidebar_position: 12
title: Delete Category
description: Removes a category from the system.
hide_title: true
---

## Delete Category

**Purpose:** Permanently delete a category by its ID.

### Signature:

```kotlin
fun deleteCategory(categoryId: String)
```

#### Parameters:
`categoryId` (String): Unique **UUID** identifier of the category to delete

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun deleteCategory(categoryId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            inventoryConnector.deleteCategory(categoryId)
            withContext(Dispatchers.Main) {
                showCategoryDeleted()
                refreshCategoriesList()
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to delete category: ${e.message}")
            withContext(Dispatchers.Main) {
                showDeleteError()
            }
        }   
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun deleteCategory(categoryId: String): Boolean
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun deleteCategory(categoryId: String): Boolean {
        return try {
            inventoryConnector.deleteCategory(categoryId)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to delete category: ${e.message}")
            false
        }
    }
}
```