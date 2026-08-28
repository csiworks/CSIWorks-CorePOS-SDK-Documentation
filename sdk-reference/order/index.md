---
title: com.coreposnow.sdk.order
sidebar_label: order
sidebar_position: 3
---

# com.coreposnow.sdk.order

| Type | Description |
|---|---|
| [Employee](employee.md) | Represents an employee record in the CorePOS SDK, containing identifying and contact information. Used on [Order](order.md) and [Transaction](transaction.md) to indicate the employee who carried out or processed the operation. |
| [LineItem](line-item.md) | Represents a purchased or selected item within an [Order](order.md) in the CorePOS SDK. A line item can be thought of as an item placed on the checkout conveyor belt at a store. |
| [LineItemBuilder](line-item-builder.md) | Builder class for creating and modifying [LineItem](line-item.md) objects in the CorePOS SDK. Provides a fluent API for constructing LineItem instances with proper validation. |
| [LineItemCharge](line-item-charge.md) | Represents a tax or fee applied to a single [LineItem](line-item.md) in the CorePOS SDK. Charges with a percentage amount type are treated as taxes, while charges with a fixed amount type are treated as fees. |
| [LineItemDiscount](line-item-discount.md) | Represents a discount applied to a single [LineItem](line-item.md) in the CorePOS SDK. |
| [LineItemUtils](line-item-utils.md) | Utility object providing common operations for [LineItem](line-item.md) objects in the CorePOS SDK. Each function returns a new, immutable [LineItem](line-item.md) copy built via [LineItemBuilder](line-item-builder.md); the original line item is never modified. |
| [Order](order.md) | Represents an order in the CorePOS SDK, aggregating its line items, discounts, totals, transactions, and state. Orders are the central entity exchanged between CorePOS and 3rd-party applications. |
| [OrderDiscount](order-discount.md) | Represents a discount applied at the order level (as opposed to line-item level) in the CorePOS SDK. |
| [Transaction](transaction.md) | Represents a financial operation related to an [Order](order.md) in the CorePOS SDK, such as a sale, void, or refund. |
| [ValidationResult](validation-result.md) | Represents the result of validation operations performed by [LineItemUtils](line-item-utils.md). |
