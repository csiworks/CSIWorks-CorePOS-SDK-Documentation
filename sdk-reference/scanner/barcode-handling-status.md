---
title: BarcodeHandlingStatus
sidebar_label: BarcodeHandlingStatus
---

# BarcodeHandlingStatus

```kotlin
enum BarcodeHandlingStatus : Enum<BarcodeHandlingStatus>
```

Defines the possible states of barcode processing in the CorePOS SDK. Intended for third-party apps to notify the system that they are also processing a scanned barcode, and then report the result.

## Entries

| Entry | Description |
|---|---|
| `PENDING` | The barcode is being processed by a handler. |
| `SUCCESS` | The barcode was successfully processed. |
| `CANCELLED` | The barcode processing was cancelled or failed. |

## Properties

| Name | Type | Description |
|---|---|---|
| `code` | `Int` | The integer code representing this barcode handling status. |

