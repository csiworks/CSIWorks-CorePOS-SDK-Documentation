---
id: models-exception
sidebar_position: 8
title: Exception
description: Exception models used by the CorePOS Android SDK.
hide_title: true
---

## Exception Models

This section covers about exception models (entities) used in the API

## ErrorResult

```kotlin
data class ErrorResult
```
The `ErrorResult` model returns when an error occurred while calling the function, containing the following fields:

### Values

- `code`: [`Error code`](#error-codes).
- `message`: Error message

## Error Codes

- `100`: No authority
- `101`: Invalid uuid
- `102`: Invalid price type

## ErrorCodes

```kotlin
object ErrorCodes
```

Defines the error codes returned by the CorePOS SDK in an [ErrorResult](#errorresult) when a call fails.

### Values

- `INVALID_AMOUNT_TYPE` (Int): The provided amount type is invalid.
- `INVALID_PRICE_TYPE` (Int): The provided price type is invalid.
- `INVALID_UUID` (Int): The provided UUID is invalid.
- `NO_AUTHORITY` (Int): The calling app has no authority to perform the operation.

## BindingException

```kotlin
class BindingException : Exception
```

Thrown from service connector methods when the SDK cannot bind to the CorePOS app's underlying Android service.

## PermissionDeniedException

```kotlin
class PermissionDeniedException(message: String) : Exception
```

Thrown when the calling app lacks the authority to perform the requested CorePOS SDK operation.

