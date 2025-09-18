---
id: models-inventory
sidebar_position: 1
title: Inventory
description: Inventory models.
pagination_prev: null
hide_title: true
---

## Inventory Models

This section covers all inventory models (entities) used in the API

## Category
```kotlin
data class Category
```
The `Category` model represents a category in the inventory, containing the following fields:

### Values
- `categoryId`: A unique **UUID** identifier for the category.
- `name`: The name of the category.

## Charge
```kotlin
data class Charge
```
The `Charge` model represents taxes and fees associated with inventory items, containing the following fields:

### Values
- `chargeId`: A unique **UUID** identifier for the charge.
- `name`: The name of the charge (e.g., "Sales Tax", "Shipping Fee").
- `chargeAmountType`: The type of charge amount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount, such as a flat fee.  
  - **PERCENTAGE**, Represents a percentage, such as a tax rate.
- `amount`: The amount of the charge.  
  - If the type is **FIXED**, it's a specific amount.  
  - If it's **PERCENTAGE**, it represents the percentage value.
- `isDefault`: A flag indicating whether this charge is the default charge.

### Funcations
```kotlin
fun getAmountType(): AmountType?
```
Returns the AmountType enum value corresponding to the chargeAmountType field.
#### Parameters:
`None`
#### Returns:
`AmountType?` - The [**AmountType**](#amounttype-enum) enum value (FIXED or PERCENTAGE) based on chargeAmountType, or null if invalid

## Discount
```kotlin
data class Discount
```
The `Discount` model represents a discount applied to items in the inventory, containing the following fields:

### Values
- `discountId`: A unique **UUID** identifier for the discount.
- `name`: The name of the discount (e.g., "Holiday Sale").
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

## Item
```kotlin
data class Item
```
The `Item` model represents an inventory item, containing the following fields:

### Values
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
- `quantity`: The available stock quantity of the item.
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

### Functions
```kotlin
fun getPriceType(): PriceType?
```
Returns the PriceType enum value corresponding to the priceType field.
#### Parameters:
`None`
#### Returns:
`PriceType?` - The [**PriceType**](#pricetype-enum) enum value (FIXED, VARIABLE, or PER_UNIT) based on priceType, or null if invalid

## PriceType Enum
```kotlin
enum class PriceType
```
The `PriceType` enum defines the different types of pricing available for items:

### Values
- `FIXED (0)`: A fixed price for the item.
- `VARIABLE (1)`: A variable price for the item.
- `PER_UNIT (2)`: Price per unit of the item.

### Functions
```kotlin
companion object {
    infix fun from(code: Int): PriceType?
}
```
Returns the PriceType enum value corresponding to the provided code.
#### Parameters:
`code: Int` - The integer code representing the price type
#### Returns:
`PriceType?` - The corresponding PriceType enum value, or null if the code is invalid

## AmountType Enum
```kotlin
enum class AmountType
```
The `AmountType` enum defines the different types of charge amounts:

### Values
- `FIXED (0)`: A fixed amount charge, such as a flat fee.
- `PERCENTAGE (1)`: A percentage-based charge, such as a tax rate.

### Functions
```kotlin
companion object {
    infix fun from(code: Int): AmountType?
}
```
Returns the AmountType enum value corresponding to the provided code.
#### Parameters:
`code: Int` - The integer code representing the amount type
#### Returns:
`AmountType?` - The corresponding AmountType enum value, or null if the code is invalid

## EbtFlag
```kotlin
data class EbtFlag
```
The `EbtFlag` model represents EBT (Electronic Benefit Transfer) eligibility status for an inventory item, containing the following fields:

### Values
- `itemId`: A unique **UUID** identifier for the item.
- `isEbt`: A flag indicating whether the item is eligible for EBT.

### Functions
```kotlin
companion object {
    fun mapToList(flagsMap: Map<String, Boolean>): List<EbtFlag>
}
```
Converts a map of item IDs and EBT flags to a list of EbtFlag objects.
#### Parameters:
`flagsMap: Map<String, Boolean>` - A map where keys are item IDs and values are EBT eligibility flags
#### Returns:
`List<EbtFlag>` - A list of EbtFlag objects created from the input map

## ItemFilter
```kotlin
data class ItemFilter
```
The `ItemFilter` model is used to filter items when retrieving a list from the inventory. It contains the following fields:

### Values
- `nameQuery`: Filter items by name containing this query (optional)  
- `categoryId`: Filter by a specific category **UUID** (optional)  
- `withoutCategory`: If true, includes only items without a category  
- `filterByEbt`: Filter items by EBT eligibility status (optional)  
- `productCode`: Filter items by product code (optional)