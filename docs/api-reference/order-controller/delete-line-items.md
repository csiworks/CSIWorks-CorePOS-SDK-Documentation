---
id: order-api-delete-line-items
sidebar_position: 7
title: Delete Line Items
description: Remove multiple line items from an order in a single operation.
hide_title: true
---

## Delete Line Items

**Purpose:** Remove multiple line items from an order in a single operation.

### Signature:

```kotlin
fun deleteLineItems(orderCode: String, lineItemIds: List<String>)
```

#### Parameters:
- `orderCode` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemIds` (List(String)): List of unique **UUID** identifiers of the [`LineItem`](../models/models-order#lineitem) objects to remove.

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun removeMultipleItems(orderCode: String, itemsToRemove: List<String>) {
    lifecycleScope.launch(Dispatchers.IO) {
        orderConnector.deleteLineItems(orderCode, itemsToRemove)
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
    fun deleteLineItems(orderCode: String, lineItemIds: List<String>)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun deleteLineItems(orderCode: String, lineItemIds: List<String>): Boolean {
        return try {
            orderConnector.deleteLineItems(orderCode, lineItemIds)
            true
        } catch (_: Exception) { false }
    }
}