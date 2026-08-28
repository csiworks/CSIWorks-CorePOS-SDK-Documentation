---
title: Merchant
sidebar_label: Merchant
---

# Merchant

```kotlin
data class Merchant(
    val merchantId: String,
    val name: String,
    val address1: String?,
    val address2: String?,
    val address3: String?,
    val city: String?,
    val country: String?,
    val state: String?,
    val zip: String?,
    val phoneNumber: String?
) : Parcelable
```

Represents a merchant in the CorePOS SDK, containing the merchant's identifying, address, and contact information.

## Properties

| Name | Type | Description |
|---|---|---|
| `address1` | `String?` | The first line of the merchant's address. |
| `address2` | `String?` | The second line of the merchant's address (optional). |
| `address3` | `String?` | The third line of the merchant's address (optional). |
| `city` | `String?` | The city where the merchant is located (optional). |
| `country` | `String?` | The country where the merchant is located (optional). |
| `merchantId` | `String` | A unique UUID identifier for the merchant. |
| `name` | `String` | The name of the merchant. |
| `phoneNumber` | `String?` | The merchant's contact phone number (optional). |
| `state` | `String?` | The state where the merchant is located (optional). |
| `zip` | `String?` | The postal/ZIP code of the merchant's address (optional). |

