---
id: order-api-add-line-item-discount
sidebar_position: 9
title: Add Line Item Discount
description: Add a discount to a specific line item within an order.
hide_title: true
---

## Add Line Item Discount

**Purpose:** Add a discount to a specific line item within an order.

### Signature:

```kotlin
fun addLineItemDiscount(
    orderId: String,
    lineItemId: String,
    discountName: String,
    amountType: AmountType,
    amount: Long
): Order?
```

#### Parameters:

- `orderId` (String): UUID of the [Order](../models/order.md#order).
- `lineItemId` (String): UUID of the line item to discount.
- `discountName` (String): display name of the discount.
- `amountType` (AmountType): whether amount is a fixed amount or a percentage.
- `amount` (Long): discount value — smallest currency unit (e.g., cents) for fixed discounts, or percentage points for percentage discounts.

#### Returns:

`Order?`: the updated [Order](../models/order.md#order), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun applyLineItemDiscount(orderId: String, lineItemId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        val updatedOrder = orderConnector.addLineItemDiscount(
            orderId = orderId,
            lineItemId = lineItemId,
            discountName = "Employee Discount",
            amountType = AmountType.PERCENTAGE,
            amount = 1000L // 10.00%
        )
        withContext(Dispatchers.Main) {
            updatedOrder?.let(::onOrderUpdated) ?: showError("Failed to apply discount")
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface OrderRepository {
    suspend fun addLineItemDiscount(
        orderId: String,
        lineItemId: String,
        discountName: String,
        amountType: AmountType,
        amount: Long
    ): Order?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addLineItemDiscount(
        orderId: String,
        lineItemId: String,
        discountName: String,
        amountType: AmountType,
        amount: Long
    ): Order? = try {
        orderConnector.addLineItemDiscount(orderId, lineItemId, discountName, amountType, amount)
    } catch (_: Exception) { null }
}
```

