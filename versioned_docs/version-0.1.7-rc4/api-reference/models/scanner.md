---
id: models-scanner
sidebar_position: 9
title: Scanner
description: Scanner models used by the CorePOS Android SDK.
hide_title: true
---

## Scanner Models

## BarcodeHandlingStatus

```kotlin
enum class BarcodeHandlingStatus
```
The `BarcodeHandlingStatus` enum defines the possible states of barcode processing and is intended for third-party apps to notify the system that they are also processing barcode scanning, and then report the result. Containing the following fields:

### Values

- `PENDING(0)`: The barcode is processed by handler
- `SUCCESS(1)`: The barcode was successfully processed
- `CANCELLED(2)`: The barcode processing was cancelled or failed

### Static Functions

```kotlin
infix fun from(code: Int): BarcodeHandlingStatus?
```
Returns the BarcodeHandlingStatus enum value corresponding to the provided code

#### Parameters

`code: Int` -The integer code representing the barcode handling status

#### Returns

`BarcodeHandlingStatus?` - The corresponding enum value, or null if the code is invalid

### Example Usage

```kotlin
  class BarcodeReceiver : BaseReceiver(), KoinComponent {

    private val handler: Handler by lazy { Handler() }

    override fun onReceiveAllowed(context: Context, intent: Intent) {
        when (intent.action) {
            Intents.ACTION_BARCODE_SCANNED -> {
                val barcode = intent.getStringExtra(Intents.EXTRA_BARCODE)
                barcode?.let {
                    returnResult(context)
                    handler.barcodeReceived(
                        barcode = barcode,
                        onCompleted = { isSuccess ->
                            changeStatus(context, isSuccess)
                        }
                    )
                }
            }
        }
    }

    private fun returnResult(context: Context) {
        val myHandler = Bundle().apply {
            putString(EXTRA_BARCODE_HANDLER_PACKAGE_NAME, context.packageName)
            putSerializable(EXTRA_BARCODE_HANDLING_STATUS, BarcodeHandlingStatus.PENDING)
        }

        val currentExtras = getResultExtras(true)
        val handlers = currentExtras.getParcelableArrayList<Bundle>(EXTRA_BARCODE_HANDLERS)
            ?: arrayListOf()

        handlers.add(myHandler)

        val newExtras = Bundle().apply {
            putParcelableArrayList(EXTRA_BARCODE_HANDLERS, handlers)
        }
        setResultExtras(newExtras)
    }

    private fun changeStatus(context: Context, isSuccess: Boolean = true) {
        val status = if (isSuccess) BarcodeHandlingStatus.SUCCESS else BarcodeHandlingStatus.CANCELLED

        val broadcastIntent = Intent(ACTION_BARCODE_HANDLED).apply {
            putExtra(EXTRA_BARCODE_HANDLER_PACKAGE_NAME, context.packageName)
            putExtra(EXTRA_BARCODE_HANDLING_STATUS, status)
        }
        context.sendBroadcast(broadcastIntent)
    }
  }
```

