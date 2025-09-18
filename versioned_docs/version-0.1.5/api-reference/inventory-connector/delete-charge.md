---
id: inventory-api-delete-charge
sidebar_position: 10
title: Delete Charge
description: Removes a charge from the system.
hide_title: true
---

## Delete Charge

**Purpose:** Permanently delete a charge (tax/fee) by its ID.

### Signature:

```kotlin
fun deleteCharge(chargeId: String)
```

#### Parameters:
`chargeId` (String): Unique **UUID** identifier of the charge to delete

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun deleteCharge(chargeId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            inventoryConnector.deleteCharge(chargeId)
            withContext(Dispatchers.Main) {
                showChargeDeleted()
                refreshChargesList()
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to delete charge: ${e.message}")
            withContext(Dispatchers.Main) {
                showDeleteError()
            }
        }   
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun deleteCharge(chargeId: String): Boolean
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun deleteCharge(chargeId: String): Boolean {
        return try {
            inventoryConnector.deleteCharge(chargeId)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to delete charge: ${e.message}")
            false
        }
    }
}
```