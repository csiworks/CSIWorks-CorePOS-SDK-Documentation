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
fun updateLineItems(orderId: String, lineItems: List<LineItem>): List<LineItem>?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItems` (List(LineItem)): List of [`LineItem`](../models/models-order#lineitem) objects to update.

#### Returns:
`List<LineItem>?` - Returns the list of updated line items if successful, or null if the operation fails.

#### Error Handling:
Returns null on failure.

### Example Usage:
```kotlin
private fun bulkUpdateQuantities(orderId: String, lineItems: List<LineItem>, quantityUpdates: Map<String, Double>) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updatedLineItems = lineItems.map { lineItem ->
            quantityUpdates[lineItem.id]?.let { newQuantity ->
                lineItem.copy(quantity = newQuantity)
            } ?: lineItem
        }
        val result = orderConnector.updateLineItems(orderId, updatedLineItems)
        withContext(Dispatchers.Main) {
            result?.let { updateOrderUI(it) }
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface OrderRepository {
    suspend fun updateLineItems(orderId: String, lineItems: List<LineItem>): List<LineItem>?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun updateLineItems(orderId: String, lineItems: List<LineItem>): List<LineItem>? {
        return try {
            orderConnector.updateLineItems(orderId, lineItems)
        } catch (_: Exception) { null }
    }
}
```