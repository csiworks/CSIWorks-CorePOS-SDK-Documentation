---
title: OrderConnector
sidebar_label: OrderConnector
slug: /connector/order-connector
---

# OrderConnector

```kotlin
class OrderConnector(context: Context) : ServiceConnector<…>
```

Connector for working with orders and their line items in the CorePOS application.

Provides synchronous access to order retrieval, adding fixed-price, per-unit and variable-price line items, updating and deleting line items, and managing line-item discounts. All methods must be called from a background thread.

Example — add a catalog item to the currently open order:

```kotlin
val orderConnector = OrderConnector(context)

lifecycleScope.launch(Dispatchers.IO) {
    val order = orderConnector.getActiveOrder() ?: return@launch
    val lineItem = orderConnector.addFixedPriceLineItem(
        orderId = order.orderId!!,
        itemId = itemId,
        devNotes = null,
        binName = null,
    )
}
```

**See also:**

- [Order](../order/order.md)
- [LineItem](../order/line-item.md)
- [InventoryConnector](inventory-connector.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS order service. |

## Functions

### addFixedPriceLineItem

```kotlin
fun addFixedPriceLineItem(
    orderId: String,
    itemId: String,
    devNotes: Map<String, String>?,
    binName: String?
): LineItem?
```

Adds a catalog item with a fixed price to an order.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the target [Order](../order/order.md). |
| `itemId` | UUID of the inventory item. |
| `devNotes` | optional free-form metadata attached to the line item. |
| `binName` | optional identifier used to group related line items within an order. |

**Returns:** the created [LineItem](../order/line-item.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### addFixedPriceLineItems

```kotlin
fun addFixedPriceLineItems(
    orderId: String,
    itemId: String,
    itemsNumber: Int,
    devNotes: Map<String, String>?,
    binName: String?
): List<LineItem>?
```

Adds several units of the same fixed-price catalog item to an order, producing one line item per unit.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the target [Order](../order/order.md). |
| `itemId` | UUID of the inventory item. |
| `itemsNumber` | number of line items to add. |
| `devNotes` | optional free-form metadata attached to the line items. |
| `binName` | optional identifier used to group related line items within an order. |

**Returns:** the created line items, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### addLineItemDiscount

```kotlin
fun addLineItemDiscount(
    orderId: String,
    lineItemId: String,
    discountName: String,
    amountType: AmountType,
    amount: Long
): Order?
```

Applies a discount to a specific line item of an order.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItemId` | UUID of the line item to discount. |
| `discountName` | display name of the discount. |
| `amountType` | whether [amount](#addlineitemdiscount) is a fixed amount or a percentage. |
| `amount` | discount value — smallest currency unit (e.g., cents) for fixed discounts, or percentage points for percentage discounts. |

**Returns:** the updated [Order](../order/order.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

**See also:**

- [AmountType](../inventory/amount-type.md)
- [OrderConnector.deleteLineItemDiscount](#deletelineitemdiscount)

### addPerUnitLineItem

```kotlin
fun addPerUnitLineItem(
    orderId: String,
    itemId: String,
    quantity: Double,
    devNotes: Map<String, String>?,
    binName: String?
): LineItem?
```

Adds an item sold by quantity (e.g., weight or units) to an order.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the target [Order](../order/order.md). |
| `itemId` | UUID of the inventory item. |
| `quantity` | quantity of the item to add. |
| `devNotes` | optional free-form metadata attached to the line item. |
| `binName` | optional identifier used to group related line items within an order. |

**Returns:** the created [LineItem](../order/line-item.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### addVariablePriceLineItem

```kotlin
fun addVariablePriceLineItem(
    orderId: String,
    itemId: String,
    cashPrice: Long,
    devNotes: Map<String, String>?,
    binName: String?
): LineItem?
```

Adds an item to an order with an explicitly specified cash price. Use for items whose price is not fixed in the catalog.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the target [Order](../order/order.md). |
| `itemId` | UUID of the inventory item. |
| `cashPrice` | price in the smallest currency unit (e.g., cents). |
| `devNotes` | optional free-form metadata attached to the line item. |
| `binName` | optional identifier used to group related line items within an order. |

**Returns:** the created [LineItem](../order/line-item.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### deleteLineItem

```kotlin
fun deleteLineItem(orderId: String, lineItemId: String)
```

Deletes a single line item from an order.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItemId` | UUID of the line item to delete. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### deleteLineItemDiscount

```kotlin
fun deleteLineItemDiscount(orderId: String, lineItemId: String, discountId: String): Order?
```

Removes a single discount from a line item.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItemId` | UUID of the line item. |
| `discountId` | UUID of the discount to remove. |

**Returns:** the updated [Order](../order/order.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### deleteLineItemDiscounts

```kotlin
fun deleteLineItemDiscounts(orderId: String, lineItemId: String, discountIds: List<String>): Order?
```

Removes multiple discounts from a line item in a single call.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItemId` | UUID of the line item. |
| `discountIds` | UUIDs of the discounts to remove. |

**Returns:** the updated [Order](../order/order.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### deleteLineItems

```kotlin
fun deleteLineItems(orderId: String, lineItemIds: List<String>)
```

Deletes multiple line items from an order in a single call.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItemIds` | UUIDs of the line items to delete. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getActiveOrder

```kotlin
fun getActiveOrder(): Order?
```

Retrieves the order currently open in the CorePOS register (cart).

**Returns:** the active [Order](../order/order.md), or `null` if there is none or on error.

### getOrder

```kotlin
fun getOrder(orderId: String): Order?
```

Retrieves an order by its identifier.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |

**Returns:** the matching [Order](../order/order.md), or `null` if not found or on error.

### updateLineItem

```kotlin
fun updateLineItem(orderId: String, lineItem: LineItem): LineItem?
```

Updates a single line item of an order.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItem` | line item with updated values; matched by its identifier. |

**Returns:** the updated [LineItem](../order/line-item.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### updateLineItems

```kotlin
fun updateLineItems(orderId: String, lineItems: List<LineItem>): List<LineItem>?
```

Updates multiple line items of an order in a single call.

| Parameter | Description |
|---|---|
| `orderId` | UUID of the [Order](../order/order.md). |
| `lineItems` | line items with updated values; matched by their identifiers. |

**Returns:** the updated line items, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

