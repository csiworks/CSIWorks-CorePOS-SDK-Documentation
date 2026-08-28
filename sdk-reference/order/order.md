---
title: Order
sidebar_label: Order
slug: /order/order
---

# Order

```kotlin
data class Order(
    val orderId: String?,
    val customerId: String?,
    val items: List<LineItem>,
    val cashSubtotal: Long?,
    val cardSubtotal: Long?,
    val ebtSubtotal: Long,
    val orderDiscounts: List<OrderDiscount>?,
    val cashTax: Long?,
    val cardTax: Long?,
    val tipAmount: Long,
    val fee: Long,
    val cashTotal: Long?,
    val cardTotal: Long?,
    val ebtTotal: Long,
    val transactions: List<Transaction>?,
    val state: Int,
    val orderPaymentType: Int?,
    val notes: String?,
    val createdAt: Long,
    val employee: Employee?
) : Parcelable
```

Represents an order in the CorePOS SDK, aggregating its line items, discounts, totals, transactions, and state. Orders are the central entity exchanged between CorePOS and 3rd-party applications.

## Properties

| Name | Type | Description |
|---|---|---|
| `cardSubtotal` | `Long?` | The subtotal of the order when paid with card (before discounts and taxes), in cents. |
| `cardTax` | `Long?` | The total tax applied when paying with card, in cents. |
| `cardTotal` | `Long?` | The final total amount when paying with card (subtotal + tax + fees - discounts), in cents. |
| `cashSubtotal` | `Long?` | The subtotal of the order when paid with cash (before discounts and taxes), in cents. |
| `cashTax` | `Long?` | The total tax applied when paying with cash, in cents. |
| `cashTotal` | `Long?` | The final total amount when paying with cash (subtotal + tax + fees - discounts), in cents. |
| `createdAt` | `Long` | A timestamp (epoch) representing when the order was created. |
| `customerId` | `String?` | A unique UUID identifier; reference to the customer who placed the order. |
| `ebtSubtotal` | `Long` | The subtotal of the order eligible for EBT (Electronic Benefit Transfer), in cents. |
| `ebtTotal` | `Long` | The final total amount eligible for EBT, in cents. |
| `employee` | `Employee?` | The [Employee](employee.md) who carried out or processed this order. May be null if no employee was assigned. |
| `fee` | `Long` | The total fees applied to the order (e.g., service fees), in cents. |
| `items` | `List<LineItem>` | A list of [LineItem](line-item.md) objects included in the order. |
| `notes` | `String?` | Optional notes or comments about the order. |
| `orderDiscounts` | `List<OrderDiscount>?` | A list of [OrderDiscount](order-discount.md) applied to the order. |
| `orderId` | `String?` | A unique UUID identifier for the order. |
| `orderPaymentType` | `Int?` | Defines how the order was paid: `FULL (0)` - paid in full with a single payment method, `SPLIT_ITEM (1)` - split by individual items (different items paid separately), `SPLIT_CUSTOM (2)` - paid using a custom mix of payment methods (e.g., part in cash and part by card). |
| `state` | `Int` | The current state of the order: `OPEN (0)` - open and not yet paid, `PAID (1)` - fully paid, `PARTIALLY_PAID (2)` - partially paid, `PARTIALLY_REFUNDED (3)` - partially refunded, `REFUNDED (4)` - fully refunded. |
| `tipAmount` | `Long` | The total tip amount added to the order, in cents. |
| `transactions` | `List<Transaction>?` | A list of [Transaction](transaction.md) objects associated with this order. |

