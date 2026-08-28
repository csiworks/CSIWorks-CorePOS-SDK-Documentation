---
title: ErrorResult
sidebar_label: ErrorResult
---

# ErrorResult

```kotlin
data class ErrorResult(val code: Int, val message: String) : Parcelable
```

Represents an error returned by the CorePOS SDK when a call to a function fails.

## Properties

| Name | Type | Description |
|---|---|---|
| `code` | `Int` | The error code identifying the failure; see [ErrorCodes](error-codes.md). |
| `message` | `String` | The error message describing the failure. |

