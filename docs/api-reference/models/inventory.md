---
id: models-inventory
sidebar_position: 1
title: Inventory
description: Inventory models.
pagination_prev: null
hide_title: true
---

## Inventory models

This section covers all inventory  models (entities) used in the API

### Category

The `Category` model represents a category in the inventory, containing the following fields:

- `categoryId`: A unique **UUID** identifier for the category.
- `name`: The name of the category.

```kotlin
@Parcelize
data class Category(
    val categoryId: String?,
    val name: String?
) : Parcelable
```

### Charge

The `Charge` model represents taxes and fees associated with inventory items, containing the following fields:

- `chargeId`: A unique **UUID** identifier for the charge.
- `name`: The name of the charge (e.g., "Sales Tax", "Shipping Fee").
- `chargeAmountType`: The type of charge amount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount, such as a flat fee.  
  - **PERCENTAGE**, Represents a percentage, such as a tax rate.
- `amount`: The amount of the charge.  
  - If the type is **FIXED**, it's a specific amount.  
  - If it's **PERCENTAGE**, it represents the percentage value.
- `isDefault`: A flag indicating whether this charge is the default charge.

```kotlin
@Parcelize
data class Charge(
    val chargeId: String?,
    val name: String,
    val chargeAmountType: Int,
    val amount: Long,
    val isDefault: Boolean
) : Parcelable
```

### Discount

The `Discount` model represents a discount applied to items in the inventory, containing the following fields:

- `discountId`: A unique **UUID** identifier for the discount.
- `name`: The name of the discount (e.g., "Holiday Sale").
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

```kotlin
@Parcelize
data class Discount(
    val discountId: String?,
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

### Item

The `Item` model represents an inventory item, containing the following fields:

- `itemId`: A unique **UUID** identifier for the item.
- `name`: The name of the item.
- `imagePath`: A path to the item's image.
- `thumbnailPath`: A path to the item's thumbnail image.
- `unitCash`: The cash price for the item.
- `unitCard`: The card price for the item.
- `priceType`: [**PriceType**](#pricetype-enum), the type of pricing for the item. 
- `unitType`: The unit type of the item. Can be: `Lb (Lb)`, `Oz (Oz)`, `Kg (Kg)`.
- `charges`: A list of [**Charge**](#charge), a list of charges associated with the item (e.g., taxes or fees).
- `categories`: A list of [**Category**](#category), a list of categories the item belongs to.
- `productCode`: The product code for the item.
- `itemCost`: The cost of the item.
- `quantity`: The available quantity of the item.
- `trackInventory`: A flag indicating whether inventory tracking is enabled for this item.
  - Allows the item quantity to update dynamically when sales occur.
- `dualPricingBasePriceType`: The base price type for dual pricing. Can be: `CASH (0)`, `CARD (1)`.
- `isEBT`: A flag indicating whether the item is eligible for Electronic Benefit Transfer (EBT).
- `isAvailable`: A flag indicating whether the item is available.

:::info Dual pricing introduction
If `dualPricingBasePriceType` = 0 (**CASH**), then the base price is the **cash price**, and the **card** price is based on the CASH price with **dualPricing**  
Else if `dualPricingBasePriceType` = 1 (**CARD**), then the base price is the **card price**, and the **cash** price is based on the CARD price with **dualPricing**

#### Important clarification
The base price remains **unchanged**, when the `dualPricing` rate is updated  
Only its counterpart price will change, depending on which price type is set as the base  

This means the item behaves as follows when `dualPricing` changes
- If the base price = CASH → only the CARD price is updated  
- If the base price = CARD → only the CASH price is updated  
:::

```kotlin
@Parcelize
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
    val quantity: Int?,
    val trackInventory: Boolean,
    val dualPricingBasePriceType: Int,
    val isEBT: Boolean,
    val isAvailable: Boolean
) : Parcelable {

    fun getPriceType(): PriceType? {
        return PriceType from priceType
    }
}
```

### PriceType Enum

The `PriceType` enum defines the different types of pricing available for items:

- `FIXED (0)`: A fixed price for the item.
- `VARIABLE (1)`: A variable price for the item.
- `PER_UNIT (2)`: Price per unit of the item.

```kotlin
enum class PriceType(val code: Int) {
    FIXED(0),
    VARIABLE(1),
    PER_UNIT(2);

    companion object {
        infix fun from(code: Int): PriceType? = entries.associateBy { it.code }[code]
    }
}
```

### ItemFilter

The `ItemFilter` model is used to filter items when retrieving a list from the inventory. It contains the following fields:

- `categoryId`: Filter by a specific category **UUID** (optional)  
- `withoutCategory`: If true, includes only items without a category  
- `nameQuery`: Filter items by name containing this query (optional)  
- `productCode`: Filter items by product code (optional)  

```kotlin
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class ItemFilter(
    val categoryId: String? = null,
    val withoutCategory: Boolean = false,
    val nameQuery: String? = null,
    val productCode: String? = null
) : Parcelable
```