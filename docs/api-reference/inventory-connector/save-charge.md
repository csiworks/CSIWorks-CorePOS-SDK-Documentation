---
id: inventory-api-save-charge
sidebar_position: 9
title: Save Charge
description: Creates a new charge or updates an existing one.
hide_title: true
---

## Save Charge

**Purpose:** Persist charge (tax/fee) data to the system.

### Signature:

```kotlin
fun saveCharge(charge: Charge): Charge?
```

#### Parameters:
- `charge`: [`Charge`](../models/models-inventory#charge) object to save.

#### Returns:
`Charge?`: The saved [`Charge`](../models/models-inventory#charge) with updated data (including generated ID for new charges), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun createNewCharge(chargeName: String, amount: Long, amountType: AmountType) {
    lifecycleScope.launch(Dispatchers.IO) {
        val newCharge = Charge(
            chargeId = null,
            name = chargeName,
            chargeAmountType = amountType.code,
            amount = amount,
            isDefault = false
        )
        
        try {
            val savedCharge = inventoryConnector.saveCharge(newCharge)
            savedCharge?.let {
                withContext(Dispatchers.Main) {
                    showChargeCreated(it)
                    refreshChargesList()
                }
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to save charge: ${e.message}")
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun saveCharge(charge: Charge): Charge?
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun saveCharge(charge: Charge): Charge? {
        return try {
            inventoryConnector.saveCharge(charge)
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to save charge: ${e.message}")
            null
        }
    }
}
```