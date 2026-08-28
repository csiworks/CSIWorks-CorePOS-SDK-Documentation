---
id: order-api-delete-line-items
sidebar_position: 10
title: Delete Line Items
description: Remove multiple line items from an order in a single operation.
hide_title: true
---

## Delete Line Items

**Purpose:** Remove multiple line items from an order in a single operation.

### Signature:

```kotlin
fun deleteLineItems(orderId: String, lineItemIds: List<String>)
```

#### Parameters:

- `orderId` (String): UUID of the [Order](../models/order.md#order).
- `lineItemIds` (List\<String>): UUIDs of the line items to delete.

#### Returns:

Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:

Triggers error callback on failure.

### Example Usage

```kotlin
private fun removeMultipleItems(orderId: String, itemsToRemove: List<String>) {
    lifecycleScope.launch(Dispatchers.IO) {
        orderConnector.deleteLineItems(orderId, itemsToRemove)
        val updated = orderConnector.getOrder(orderId)
        withContext(Dispatchers.Main) {
            updateOrderUI(updated)
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface OrderRepository {
    fun deleteLineItems(orderId: String, lineItemIds: List<String>)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun deleteLineItems(orderId: String, lineItemIds: List<String>): Boolean {
        return try {
            orderConnector.deleteLineItems(orderId, lineItemIds)
            true
        } catch (_: Exception) { false }
    }
}
```

