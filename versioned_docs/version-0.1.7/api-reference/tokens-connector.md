---
id: tokens-api
sidebar_position: 10
title: TokensConnector
description: TokensConnector reference for the CorePOS Android SDK.
hide_title: true
---

## Introduction

### Class Overview

```kotlin
class TokensConnector(context: Context) : ServiceConnector<ITokenService>(context)
```

### Initialization:

```kotlin
val tokensConnector = TokensConnector(context)
```

## Get Token

Retrieves the current OAuth token pair for the calling app.

### Signature:

```kotlin
fun getToken(): Token?
```

#### Parameters:

None.

#### Returns:

`Token?`: the [Token](models/tokens.md#token), or `null` on failure.

#### Error Handling:

- `PermissionDeniedException` — if the calling app lacks authority.

