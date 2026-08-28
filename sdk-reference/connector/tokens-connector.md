---
title: TokensConnector
sidebar_label: TokensConnector
slug: /connector/tokens-connector
---

# TokensConnector

```kotlin
class TokensConnector(context: Context) : ServiceConnector<…>
```

Connector for obtaining OAuth tokens from the CorePOS application, used to authenticate calls to the CorePOS third-party REST API. All methods must be called from a background thread.

```kotlin
lifecycleScope.launch(Dispatchers.IO) {
    val token = TokensConnector(context).getToken()
    token?.let { api.setBearerToken(it.accessToken) }
}
```

**See also:**

- [Token](../tokens/token.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS token service. |

## Functions

### getToken

```kotlin
fun getToken(): Token?
```

Retrieves the current OAuth token pair for the calling app.

**Returns:** the [Token](../tokens/token.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

