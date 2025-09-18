---
id: models-intents
sidebar_position: 7
title: Intents
description: Intent constants and utilities for CorePOS SDK inter-app communication.
hide_title: true
---

## Intents

The `Intents` object contains constants for CorePOS SDK intent actions, extras, and events used for inter-app communication and system notifications.

```kotlin
package com.coreposnow.sdk.utils

object Intents {
    
    // Action Intent Constants
    const val ACTION_ORDER_CREATED = "com.corepos.intent.action.ORDER_CREATED"
    const val ACTION_ORDER_SAVED = "com.corepos.intent.action.ORDER_SAVED"
    const val ACTION_ORDER_CLOSED = "com.corepos.intent.action.ORDER_CLOSED"
    const val ACTION_ORDER_DELETED = "com.corepos.intent.action.ORDER_DELETED"
    const val ACTION_LINE_ITEM_ADDED = "com.corepos.intent.action.LINE_ITEM_ADDED"
    const val ACTION_PAYMENT_PROCESSED = "com.corepos.intent.action.PAYMENT_PROCESSED"
    const val ACTION_LINE_ITEM_DELETED = "com.corepos.intent.action.LINE_ITEM_DELETED"
    const val ACTION_BARCODE_SCANNED = "com.corepos.intent.action.BARCODE_SCANNED"
    const val ACTION_MERCHANT_TENDER = "com.corepos.intent.action.MERCHANT_TENDER"
    const val ACTION_MERCHANT_ACTION = "com.corepos.intent.action.MERCHANT_ACTION"
    
    // Extra Data Constants
    const val EXTRA_AMOUNT = "com.corepos.intent.extra.EXTRA_AMOUNT"
    const val EXTRA_TIP_AMOUNT = "com.corepos.intent.extra.EXTRA_TIP_AMOUNT"
    const val EXTRA_CLIENT_ID = "com.corepos.intent.extra.EXTRA_CLIENT_ID"
    const val EXTRA_NOTE = "com.corepos.intent.extra.EXTRA_NOTE"
    const val EXTRA_ORDER_ID = "com.corepos.intent.extra.ORDER_ID"
    const val EXTRA_CASH_AMOUNT = "com.corepos.intent.extra.CASH_AMOUNT"
    const val EXTRA_CARD_AMOUNT = "com.corepos.intent.extra.CARD_AMOUNT"
    const val EXTRA_CASH_TAX_AMOUNT = "com.corepos.intent.extra.CASH_TAX_AMOUNT"
    const val EXTRA_CARD_TAX_AMOUNT = "com.corepos.intent.extra.CARD_TAX_AMOUNT"
    const val EXTRA_BARCODE = "com.corepos.intent.extra.BARCODE"
    const val EXTRA_BARCODE_FORMAT = "com.corepos.intent.extra.BARCODE_FORMAT"
    const val EXTRA_LINE_ITEM_ID = "com.corepos.intent.extra.LINE_ITEM_ID"
    const val EXTRA_LINE_ITEM_IDS = "com.corepos.intent.extra.LINE_ITEM_IDS"
    const val EXTRA_ITEM_ID = "com.corepos.intent.extra.ITEM_ID"
    const val EXTRA_ACTION_NAME = "com.corepos.intent.extra.ACTION_NAME"
    const val EXTRA_PAYMENT_REQUEST = "com.corepos.intent.extra.PAYMENT_REQUEST"
    const val EXTRA_TENDER_TYPE = "com.corepos.intent.extra.TENDER_TYPE"
    const val EXTRA_TENDER = "com.corepos.intent.extra.TENDER"
    
    // Event Constants
    const val EVENT_ORDER_BUILD_START = "com.corepos.intent.event.ORDER_BUILD_START"
    const val EVENT_CART_OVERVIEW_START = "com.corepos.intent.event.CART_OVERVIEW_START"
    const val EVENT_CASH_CHARGE_START = "com.corepos.intent.event.CASH_CHARGE_START"
    const val EVENT_CREDIT_CHARGE_START = "com.corepos.intent.event.CREDIT_CHARGE_START"
    const val EVENT_DEBIT_CHARGE_START = "com.corepos.intent.event.DEBIT_CHARGE_START"
    const val EVENT_PAYMENT_SELECTION_START = "com.corepos.intent.event.PAYMENT_SELECTION_START"
}
```

## Action Intent Descriptions

- `ACTION_ORDER_CREATED`: Broadcast when a new order is created in the system
- `ACTION_ORDER_SAVED`: Broadcast when an existing order is saved/updated
- `ACTION_ORDER_CLOSED`: Broadcast when an order is closed (completed transaction)
- `ACTION_ORDER_DELETED`: Broadcast when an order is deleted from the system
- `ACTION_LINE_ITEM_ADDED`: Broadcast when a line item is added to an order
- `ACTION_PAYMENT_PROCESSED`: Broadcast when a payment transaction is processed
- `ACTION_LINE_ITEM_DELETED`: Broadcast when a line item is removed from an order
- `ACTION_BARCODE_SCANNED`: Broadcast when a barcode is scanned via the scanner
- `ACTION_MERCHANT_TENDER`: Broadcast when a merchant tender action is initiated **[Used in Tender connector]**
- `ACTION_MERCHANT_ACTION`: Broadcast when a custom merchant action is triggered

## Extra Data Descriptions

- `EXTRA_AMOUNT` (Double): Final amount in the smallest unit **[Used in Tender connector - Required outgoing extra]**
- `EXTRA_TIP_AMOUNT` (Double): Tip in smallest unit **[Used in Tender connector - Optional outgoing extra]**
- `EXTRA_CLIENT_ID` (String): Unique ID from your system (e.g., a payment or transaction ID) **[Used in Tender connector - Optional outgoing extra]**
- `EXTRA_NOTE` (String): Notes about the payment or optional order notes **[Used in Tender connector - Incoming/outgoing extra]**
- `EXTRA_ORDER_ID` (String): CorePOS order UUID **[Used in Tender connector - Incoming extra]**
- `EXTRA_CASH_AMOUNT` (Double): Total cash amount in the smallest currency unit (e.g., cents) **[Used in Tender connector - Incoming extra]**
- `EXTRA_CARD_AMOUNT` (Double): Total card amount in the smallest currency unit (e.g., cents) **[Used in Tender connector - Incoming extra]**
- `EXTRA_CASH_TAX_AMOUNT` (Double): Portion of the amount that is cash tax, in smallest unit **[Used in Tender connector - Incoming extra]**
- `EXTRA_CARD_TAX_AMOUNT` (Double): Portion of the amount that is card tax, in smallest unit **[Used in Tender connector - Incoming extra]**
- `EXTRA_BARCODE` (String): The scanned barcode data/value
- `EXTRA_BARCODE_FORMAT` (String): The format/type of the scanned barcode
- `EXTRA_LINE_ITEM_ID` (String): Unique UUID identifier for a single line item
- `EXTRA_LINE_ITEM_IDS` (List(String)): List of line item UUIDs **[Used in Tender connector - Optional outgoing extra]**
- `EXTRA_ITEM_ID` (String): Unique UUID identifier for an inventory item
- `EXTRA_ACTION_NAME` (String): Name of the custom action being performed
- `EXTRA_PAYMENT_REQUEST` (PaymentRequest): Serialized payment request object
- `EXTRA_TENDER_TYPE` (TenderType): Specify a concrete TenderType (e.g., EBT). If omitted, CorePOS records it as a Custom Tender **[Used in Tender connector - Optional outgoing extra]**
- `EXTRA_TENDER` (String): The Tender record configured in CorePOS **[Used in Tender connector - Optional outgoing extra]**

## Event Descriptions

- `EVENT_ORDER_BUILD_START`: Triggered when the order building process begins
- `EVENT_CART_OVERVIEW_START`: Triggered when the cart overview screen is displayed
- `EVENT_CASH_CHARGE_START`: Triggered when cash payment processing begins
- `EVENT_CREDIT_CHARGE_START`: Triggered when credit card processing begins
- `EVENT_DEBIT_CHARGE_START`: Triggered when debit card processing begins
- `EVENT_PAYMENT_SELECTION_START`: Triggered when the payment selection screen appears

## Usage Examples

### Basic BroadcastReceiver Implementation

```kotlin
class CorePOSReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intents.ACTION_ORDER_CREATED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                val amount = intent.getDoubleExtra(Intents.EXTRA_AMOUNT, 0.0)
                handleOrderCreated(orderId, amount)
            }
            
            Intents.ACTION_ORDER_SAVED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                handleOrderSaved(orderId)
            }
            
            Intents.ACTION_ORDER_CLOSED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                val amount = intent.getDoubleExtra(Intents.EXTRA_AMOUNT, 0.0)
                handleOrderClosed(orderId, amount)
            }
            
            Intents.ACTION_LINE_ITEM_ADDED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                val lineItemId = intent.getStringExtra(Intents.EXTRA_LINE_ITEM_ID)
                val itemId = intent.getStringExtra(Intents.EXTRA_ITEM_ID)
                handleLineItemAdded(orderId, lineItemId, itemId)
            }
            
            Intents.ACTION_BARCODE_SCANNED -> {
                val barcode = intent.getStringExtra(Intents.EXTRA_BARCODE)
                val format = intent.getStringExtra(Intents.EXTRA_BARCODE_FORMAT)
                handleBarcodeScanned(barcode, format)
            }
            
            Intents.ACTION_PAYMENT_PROCESSED -> {
                val orderId = intent.getStringExtra(Intents.EXTRA_ORDER_ID)
                val amount = intent.getDoubleExtra(Intents.EXTRA_AMOUNT, 0.0)
                val tipAmount = intent.getDoubleExtra(Intents.EXTRA_TIP_AMOUNT, 0.0)
                handlePaymentProcessed(orderId, amount, tipAmount)
            }
        }
    }
}
```

### Registering the BroadcastReceiver

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var corePOSReceiver: CorePOSReceiver
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Initialize receiver
        corePOSReceiver = CorePOSReceiver()
        
        // Create intent filter for CorePOS actions
        val intentFilter = IntentFilter().apply {
            addAction(Intents.ACTION_ORDER_CREATED)
            addAction(Intents.ACTION_ORDER_SAVED)
            addAction(Intents.ACTION_ORDER_CLOSED)
            addAction(Intents.ACTION_ORDER_DELETED)
            addAction(Intents.ACTION_LINE_ITEM_ADDED)
            addAction(Intents.ACTION_LINE_ITEM_DELETED)
            addAction(Intents.ACTION_PAYMENT_PROCESSED)
            addAction(Intents.ACTION_BARCODE_SCANNED)
            addAction(Intents.ACTION_MERCHANT_TENDER)
            addAction(Intents.ACTION_MERCHANT_ACTION)
        }
        
        // Register receiver
        registerReceiver(corePOSReceiver, intentFilter)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        // Unregister receiver to prevent memory leaks
        unregisterReceiver(corePOSReceiver)
    }
}
```