---
id: order-api-introduction
sidebar_position: 1
title: Introduction
description: Introdaction of OrderController.
hide_title: true
pagination_prev: null
---

## Introduction

The `OrderConnector`provides methods to retrieve the active order, fetch an order by ID, add line items (variable price or per-unit), and delete line items in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

### Class Overview

```kotlin
class OrderConnector(context: Context) : ServiceConnector(context) {
    override fun getServiceInterface(iBinder: IBinder?): IOrderService =
        IOrderService.Stub.asInterface(iBinder)

    override val serviceClassName: String =
        "com.csiworks.corepos.background.service.order.OrderCommunicationService"

    fun getOrder(orderId: String): Order? = /* ... */
    fun getActiveOrder(): Order? = /* ... */

    fun addVariablePriceLineItem(
        orderId: String,
        itemId: String,
        cashPrice: Long,
        devNotes: Map<String, String>?
    ): LineItem? = /* ... */

    fun addPerUnitLineItem(
        orderId: String,
        itemId: String,
        quantity: Double,
        devNotes: Map<String, String>?
    ): LineItem? = /* ... */

    fun deleteLineItem(orderId: String, lineItemId: String) { /* ... */ }
}
```

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
- [`Delete Line Item`](order-api-delete-line-item) - Remove a line item from an order.
