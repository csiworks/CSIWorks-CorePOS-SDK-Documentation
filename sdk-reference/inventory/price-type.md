---
title: PriceType
sidebar_label: PriceType
slug: /inventory/price-type
---

# PriceType

```kotlin
enum PriceType : Enum<PriceType>
```

Defines the different types of pricing available for items in the CorePOS SDK inventory, such as the [Item.priceType](item.md) field.

## Entries

| Entry | Description |
|---|---|
| `FIXED` | A fixed price for the item. |
| `VARIABLE` | A variable price for the item. |
| `PER_UNIT` | Price per unit of the item. |

## Properties

| Name | Type | Description |
|---|---|---|
| `code` | `Int` | The integer code representing this price type. |

