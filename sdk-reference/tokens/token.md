---
title: Token
sidebar_label: Token
---

# Token

```kotlin
data class Token(
    val accessToken: String,
    val accessTokenExpiration: Long,
    val refreshToken: String,
    val refreshTokenExpiration: Long
) : Parcelable
```

Represents a pair of authentication tokens used by the CorePOS SDK, consisting of an access token and a refresh token together with their expiration timestamps.

## Properties

| Name | Type | Description |
|---|---|---|
| `accessToken` | `String` | The access token string. |
| `accessTokenExpiration` | `Long` | The expiration timestamp of the access token. |
| `refreshToken` | `String` | The refresh token string used to obtain a new access token. |
| `refreshTokenExpiration` | `Long` | The expiration timestamp of the refresh token. |

