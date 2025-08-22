---
id: printer-api
sidebar_position: 5
title: PrinterConnector
description: How to utilize all PrinterConnector functionality.
hide_title: true
---

## Introduction
The `PrinterConnector` provides methods to interact with the printing service in the CorePOS system. The primary functionality includes sending bitmap images to be printed.

### Class Overview

```kotlin
class PrinterConnector(context: Context) : ServiceConnector<IPrinterService>(context) {

    override fun getServiceInterface(iBinder: IBinder?): IPrinterService { /* ... */ }
    fun printBitmap(bitmap: Bitmap) { /* ... */ }
}
```

**Purpose:** Manages printing operations, including printing bitmap images.

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
`bitmap`(Bitmap): The image to be printed, in the form of a Bitmap object.

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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