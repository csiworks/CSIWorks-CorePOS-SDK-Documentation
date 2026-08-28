---
title: PaymentRequest
sidebar_label: PaymentRequest
slug: /payment/payment-request
---

# PaymentRequest

```kotlin
data class PaymentRequest(
    val id: String? = null,
    val tenderType: TenderType,
    val amount: Long,
    val taxAmount: Long?,
    val tipsAmount: Long,
    val card: Card?
) : Parcelable
```

Represents a payment transaction request passed to the CorePOS app, typically constructed via [PaymentRequestBuilder](payment-request-builder.md). This model is not currently in use and may not be functional in the current version.

## Properties

| Name | Type | Description |
|---|---|---|
| `amount` | `Long` | The payment amount in the smallest currency unit (e.g., cents). |
| `card` | `Card?` | The payment card information (required for card payments). |
| `id` | `String?` | A unique identifier for the payment request (optional). |
| `taxAmount` | `Long?` | The tax portion of the payment in the smallest currency unit (optional). |
| `tenderType` | `TenderType` | The type of payment method from [TenderType](tender-type.md). |
| `tipsAmount` | `Long` | The tip amount in the smallest currency unit. |

