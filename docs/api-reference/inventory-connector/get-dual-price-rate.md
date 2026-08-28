---
id: inventory-api-get-dual-price-rate
sidebar_position: 14
title: Get Dual Price Rate
description: Fetch the current dual pricing rate used for calculating card vs cash pricing.
hide_title: true
---

## Get Dual Price Rate

**Purpose:** Fetch the current dual pricing rate used for calculating card vs cash pricing.

### Signature:

```kotlin
fun getDualPriceRate(): Float?
```

#### Parameters:

None.

#### Returns:

`Float?`: the dual price rate, or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun loadDualPriceRate() {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val rate = inventoryConnector.getDualPriceRate()
            rate?.let {
                withContext(Dispatchers.Main) {
                    displayDualPriceRate(it)
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load dual price rate: ${e.message}")
        }
    }
}

private fun displayDualPriceRate(rate: Float) {
    val percentage = rate
    textView.text = "Dual Price Rate: ${String.format("%.2f", percentage)}%"
}
```

### Best Practice with Repository Pattern

```kotlin
interface InventoryRepository {
    suspend fun getDualPriceRate(): Float?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun getDualPriceRate(): Float? {
        return try {
            inventoryConnector.getDualPriceRate()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get dual price rate: ${e.message}")
            null
        }
    }
}
```

