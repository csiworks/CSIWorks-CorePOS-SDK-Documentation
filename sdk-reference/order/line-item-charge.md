---
title: LineItemCharge
sidebar_label: LineItemCharge
slug: /order/line-item-charge
---

# LineItemCharge

```kotlin
data class LineItemCharge(
    val lineItemChargeId: String?,
    val chargeId: String?,
    val name: String,
    val chargeAmountType: Int,
    val amount: Long,
    val isDefault: Boolean
) : Parcelable
```

Represents a tax or fee applied to a single [LineItem](line-item.md) in the CorePOS SDK. Charges with a percentage amount type are treated as taxes, while charges with a fixed amount type are treated as fees.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The amount of the charge. If the type is `FIXED`, it is a specific amount; if `PERCENTAGE`, it represents the percentage value. |
| `chargeAmountType` | `Int` | The type of charge amount: `FIXED (0)` for a fixed amount such as a flat fee, or `PERCENTAGE (1)` for a percentage such as a tax rate. |
| `chargeId` | `String?` | A unique UUID identifier for the charge; reference to the corresponding inventory Charge. |
| `isDefault` | `Boolean` | A flag indicating whether this charge is the default charge. |
| `lineItemChargeId` | `String?` | A unique UUID identifier for the line item charge. |
| `name` | `String` | The name of the charge (e.g., "Sales Tax", "Shipping Fee"). |

