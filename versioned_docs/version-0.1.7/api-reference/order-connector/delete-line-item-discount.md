---
id: order-api-delete-line-item-discount
sidebar_position: 11
title: Delete Line Item Discount
description: Remove a specific discount from a line item within an order.
hide_title: true
---

## Delete Line Item Discount

**Purpose:** Remove a specific discount from a line item within an order.

### Signature:

```kotlin
fun deleteLineItemDiscount(orderId: String, lineItemId: String, discountId: String): Order?
```

#### Parameters:

- `orderId` (String): UUID of the [Order](../models/order.md#order).
- `lineItemId` (String): UUID of the line item.
- `discountId` (String): UUID of the discount to remove.

#### Returns:

`Order?`: the updated [Order](../models/order.md#order), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun removeLineItemDiscount(orderId: String, lineItemId: String, discountId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updatedOrder = orderConnector.deleteLineItemDiscount(
            orderId = orderId,
            lineItemId = lineItemId,
            discountId = discountId
        )
        withContext(Dispatchers.Main) {
            updatedOrder?.let(::onOrderUpdated) ?: showError("Failed to remove discount")
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface OrderRepository {
    suspend fun deleteLineItemDiscount(
        orderId: String,
        lineItemId: String,
        discountId: String
    ): Order?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun deleteLineItemDiscount(
        orderId: String,
        lineItemId: String,
        discountId: String
    ): Order? = try {
        orderConnector.deleteLineItemDiscount(orderId, lineItemId, discountId)
    } catch (_: Exception) { null }
}
```

