---
title: ValidationResult
sidebar_label: ValidationResult
---

# ValidationResult

```kotlin
sealed class ValidationResult
```

Represents the result of validation operations performed by [LineItemUtils](line-item-utils.md).

## Nested types

### Error

```kotlin
data class Error(val message: String) : ValidationResult
```

Indicates that validation failed.

#### Properties

| Name | Type | Description |
|---|---|---|
| `message` | `String` | A description of the validation errors, joined with "; " if there are several. |

### Success

```kotlin
object Success : ValidationResult
```

Indicates that validation succeeded with no errors.

## Inheritors

- Success
- Error

