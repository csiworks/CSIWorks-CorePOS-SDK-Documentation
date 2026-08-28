---
title: EbtFlag
sidebar_label: EbtFlag
---

# EbtFlag

```kotlin
data class EbtFlag(val itemId: String, val isEbt: Boolean) : Parcelable
```

Represents the EBT (Electronic Benefit Transfer) eligibility status for an inventory item in the CorePOS SDK.

## Properties

| Name | Type | Description |
|---|---|---|
| `isEbt` | `Boolean` | A flag indicating whether the item is eligible for EBT. |
| `itemId` | `String` | A unique UUID identifier for the item. |

