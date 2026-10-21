---
id: inventory-api-save-category
sidebar_position: 11
title: Save Category
description: Persist category data to the system.
hide_title: true
---

## Save Category

**Purpose:** Persist category data to the system.

### Signature:

```kotlin
fun saveCategory(category: Category): Category?
```

#### Parameters:

- `category` (Category): the category to save; a category with an existing identifier is updated.

#### Returns:

`Category?`: the saved [Category](../models/inventory.md#category), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

### Best Practice with Repository Pattern

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

