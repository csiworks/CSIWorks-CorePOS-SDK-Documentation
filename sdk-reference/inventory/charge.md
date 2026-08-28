---
title: Charge
sidebar_label: Charge
slug: /inventory/charge
---

# Charge

```kotlin
data class Charge(
    val chargeId: String?,
    val name: String,
    val chargeAmountType: Int,
    val amount: Long,
    val isDefault: Boolean
) : Parcelable
```

Represents taxes and fees associated with inventory items in the CorePOS SDK, such as the charges attached to an [Item](item.md) via [Item.charges](item.md).

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The amount of the charge. If the type is FIXED, it is a specific amount; if PERCENTAGE, it represents the percentage value. |
| `chargeAmountType` | `Int` | The type of charge amount as an integer code: `FIXED (0)` or `PERCENTAGE (1)`. See [AmountType](amount-type.md). |
| `chargeId` | `String?` | A unique UUID identifier for the charge. |
| `isDefault` | `Boolean` | A flag indicating whether this charge is the default charge. |
| `name` | `String` | The name of the charge (e.g., "Sales Tax", "Shipping Fee"). |

## Functions

### getAmountType

```kotlin
fun getAmountType(): AmountType?
```

Returns the [AmountType](amount-type.md) enum value corresponding to the chargeAmountType field.

**Returns:** The [AmountType](amount-type.md) enum value (FIXED or PERCENTAGE) based on chargeAmountType, or null if invalid.

