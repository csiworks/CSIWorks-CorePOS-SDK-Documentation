---
id: inventory-api-update-ebt-flags
sidebar_position: 7
title: Update EBT Flags
description: Updates EBT eligibility flags for multiple items.
hide_title: true
---

## Update EBT Flags

**Purpose:** Update EBT (Electronic Benefit Transfer) eligibility flags for multiple inventory items in a single operation.

### Signature:

```kotlin
fun updateEbtFlags(flags: Map<String, Boolean>)
```

#### Parameters:
`flags` (Map (String, Boolean)): A map where keys are item IDs (**UUID**) and values are boolean flags indicating EBT eligibility

#### Returns:
Void (Unit) - No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun updateItemEbtEligibility(itemEbtFlags: Map<String, Boolean>) {
    lifecycleScope.launch(Dispatchers.IO) {
        try {
            inventoryConnector.updateEbtFlags(itemEbtFlags)
            withContext(Dispatchers.Main) {
                showEbtFlagsUpdated()
                refreshItemList()
            }
        } catch (e: Exception) {
            Log.e("CorePOS", "Failed to update EBT flags: ${e.message}")
            withContext(Dispatchers.Main) {
                showUpdateError()
            }
        }
    }
}

// Example: Enable EBT for some items, disable for others
val ebtFlags = mapOf(
    "f7a688c1-7bfb-4ef6-8df4-b3e0f5e2d95b" to true,   // Enable EBT
    "4091c9a9-b0af-44bf-804a-b44b8f12b152" to false,  // Disable EBT
    "8c4c172b-ae8b-4eef-a47e-5e9ef203e783" to true    // Enable EBT
)
updateItemEbtEligibility(ebtFlags)
```

### Best Practice with Repository Pattern:
```kotlin
interface InventoryRepository {
    suspend fun updateEbtFlags(flags: Map<String, Boolean>): Boolean
}

class InventoryRepositoryImpl(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    override suspend fun updateEbtFlags(flags: Map<String, Boolean>): Boolean {
        return try {
            inventoryConnector.updateEbtFlags(flags)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to update EBT flags: ${e.message}")
            false
        }
    }
}
```