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
fun addPerUnitLineItem(
    orderId: String,
    itemId: String,
    quantity: Double,
    devNotes: Map<String, String>?,
    binName: String?
): LineItem?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `itemId` (String): Unique **UUID** identifier of the [`Item`](../models/models-inventory#item).
- `quantity` (Double): Quantity of the item to add.
- `devNotes` (Map<String, String>?): Optional development notes as key-value pairs.
- `binName` (String?): Optional, A specific identifier for categorizing items in an order. This is the general name of a specific group of items, united by some logic.  

#### Returns:
[`LineItem`](../models/models-order#lineitem)? - Returns the created line item or null if the operation fails.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun addPerUnitItem(orderId: String, itemId: String, quantity: Double, devNotes: Map<String, String>? = null, binName: String? = null) {
    lifecycleScope.launch(Dispatchers.IO) {
        val lineItem = orderConnector.addPerUnitLineItem(orderId, itemId, quantity, devNotes, binName)
        lineItem?.let {
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
    fun addPerUnitLineItem(orderId: String, itemId: String, quantity: Double, devNotes: Map<String, String>?, binName: String?): LineItem?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addPerUnitLineItem(orderId: String, itemId: String, quantity: Double, devNotes: Map<String, String>?, binName: String?): LineItem? {
        return try {
            orderConnector.addPerUnitLineItem(orderId, itemId, quantity, devNotes, binName)
        } catch (_: Exception) { null }
    }
}
```