---
id: inventory-api-introduction
sidebar_position: 1
title: Introduction
description: Overview of InventoryConnector and its operations.
hide_title: true
pagination_prev: null
---

## Introduction

The `InventoryConnector` provides methods to manage inventory items, categories, and related operations in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

[`Quick Example:`](../../quick-start/quick-guide-examples#retrieve-inventory-items) - Quick example of retrieve inventory items

### InventoryConnector Methods:

- [`Get Item`](get-item.md) - Fetch detailed information for a specific inventory item.
- [`Get Items`](get-items.md) - Retrieves a list of inventory items with optional filtering. Fetch all items or a filtered subset from the inventory system.
- [`Save Item`](save-item.md) - Persist inventory item data to the system, including optional image attachment.
- [`Delete Item`](delete-item.md) - Permanently delete an inventory item by its ID.
- [`Get Categories`](get-categories.md) - Fetch the complete list of categories for organizing inventory items.
- [`Update EBT Flags`](update-ebt-flags.md) - Update EBT (Electronic Benefit Transfer) eligibility flags for multiple inventory items in a single operation.
- [`Get Charges`](get-charges.md) - Fetch the complete list of charges (taxes and fees) available in the system.
- [`Save Charge`](save-charge.md) - Persist charge (tax/fee) data to the system.
- [`Delete Charge`](delete-charge.md) - Permanently delete a charge (tax/fee) by its ID.
- [`Save Category`](save-category.md) - Persist category data to the system.
- [`Delete Category`](delete-category.md) - Permanently delete a category by its ID.
- [`Update Item Stock Quantity`](update-item-stock-quantity.md) - Update the stock quantity for a specific inventory item.
- [`Get Dual Price Rate`](get-dual-price-rate.md) - Fetch the current dual pricing rate used for calculating card vs cash pricing.
- [`Get Categories With Count`](get-categories-with-count.md) - Retrieve a list of categories along with the number of items assigned to each category.
- [`Get Paging Items`](get-paging-items.md) - Retrieves a paginated list of inventory items with optional filtering.

