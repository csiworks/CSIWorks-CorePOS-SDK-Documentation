---
id: printer-api
sidebar_position: 6
title: PrinterConnector
description: PrinterConnector reference for the CorePOS Android SDK.
hide_title: true
---

## Introduction

The `PrinterConnector` provides methods to interact with the printing service in the CorePOS system. The primary functionality includes sending bitmap images to be printed.

### Class Overview

```kotlin
class PrinterConnector(context: Context) : ServiceConnector<IPrinterService>(context)
```

### Initialization:

```kotlin
val printerConnector = PrinterConnector(context)
```

## Print Bitmap

**Purpose:** Sends a bitmap image to the CorePOS printer service for printing.

### Signature:

```kotlin
fun printBitmap(bitmap: Bitmap)
```

#### Parameters:

- `bitmap` (Bitmap): the image to print.

#### Returns:

Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
class ReceiptActivity : AppCompatActivity() {
    private lateinit var printerConnector: PrinterConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_receipt)
        
        printerConnector = PrinterConnector(this)
    }
    
    fun printReceipt(bitmap: Bitmap) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                printerConnector.printBitmap(bitmap)
                withContext(Dispatchers.Main) {
                    showPrintSuccess()
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to print: ${e.message}")
                withContext(Dispatchers.Main) {
                    showPrintError(e.message)
                }
            }
        }
    }
}
```

