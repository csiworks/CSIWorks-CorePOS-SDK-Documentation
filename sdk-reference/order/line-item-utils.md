---
title: LineItemUtils
sidebar_label: LineItemUtils
slug: /order/line-item-utils
---

# LineItemUtils

```kotlin
object LineItemUtils
```

Utility object providing common operations for [LineItem](line-item.md) objects in the CorePOS SDK. Each function returns a new, immutable [LineItem](line-item.md) copy built via [LineItemBuilder](line-item-builder.md); the original line item is never modified.

## Functions

### addDevNote

```kotlin
fun addDevNote(lineItem: LineItem, key: String, value: String): LineItem
```

Adds or updates a developer note.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `key` | The note key |
| `value` | The note value |

**Returns:** A new LineItem with the updated developer notes

### addDiscount

```kotlin
fun addDiscount(
    lineItem: LineItem,
    discountName: String,
    discountAmount: Long,
    discountType: Int
): LineItem
```

Adds a discount to a line item.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `discountName` | The name of the discount |
| `discountAmount` | The discount amount in cents |
| `discountType` | The type of discount (use appropriate constants) |

**Returns:** A new LineItem with the added discount

### addTax

```kotlin
fun addTax(lineItem: LineItem, taxName: String, taxAmount: Long, chargeAmountType: Int): LineItem
```

Adds a tax to a line item.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `taxName` | The name of the tax |
| `taxAmount` | The tax amount in cents |
| `chargeAmountType` | The type of charge (use appropriate constants) |

**Returns:** A new LineItem with the added tax

### createUpdateCopy

```kotlin
fun createUpdateCopy(lineItem: LineItem): LineItem
```

Creates a copy of a line item with minimal required fields for updates. This is useful when you only want to update specific fields and let the system preserve other values.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item |

**Returns:** A new LineItem with only the essential fields for updates

### removeDevNote

```kotlin
fun removeDevNote(lineItem: LineItem, key: String): LineItem
```

Removes a developer note.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `key` | The note key to remove |

**Returns:** A new LineItem with the developer note removed

### removeDiscount

```kotlin
fun removeDiscount(lineItem: LineItem, discountName: String): LineItem
```

Removes a discount from a line item by name.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `discountName` | The name of the discount to remove |

**Returns:** A new LineItem with the discount removed

### updateEBTStatus

```kotlin
fun updateEBTStatus(lineItem: LineItem, isEBT: Boolean): LineItem
```

Updates a line item's EBT status.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `isEBT` | The new EBT status |

**Returns:** A new LineItem with the updated EBT status

### updateName

```kotlin
fun updateName(lineItem: LineItem, newName: String): LineItem
```

Updates a line item's name.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `newName` | The new name |

**Returns:** A new LineItem with the updated name

### updateQuantity

```kotlin
fun updateQuantity(lineItem: LineItem, newQuantity: Double): LineItem
```

Updates a line item's quantity and recalculates totals.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `newQuantity` | The new quantity |

**Returns:** A new LineItem with updated quantity and recalculated totals

### updateUnitPrice

```kotlin
fun updateUnitPrice(lineItem: LineItem, newUnitPrice: Long): LineItem
```

Updates a line item's price and recalculates totals.

| Parameter | Description |
|---|---|
| `lineItem` | The original line item to modify |
| `newUnitPrice` | The new unit price in cents |

**Returns:** A new LineItem with updated price and recalculated totals

### validateForUpdate

```kotlin
fun validateForUpdate(lineItem: LineItem): ValidationResult
```

Validates if a line item can be updated. Checks for required fields that are necessary for updates.

| Parameter | Description |
|---|---|
| `lineItem` | The line item to validate |

**Returns:** A validation result with any errors

