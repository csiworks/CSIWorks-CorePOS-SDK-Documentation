---
title: ItemPageResult
sidebar_label: ItemPageResult
slug: /inventory/item-page-result
---

# ItemPageResult

```kotlin
data class ItemPageResult(
    val items: List<Item>,
    val currentPage: Int,
    val pageSize: Int,
    val totalItems: Int,
    val totalPages: Int,
    val hasNextPage: Boolean,
    val hasPreviousPage: Boolean
) : Parcelable
```

Represents a paginated response returned by the CorePOS SDK when fetching a list of items. Contains both the retrieved items and pagination metadata to manage navigation between pages.

## Properties

| Name | Type | Description |
|---|---|---|
| `currentPage` | `Int` | The current page index (starting from 0) that was fetched. |
| `hasNextPage` | `Boolean` | Indicates whether there is a next page available after the current one. |
| `hasPreviousPage` | `Boolean` | Indicates whether there is a previous page available before the current one. |
| `items` | `List<Item>` | The list of [Item](item.md) returned for the current page. |
| `pageSize` | `Int` | The number of items per page as specified in the request. |
| `totalItems` | `Int` | The total number of items available across all pages. |
| `totalPages` | `Int` | The total number of pages available. |

