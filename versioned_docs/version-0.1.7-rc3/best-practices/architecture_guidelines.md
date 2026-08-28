---
id: practices-architecture
sidebar_position: 1
title: Architecture
description: Repository, DI, ViewModels.
pagination_prev: null
hide_title: true
---

## Architecture Guidelines

Essential architecture principles: use Repository pattern, apply Dependency Injection, and keep business logic in ViewModels.

### Use Repository Pattern

Implement a repository pattern to abstract SDK operations:

```kotlin
interface InventoryRepository {
    suspend fun getItems(filter: ItemFilter? = null): List<Item>
    suspend fun getItem(itemId: String): Item?
    suspend fun saveItem(item: Item, imageUri: String?): Item?
    suspend fun deleteItem(itemId: String): Boolean
    suspend fun getCategories(): List<Category>
}

class InventoryRepositoryImpl(
    private val context: Context
) : InventoryRepository {
    private val inventoryConnector = InventoryConnector(context)
    
    override suspend fun getItems(filter: ItemFilter?): List<Item> {
        return try {
            inventoryConnector.getItems(filter) ?: emptyList()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get items: ${e.message}")
            emptyList()
        }
    }
    
    override suspend fun getItem(itemId: String): Item? {
        return try {
            inventoryConnector.getItem(itemId)
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get item: ${e.message}")
            null
        }
    }
    
    override suspend fun saveItem(item: Item, imageUri: String?): Item? {
        return try {
            inventoryConnector.saveItem(item, imageUri)
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to save item: ${e.message}")
            null
        }
    }
    
    override suspend fun deleteItem(itemId: String): Boolean {
        return try {
            inventoryConnector.deleteItem(itemId)
            true
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to delete item: ${e.message}")
            false
        }
    }

    override suspend fun getCategories(): List<Category> {
        return try {
            inventoryConnector.getCategories() ?: emptyList()
        } catch (e: Exception) {
            Log.e("InventoryRepo", "Failed to get categories: ${e.message}")
            emptyList()
        }
    }
}
```

### Implement Dependency Injection

Use dependency injection to manage SDK dependencies:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object CorePOSModule {
    
    @Provides
    @Singleton
    fun provideInventoryConnector(@ApplicationContext context: Context): InventoryConnector {
        return InventoryConnector(context)
    }
    
    @Provides
    @Singleton
    fun provideOrderConnector(@ApplicationContext context: Context): OrderConnector {
        return OrderConnector(context)
    }
    
    @Provides
    @Singleton
    fun provideMerchantConnector(@ApplicationContext context: Context): MerchantConnector {
        return MerchantConnector(context)
    }
    
    @Provides
    @Singleton
    fun provideInventoryRepository(
        inventoryConnector: InventoryConnector
    ): InventoryRepository {
        return InventoryRepositoryImpl(inventoryConnector)
    }
}
```

### Use ViewModels for Business Logic

Keep business logic in ViewModels and use LiveData for reactive UI updates:

```kotlin
class InventoryViewModel @Inject constructor(
    private val inventoryRepository: InventoryRepository
) : ViewModel() {
    
    private val _items = MutableLiveData<List<Item>>()
    val items: LiveData<List<Item>> = _items
    
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    
    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error
    
    fun loadItems(filter: ItemFilter? = null) {
        viewModelScope.launch {
            _loading.value = true
            _error.value = null
            
            try {
                val items = inventoryRepository.getItems(filter)
                _items.value = items
            } catch (e: Exception) {
                _error.value = e.message
            } finally {
                _loading.value = false
            }
        }
    }
    
    fun createItem(name: String, price: Long, categoryId: String?) {
        viewModelScope.launch {
            try {
                val item = Item(
                    name = name,
                    priceType = PriceType.FIXED.code,
                    unitCash = price,
                    unitCard = price,
                    unitType = "piece",
                    charges = emptyList(),
                    categories = categoryId?.let { listOf(Category(it, null)) },
                    productCode = null,
                    itemCost = null,
                    quantity = 0,
                    trackInventory = false,
                    dualPricingBasePriceType = PriceType.FIXED.code,
                    isEBT = false,
                    isAvailable = true
                )
                
                val savedItem = inventoryRepository.saveItem(item, null)
                if (savedItem != null) {
                    loadItems() // Refresh the list
                }
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }
}
```