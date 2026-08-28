---
title: com.coreposnow.sdk.payment
sidebar_label: payment
sidebar_position: 4
---

# com.coreposnow.sdk.payment

| Type | Description |
|---|---|
| [Card](card.md) | Represents payment card information used when building a card-based [PaymentRequest](payment-request.md) in the CorePOS SDK. |
| [PaymentRequest](payment-request.md) | Represents a payment transaction request passed to the CorePOS app, typically constructed via [PaymentRequestBuilder](payment-request-builder.md). This model is not currently in use and may not be functional in the current version. |
| [PaymentRequestBuilder](payment-request-builder.md) | Provides a fluent interface for creating [PaymentRequest](payment-request.md) objects with validation and utility methods. This builder is not currently in use and may not be functional in the current version of the CorePOS SDK. |
| [PaymentResponse](payment-response.md) | Represents the result of a payment transaction processed through the CorePOS SDK. |
| [TenderType](tender-type.md) | Defines the different types of payment methods available in the CorePOS SDK, used to specify how a payment is tendered (e.g., in a [PaymentRequest](payment-request.md) or as an intent extra in the Tender connector flow). |
