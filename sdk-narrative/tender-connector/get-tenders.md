---
id: tender-api-get-tenders
sidebar_position: 3
title: Get Tenders
description: Retrieve the list of tenders.
hide_title: true
---

## Get Tenders

**Purpose:** Retrieve all tenders created by the specified package (or that package is associated with).

### Signature:

```kotlin
fun getTenders(packageName: String): List<Tender>?
```

#### Parameters:
`packageName`(String): Application package to filter tenders by.

#### Returns:
`List<Tender>?`: The list of [`Tender`](../models/models-tender#tender), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
    private fun loadPaymentMethods() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val tenders = tenderConnector.getTenders(packageName)
                withContext(Dispatchers.Main) {
                    displayPaymentMethods(tenders ?: emptyList())
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load payment methods: ${e.message}")
            }
        }
    }
```