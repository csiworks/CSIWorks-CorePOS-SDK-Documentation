---
title: Pageable
sidebar_label: Pageable
---

# Pageable

```kotlin
data class Pageable(
    val page: Int,
    val size: Int,
    val sortBy: String? = null,
    val ascending: Boolean = true
) : Parcelable
```

Represents pagination and sorting parameters used to request a specific subset of data from the CorePOS SDK, such as paged item queries.

## Properties

| Name | Type | Description |
|---|---|---|
| `ascending` | `Boolean` | Determines the sort order: if true, results are sorted in ascending order; if false, in descending order. (Not yet implemented in CorePOS.) |
| `page` | `Int` | The page index (starting from 0) indicating which page of results to retrieve. |
| `size` | `Int` | The number of items to include per page. |
| `sortBy` | `String?` | The field name by which the results should be sorted. May be null if no specific sorting is required. (Not yet implemented in CorePOS.) |

