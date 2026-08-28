---
title: ErrorCodes
sidebar_label: ErrorCodes
slug: /common/error-codes
---

# ErrorCodes

```kotlin
object ErrorCodes
```

Defines the error codes returned by the CorePOS SDK in an [ErrorResult](error-result.md) when a call fails.

## Properties

| Name | Type | Description |
|---|---|---|
| `INVALID_AMOUNT_TYPE` | `Int` | The provided amount type is invalid. |
| `INVALID_PRICE_TYPE` | `Int` | The provided price type is invalid. |
| `INVALID_UUID` | `Int` | The provided UUID is invalid. |
| `NO_AUTHORITY` | `Int` | The calling app has no authority to perform the operation. |

