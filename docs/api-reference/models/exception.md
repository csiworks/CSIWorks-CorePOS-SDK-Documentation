---
id: models-exception
sidebar_position: 5
title: Exception
description: Exception model.
hide_title: true
---

## Exception

This section covers about exception model (entitie) used in the API

### ErrorResult

The `ErrorResult` - returns when an error occurred while calling the function, containing the following fields:

- `code`: [`Error code`](#error-codes).
- `message`: Error message

```kotlin
@Parcelize
data class ErrorResult(
    val code: Int,
    val message: String
) : Parcelable
```

### Error codes
- `100`: No authority
- `101`: Invalid uuid
- `102`: Invalid price type
