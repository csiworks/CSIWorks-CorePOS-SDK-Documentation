---
title: Item
sidebar_label: Item
slug: /inventory/item
---

# Item

```kotlin
data class Item(
    val itemId: String? = null,
    val name: String,
    val imagePath: String?,
    val thumbnailPath: String?,
    val unitCash: Long?,
    val unitCard: Long?,
    val priceType: Int,
    val unitType: String?,
    val charges: List<Charge>,
    val categories: List<Category>?,
    val productCode: String?,
    val itemCost: Long?,
    val stockQuantity: Double?,
    val trackInventory: Boolean,
    val dualPricingBasePriceType: Int,
    val isEBT: Boolean,
    val isAvailable: Boolean
) : Parcelable
```

Represents an inventory item in the CorePOS SDK. Items are the central entity of the inventory API and carry pricing, categorization, charge, and stock information.

When `dualPricingBasePriceType` = 0 (CASH), the base price is the cash price and the card price is derived from it using the dual-pricing rate; when it is 1 (CARD), the base price is the card price and the cash price is derived from it. The base price remains unchanged when the dual-pricing rate is updated — only its counterpart price changes.

## Properties

| Name | Type | Description |
|---|---|---|
| `categories` | `List<Category>?` | A list of [Category](category.md) the item belongs to. |
| `charges` | `List<Charge>` | A list of [Charge](charge.md) associated with the item (e.g., taxes or fees). |
| `dualPricingBasePriceType` | `Int` | The base price type for dual pricing: `CASH (0)` or `CARD (1)`. |
| `imagePath` | `String?` | A path to the item's image. |
| `isAvailable` | `Boolean` | A flag indicating whether the item is available. |
| `isEBT` | `Boolean` | A flag indicating whether the item is eligible for Electronic Benefit Transfer (EBT). |
| `itemCost` | `Long?` | The cost of the item. |
| `itemId` | `String?` | A unique UUID identifier for the item. |
| `name` | `String` | The name of the item. |
| `priceType` | `Int` | The type of pricing for the item as an integer code. See [PriceType](price-type.md). |
| `productCode` | `String?` | The product code for the item. |
| `stockQuantity` | `Double?` | The available stock quantity of the item. |
| `thumbnailPath` | `String?` | A path to the item's thumbnail image. |
| `trackInventory` | `Boolean` | A flag indicating whether inventory tracking is enabled for this item; allows the item quantity to update dynamically when sales occur. |
| `unitCard` | `Long?` | The card price for the item. |
| `unitCash` | `Long?` | The cash price for the item. |
| `unitType` | `String?` | The unit type of the item. Can be: `Lb`, `Oz`, `Kg`. |

## Functions

### getPriceType

```kotlin
fun getPriceType(): PriceType?
```

Returns the [PriceType](price-type.md) enum value corresponding to the priceType field.

**Returns:** The [PriceType](price-type.md) enum value (FIXED, VARIABLE, or PER_UNIT) based on priceType, or null if invalid.

