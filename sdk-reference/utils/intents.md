---
title: Intents
sidebar_label: Intents
slug: /utils/intents
---

# Intents

```kotlin
object Intents
```

Broadcast actions, intent extras and activity events used to integrate with the CorePOS application without binding to its services.

`ACTION_*` constants are broadcast by CorePOS when POS events occur (order lifecycle, line items, payments, barcode scans) — register a `BroadcastReceiver` to observe them. `EXTRA_*` constants are the keys of the data attached to those broadcasts and to CorePOS activities. `EVENT_*` constants launch specific CorePOS screens (order building, cart overview, charge flows).

Example — observing order events:

```kotlin
class CorePOSReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intents.ACTION_ORDER_CREATED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                val amount = intent.getDoubleExtra(Intents.EXTRA_AMOUNT, 0.0)
                handleOrderCreated(orderId, amount)
            }
            Intents.ACTION_BARCODE_SCANNED -> {
                val barcode = intent.getStringExtra(Intents.EXTRA_BARCODE)
                handleBarcodeScanned(barcode)
            }
        }
    }
}

// in an Activity:
registerReceiver(CorePOSReceiver(), IntentFilter().apply {
    addAction(Intents.ACTION_ORDER_CREATED)
    addAction(Intents.ACTION_BARCODE_SCANNED)
})
```

**See also:**

- [BarcodeHandlingStatus](../scanner/barcode-handling-status.md)
- [PaymentRequest](../payment/payment-request.md)
- [Tender](../tender/tender.md)

## Properties

| Name | Type | Description |
|---|---|---|
| `ACTION_BARCODE_HANDLED` | `String` | Broadcast sent from third-party apps after barcode processing, letting CorePOS track which apps processed the barcode and the status of their processing. |
| `ACTION_BARCODE_SCANNED` | `String` | Broadcast when a barcode is scanned via the scanner. |
| `ACTION_LINE_ITEM_ADDED` | `String` | Broadcast when a line item is added to an order. |
| `ACTION_LINE_ITEM_DELETED` | `String` | Broadcast when a line item is removed from an order. |
| `ACTION_MERCHANT_ACTION` | `String` | Broadcast when a custom merchant action is triggered. |
| `ACTION_MERCHANT_TENDER` | `String` | Broadcast when a merchant tender action is initiated (custom tender flow). |
| `ACTION_ORDER_CLOSED` | `String` | Broadcast when an order is closed (completed transaction). |
| `ACTION_ORDER_CREATED` | `String` | Broadcast when a new order is created in the system. |
| `ACTION_ORDER_DELETED` | `String` | Broadcast when an order is deleted from the system. |
| `ACTION_ORDER_SAVED` | `String` | Broadcast when an existing order is saved/updated. |
| `ACTION_PAYMENT_PROCESSED` | `String` | Broadcast when a payment transaction is processed. |
| `EVENT_CART_OVERVIEW_START` | `String` | Launches the CorePOS cart overview screen. |
| `EVENT_CASH_CHARGE_START` | `String` | Launches the CorePOS cash payment flow. |
| `EVENT_CREDIT_CHARGE_START` | `String` | Launches the CorePOS credit card payment flow. |
| `EVENT_DEBIT_CHARGE_START` | `String` | Launches the CorePOS debit card payment flow. |
| `EVENT_ORDER_BUILD_START` | `String` | Launches the CorePOS order building screen. |
| `EVENT_PAYMENT_SELECTION_START` | `String` | Launches the CorePOS payment selection screen. |
| `EXTRA_ACTION_NAME` | `String` | (String) Name of the custom action being performed. |
| `EXTRA_AMOUNT` | `String` | (Double) Final amount in the smallest currency unit. Required outgoing extra of the custom tender flow. |
| `EXTRA_BARCODE` | `String` | (String) The scanned barcode data/value. |
| `EXTRA_BARCODE_FORMAT` | `String` | (String) The format/type of the scanned barcode. |
| `EXTRA_BARCODE_HANDLER_PACKAGE_NAME` | `String` | (String) The package name of the third-party app that handled the barcode. |
| `EXTRA_BARCODE_HANDLERS` | `String` | (ArrayList of Bundle) All barcode handlers that have processed or are processing the scanned barcode. Third-party apps must add their handler to the existing list and must not overwrite the current contents, so each handler is represented only once. |
| `EXTRA_BARCODE_HANDLING_STATUS` | `String` | (BarcodeHandlingStatus) The current processing status of the handler. |
| `EXTRA_CARD_AMOUNT` | `String` | (Double) Total card amount in the smallest currency unit (e.g., cents). Incoming extra of the custom tender flow. |
| `EXTRA_CARD_TAX_AMOUNT` | `String` | (Double) Portion of the amount that is card tax, in the smallest currency unit. Incoming extra of the custom tender flow. |
| `EXTRA_CASH_AMOUNT` | `String` | (Double) Total cash amount in the smallest currency unit (e.g., cents). Incoming extra of the custom tender flow. |
| `EXTRA_CASH_TAX_AMOUNT` | `String` | (Double) Portion of the amount that is cash tax, in the smallest currency unit. Incoming extra of the custom tender flow. |
| `EXTRA_CLIENT_ID` | `String` | (String) Unique ID from your system (e.g., a payment or transaction ID). Optional outgoing extra of the custom tender flow. |
| `EXTRA_ITEM_ID` | `String` | (String) Unique UUID identifier for an inventory item. |
| `EXTRA_LINE_ITEM_ID` | `String` | (String) Unique UUID identifier for a single line item. |
| `EXTRA_LINE_ITEM_IDS` | `String` | (List of String) List of line item UUIDs. Optional outgoing extra of the custom tender flow. |
| `EXTRA_NOTE` | `String` | (String) Notes about the payment or optional order notes. Incoming/outgoing extra of the custom tender flow. |
| `EXTRA_ORDER_ID` | `String` | (String) CorePOS order UUID. Incoming extra of the custom tender flow. |
| `EXTRA_PAYMENT_REQUEST` | `String` | (PaymentRequest) Serialized payment request object used to launch the payment flow. |
| `EXTRA_TENDER` | `String` | (String) The Tender record configured in CorePOS. Optional outgoing extra of the custom tender flow. |
| `EXTRA_TENDER_TYPE` | `String` | (TenderType) Specifies a concrete tender type (e.g., EBT). If omitted, CorePOS records the payment as a custom tender. Optional outgoing extra of the custom tender flow. |
| `EXTRA_TIP_AMOUNT` | `String` | (Double) Tip in the smallest currency unit. Optional outgoing extra of the custom tender flow. |

