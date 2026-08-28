---
title: AmountType
sidebar_label: AmountType
slug: /inventory/amount-type
---

# AmountType

```kotlin
enum AmountType : Enum<AmountType>
```

Defines the different types of charge amounts used in the CorePOS SDK inventory, such as the [Charge.chargeAmountType](charge.md) field.

## Entries

| Entry | Description |
|---|---|
| `FIXED` | A fixed amount charge, such as a flat fee. |
| `PERCENTAGE` | A percentage-based charge, such as a tax rate. |

## Properties

| Name | Type | Description |
|---|---|---|
| `code` | `Int` | The integer code representing this amount type. |

