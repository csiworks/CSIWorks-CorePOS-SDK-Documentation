---
id: inventory-api-get-categories-with-count
sidebar_position: 15
title: Get Categories With Count
description: Retrieve a list of categories along with the number of items
hide_title: true
---

## Get Categories With Count

**Purpose:** Retrieve a list of categories along with the number of items assigned to each category.

### Signature:

```kotlin
fun getCategoriesWithCount(): List<CategoryWithCount>?
```

#### Parameters:
None

#### Returns:
`List<CategoryWithCount>?`: A list of [`CategoryWithCount`](../models/models-inventory#categorywithcount), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadCategoryStats() {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val categoriesWithCount = inventoryConnector.getCategoriesWithCount()
            categoriesWithCount?.let {
                withContext(Dispatchers.Main) {
                    displayCategoryStats(it)
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load category counts: ${e.message}")
        }
    }
}
```