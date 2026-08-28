---
id: order-api-add-fixed-price-line-items
sidebar_position: 7
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

- `orderId` (String): UUID of the target [Order](../models/order.md#order).
- `itemId` (String): UUID of the inventory item.
- `itemsNumber` (Int): number of line items to add.
- `devNotes` (Map<String, String>?): optional free-form metadata attached to the line items.
- `binName` (String?): optional identifier used to group related line items within an order.

#### Returns:

`List<LineItem>?`: the created line items, or `null` on failure.

#### Error Handling:

Triggers error callback on failure.

### Example Usage

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

### Best Practice with Repository Pattern

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

