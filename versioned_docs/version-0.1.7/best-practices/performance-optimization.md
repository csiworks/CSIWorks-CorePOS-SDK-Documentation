---
id: practices-performance-optimization
sidebar_position: 2
title: Performance Optimization
description: Connection, caching, background tasks.
hide_title: true
---

## Performance Optimization

Guidelines to improve performance: manage connections properly, implement caching, and use background workers for long-running tasks.

### Connection Management

Implement proper connection lifecycle management:

```kotlin
class CorePOSManager @Inject constructor(
    private val context: Context
) {
    private var inventoryConnector: InventoryConnector? = null
    private var orderConnector: OrderConnector? = null
    private var merchantConnector: MerchantConnector? = null
    
    fun initialize() {
        inventoryConnector = InventoryConnector(context)
        orderConnector = OrderConnector(context)
        merchantConnector = MerchantConnector(context)
    }
    
    fun getInventoryConnector(): InventoryConnector {
        return inventoryConnector ?: throw IllegalStateException("CorePOS not initialized")
    }
    
    fun getOrderConnector(): OrderConnector {
        return orderConnector ?: throw IllegalStateException("CorePOS not initialized")
    }
    
    fun getMerchantConnector(): MerchantConnector {
        return merchantConnector ?: throw IllegalStateException("CorePOS not initialized")
    }
    
    fun cleanup() {
        inventoryConnector?.disconnect()
        orderConnector?.disconnect()
        merchantConnector?.disconnect()
        
        inventoryConnector = null
        orderConnector = null
        merchantConnector = null
    }
}
```

### Caching Strategy

Implement caching to reduce API calls:

```kotlin
class CachedInventoryRepository @Inject constructor(
    private val inventoryConnector: InventoryConnector
) : InventoryRepository {
    
    private val cache = mutableMapOf<String, Item>()
    private val itemsCache = mutableListOf<Item>()
    private var lastCacheTime = 0L
    private val cacheValidityDuration = 5 * 60 * 1000L // 5 minutes
    
    override suspend fun getItems(filter: ItemFilter?): List<Item> {
        val now = System.currentTimeMillis()
        
        // Return cached data if still valid
        if (now - lastCacheTime < cacheValidityDuration && itemsCache.isNotEmpty()) {
            return if (filter != null) {
                itemsCache.filter { item ->
                    (filter.categoryId == null || 
                     item.categories?.any { it.categoryId == filter.categoryId } == true) &&
                    (filter.productCode == null || item.productCode == filter.productCode)
                }
            } else {
                itemsCache
            }
        }
        
        // Fetch fresh data
        return try {
            val items = inventoryConnector.getItems(filter) ?: emptyList()
            itemsCache.clear()
            itemsCache.addAll(items)
            lastCacheTime = now
            items
        } catch (e: Exception) {
            Log.e("CachedRepo", "Failed to get items: ${e.message}")
            itemsCache // Return cached data as fallback
        }
    }
    
    override suspend fun getItem(itemId: String): Item? {
        // Check cache first
        cache[itemId]?.let { return it }
        
        // Fetch from API
        return try {
            val item = inventoryConnector.getItem(itemId)
            item?.let { cache[itemId] = it }
            item
        } catch (e: Exception) {
            Log.e("CachedRepo", "Failed to get item: ${e.message}")
            null
        }
    }
    
    fun invalidateCache() {
        cache.clear()
        itemsCache.clear()
        lastCacheTime = 0L
    }
}
```

### Background Processing

Use WorkManager for background operations:

```kotlin
class InventorySyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {
    
    @Inject
    lateinit var inventoryRepository: InventoryRepository
    
    override suspend fun doWork(): Result {
        return try {
            // Sync inventory data
            val items = inventoryRepository.getItems()
            
            // Update local database
            updateLocalDatabase(items)
            
            Result.success()
        } catch (e: Exception) {
            Log.e("SyncWorker", "Failed to sync inventory: ${e.message}")
            Result.retry()
        }
    }
    
    private suspend fun updateLocalDatabase(items: List<Item>) {
        // Update local database with inventory data
    }
}

// Schedule periodic sync
fun scheduleInventorySync() {
    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()
    
    val syncRequest = PeriodicWorkRequestBuilder<InventorySyncWorker>(
        15, TimeUnit.MINUTES
    ).setConstraints(constraints)
        .build()
    
    WorkManager.getInstance(context).enqueueUniquePeriodicWork(
        "inventory_sync",
        ExistingPeriodicWorkPolicy.KEEP,
        syncRequest
    )
}
```