---
title: TenderConnector
sidebar_label: TenderConnector
---

# TenderConnector

```kotlin
class TenderConnector(context: Context) : ServiceConnector<…>
```

Connector for managing custom tenders (payment methods) registered by third-party apps in the CorePOS application. A custom tender appears as an extra payment button on the CorePOS payment screen. All methods must be called from a background thread.

Example — register a custom tender on first launch:

```kotlin
val tenderConnector = TenderConnector(context)

lifecycleScope.launch(Dispatchers.IO) {
    val existing = tenderConnector.getTenders(context.packageName).orEmpty()
    if (existing.isEmpty()) {
        tenderConnector.createTender(
            buttonTitle = "My Pay",
            tenderName = "my-pay",
            packageName = context.packageName,
            enabled = true,
            openCashDrawer = false,
        )
    }
}
```

When the merchant taps the tender button, CorePOS broadcasts [com.coreposnow.sdk.utils.Intents.ACTION_MERCHANT_TENDER](../utils/intents.md) with the order extras.

**See also:**

- [Tender](../tender/tender.md)
- [Intents](../utils/intents.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS tender service. |

## Functions

### createTender

```kotlin
fun createTender(
    buttonTitle: String,
    tenderName: String,
    packageName: String,
    enabled: Boolean,
    openCashDrawer: Boolean
): Tender?
```

Registers a new custom tender in CorePOS.

| Parameter | Description |
|---|---|
| `buttonTitle` | label shown on the payment-screen button. |
| `tenderName` | internal name of the tender. |
| `packageName` | package name of the app that owns the tender. |
| `enabled` | whether the tender is initially enabled. |
| `openCashDrawer` | whether completing a payment with this tender opens the cash drawer. |

**Returns:** the created [Tender](../tender/tender.md), or `null` on failure.

### getTenders

```kotlin
fun getTenders(packageName: String): List<Tender>?
```

Retrieves all custom tenders registered by the given app.

| Parameter | Description |
|---|---|
| `packageName` | package name of the app whose tenders to fetch. |

**Returns:** the list of matching tenders, or `null` on failure.

### updateTender

```kotlin
fun updateTender(tender: Tender): Tender?
```

Updates an existing custom tender (e.g., its title or enabled state).

| Parameter | Description |
|---|---|
| `tender` | tender with updated values; matched by its identifier. |

**Returns:** the updated [Tender](../tender/tender.md), or `null` on failure.

