---
title: PaymentRequestBuilder
sidebar_label: PaymentRequestBuilder
slug: /payment/payment-request-builder
---

# PaymentRequestBuilder

```kotlin
class PaymentRequestBuilder
```

Provides a fluent interface for creating [PaymentRequest](payment-request.md) objects with validation and utility methods. This builder is not currently in use and may not be functional in the current version of the CorePOS SDK.

```kotlin
val request = PaymentRequestBuilder.creditCard()
    .setAmount(1250L)     // $12.50 in cents
    .setTipsAmount(200L)
    .build()
```

**See also:**

- [PaymentRequest](payment-request.md)
- [TenderType](tender-type.md)
- [PaymentConnector](../connector/payment-connector.md)

## Functions

### build

```kotlin
fun build(): PaymentRequest
```

Builds and validates the [PaymentRequest](payment-request.md).

Only validates critical fields that would cause crashes:

-
-
-
Tender type is required Amount must be positive Tips amount cannot be negative

**Returns:** The constructed [PaymentRequest](payment-request.md).

| Throws | When |
|---|---|
| `IllegalArgumentException` | if critical fields are missing or invalid. |

### buildOrNull

```kotlin
fun buildOrNull(): PaymentRequest?
```

Builds the [PaymentRequest](payment-request.md), returning null instead of throwing on validation failure. Useful for apps that prefer to handle validation failures gracefully.

**Returns:** The constructed [PaymentRequest](payment-request.md), or null if validation fails.

### getValidationErrors

```kotlin
fun getValidationErrors(): List<String>
```

Collects validation errors without throwing exceptions.

**Returns:** A list of error messages for missing or invalid fields; empty if the state is valid.

### isValid

```kotlin
fun isValid(): Boolean
```

Checks whether the current builder state is valid.

**Returns:** True if all required fields are present and valid, false otherwise.

### setAmount

```kotlin
fun setAmount(amount: Long): PaymentRequestBuilder
```

Sets the payment amount in the smallest currency unit (e.g., 1000 cents = $10.00).

| Parameter | Description |
|---|---|
| `amount` | The payment amount in cents. |

**Returns:** This builder instance for chaining.

### setCard

```kotlin
fun setCard(card: Card?): PaymentRequestBuilder
```

Sets the payment card information (required for CREDIT/DEBIT tender types).

| Parameter | Description |
|---|---|
| `cardNumber` | The card number. |
| `expDate` | The expiration date of the card. |
| `cvv` | The card verification value. |
| `firstName` | The cardholder's first name. |
| `lastName` | The cardholder's last name. |
| `country` | The billing country. |
| `state` | The billing state. |
| `city` | The billing city. |
| `zipCode` | The billing ZIP code. |

**Returns:** This builder instance for chaining.

### setTaxAmount

```kotlin
fun setTaxAmount(taxAmount: Long?): PaymentRequestBuilder
```

Sets the tax portion of the payment in the smallest currency unit (optional).

| Parameter | Description |
|---|---|
| `taxAmount` | The tax amount in cents, or null if not applicable. |

**Returns:** This builder instance for chaining.

### setTenderType

```kotlin
fun setTenderType(tenderType: TenderType): PaymentRequestBuilder
```

Sets the payment method type (CREDIT, DEBIT, CASH, EBT, etc.).

| Parameter | Description |
|---|---|
| `tenderType` | The type of payment method from [TenderType](tender-type.md). |

**Returns:** This builder instance for chaining.

### setTipsAmount

```kotlin
fun setTipsAmount(tipsAmount: Long): PaymentRequestBuilder
```

Sets the tip amount in the smallest currency unit.

| Parameter | Description |
|---|---|
| `tipsAmount` | The tip amount in cents. |

**Returns:** This builder instance for chaining.

