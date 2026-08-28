---
title: PaymentConnector
sidebar_label: PaymentConnector
slug: /connector/payment-connector
---

# PaymentConnector

```kotlin
class PaymentConnector(context: Context) : ServiceConnector<…>
```

Connector for processing payments through the CorePOS application.

Note: the primary way to start a payment flow is launching the CorePOS payment activity via [com.coreposnow.sdk.utils.Intents](../utils/intents.md) with `EXTRA_PAYMENT_REQUEST`; this connector offers a direct service-level alternative. All methods must be called from a background thread.

```kotlin
val request = PaymentRequestBuilder.creditCard()
    .setAmount(1250L)      // $12.50 in cents
    .setTipsAmount(200L)
    .build()

lifecycleScope.launch(Dispatchers.IO) {
    val response = paymentConnector.processPayment(request, callback)
}
```

**See also:**

- [PaymentRequest](../payment/payment-request.md)
- [PaymentResponse](../payment/payment-response.md)
- [PaymentRequestBuilder](../payment/payment-request-builder.md)
- [Intents](../utils/intents.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS payment service. |

## Functions

### processPayment

```kotlin
fun processPayment(paymentRequest: PaymentRequest, callback: …): PaymentResponse?
```

Submits a payment request to CorePOS and blocks until the payment completes.

| Parameter | Description |
|---|---|
| `paymentRequest` | the payment to process. |
| `callback` | unused; the result is returned synchronously. |

**Returns:** the [PaymentResponse](../payment/payment-response.md), or `null` on failure.

