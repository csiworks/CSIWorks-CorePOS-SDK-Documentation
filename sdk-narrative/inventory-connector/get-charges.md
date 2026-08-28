---
id: inventory-api-get-charges
sidebar_position: 8
title: Get Charges
description: Retrieves all available charges (taxes and fees).
hide_title: true
---

## Get Charges

**Purpose:** Fetch the complete list of charges (taxes and fees) available in the system.

### Signature:

```kotlin
fun getCharges(): List<Charge>?
```

#### Parameters:
None

#### Returns:
`List<Charge>?`: A list of [`Charge`](../models/models-inventory#charge), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadCharges() {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            val charges = inventoryConnector.getCharges()
            charges?.let {
                withContext(Dispatchers.Main) {
                    populateChargesList(it)
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to load charges: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun getCharges(): List<Charge>?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun getCharges(): List<Charge> {
        return try {
            inventoryConnector.getCharges() ?: emptyList()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get charges: ${e.message}")
            emptyList()
        }
    }
}
```