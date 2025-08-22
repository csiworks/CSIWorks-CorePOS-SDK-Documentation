---
id: models-merchant
sidebar_position: 2
title: Merchant
description: Merchant models.
hide_table_of_contents: true
hide_title: true
---

## Merchant

The `Merchant` model represents a merchant, containing the following fields:

- `merchantId`: A unique **UUID** identifier for the merchant.
- `name`: The name of the merchant.
- `address1`: The first line of the merchant's address.
- `address2`: The second line of the merchant's address (optional).
- `address3`: The third line of the merchant's address (optional).
- `city`: The city where the merchant is located (optional).
- `country`: The country where the merchant is located (optional).
- `state`: The state where the merchant is located (optional).
- `zip`: The postal/ZIP code of the merchant's address (optional).
- `phoneNumber`: The merchant's contact phone number (optional).

```kotlin
@Parcelize
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