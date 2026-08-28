---
id: order-api-add-variable-price-line-item
sidebar_position: 4
title: Add Variable-Price Line Item
description: Add a line item priced by explicit cash amount.
hide_title: true
---

## Add Variable-Price Line Item

**Purpose:** Add an item to an order with a specified cash price (use when the item’s price is not fixed in catalog).

### Signature:

```kotlin
fun addVariablePriceLineItem(
    orderId: String,
    itemId: String,
    cashPrice: Long,
    devNotes: Map<String, String>?,
    binName: String?
): LineItem?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `itemId` (String): Unique **UUID** identifier of the inventory [`Item`](../models/models-inventory#item).
- `cashPrice` (Long): Price in smallest currency unit.
- `devNotes` (Map(String, String)?, optional): Free-form metadata.
- `binName` (String?): Optional, A specific identifier for categorizing items in an order. This is the general name of a specific group of items, united by some logic.

#### Returns:
`LineItem?`: The created [`LineItem`](../models/models-order#lineitem), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun addCustomPricedItem(orderId: String, itemId: String, priceCents: Long) {
    lifecycleScope.launch(Dispatchers.IO) {
        val li = orderConnector.addVariablePriceLineItem(orderId, itemId, priceCents, null, null)
        withContext(Dispatchers.Main) {
            if (li != null) {
                onLineItemAdded(li)
            } else {
                showError("Failed to add variable-price line item")
            }
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
        suspend fun addVariablePrice(
        orderId: String,
        itemId: String,
        cashPrice: Long,
        devNotes: Map<String, String>?,
        binName: String?
    ): LineItem?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addVariablePrice(
        orderId: String, itemId: String, cashPrice: Long, devNotes: Map<String, String>?, binName: String?
    ): LineItem? = try {
        orderConnector.addVariablePriceLineItem(orderId, itemId, cashPrice, devNotes, binName)
    } catch (_: Exception) { null }
}
```