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
fun updateLineItem(orderCode: String, lineItemId: String, updates: LineItemUpdate)
```

#### Parameters:
- `orderCode` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemId` (String): Unique **UUID** identifier of the [`LineItem`](../models/models-order#lineitem) to update.
- `updates` (LineItemUpdate): The update data for the line item.

#### Data Classes:
```kotlin
data class LineItemUpdate(
    val quantity: Double? = null,
    val price: Double? = null,
    val binName: String? = null,
    val taxable: Boolean? = null,
    val lineItemPayment: LineItemPayment? = null
)
```

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun updateItemQuantity(orderCode: String, lineItemId: String, newQuantity: Double) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updates = LineItemUpdate(quantity = newQuantity)
        orderConnector.updateLineItem(orderCode, lineItemId, updates)
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
    fun updateLineItem(orderCode: String, lineItemId: String, updates: LineItemUpdate)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun updateLineItem(orderCode: String, lineItemId: String, updates: LineItemUpdate): Boolean {
        return try {
            orderConnector.updateLineItem(orderCode, lineItemId, updates)
            true
        } catch (_: Exception) { false }
    }
}