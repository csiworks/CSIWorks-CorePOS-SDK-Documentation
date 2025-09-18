---
id: models-payment
sidebar_position: 6
title: Payment
description: Payment models.
hide_title: true
---

## Payment Models

This section covers all payment models (entities) used in the API

## TenderType Enum
```kotlin
enum class TenderType
```
The `TenderType` enum defines the different types of payment methods available:

### Values
- `CREDIT (0)`: Credit card payment.
- `DEBIT (1)`: Debit card payment.
- `CASH (2)`: Cash payment.
- `EBT (3)`: Electronic Benefit Transfer card payment.
- `CHECK (4)`: Check payment.
- `GIFT (5)`: Gift card payment.
- `LOYALTY (6)`: Loyalty card payment.

### Functions
```kotlin
companion object {
    infix fun from(code: Int): TenderType?
}
```
Returns the TenderType enum value corresponding to the provided code.
#### Parameters:
`code: Int` - The integer code representing the tender type
#### Returns:
`TenderType?` - The corresponding TenderType enum value, or null if the code is invalid

## Card
```kotlin
data class Card
```
The `Card` model represents payment card information, containing the following fields:

### Values
- `cardNumber`: The card number.
- `expDate`: The expiration date of the card.
- `cvv`: The card verification value.
- `firstName`: The cardholder's first name.
- `lastName`: The cardholder's last name.
- `country`: The billing country.
- `state`: The billing state.
- `city`: The billing city.
- `zipCode`: The billing ZIP code.

## PaymentRequest
```kotlin
data class PaymentRequest
```
The `PaymentRequest` model represents a payment transaction request, containing the following fields:

### Values
- `id`: A unique identifier for the payment request (optional).
- `tenderType`: The type of payment method from [**TenderType**](#tendertype-enum).
- `amount`: The payment amount in smallest currency unit (e.g., cents).
- `taxAmount`: The tax portion of the payment (optional).
- `tipsAmount`: The tip amount in smallest currency unit.
- `card`: The payment card information (required for card payments).

## PaymentResponse
```kotlin
data class PaymentResponse
```
The `PaymentResponse` model represents the result of a payment transaction, containing the following fields:

### Values
- `response`: The response message or data from the payment processing.

## PaymentRequestBuilder
```kotlin
class PaymentRequestBuilder
```
The `PaymentRequestBuilder` class provides a fluent interface for creating `PaymentRequest` objects with validation and utility methods.

### Factory Methods
- `create()` - Creates a new empty builder instance
- `creditCard()` - Creates a credit card payment builder
- `debitCard()` - Creates a debit card payment builder
- `cash()` - Creates a cash payment builder
- `ebt()` - Creates an EBT payment builder
- `check()` - Creates a check payment builder
- `giftCard()` - Creates a gift card payment builder
- `loyaltyCard()` - Creates a loyalty card payment builder

### Builder Methods
**Basic Setters:**
- `setTenderType(TenderType)` - Set payment method type
- `setAmount(Long)` - Set payment amount in cents
- `setTaxAmount(Long?)` - Set tax amount in cents
- `setTipsAmount(Long)` - Set tip amount in cents
- `setCard(Card?)` - Set card information
- `setCard(cardNumber, expDate, cvv, firstName, lastName, country, state, city, zipCode)` - Set card info with individual parameters

**Build Methods:**
- `build()` - Build and validate PaymentRequest (throws on error)
- `buildOrNull()` - Build PaymentRequest, return null on error
- `isValid()` - Check if current state is valid
- `getValidationErrors()` - Get list of validation errors