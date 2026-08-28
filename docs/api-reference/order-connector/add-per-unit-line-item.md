---
id: order-api-add-per-unit-line-item
sidebar_position: 6
title: Add Per-Unit Line Item
description: Add an item using quantity (e.g., weight/units) where pricing is determined by the catalog’s unit price.
hide_title: true
---

## Add Per-Unit Line Item

**Purpose:** Add an item using quantity (e.g., weight/units) where pricing is determined by the catalog’s unit price.

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

- `orderId` (String): UUID of the target [Order](../models/order.md#order).
- `itemId` (String): UUID of the inventory item.
- `quantity` (Double): quantity of the item to add.
- `devNotes` (Map\<String, String>?): optional free-form metadata attached to the line item.
- `binName` (String?): optional identifier used to group related line items within an order.

#### Returns:

`LineItem?`: the created [LineItem](../models/order.md#lineitem), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun addWeightedItem(orderId: String, itemId: String, qtyKg: Double) {
    lifecycleScope.launch(Dispatchers.IO) {
        val lineItem = orderConnector.addPerUnitLineItem(
            orderId = orderId,
            itemId = itemId,
            quantity = qtyKg,
            devNotes = null,
            binName = null
        )
        withContext(Dispatchers.Main) {
            lineItem?.let(::onLineItemAdded) ?: showError("Failed to add per-unit item")
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface OrderRepository {
    fun addPerUnitLineItem(
       orderId: String,
       itemId: String,
       quantity: Double,
       devNotes: Map<String, String>?,
       binName: String?
    ): LineItem?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addPerUnitLineItem(
       orderId: String,
       itemId: String,
       quantity: Double,
       devNotes: Map<String, String>?,
       binName: String?
    ): LineItem? = try {
        orderConnector.addPerUnitLineItem(orderId, itemId, quantity, devNotes, binName)
    } catch (_: Exception) { null }
}
```

