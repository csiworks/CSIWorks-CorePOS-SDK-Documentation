---
id: service-api-connect
sidebar_position: 2
title: Connect
description: Connect
hide_title: true
---

## Connect

Binds to the CorePOS service if not already connected.

Calling this explicitly is optional — connectors connect lazily on the first service call — but it can be used to warm up the connection ahead of time.

### Signature:

```kotlin
fun connect(): Boolean
```

#### Parameters:

None.

#### Returns:

`Boolean`: `true` if already connected or the bind request was issued successfully.

