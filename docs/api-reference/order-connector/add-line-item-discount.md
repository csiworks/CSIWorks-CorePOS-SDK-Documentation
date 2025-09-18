---
id: order-api-add-line-item-discount
sidebar_position: 7
title: Add Line Item Discount
description: Add a discount to a specific line item in an order.
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
- `orderId` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `lineItemId` (String): Unique **UUID** identifier of the [`LineItem`](../models/models-order#lineitem).
- `discountName` (String): Name or description of the discount.
- `amountType` (AmountType): Type of amount (percentage or fixed amount).
- `amount` (Long): Discount amount (in cents for fixed amounts, or percentage points for percentage discounts).

#### Returns:
`Order?`: The updated [`Order`](../models/models-order#order) with the discount applied, or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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

### Best Practice with Repository Pattern:
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

