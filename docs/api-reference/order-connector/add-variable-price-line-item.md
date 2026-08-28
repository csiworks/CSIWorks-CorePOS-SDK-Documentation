---
id: order-api-add-variable-price-line-item
sidebar_position: 4
title: Add Variable-Price Line Item
description: Add an item to an order with a specified cash price (use when the item’s price is not fixed in catalog).
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

- `orderId` (String): UUID of the target [Order](../models/order.md#order).
- `itemId` (String): UUID of the inventory item.
- `cashPrice` (Long): price in the smallest currency unit (e.g., cents).
- `devNotes` (Map\<String, String>?): optional free-form metadata attached to the line item.
- `binName` (String?): optional identifier used to group related line items within an order.

#### Returns:

`LineItem?`: the created [LineItem](../models/order.md#lineitem), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

### Best Practice with Repository Pattern

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

