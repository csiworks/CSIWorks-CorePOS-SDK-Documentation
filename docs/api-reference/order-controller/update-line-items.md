---
id: order-api-update-line-items
sidebar_position: 9
title: Update Line Items
description: Update multiple line items in an order with a single operation.
hide_title: true
---

## Update Line Items

**Purpose:** Update multiple line items in an order with a single operation.

### Signature:

```kotlin
fun updateLineItems(orderCode: String, updates: List<LineItemBulkUpdate>)
```

#### Parameters:
- `orderCode` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `updates` (List(LineItemBulkUpdate)): List of updates to apply.

#### Data Classes:
```kotlin
data class LineItemBulkUpdate(
    val lineItemId: String,
    val quantity: Double? = null,
    val price: Double? = null,
    val binName: String? = null,
    val isTaxable: Boolean? = null,
    val lineItemPayment: LineItemPayment? = null
)
```

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun bulkUpdateQuantities(orderCode: String, quantityUpdates: Map<String, Double>) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updates = quantityUpdates.map { (lineItemId, quantity) ->
            LineItemBulkUpdate(lineItemId = lineItemId, quantity = quantity)
        }
        orderConnector.updateLineItems(orderCode, updates)
        val updated = orderConnector.getOrder(orderCode)
        withContext(Dispatchers.Main) {
            updateOrderUI(updated)
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    fun updateLineItems(orderCode: String, updates: List<LineItemBulkUpdate>)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun updateLineItems(orderCode: String, updates: List<LineItemBulkUpdate>): Boolean {
        return try {
            orderConnector.updateLineItems(orderCode, updates)
            true
        } catch (_: Exception) { false }
    }
}