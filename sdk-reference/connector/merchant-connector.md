---
title: MerchantConnector
sidebar_label: MerchantConnector
---

# MerchantConnector

```kotlin
class MerchantConnector(context: Context) : ServiceConnector<…>
```

Connector for reading merchant information from the CorePOS application. All methods must be called from a background thread.

```kotlin
lifecycleScope.launch(Dispatchers.IO) {
    val merchant = MerchantConnector(context).getMerchant()
}
```

**See also:**

- [Merchant](../merchant/merchant.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS merchant service. |

## Functions

### getMerchant

```kotlin
fun getMerchant(): Merchant?
```

Retrieves the merchant currently configured in CorePOS.

**Returns:** the [Merchant](../merchant/merchant.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

