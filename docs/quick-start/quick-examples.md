---
id: quick-guide-examples
sidebar_position: 2
title: Quick Examples
description: Code snippets using the SDK
hide_title: true
---

## Quick Examples

A collection of code snippets demonstrating common tasks using the CorePOS SDK.

### Get Merchant Information

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var merchantConnector: MerchantConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        merchantConnector = MerchantConnector(this)
        
        // Get merchant info in background thread
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val merchant = merchantConnector.getMerchant()
                merchant?.let {
                    Log.d("CorePOS", "Store: ${it.name}")
                    Log.d("CorePOS", "Address: ${it.address1}")
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to get merchant: ${e.message}")
            }
        }
    }
}
```

### Retrieve Inventory Items

```kotlin
class InventoryActivity : AppCompatActivity() {
    private lateinit var inventoryConnector: InventoryConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inventory)
        
        inventoryConnector = InventoryConnector(this)
        loadItems()
    }
    
    private fun loadItems() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                // Get all items
                val items = inventoryConnector.getItems()
                
                // Or filter by category
                val filter = ItemFilter(categoryId = "electronics")
                val filteredItems = inventoryConnector.getItems(filter)
                
                // Update UI on main thread
                withContext(Dispatchers.Main) {
                    updateItemList(items ?: emptyList())
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load items: ${e.message}")
            }
        }
    }
}
```

### Manage Orders

```kotlin
class OrderActivity : AppCompatActivity() {
    private lateinit var orderConnector: OrderConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_order)
        
        orderConnector = OrderConnector(this)
        loadActiveOrder()
    }
    
    private fun loadActiveOrder() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val order = orderConnector.getActiveOrder()
                withContext(Dispatchers.Main) {
                    displayOrder(order)
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load order: ${e.message}")
            }
        }
    }
    
    fun addItemToOrder(itemId: String, quantity: Double) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val activeOrder = orderConnector.getActiveOrder()
                activeOrder?.let { order ->
                    val lineItem = orderConnector.addPerUnitLineItem(
                        orderId = order.orderId!!,
                        itemId = itemId,
                        quantity = quantity,
                        devNotes = null
                    )
                    
                    withContext(Dispatchers.Main) {
                        onItemAdded(lineItem)
                    }
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to add item: ${e.message}")
            }
        }
    }
}
```

### Handle Payments

```kotlin
class PaymentActivity : AppCompatActivity() {
    private lateinit var tenderConnector: TenderConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        tenderConnector = TenderConnector(this)
        loadPaymentMethods()
    }
    
    private fun loadPaymentMethods() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val tenders = tenderConnector.getTenders(packageName)
                withContext(Dispatchers.Main) {
                    displayPaymentMethods(tenders ?: emptyList())
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load payment methods: ${e.message}")
            }
        }
    }
    
    fun createPaymentMethod(
        buttonTitle: String,
        tenderName: String,
        enabled: Boolean = true
    ) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val tender = tenderConnector.createTender(
                    buttonTitle = buttonTitle,
                    tenderName = tenderName,
                    packageName = packageName,
                    enabled = enabled,
                    openCashDrawer = false
                )
                
                withContext(Dispatchers.Main) {
                    onPaymentMethodCreated(tender)
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to create payment method: ${e.message}")
            }
        }
    }
}
```

### Print Receipts

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