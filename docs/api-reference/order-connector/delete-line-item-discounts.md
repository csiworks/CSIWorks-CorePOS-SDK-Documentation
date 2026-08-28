---
id: order-api-delete-line-item-discounts
sidebar_position: 13
title: Delete Line Item Discounts
description: Remove multiple discounts from a line item within an order in a single operation.
hide_title: true
---

## Delete Line Item Discounts

**Purpose:** Remove multiple discounts from a line item within an order in a single operation.

### Signature:

```kotlin
fun deleteLineItemDiscounts(orderId: String, lineItemId: String, discountIds: List<String>): Order?
```

#### Parameters:

- `orderId` (String): UUID of the [Order](../models/order.md#order).
- `lineItemId` (String): UUID of the line item.
- `discountIds` (List<String>): UUIDs of the discounts to remove.

#### Returns:

`Order?`: the updated [Order](../models/order.md#order), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

### Best Practice with Repository Pattern

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

