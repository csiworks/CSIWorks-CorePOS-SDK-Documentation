---
title: Tender
sidebar_label: Tender
slug: /tender/tender
---

# Tender

```kotlin
data class Tender(
    val uuid: String,
    val buttonTitle: String,
    val tenderName: String,
    val packageName: String,
    val enabled: Boolean,
    val openCashDrawer: Boolean
) : Parcelable
```

Represents a custom tender button that appears on the CorePOS checkout screen below the default payment methods. Custom tenders allow 3rd-party applications to handle payments through their own payment flow.

## Properties

| Name | Type | Description |
|---|---|---|
| `buttonTitle` | `String` | The text displayed on the tender button. |
| `enabled` | `Boolean` | Determines whether the tender button is visible (`true`) or hidden/disabled (`false`). |
| `openCashDrawer` | `Boolean` | A flag indicating whether the cash drawer should be opened when this tender is used. |
| `packageName` | `String` | The package name of the 3rd-party app that created this tender (i.e., tender button owner). |
| `tenderName` | `String` | An internal name for the tender (not currently in use, reserved for internal reference). |
| `uuid` | `String` | A unique UUID identifier for the tender. |

