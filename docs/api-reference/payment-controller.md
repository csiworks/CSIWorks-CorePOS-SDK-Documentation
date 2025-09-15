---
id: payment-api
sidebar_position: 7
title: PaymentConnector
description: How to utilize all PaymentConnector functionality.
hide_title: true
---

## Introduction
The `PaymentConnector` provides methods to process payment transactions in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

:::info Payment Flow
The PaymentConnector is primarily used for processing payments via service calls. For most payment flows, payments are triggered via Intents with the `EXTRA_PAYMENT_REQUEST` parameter.
:::

### Class Overview

```kotlin
class PaymentConnector(context: Context) : ServiceConnector<IPaymentService>(context) {

    override fun getServiceInterface(iBinder: IBinder?): IPaymentService { /* ... */ }
    fun processPayment(paymentRequest: PaymentRequest, callback: IPaymentCallback) { /* ... */ }
}
```

**Purpose:** Manages payment processing operations for various tender types including credit, debit, cash, EBT, and other payment methods.

### Initialization:

```kotlin
val paymentConnector = PaymentConnector(context)
```

## Payment Models

### TenderType Enum

The `TenderType` enum defines the different types of payment methods available:

- `CREDIT (0)`: Credit card payment.
- `DEBIT (1)`: Debit card payment.
- `CASH (2)`: Cash payment.
- `EBT (3)`: Electronic Benefit Transfer card payment.
- `CHECK (4)`: Check payment.
- `GIFT (5)`: Gift card payment.
- `LOYALTY (6)`: Loyalty card payment.

```kotlin
enum class TenderType(val code: Int) {
    CREDIT(0), DEBIT(1), CASH(2), EBT(3), CHECK(4), GIFT(5), LOYALTY(6);

    companion object {
        infix fun from(code: Int): TenderType? = TenderType.entries.associateBy { it.code }[code]
    }
}
```

### Card

The `Card` model represents payment card information, containing the following fields:

- `cardNumber`: The card number.
- `expDate`: The expiration date of the card.
- `cvv`: The card verification value.
- `firstName`: The cardholder's first name.
- `lastName`: The cardholder's last name.
- `country`: The billing country.
- `state`: The billing state.
- `city`: The billing city.
- `zipCode`: The billing ZIP code.

```kotlin
@Parcelize
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

### PaymentRequest

The `PaymentRequest` model represents a payment transaction request, containing the following fields:

- `id`: A unique identifier for the payment request (optional).
- `tenderType`: The type of payment method from [**TenderType**](#tendertype-enum).
- `amount`: The payment amount in smallest currency unit (e.g., cents).
- `taxAmount`: The tax portion of the payment (optional).
- `tipsAmount`: The tip amount in smallest currency unit.
- `card`: The payment card information (required for card payments).

```kotlin
@Parcelize
data class PaymentRequest(
    val id: String? = null,
    val tenderType: TenderType,
    val amount: Long,
    val taxAmount: Long?,
    val tipsAmount: Long,
    val card: Card?
) : Parcelable
```

### PaymentResponse

The `PaymentResponse` model represents the result of a payment transaction, containing the following fields:

- `response`: The response message or data from the payment processing.

```kotlin
@Parcelize
data class PaymentResponse(
    val response: String
) : Parcelable
```

### PaymentRequestBuilder

The `PaymentRequestBuilder` class provides a fluent interface for creating `PaymentRequest` objects with validation and utility methods.

#### Factory Methods

- `create()` - Creates a new empty builder instance
- `creditCard()` - Creates a credit card payment builder
- `debitCard()` - Creates a debit card payment builder
- `cash()` - Creates a cash payment builder
- `ebt()` - Creates an EBT payment builder
- `check()` - Creates a check payment builder
- `giftCard()` - Creates a gift card payment builder
- `loyaltyCard()` - Creates a loyalty card payment builder

#### Builder Methods

- `setTenderType(TenderType)` - Set payment method type
- `setAmount(Long)` - Set payment amount in cents
- `setTaxAmount(Long?)` - Set tax amount in cents
- `setTipsAmount(Long)` - Set tip amount in cents
- `setCard(Card?)` - Set card information
- `setCard(cardNumber, expDate, cvv, firstName, lastName, country, state, city, zipCode)` - Set card info with individual parameters
- `build()` - Build and validate PaymentRequest (throws on error)
- `buildOrNull()` - Build PaymentRequest, return null on error
- `isValid()` - Check if current state is valid
- `getValidationErrors()` - Get list of validation errors

```kotlin
class PaymentRequestBuilder {
    companion object {
        fun create(): PaymentRequestBuilder
        fun creditCard(): PaymentRequestBuilder
        fun debitCard(): PaymentRequestBuilder
        fun cash(): PaymentRequestBuilder
        fun ebt(): PaymentRequestBuilder
        fun check(): PaymentRequestBuilder
        fun giftCard(): PaymentRequestBuilder
        fun loyaltyCard(): PaymentRequestBuilder
    }
    
    fun setTenderType(tenderType: TenderType): PaymentRequestBuilder
    fun setAmount(amount: Long): PaymentRequestBuilder
    fun setTaxAmount(taxAmount: Long?): PaymentRequestBuilder
    fun setTipsAmount(tipsAmount: Long): PaymentRequestBuilder
    fun setCard(card: Card?): PaymentRequestBuilder
    fun setCard(cardNumber: String, expDate: String, cvv: String, firstName: String, lastName: String, country: String, state: String, city: String, zipCode: String): PaymentRequestBuilder
    
    fun build(): PaymentRequest
    fun buildOrNull(): PaymentRequest?
    fun isValid(): Boolean
    fun getValidationErrors(): List<String>
}
```

## Process Payment

**Purpose:** Process a payment transaction for an order using various payment methods.

### Signature:

```kotlin
fun processPayment(paymentRequest: PaymentRequest, callback: IPaymentCallback)
```

#### Parameters:
- `paymentRequest` (PaymentRequest): Payment request containing payment details and card information
- `callback` (IPaymentCallback): Callback interface to handle payment results

#### Returns:
Void (Unit) - Results are returned through the callback interface

#### Error Handling:
Errors are handled through the callback's `onError` method.

### Example Usage:
```kotlin
class PaymentActivity : AppCompatActivity() {
    private lateinit var paymentConnector: PaymentConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        paymentConnector = PaymentConnector(this)
    }
    
    fun processCardPayment(amount: Long, cardInfo: Card) {
        lifecycleScope.launch(Dispatchers.IO) {
            val paymentRequest = PaymentRequestBuilder.creditCard()
                .setAmount(amount)
                .setTaxAmount(taxAmount)
                .setTipsAmount(tipAmount)
                .setCard(cardInfo)
                .build()

            paymentConnector.processPayment(paymentRequest, object : IPaymentCallback.Stub() {
                override fun onSuccess(paymentResponse: PaymentResponse) {
                    runOnUiThread {
                        handlePaymentSuccess(paymentResponse)
                    }
                }

                override fun onError(errorResult: ErrorResult?) {
                    runOnUiThread {
                        handlePaymentError(errorResult)
                    }
                }
            })
        }
    }
    
    fun processCashPayment(amount: Long) {
        lifecycleScope.launch(Dispatchers.IO) {
            val paymentRequest = PaymentRequestBuilder.cash()
                .setAmount(amount)
                .build()

            paymentConnector.processPayment(paymentRequest, object : IPaymentCallback.Stub() {
                override fun onSuccess(paymentResponse: PaymentResponse) {
                    runOnUiThread {
                        handlePaymentSuccess(paymentResponse)
                    }
                }

                override fun onError(errorResult: ErrorResult?) {
                    runOnUiThread {
                        handlePaymentError(errorResult)
                    }
                }
            })
        }
    }
}
```