---
id: models-exception
sidebar_position: 5
title: Exception
description: Exception model.
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
