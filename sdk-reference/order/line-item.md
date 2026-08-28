---
title: LineItem
sidebar_label: LineItem
slug: /order/line-item
---

# LineItem

```kotlin
data class LineItem(
    val lineItemId: String? = null,
    val quantity: Double,
    val totalCash: Long?,
    val totalCard: Long?,
    val itemId: String? = null,
    val imagePath: String?,
    val thumbnailPath: String?,
    val name: String,
    val priceType: Int,
    val unitType: String?,
    val unitCash: Long?,
    val unitCard: Long?,
    val lineItemDiscounts: List<LineItemDiscount>,
    val lineItemTaxes: List<LineItemCharge>,
    val lineItemFees: List<LineItemCharge>,
    val lineItemPayment: String?,
    val isEBT: Boolean,
    val devNotes: Map<String, String>?,
    val binName: String?,
    val isTaxable: Boolean
) : Parcelable
```

Represents a purchased or selected item within an [Order](order.md) in the CorePOS SDK. A line item can be thought of as an item placed on the checkout conveyor belt at a store.

## Properties

| Name | Type | Description |
|---|---|---|
| `binName` | `String?` | A specific identifier for categorizing items in an order; the general name of a specific group of items united by some logic (e.g., "EBT Items"). |
| `devNotes` | `Map<String, String>?` | A map of developer notes or metadata for debugging and custom usage. |
| `imagePath` | `String?` | A path to the item's image. |
| `isEBT` | `Boolean` | A flag indicating whether the line item is eligible for Electronic Benefit Transfer (EBT). |
| `isTaxable` | `Boolean` | A flag indicating whether the line item is subject to taxes. |
| `itemId` | `String?` | A unique UUID identifier for the item; reference to the corresponding inventory Item. |
| `lineItemDiscounts` | `List<LineItemDiscount>` | A list of [LineItemDiscount](line-item-discount.md) applied to this line item. |
| `lineItemFees` | `List<LineItemCharge>` | A list of [LineItemCharge](line-item-charge.md) with a fixed amount type applied to this line item. |
| `lineItemId` | `String?` | A unique UUID identifier for the line item. |
| `lineItemPayment` | `String?` | A UUID identifier for the transaction associated with this line item. |
| `lineItemTaxes` | `List<LineItemCharge>` | A list of [LineItemCharge](line-item-charge.md) with a percentage amount type applied to this line item. |
| `name` | `String` | The name of the item. |
| `priceType` | `Int` | The type of pricing applied to this line item (see the inventory PriceType enum). |
| `quantity` | `Double` | The quantity of the item in the line item (supports fractional values). |
| `thumbnailPath` | `String?` | A path to the item's thumbnail image. |
| `totalCard` | `Long?` | The total card price for the line item (after adjustments), in cents. |
| `totalCash` | `Long?` | The total cash price for the line item (after adjustments), in cents. |
| `unitCard` | `Long?` | The card price per unit of the item, in cents. |
| `unitCash` | `Long?` | The cash price per unit of the item, in cents. |
| `unitType` | `String?` | The unit type for the item (e.g., `Lb`, `Oz`, `Kg`). |

