---
id: inventory-api-save-category
sidebar_position: 11
title: Save Category
description: Creates a new category or updates an existing one.
hide_title: true
---

## Save Category

**Purpose:** Persist category data to the system.

### Signature:

```kotlin
fun saveCategory(category: Category): Category?
```

#### Parameters:
- `category`: [`Category`](../models/models-inventory#category) object to save.

#### Returns:
`Category?`: The saved [`Category`](../models/models-inventory#category) with updated data (including generated ID for new categories), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun createNewCategory(categoryName: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        val newCategory = Category(
            categoryId = null,
            name = categoryName
        )
        
        try {
            val savedCategory = inventoryConnector.saveCategory(newCategory)
            savedCategory?.let {
                withContext(Dispatchers.Main) {
                    showCategoryCreated(it)
                    refreshCategoriesList()
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to save category: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun saveCategory(category: Category): Category?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun saveCategory(category: Category): Category? {
        return try {
            inventoryConnector.saveCategory(category)
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to save category: ${e.message}")
            null
        }
    }
}
```