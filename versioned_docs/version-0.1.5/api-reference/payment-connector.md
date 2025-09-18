---
id: payment-api
sidebar_position: 7
title: PaymentConnector
description: How to utilize all PaymentConnector functionality.
hide_title: true
---

## Introduction
:::caution Not Currently Functional
This connector is not currently in use and may not be functional in the current version. It is likely redundant since payment flows are triggered via Intents with the `EXTRA_PAYMENT_REQUEST` parameter.
:::

### Class Overview
```kotlin
class PaymentConnector(context: Context)
```
The `PaymentConnector` provides methods to process payment transactions in the CorePOS system. All methods are executed asynchronously and return results through callbacks.

**Purpose:** Manages payment processing operations for various tender types including credit, debit, cash, EBT, and other payment methods.

### Initialization:

```kotlin
val paymentConnector = PaymentConnector(context)
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