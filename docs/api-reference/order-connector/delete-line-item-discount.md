---
id: order-api-delete-line-item-discount
sidebar_position: 8
title: Delete Line Item Discount
description: Remove a specific discount from a line item in an order.
hide_title: true
---

## Delete Line Item Discount

**Purpose:** Remove a specific discount from a line item within an order.

### Signature:

```kotlin
fun deleteLineItemDiscount(
    orderId: String,
    lineItemId: String,
    discountId: String
): Order?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemId` (String): Unique **UUID** identifier of the [`LineItem`](../models/models-order#lineitem).
- `discountId` (String): Unique **UUID** identifier of the discount to remove.

#### Returns:
`Order?`: The updated [`Order`](../models/models-order#order) with the discount removed, or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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

### Best Practice with Repository Pattern:
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