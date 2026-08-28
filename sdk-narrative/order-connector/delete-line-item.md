---
id: order-api-delete-line-item
sidebar_position: 6
title: Delete Line Item
description: Remove a line item from an order.
hide_title: true
---

## Delete Line Item

**Purpose:** Remove a specific line item from an order.

### Signature:

```kotlin
fun deleteLineItem(orderId: String, lineItemId: String)
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemId` (String): Unique **UUID** identifier of the [`LineItem`](../models/models-order#lineitem).

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun removeLineItem(orderId: String, lineItemId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        orderConnector.deleteLineItem(orderId, lineItemId)
        val updated = orderConnector.getOrder(orderId)
        withContext(Dispatchers.Main) {
            updateOrderUI(updated)
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    fun deleteLineItem(orderId: String, lineItemId: String)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun deleteLineItem(orderId: String, lineItemId: String): Boolean {
        return try {
            inventoryConnector.deleteLineItem(lineItemId)
            true
        } catch (_: Exception) { null }
    }
}
```