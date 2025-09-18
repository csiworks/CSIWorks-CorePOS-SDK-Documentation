---
id: order-api-update-line-item
sidebar_position: 8
title: Update Line Item
description: Update an existing line item in an order.
hide_title: true
---

## Update Line Item

**Purpose:** Update an existing line item in an order.

### Signature:

```kotlin
fun updateLineItem(orderId: String, lineItem: LineItem): LineItem?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItem` (LineItem): The [`LineItem`](../models/models-order#lineitem) to update with new data.

#### Returns:
`LineItem?` - Returns the updated line item if successful, or null if the operation fails.

#### Error Handling:
Returns null on failure.

### Example Usage:
```kotlin
private fun updateItemQuantity(orderId: String, lineItem: LineItem, newQuantity: Double) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updatedLineItem = lineItem.copy(quantity = newQuantity)
        val result = orderConnector.updateLineItem(orderId, updatedLineItem)
        withContext(Dispatchers.Main) {
            result?.let { updateOrderUI(it) }
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface OrderRepository {
    suspend fun updateLineItem(orderId: String, lineItem: LineItem): LineItem?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun updateLineItem(orderId: String, lineItem: LineItem): LineItem? {
        return try {
            orderConnector.updateLineItem(orderId, lineItem)
        } catch (_: Exception) { null }
    }
}
```