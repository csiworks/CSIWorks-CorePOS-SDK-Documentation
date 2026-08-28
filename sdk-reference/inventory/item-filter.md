---
title: ItemFilter
sidebar_label: ItemFilter
slug: /inventory/item-filter
---

# ItemFilter

```kotlin
data class ItemFilter(
    val nameQuery: String? = null,
    val categoryId: String? = null,
    val withoutCategory: Boolean = false,
    val filterByEbt: Boolean? = null,
    val productCode: String? = null
) : Parcelable
```

Filtering criteria used when retrieving a list of items from the CorePOS inventory. All fields are optional; only the specified criteria are applied.

## Properties

| Name | Type | Description |
|---|---|---|
| `categoryId` | `String?` | Filters items by a specific category UUID (optional). |
| `filterByEbt` | `Boolean?` | Filters items by EBT eligibility status (optional). |
| `nameQuery` | `String?` | Filters items by name containing this query (optional). |
| `productCode` | `String?` | Filters items by product code (optional). |
| `withoutCategory` | `Boolean` | If true, includes only items without a category. |

