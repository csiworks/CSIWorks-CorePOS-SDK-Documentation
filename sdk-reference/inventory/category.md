---
title: Category
sidebar_label: Category
slug: /inventory/category
---

# Category

```kotlin
data class Category(val categoryId: String?, val name: String?) : Parcelable
```

Represents a category in the CorePOS inventory. Items may belong to one or more categories via [Item.categories](item.md).

## Properties

| Name | Type | Description |
|---|---|---|
| `categoryId` | `String?` | A unique UUID identifier for the category. |
| `name` | `String?` | The name of the category. |

