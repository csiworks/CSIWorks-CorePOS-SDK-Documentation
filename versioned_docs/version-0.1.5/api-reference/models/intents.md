---
id: models-intents
sidebar_position: 7
title: Intents
description: Intent constants and utilities for CorePOS SDK inter-app communication.
hide_title: true
---

## Intents

The `Intents` object contains constants for CorePOS SDK intent actions, extras, and events used for inter-app communication and system notifications.

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