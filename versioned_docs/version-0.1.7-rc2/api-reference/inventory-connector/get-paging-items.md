---
id: inventory-api-get-paging-items
sidebar_position: 16
title: Get Paging Items
description: Retrieves a paginated list of items.
hide_title: true
---

## Get Paging Items

**Purpose:** Retrieves a paginated list of inventory items with optional filtering.

### Signature:

```kotlin
fun getPagingItems(filter: ItemFilter? = null, pageable: Pageable): ItemPageResult?
```

#### Parameters:
`filter` (optional): [`ItemFilter`](../models/models-inventory#itemfilter) - Filter criteria to limit results
`pageable`: [`Pageable`](../models/models-pagination#pageable) - Defines pagination parameters

#### Returns:
`ItemPageResult?`: A paginated response containing the list of [`Item`](../models/models-inventory#item) and pagination metadata, or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadPagedItems() {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val pageable = Pageable(page = 0, size = 20)
            val filter = ItemFilter(filterByEbt = true)
            
            val pagedResult = inventoryConnector.getPagingItems(filter, pageable)
            
            withContext(Dispatchers.Main) {
                pagedResult?.let {
                    updateItemList(it.items)
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load paged items: ${e.message}")
        }
    }
}
```