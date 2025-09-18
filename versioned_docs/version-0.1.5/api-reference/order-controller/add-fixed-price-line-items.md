---
id: order-api-add-fixed-price-line-items
sidebar_position: 6
title: Add Fixed-Price Line Items
description: Add multiple fixed-price line items to an order in a single operation.
hide_title: true
---

## Add Fixed-Price Line Items

**Purpose:** Add multiple fixed-price line items to an order in a single operation.

### Signature:

```kotlin
fun addFixedPriceLineItems(
    orderId: String,
    itemId: String,
    itemsNumber: Int,
    devNotes: Map<String, String>?,
    binName: String?
): List<LineItem>?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `itemId` (String): Unique **UUID** identifier of the [`Item`](../models/models-inventory#item).
- `itemsNumber` (Int): Number of line items to add for this item.
- `devNotes` (Map<String, String>?): Optional development notes as key-value pairs.
- `binName` (String?): Optional, A specific identifier for categorizing items in an order. This is the general name of a specific group of items, united by some logic.  

#### Returns:
List<[`LineItem`](../models/models-order#lineitem)>? - Returns the list of created line items or null if the operation fails.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun addBulkFixedPriceItems(orderId: String, itemId: String, itemsNumber: Int, devNotes: Map<String, String>? = null, binName: String? = null) {
    lifecycleScope.launch(Dispatchers.IO) {
        val lineItems = orderConnector.addFixedPriceLineItems(orderId, itemId, itemsNumber, devNotes, binName)
        lineItems?.let {
            val updated = orderConnector.getOrder(orderId)
            withContext(Dispatchers.Main) {
                updateOrderUI(updated)
            }
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    fun addFixedPriceLineItems(orderId: String, itemId: String, itemsNumber: Int, devNotes: Map<String, String>?, binName: String?): List<LineItem>?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addFixedPriceLineItems(orderId: String, itemId: String, itemsNumber: Int, devNotes: Map<String, String>?, binName: String?): List<LineItem>? {
        return try {
            orderConnector.addFixedPriceLineItems(orderId, itemId, itemsNumber, devNotes, binName)
        } catch (_: Exception) { null }
    }
}
```