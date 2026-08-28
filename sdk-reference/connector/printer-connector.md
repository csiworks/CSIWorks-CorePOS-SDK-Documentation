---
title: PrinterConnector
sidebar_label: PrinterConnector
---

# PrinterConnector

```kotlin
class PrinterConnector(context: Context) : ServiceConnector<…>
```

Connector for printing through the receipt printer managed by the CorePOS application. All methods must be called from a background thread.

```kotlin
lifecycleScope.launch(Dispatchers.IO) {
    PrinterConnector(context).printBitmap(receiptBitmap)
}
```

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS printer service. |

## Functions

### printBitmap

```kotlin
fun printBitmap(bitmap: Bitmap)
```

Prints a bitmap on the CorePOS receipt printer, blocking until the print request is handed off.

| Parameter | Description |
|---|---|
| `bitmap` | the image to print. |

