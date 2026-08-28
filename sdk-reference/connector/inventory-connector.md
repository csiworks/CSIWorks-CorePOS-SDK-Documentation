---
title: InventoryConnector
sidebar_label: InventoryConnector
slug: /connector/inventory-connector
---

# InventoryConnector

```kotlin
class InventoryConnector(context: Context) : ServiceConnector<…>
```

Connector for managing the merchant's inventory in the CorePOS application: items, categories, charges, EBT flags, stock quantities and dual-pricing settings. All methods must be called from a background thread.

Example — load items of a category and update one item's stock:

```kotlin
val inventoryConnector = InventoryConnector(context)

lifecycleScope.launch(Dispatchers.IO) {
    val items = inventoryConnector.getItems() ?: emptyList()
    items.firstOrNull()?.itemId?.let { id ->
        inventoryConnector.updateItemStockQuantity(id, quantity = -1.0)
    }
}
```

**See also:**

- [Item](../inventory/item.md)
- [Category](../inventory/category.md)
- [Charge](../inventory/charge.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS inventory service. |

## Functions

### deleteCategory

```kotlin
fun deleteCategory(categoryId: String)
```

Deletes an inventory category.

| Parameter | Description |
|---|---|
| `categoryId` | UUID of the category to delete. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |
| `IllegalArgumentException` | if [categoryId](#deletecategory) is not a valid UUID. |

### deleteCharge

```kotlin
fun deleteCharge(chargeId: String)
```

Deletes a charge.

| Parameter | Description |
|---|---|
| `chargeId` | UUID of the charge to delete. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |
| `IllegalArgumentException` | if [chargeId](#deletecharge) is not a valid UUID. |

### deleteItem

```kotlin
fun deleteItem(itemId: String)
```

Deletes an inventory item.

| Parameter | Description |
|---|---|
| `itemId` | UUID of the item to delete. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |
| `IllegalArgumentException` | if [itemId](#deleteitem) is not a valid UUID. |

### getCategories

```kotlin
fun getCategories(): List<Category>?
```

Retrieves all inventory categories.

**Returns:** the list of categories, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getCategoriesWithCount

```kotlin
fun getCategoriesWithCount(): List<CategoryWithCount>?
```

Retrieves all categories together with the number of items in each.

**Returns:** the list of categories with item counts, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getCharges

```kotlin
fun getCharges(): List<Charge>?
```

Retrieves all charges (extra fees) defined in the inventory.

**Returns:** the list of charges, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getDualPriceRate

```kotlin
fun getDualPriceRate(): Float?
```

Retrieves the merchant's dual-pricing rate — the percentage difference between card and cash prices.

**Returns:** the dual price rate, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getItem

```kotlin
fun getItem(itemId: String): Item?
```

Retrieves a single inventory item by its identifier.

| Parameter | Description |
|---|---|
| `itemId` | UUID of the item. |

**Returns:** the [Item](../inventory/item.md), or `null` if not found or on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |
| `IllegalArgumentException` | if [itemId](#getitem) is not a valid UUID. |

### getItems

```kotlin
fun getItems(filter: ItemFilter? = null): List<Item>?
```

Retrieves inventory items, optionally filtered.

| Parameter | Description |
|---|---|
| `filter` | optional filter criteria; `null` returns all items. |

**Returns:** the matching items, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### getPagingItems

```kotlin
fun getPagingItems(filter: ItemFilter? = null, pageable: Pageable): ItemPageResult?
```

Retrieves a page of inventory items, optionally filtered.

| Parameter | Description |
|---|---|
| `filter` | optional filter criteria; `null` returns all items. |
| `pageable` | page number and size to fetch. |

**Returns:** the requested page of items, or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### saveCategory

```kotlin
fun saveCategory(category: Category): Category?
```

Creates or updates an inventory category.

| Parameter | Description |
|---|---|
| `category` | the category to save; a category with an existing identifier is updated. |

**Returns:** the saved [Category](../inventory/category.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### saveCharge

```kotlin
fun saveCharge(charge: Charge): Charge?
```

Creates or updates a charge. The charge's `chargeAmountType` must be a valid [AmountType](../inventory/amount-type.md) code, otherwise the call fails without reaching the service.

| Parameter | Description |
|---|---|
| `charge` | the charge to save; a charge with an existing identifier is updated. |

**Returns:** the saved [Charge](../inventory/charge.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

**See also:**

- [AmountType](../inventory/amount-type.md)

### saveItem

```kotlin
fun saveItem(item: Item, imageUri: String?): Item?
```

Creates or updates an inventory item. The item's `priceType` must be a valid [PriceType](../inventory/price-type.md) code, otherwise the call fails without reaching the service.

| Parameter | Description |
|---|---|
| `item` | the item to save; an item with an existing identifier is updated. |
| `imageUri` | optional URI of an image to attach to the item. |

**Returns:** the saved [Item](../inventory/item.md), or `null` on failure.

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

**See also:**

- [PriceType](../inventory/price-type.md)

### updateEbtFlags

```kotlin
fun updateEbtFlags(flags: Map<String, Boolean>)
```

Updates the EBT (Electronic Benefit Transfer) eligibility flags of multiple items.

| Parameter | Description |
|---|---|
| `flags` | map of item UUID to its new EBT eligibility flag. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |

### updateItemStockQuantity

```kotlin
fun updateItemStockQuantity(itemId: String, quantity: Double)
```

Changes an item's stock quantity by the given delta (positive to increase, negative to decrease).

| Parameter | Description |
|---|---|
| `itemId` | UUID of the item. |
| `quantity` | amount to change the stock quantity by. |

| Throws | When |
|---|---|
| `PermissionDeniedException` | if the calling app lacks authority. |
| `IllegalArgumentException` | if [itemId](#updateitemstockquantity) is not a valid UUID. |

