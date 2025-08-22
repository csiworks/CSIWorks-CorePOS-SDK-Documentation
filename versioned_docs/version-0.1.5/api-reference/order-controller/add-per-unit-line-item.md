---
id: order-api-add-per-unit-line-item
sidebar_position: 5
title: Add Per-Unit Line Item
description: Add a line item priced by unit and quantity.
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
    devNotes: Map<String, String>?
): LineItem?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `itemId` (String): Unique **UUID** identifier of the inventory [`Item`](../models/models-inventory#item).
- `quantity` (Double): Number of units.
- `devNotes` (Map(String, String)?, optional): Free-form metadata.

#### Returns:
`LineItem?`: The created [`LineItem`](../models/models-order#lineitem), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun addWeightedItem(orderId: String, itemId: String, qtyKg: Double) {
    lifecycleScope.launch(Dispatchers.IO) {
        val lineItem = orderConnector.addPerUnitLineItem(
            orderId = orderId,
            itemId = itemId,
            quantity = qtyKg
        )
        withContext(Dispatchers.Main) {
            lineItem?.let(::onLineItemAdded) ?: showError("Failed to add per-unit item")
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    fun addPerUnitLineItem(
       orderId: String,
       itemId: String,
       quantity: Double,
       devNotes: Map<String, String>?
    ): LineItem?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addPerUnitLineItem(
       orderId: String,
       itemId: String,
       quantity: Double,
       devNotes: Map<String, String>?
    ): LineItem? = try {
        orderConnector.addPerUnitLineItem(orderId, itemId, cashPrice, devNotes)
    } catch (_: Exception) { null }
}
```