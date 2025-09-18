---
id: inventory-api-introduction
sidebar_position: 1
title: Introduction
description: Introdaction of InventoryController.
hide_title: true
pagination_prev: null
---

## Introduction

The `InventoryConnector` provides methods to manage inventory items, categories, and related operations in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

### Class Overview

```kotlin
class InventoryConnector(context: Context) : ServiceConnector<IInventoryService>(context) {

    override fun getServiceInterface(iBinder: IBinder?): IInventoryService { /* ... */ }

    fun getItems(filter: ItemFilter? = null): List<Item>? = /* ... */

    fun getItem(itemId: String): Item? = /* ... */

    fun getCategories(): List<Category>? = /* ... */

    fun saveItem(item: Item, imageUri: String?): Item? = /* ... */

    fun deleteItem(itemId: String) = /* ... */

    fun getCharges(): List<Charge>? = /* ... */

    fun saveCharge(charge: Charge): Charge? = /* ... */

    fun deleteCharge(chargeId: String) = /* ... */

    fun saveCategory(category: Category): Category? = /* ... */

    fun deleteCategory(categoryId: String) = /* ... */

    fun updateItemquantity(itemId: String, quantity: Double) = /* ... */

    fun getDualPriceRate(): Float? = /* ... */

    fun updateEbtFlags(flags: Map<String, Boolean>) = /* ... */
}
```

**Purpose:** Manages inventory operations including retrieving, creating, updating, and deleting items and categories.
[`Quick Example:`](../../quick-start/quick-guide-examples#retrieve-inventory-items) - Quick example of retrieve inventory items

### Initialization:

```kotlin
val inventoryConnector = InventoryConnector(context)
```

### Methods:
- [`Get Item`](inventory-api-get-item) - Retrieves a single inventory item by its ID.
- [`Get Items`](inventory-api-get-items) - Retrieves a list of items.
- [`Save Item`](inventory-api-save-item) - Creates a new inventory item or updates an existing one.
- [`Delete Item`](inventory-api-delete-item) - Removes an inventory item from the system.
- [`Get Categories`](inventory-api-get-categories) - Retrieves all available inventory categories.
- [`Get Charges`](inventory-api-get-charges) - Retrieves all available charges (taxes and fees).
- [`Save Charge`](inventory-api-save-charge) - Creates a new charge or updates an existing one.
- [`Delete Charge`](inventory-api-delete-charge) - Removes a charge from the system.
- [`Save Category`](inventory-api-save-category) - Creates a new category or updates an existing one.
- [`Delete Category`](inventory-api-delete-category) - Removes a category from the system.
- [`Update Item Stock Quantity`](inventory-api-update-item-stock-quantity) - Updates the stock quantity for an item.
- [`Get Dual Price Rate`](inventory-api-get-dual-price-rate) - Retrieves the current dual pricing rate.
- [`Update EBT Flags`](inventory-api-update-ebt-flags) - Updates EBT eligibility flags for multiple items.