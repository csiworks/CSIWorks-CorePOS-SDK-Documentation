---
title: Discount
sidebar_label: Discount
slug: /inventory/discount
---

# Discount

```kotlin
data class Discount(
    val discountId: String?,
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

Represents a discount applied to items in the CorePOS inventory.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The discount amount. |
| `discountId` | `String?` | A unique UUID identifier for the discount. |
| `discountType` | `Int` | The type of discount as an integer code: `FIXED (0)` for a fixed amount discount or `PERCENTAGE (1)` for a percentage discount. |
| `isActive` | `Boolean` | A flag indicating whether the discount is currently active. |
| `name` | `String` | The name of the discount (e.g., "Holiday Sale"). |

