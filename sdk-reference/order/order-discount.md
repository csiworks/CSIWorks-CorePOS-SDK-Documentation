---
title: OrderDiscount
sidebar_label: OrderDiscount
slug: /order/order-discount
---

# OrderDiscount

```kotlin
data class OrderDiscount(
    val orderDiscountId: String?,
    val discountId: String?,
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

Represents a discount applied at the order level (as opposed to line-item level) in the CorePOS SDK.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The discount amount. |
| `discountId` | `String?` | A unique UUID identifier for the discount; reference to the corresponding inventory Discount. |
| `discountType` | `Int` | The type of discount: `FIXED (0)` for a fixed amount discount, or `PERCENTAGE (1)` for a percentage discount. |
| `isActive` | `Boolean` | A flag indicating whether the discount is currently active. |
| `name` | `String` | The name of the discount (e.g., "Holiday Promo", "Employee Discount"). |
| `orderDiscountId` | `String?` | A unique UUID identifier for the order discount. |

