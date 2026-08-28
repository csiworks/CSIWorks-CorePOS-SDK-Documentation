---
id: order-api-delete-line-item-discounts
sidebar_position: 9
title: Delete Line Item Discounts
description: Remove multiple discounts from a line item in an order.
hide_title: true
---

## Delete Line Item Discounts

**Purpose:** Remove multiple discounts from a line item within an order in a single operation.

### Signature:

```kotlin
fun deleteLineItemDiscounts(
    orderId: String,
    lineItemId: String,
    discountIds: List<String>
): Order?
```

#### Parameters:
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemId` (String): Unique **UUID** identifier of the [`LineItem`](../models/models-order#lineitem).
- `discountIds` (List(String)): List of unique **UUID** identifiers of the discounts to remove.

#### Returns:
`Order?`: The updated [`Order`](../models/models-order#order) with the discounts removed, or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun removeMultipleLineItemDiscounts(
    orderId: String, 
    lineItemId: String, 
    discountsToRemove: List<String>
) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updatedOrder = orderConnector.deleteLineItemDiscounts(
            orderId = orderId,
            lineItemId = lineItemId,
            discountIds = discountsToRemove
        )
        withContext(Dispatchers.Main) {
            updatedOrder?.let(::onOrderUpdated) ?: showError("Failed to remove discounts")
        }
    }
}
```

### Best Practice with Repository Pattern:
```kotlin
interface OrderRepository {
    suspend fun deleteLineItemDiscounts(
        orderId: String,
        lineItemId: String,
        discountIds: List<String>
    ): Order?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun deleteLineItemDiscounts(
        orderId: String,
        lineItemId: String,
        discountIds: List<String>
    ): Order? = try {
        orderConnector.deleteLineItemDiscounts(orderId, lineItemId, discountIds)
    } catch (_: Exception) { null }
}
```