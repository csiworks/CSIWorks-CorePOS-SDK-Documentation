---
id: tender-api-update-tender
sidebar_position: 4
title: Update Tedner
description: Update an existing tender.
hide_title: true
---

## Update Tedner

**Purpose:** Update an existing tender.

### Signature:

```kotlin
fun updateTender(tender: Tender): Tender?
```

#### Parameters:

- `tender` (Tender): tender with updated values; matched by its identifier.

#### Returns:

`Tender?`: the updated [Tender](../models/tender.md#tender), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
fun updatePaymentMethod(
        tender: Tender
    ) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val updatedTender = tenderConnector.updateTender(updatedTender)
                
                withContext(Dispatchers.Main) {
                    onPaymentMethodUpdated(updatedTender)
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to create payment method: ${e.message}")
            }
        }
    }
```

