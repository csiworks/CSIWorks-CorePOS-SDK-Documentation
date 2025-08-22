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
- `uuid`: A unique **UUID** identifier for the tender.  
- `buttonTitle`: The text displayed on the tender button.  
- `tenderName`: An internal name for the tender (not currently in use, reserved for internal reference).  
- `packageName`: The package name of the 3rd-party app that created this tender (i.e., tender button owner).  
- `enabled`: Determines whether the tender button is visible (`true`) or hidden/disabled (`false`).  
- `openCashDrawer`: Flag to indicate whether the cash drawer should be opened when this tender is used.  


#### Returns:
`Tender?`: The [`Tender`](../models/models-tender#tender), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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