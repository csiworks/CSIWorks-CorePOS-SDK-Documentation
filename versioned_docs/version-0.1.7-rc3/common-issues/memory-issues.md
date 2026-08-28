---
id: common-issues-memory
sidebar_position: 4
title: Memory Issues
description: Leaks, lifecycle, and cleanup.
hide_title: true
---

## Memory Issues

Troubleshooting guide for memory-related problems, including connector leaks, cancelled background operations, and improper cleanup.

:::caution Important Notes
- Store connectors as class properties
- Call `disconnect()` when done to clean up resources
- Handle configuration changes properly
:::

### Issue: Memory leaks from connectors

**Symptoms:**
- App memory usage increases over time
- OutOfMemoryError exceptions
- App becomes slow

**Causes:**
1. Connectors not properly disconnected
2. Large data objects not released
3. Background operations not cancelled

**Solutions:**

1. **Proper lifecycle management:**
```kotlin
class MainActivity : AppCompatActivity() {
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

2. **Cancel background operations:**
```kotlin
class InventoryViewModel : ViewModel() {
    fun loadItems() {
        viewModelScope.launch {
            try {
                val items = inventoryConnector.getItems()
                _items.value = items
            } catch (e: CancellationException) {
                // Operation was cancelled, clean up
                Log.d("Inventory", "Operation cancelled")
            }
        }
    }
}
```

3. **Use weak references for callbacks:**
```kotlin
class InventoryManager(context: Context) {
    private val weakContext = WeakReference(context)
    
    fun loadItems(callback: (List<Item>) -> Unit) {
        lifecycleScope.launch(Dispatchers.IO) {
            val items = inventoryConnector.getItems() ?: emptyList()
            weakContext.get()?.let { context ->
                withContext(Dispatchers.Main) {
                    callback(items)
                }
            }
        }
    }
}
```