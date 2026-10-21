---
id: models-pagination
sidebar_position: 10
title: Pagination
description: Pagination models used by the CorePOS Android SDK.
hide_title: true
---

## Pagination Models

## Pageable

```kotlin
enum class Pageable
```
The `Pageable` model represents pagination and sorting parameters used to request a specific subset of data. Containing the following fields:

### Values

- `page`: The page index (starting from 0) indicating which page of results to retrieve.
- `size`: The number of items to include per page.
- `sortBy`: The field name by which the results should be sorted. May be null if no specific sorting is required. **(Not yet implemented in CorePOS)**
- `ascending`: Determines the sort order. If `true`, results are sorted in **ascending** order; if `false`, in **descending** order. **(Not yet implemented in CorePOS)**

