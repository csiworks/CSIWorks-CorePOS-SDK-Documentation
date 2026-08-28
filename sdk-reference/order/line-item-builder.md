---
title: LineItemBuilder
sidebar_label: LineItemBuilder
---

# LineItemBuilder

```kotlin
class LineItemBuilder
```

Builder class for creating and modifying [LineItem](line-item.md) objects in the CorePOS SDK. Provides a fluent API for constructing LineItem instances with proper validation.

```kotlin
val lineItem = LineItemBuilder.create()
    .setName("Espresso")
    .setItemId(itemId)
    .setQuantity(2.0)
    .setUnitCash(350L)   // $3.50 in cents
    .setUnitCard(365L)
    .build()
```

Use [buildOrNull](#buildornull) instead of [build](#build) to get `null` rather than an exception when the configured state is invalid.

**See also:**

- [LineItem](line-item.md)
- [OrderConnector](../connector/order-connector.md)

## Functions

### addDevNote

```kotlin
fun addDevNote(key: String, value: String): LineItemBuilder
```

Adds or updates a developer note.

| Parameter | Description |
|---|---|
| `key` | The note key |
| `value` | The note value |

**Returns:** This builder for chaining

### addDiscount

```kotlin
fun addDiscount(discount: LineItemDiscount): LineItemBuilder
```

Adds a discount to the line item.

| Parameter | Description |
|---|---|
| `discount` | The discount to add |

**Returns:** This builder for chaining

### addFee

```kotlin
fun addFee(fee: LineItemCharge): LineItemBuilder
```

Adds a fee (fixed charge) to the line item.

| Parameter | Description |
|---|---|
| `fee` | The fee to add |

**Returns:** This builder for chaining

### addTax

```kotlin
fun addTax(tax: LineItemCharge): LineItemBuilder
```

Adds a tax (percentage charge) to the line item.

| Parameter | Description |
|---|---|
| `tax` | The tax to add |

**Returns:** This builder for chaining

### build

```kotlin
fun build(): LineItem
```

Builds and validates the [LineItem](line-item.md).

**Returns:** The constructed LineItem

| Throws | When |
|---|---|
| `IllegalArgumentException` | if required fields are missing or invalid |

### buildOrNull

```kotlin
fun buildOrNull(): LineItem?
```

Builds the [LineItem](line-item.md), returning null instead of throwing on validation failure.

**Returns:** The constructed LineItem, or null if the current builder state is invalid

### clearDevNotes

```kotlin
fun clearDevNotes(): LineItemBuilder
```

Removes all developer notes from the line item.

**Returns:** This builder for chaining

### clearDiscounts

```kotlin
fun clearDiscounts(): LineItemBuilder
```

Removes all discounts from the line item.

**Returns:** This builder for chaining

### clearFees

```kotlin
fun clearFees(): LineItemBuilder
```

Removes all fees from the line item.

**Returns:** This builder for chaining

### clearTaxes

```kotlin
fun clearTaxes(): LineItemBuilder
```

Removes all taxes from the line item.

**Returns:** This builder for chaining

### getValidationErrors

```kotlin
fun getValidationErrors(): List<String>
```

Returns the validation errors for the current builder state without throwing exceptions.

**Returns:** A list of validation error messages; empty if the state is valid

### isValid

```kotlin
fun isValid(): Boolean
```

Checks whether the current builder state would produce a valid [LineItem](line-item.md).

**Returns:** `true` if the current state is valid, `false` otherwise

### removeDevNote

```kotlin
fun removeDevNote(key: String): LineItemBuilder
```

Removes a developer note by key.

| Parameter | Description |
|---|---|
| `key` | The note key to remove |

**Returns:** This builder for chaining

### removeDiscount

```kotlin
fun removeDiscount(discountId: String): LineItemBuilder
```

Removes all discounts with the given line item discount ID.

| Parameter | Description |
|---|---|
| `discountId` | The ID of the discount(s) to remove |

**Returns:** This builder for chaining

### removeFee

```kotlin
fun removeFee(feeId: String): LineItemBuilder
```

Removes all fees with the given line item charge ID.

| Parameter | Description |
|---|---|
| `feeId` | The ID of the fee(s) to remove |

**Returns:** This builder for chaining

### removeTax

```kotlin
fun removeTax(taxId: String): LineItemBuilder
```

Removes all taxes with the given line item charge ID.

| Parameter | Description |
|---|---|
| `taxId` | The ID of the tax(es) to remove |

**Returns:** This builder for chaining

### setBinName

```kotlin
fun setBinName(binName: String?): LineItemBuilder
```

Sets the category identifier for grouping items in an order (e.g., "EBT Items").

| Parameter | Description |
|---|---|
| `binName` | The bin name, or null if none |

**Returns:** This builder for chaining

### setDevNotes

```kotlin
fun setDevNotes(devNotes: Map<String, String>): LineItemBuilder
```

Replaces the map of developer notes or metadata for debugging and custom usage.

| Parameter | Description |
|---|---|
| `devNotes` | The developer notes to set |

**Returns:** This builder for chaining

### setEBT

```kotlin
fun setEBT(isEBT: Boolean): LineItemBuilder
```

Sets whether the line item is eligible for Electronic Benefit Transfer (EBT).

| Parameter | Description |
|---|---|
| `isEBT` | The EBT eligibility flag |

**Returns:** This builder for chaining

### setImagePath

```kotlin
fun setImagePath(imagePath: String?): LineItemBuilder
```

Sets the path to the item's image.

| Parameter | Description |
|---|---|
| `imagePath` | The image path, or null if none |

**Returns:** This builder for chaining

### setItemId

```kotlin
fun setItemId(itemId: String?): LineItemBuilder
```

Sets the unique UUID identifier of the referenced inventory item.

| Parameter | Description |
|---|---|
| `itemId` | The inventory item ID, or null if not linked to inventory |

**Returns:** This builder for chaining

### setLineItemDiscounts

```kotlin
fun setLineItemDiscounts(lineItemDiscounts: List<LineItemDiscount>): LineItemBuilder
```

Replaces the list of discounts applied to this line item.

| Parameter | Description |
|---|---|
| `lineItemDiscounts` | The discounts to apply |

**Returns:** This builder for chaining

### setLineItemFees

```kotlin
fun setLineItemFees(lineItemFees: List<LineItemCharge>): LineItemBuilder
```

Replaces the list of fees (fixed charges) applied to this line item.

| Parameter | Description |
|---|---|
| `lineItemFees` | The fees to apply |

**Returns:** This builder for chaining

### setLineItemId

```kotlin
fun setLineItemId(lineItemId: String?): LineItemBuilder
```

Sets the unique UUID identifier for the line item.

| Parameter | Description |
|---|---|
| `lineItemId` | The line item ID, or null for a new line item |

**Returns:** This builder for chaining

### setLineItemPayment

```kotlin
fun setLineItemPayment(lineItemPayment: String?): LineItemBuilder
```

Sets the UUID identifier of the transaction associated with this line item.

| Parameter | Description |
|---|---|
| `lineItemPayment` | The associated transaction ID, or null if none |

**Returns:** This builder for chaining

### setLineItemTaxes

```kotlin
fun setLineItemTaxes(lineItemTaxes: List<LineItemCharge>): LineItemBuilder
```

Replaces the list of taxes (percentage charges) applied to this line item.

| Parameter | Description |
|---|---|
| `lineItemTaxes` | The taxes to apply |

**Returns:** This builder for chaining

### setName

```kotlin
fun setName(name: String): LineItemBuilder
```

Sets the name of the item.

| Parameter | Description |
|---|---|
| `name` | The item name (required, must not be blank at build time) |

**Returns:** This builder for chaining

### setPriceType

```kotlin
fun setPriceType(priceType: Int): LineItemBuilder
```

Sets the type of pricing applied to this line item (see the inventory PriceType enum).

| Parameter | Description |
|---|---|
| `priceType` | The price type code (must be non-negative) |

**Returns:** This builder for chaining

### setQuantity

```kotlin
fun setQuantity(quantity: Double): LineItemBuilder
```

Sets the quantity of the item (supports fractional values).

| Parameter | Description |
|---|---|
| `quantity` | The item quantity |

**Returns:** This builder for chaining

### setTaxable

```kotlin
fun setTaxable(taxable: Boolean): LineItemBuilder
```

Sets whether the line item is subject to taxes.

| Parameter | Description |
|---|---|
| `taxable` | The tax eligibility flag |

**Returns:** This builder for chaining

### setThumbnailPath

```kotlin
fun setThumbnailPath(thumbnailPath: String?): LineItemBuilder
```

Sets the path to the item's thumbnail image.

| Parameter | Description |
|---|---|
| `thumbnailPath` | The thumbnail image path, or null if none |

**Returns:** This builder for chaining

### setTotalCard

```kotlin
fun setTotalCard(totalCard: Long?): LineItemBuilder
```

Sets the total card price for the line item, in cents.

| Parameter | Description |
|---|---|
| `totalCard` | The total card price, or null if not set |

**Returns:** This builder for chaining

### setTotalCash

```kotlin
fun setTotalCash(totalCash: Long?): LineItemBuilder
```

Sets the total cash price for the line item, in cents.

| Parameter | Description |
|---|---|
| `totalCash` | The total cash price, or null if not set |

**Returns:** This builder for chaining

### setUnitCard

```kotlin
fun setUnitCard(unitCard: Long?): LineItemBuilder
```

Sets the card price per unit of the item, in cents.

| Parameter | Description |
|---|---|
| `unitCard` | The card price per unit, or null if not set |

**Returns:** This builder for chaining

### setUnitCash

```kotlin
fun setUnitCash(unitCash: Long?): LineItemBuilder
```

Sets the cash price per unit of the item, in cents.

| Parameter | Description |
|---|---|
| `unitCash` | The cash price per unit, or null if not set |

**Returns:** This builder for chaining

### setUnitType

```kotlin
fun setUnitType(unitType: String?): LineItemBuilder
```

Sets the unit type for the item (e.g., `Lb`, `Oz`, `Kg`).

| Parameter | Description |
|---|---|
| `unitType` | The unit type, or null if not applicable |

**Returns:** This builder for chaining

