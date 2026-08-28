---
title: ServiceConnector
sidebar_label: ServiceConnector
slug: /connector/service-connector
---

# ServiceConnector

```kotlin
abstract class ServiceConnector<S : IInterface>(context: Context) : ServiceConnection
```

Base class for all CorePOS connectors.

A connector binds to a remote AIDL service exposed by the CorePOS application (the target package is selected by the build flavor via `BuildConfig.COREPOS_PACKAGE`) and turns the asynchronous callback-based AIDL calls into synchronous, blocking method calls. All public connector methods must therefore be invoked from a background thread — calling them on the main thread throws [IllegalStateException](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin-stdlib/kotlin/-illegal-state-exception/index.html).

The connection is established lazily on the first call and re-established automatically if the service disconnects. Call [disconnect](#disconnect) when the connector is no longer needed (e.g. in `onDestroy`).

Typical usage from a coroutine:

```kotlin
val orderConnector = OrderConnector(context)

lifecycleScope.launch(Dispatchers.IO) {
    val order = orderConnector.getActiveOrder()
    withContext(Dispatchers.Main) {
        render(order)
    }
}
```

**See also:**

- [BindingException](../common-exception/binding-exception.md)
- [PermissionDeniedException](../common-exception/permission-denied-exception.md)

| Constructor parameter | Description |
|---|---|
| `S` | the AIDL service interface this connector communicates with. |
| `context` | context used to bind to the CorePOS service. |

## Functions

### connect

```kotlin
fun connect(): Boolean
```

Binds to the CorePOS service if not already connected.

Calling this explicitly is optional — connectors connect lazily on the first service call — but it can be used to warm up the connection ahead of time.

**Returns:** `true` if already connected or the bind request was issued successfully.

### disconnect

```kotlin
fun disconnect()
```

Unbinds from the CorePOS service. Safe to call when not connected. Call this when the connector is no longer needed to release the binding.

### onServiceConnected

```kotlin
open override fun onServiceConnected(name: ComponentName?, binder: IBinder?)
```

### onServiceDisconnected

```kotlin
open override fun onServiceDisconnected(name: ComponentName?)
```

## Inheritors

- [ActionConnector](action-connector.md)
- [InventoryConnector](inventory-connector.md)
- [MerchantConnector](merchant-connector.md)
- [OrderConnector](order-connector.md)
- [PaymentConnector](payment-connector.md)
- [PrinterConnector](printer-connector.md)
- [TenderConnector](tender-connector.md)
- [TokensConnector](tokens-connector.md)

