---
id: tender-api-create-tender
sidebar_position: 2
title: Create Tender
description: Create a new custom tender button.
hide_title: true
---

## Create Tender

**Purpose:** Create a new custom tender button.

### Signature:

```kotlin
fun createTender(
    buttonTitle: String,
    tenderName: String,
    packageName: String,
    enabled: Boolean,
    openCashDrawer: Boolean
): Tender?
```

#### Parameters:

- `buttonTitle` (String): label shown on the payment-screen button.
- `tenderName` (String): internal name of the tender.
- `packageName` (String): package name of the app that owns the tender.
- `enabled` (Boolean): whether the tender is initially enabled.
- `openCashDrawer` (Boolean): whether completing a payment with this tender opens the cash drawer.

#### Returns:

`Tender?`: the created [Tender](../models/tender.md#tender), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
    fun createPaymentMethod(
        buttonTitle: String,
        tenderName: String,
        enabled: Boolean = true
    ) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val tender = tenderConnector.createTender(
                    buttonTitle = buttonTitle,
                    tenderName = tenderName,
                    packageName = packageName,
                    enabled = enabled,
                    openCashDrawer = false
                )
                
                withContext(Dispatchers.Main) {
                    onPaymentMethodCreated(tender)
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to create payment method: ${e.message}")
            }
        }
    }
```

