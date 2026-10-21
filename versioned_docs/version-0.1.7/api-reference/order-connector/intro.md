---
id: order-api-introduction
sidebar_position: 1
title: Introduction
description: Overview of OrderConnector and its operations.
hide_title: true
pagination_prev: null
---

## Introduction

The `OrderConnector`provides methods to retrieve the active order, fetch an order by ID, add line items (variable price or per-unit), and delete line items in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

[`Quick Example:`](../../quick-start/quick-guide-examples#manage-orders) - Quick example of order managing

### OrderConnector Methods:

- [`Get Order`](get-order.md) - Retrieve a single order by its unique identifier.
- [`Get Active Order`](get-active-order.md) - Retrieve the order currently active in the POS session.
- [`Add Variable-Price Line Item`](add-variable-price-line-item.md) - Add an item to an order with a specified cash price (use when the item’s price is not fixed in catalog).
- [`Add Fixed-Price Line Item`](add-fixed-price-line-item.md) - Add a single fixed-price line item to an order.
- [`Add Per-Unit Line Item`](add-per-unit-line-item.md) - Add an item using quantity (e.g., weight/units) where pricing is determined by the catalog’s unit price.
- [`Add Fixed-Price Line Items`](add-fixed-price-line-items.md) - Add multiple fixed-price line items to an order in a single operation.
- [`Delete Line Item`](delete-line-item.md) - Remove a specific line item from an order.
- [`Add Line Item Discount`](add-line-item-discount.md) - Add a discount to a specific line item within an order.
- [`Delete Line Items`](delete-line-items.md) - Remove multiple line items from an order in a single operation.
- [`Delete Line Item Discount`](delete-line-item-discount.md) - Remove a specific discount from a line item within an order.
- [`Update Line Item`](update-line-item.md) - Update an existing line item in an order.
- [`Delete Line Item Discounts`](delete-line-item-discounts.md) - Remove multiple discounts from a line item within an order in a single operation.
- [`Update Line Items`](update-line-items.md) - Update multiple line items in an order with a single operation.

