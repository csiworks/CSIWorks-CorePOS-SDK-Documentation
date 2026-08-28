---
title: Card
sidebar_label: Card
slug: /payment/card
---

# Card

```kotlin
data class Card(
    val cardNumber: String,
    val expDate: String,
    val cvv: String,
    val firstName: String,
    val lastName: String,
    val country: String,
    val state: String,
    val city: String,
    val zipCode: String
) : Parcelable
```

Represents payment card information used when building a card-based [PaymentRequest](payment-request.md) in the CorePOS SDK.

## Properties

| Name | Type | Description |
|---|---|---|
| `cardNumber` | `String` | The card number. |
| `city` | `String` | The billing city. |
| `country` | `String` | The billing country. |
| `cvv` | `String` | The card verification value. |
| `expDate` | `String` | The expiration date of the card. |
| `firstName` | `String` | The cardholder's first name. |
| `lastName` | `String` | The cardholder's last name. |
| `state` | `String` | The billing state. |
| `zipCode` | `String` | The billing ZIP code. |

