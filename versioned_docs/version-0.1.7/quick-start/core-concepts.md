---
id: quick-guide-core-concepts
sidebar_position: 1
title: Core Concepts
description: Core concepts and architechture.
pagination_prev: null
hide_title: true
---

## Core Concepts

First, ensure you have the SDK installed and configured as described in the [Installation Guide](../installation).
The CorePOS SDK uses **connectors** to communicate with different POS services:

- `InventoryConnector`: Manage products and categories
- `OrderConnector`: Handle orders and line items
- `MerchantConnector`: Access store information
- `TenderConnector`: Manage payment methods
- `PrinterConnector`: Print receipts


## Important Notes

A few very important notes on using the SDK's functionality to avoid many mistakes

### Threading

All SDK operations **must** be called from a background thread. The SDK will throw an `IllegalStateException` if called from the main thread.

```kotlin
// ✅ Correct - Background thread
lifecycleScope.launch(Dispatchers.IO) {
    val items = inventoryConnector.getItems()
}

// ❌ Wrong - Main thread
val items = inventoryConnector.getItems() // This will crash!
```

### Error Handling

Always wrap SDK calls in try-catch blocks:

```kotlin
try {
    val result = connector.someMethod()
    // Handle success
} catch (e: PermissionDeniedException) {
    // Handle permission issues
} catch (e: BindingException) {
    // Handle service connection issues
} catch (e: Exception) {
    // Handle other errors
}
```

### Lifecycle Management

Store connectors as class properties and manage their lifecycle:

```kotlin
class MyActivity : AppCompatActivity() {
    private lateinit var inventoryConnector: InventoryConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        inventoryConnector = InventoryConnector(this)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        inventoryConnector.disconnect()
    }
}
```

## Next Steps
- [Quick Examples](quick-guide-examples) - Check code snippets using the SDK

- [API Reference](../api-reference) - Detailed API documentation
- [Error Handling Guide](../best-practices/practices-error-handling) - Comprehensive error handling
- [Best Practices](../best-practices) - Development guidelines 