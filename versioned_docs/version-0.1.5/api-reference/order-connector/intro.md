---
id: order-api-introduction
sidebar_position: 1
title: Introduction
description: Introduction of OrderСonnector.
hide_title: true
pagination_prev: null
---

## Introduction
### Class Overview

```kotlin
class OrderConnector(context: Context)
```

The `OrderConnector`provides methods to retrieve the active order, fetch an order by ID, add line items (variable price or per-unit), and delete line items in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

**Purpose:** Manage order operations: fetch orders, add line items, and delete line items.
[`Quick Example:`](../../quick-start/quick-guide-examples#manage-orders) - Quick example of order managing

### Initialization:

```kotlin
val orderConnector = OrderConnector(context)
```

### Methods:
- [`Get Order`](order-api-get-order) - Retrieve a single order by its ID.
- [`Get Active Order`](order-api-get-active-order) - Retrieve the currently active order.
- [`Add Variable-Price Line Item`](order-api-add-variable-price-line-item) - Add a line item priced by explicit cash amount.
- [`Add Per-Unit Line Item`](order-api-add-per-unit-line-item) - Add a line item priced by unit and quantity.
- [`Add Fixed-Price Line Item`](order-api-add-fixed-price-line-item) - Add a single fixed-price line item.
- [`Add Fixed-Price Line Items`](order-api-add-fixed-price-line-items) - Add multiple fixed-price line items at once.
- [`Delete Line Item`](order-api-delete-line-item) - Remove a line item from an order.
- [`Delete Line Items`](order-api-delete-line-items) - Remove multiple line items from an order.
- [`Update Line Item`](order-api-update-line-item) - Update an existing line item in an order.
- [`Update Line Items`](order-api-update-line-items) - Update multiple line items in an order.
- [`Add Line Item Discount`](order-api-add-line-item-discount) - Add a discount to a specific line item.
- [`Delete Line Item Discount`](order-api-delete-line-item-discount) - Remove a specific discount from a line item.
- [`Delete Line Item Discounts`](order-api-delete-line-item-discounts) - Remove multiple discounts from a line item.
