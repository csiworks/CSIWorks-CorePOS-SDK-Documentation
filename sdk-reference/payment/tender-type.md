---
title: TenderType
sidebar_label: TenderType
---

# TenderType

```kotlin
enum TenderType : Enum<TenderType>
```

Defines the different types of payment methods available in the CorePOS SDK, used to specify how a payment is tendered (e.g., in a [PaymentRequest](payment-request.md) or as an intent extra in the Tender connector flow).

## Entries

| Entry | Description |
|---|---|
| `CREDIT` | Credit card payment. |
| `DEBIT` | Debit card payment. |
| `CASH` | Cash payment. |
| `EBT` | Electronic Benefit Transfer card payment. |
| `CHECK` | Check payment. |
| `GIFT` | Gift card payment. |
| `LOYALTY` | Loyalty card payment. |

## Properties

| Name | Type | Description |
|---|---|---|
| `code` | `Int` | The integer code representing the tender type. |

