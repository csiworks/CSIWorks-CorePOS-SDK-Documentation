---
id: order-api-add-fixed-price-line-item
sidebar_position: 5
title: Add Fixed-Price Line Item
description: Add a single fixed-price line item to an order.
hide_title: true
---

## Add Fixed-Price Line Item

**Purpose:** Add a single fixed-price line item to an order.

### Signature:

```kotlin
fun addFixedPriceLineItem(orderCode: String, itemId: String, price: Double, binName: String = "")
```

#### Parameters:
- `orderCode` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `itemId` (String): Unique **UUID** identifier of the [`Item`](../models/models-inventory#item).
- `price` (Double): Fixed price for this line item.
- `binName` (String): Optional bin name for inventory tracking.

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun addFixedPriceItem(orderCode: String, itemId: String, price: Double, binName: String = "") {
    lifecycleScope.launch(Dispatchers.IO) {
        orderConnector.addFixedPriceLineItem(orderCode, itemId, price, binName)
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
    fun addFixedPriceLineItem(orderCode: String, itemId: String, price: Double, binName: String = "")
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addFixedPriceLineItem(orderCode: String, itemId: String, price: Double, binName: String): Boolean {
        return try {
            orderConnector.addFixedPriceLineItem(orderCode, itemId, price, binName)
            true
        } catch (_: Exception) { false }
    }
}