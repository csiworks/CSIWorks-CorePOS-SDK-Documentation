---
title: LineItemDiscount
sidebar_label: LineItemDiscount
slug: /order/line-item-discount
---

# LineItemDiscount

```kotlin
data class LineItemDiscount(
    val lineItemDiscountId: String?,
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

Represents a discount applied to a single [LineItem](line-item.md) in the CorePOS SDK.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The discount amount. |
| `discountType` | `Int` | The type of discount: `FIXED (0)` for a fixed amount discount, or `PERCENTAGE (1)` for a percentage discount. |
| `isActive` | `Boolean` | A flag indicating whether the discount is currently active. |
| `lineItemDiscountId` | `String?` | A unique UUID identifier for the line item discount. |
| `name` | `String` | The name of the discount (e.g., "Holiday Sale"). |

