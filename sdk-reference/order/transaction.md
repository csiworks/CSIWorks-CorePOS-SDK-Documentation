---
title: Transaction
sidebar_label: Transaction
---

# Transaction

```kotlin
data class Transaction(
    val transactionId: String?,
    val orderId: String?,
    val transactionType: Int,
    val paymentMethod: Int,
    val amount: Long,
    val taxAmount: Long,
    val cardNumber: String?,
    val cardType: String?,
    val date: Long,
    val employee: Employee?
) : Parcelable
```

Represents a financial operation related to an [Order](order.md) in the CorePOS SDK, such as a sale, void, or refund.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The total transaction amount, in cents. |
| `cardNumber` | `String?` | The masked card number (if applicable). |
| `cardType` | `String?` | The type of card used, if applicable. |
| `date` | `Long` | A timestamp (epoch) representing when the transaction occurred. |
| `employee` | `Employee?` | The [Employee](employee.md) who processed this transaction. May be null if no employee was assigned. |
| `orderId` | `String?` | Reference to the [Order](order.md) this transaction belongs to. |
| `paymentMethod` | `Int` | The method of payment used: `CASH (0)` - cash payment, `CREDIT_CARD (1)` - credit card payment, `DEBIT_CARD (2)` - debit card payment, `EBT_CARD (3)` - Electronic Benefit Transfer (EBT) card payment. |
| `taxAmount` | `Long` | The portion of the transaction that is tax, in cents. |
| `transactionId` | `String?` | A unique UUID identifier for the transaction. |
| `transactionType` | `Int` | The type of transaction: `SALE (0)` - a completed sale transaction, `VOID (1)` - a voided transaction (canceled before settlement), `REFUND (2)` - a refund transaction. |

