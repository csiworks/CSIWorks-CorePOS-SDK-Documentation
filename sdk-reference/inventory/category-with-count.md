---
title: CategoryWithCount
sidebar_label: CategoryWithCount
---

# CategoryWithCount

```kotlin
data class CategoryWithCount(val category: Category, val itemCount: Long) : Parcelable
```

Represents a product category along with the number of items that belong to it. Returned by the CorePOS SDK when listing categories with their item counts.

## Properties

| Name | Type | Description |
|---|---|---|
| `category` | `Category` | The [Category](category.md) this count refers to. |
| `itemCount` | `Long` | The total number of items associated with this category. |

