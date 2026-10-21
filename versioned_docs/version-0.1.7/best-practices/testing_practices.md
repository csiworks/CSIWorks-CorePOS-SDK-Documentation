---
id: practices-testing
sidebar_position: 5
title: Testing Practices
description: Unit and integration tests.
hide_title: true
---

## Testing Best Practices

Guidelines for testing: write unit tests for business logic and integration tests for SDK operations.

### Unit Testing

Create comprehensive unit tests:

```kotlin
@RunWith(MockitoJUnitRunner::class)
class InventoryViewModelTest {
    
    @Mock
    private lateinit var inventoryRepository: InventoryRepository
    
    @Mock
    private lateinit var errorHandler: CorePOSErrorHandler
    
    private lateinit var viewModel: InventoryViewModel
    
    @Before
    fun setup() {
        viewModel = InventoryViewModel(inventoryRepository)
    }
    
    @Test
    fun `loadItems should update LiveData with items`() = runTest {
        // Given
        val items = listOf(
            Item(name = "Test Item", priceType = PriceType.FIXED.code, /* ... */)
        )
        whenever(inventoryRepository.getItems(any())).thenReturn(items)
        
        // When
        viewModel.loadItems()
        
        // Then
        assertEquals(items, viewModel.items.value)
        assertFalse(viewModel.loading.value!!)
        assertNull(viewModel.error.value)
    }
    
    @Test
    fun `loadItems should handle errors`() = runTest {
        // Given
        val error = Exception("Network error")
        whenever(inventoryRepository.getItems(any())).thenThrow(error)
        
        // When
        viewModel.loadItems()
        
        // Then
        assertEquals(error.message, viewModel.error.value)
        assertFalse(viewModel.loading.value!!)
    }
}
```

### Integration Testing

Test SDK integration:

```kotlin
@RunWith(AndroidJUnit4::class)
class CorePOSIntegrationTest {
    
    @get:Rule
    val instantExecutorRule = InstantTaskExecutorRule()
    
    @Test
    fun testInventoryOperations() = runTest {
        // Given
        val context = ApplicationProvider.getApplicationContext<Context>()
        val inventoryConnector = InventoryConnector(context)
        
        // When & Then
        try {
            val items = inventoryConnector.getItems()
            assertNotNull(items)
        } catch (e: Exception) {
            // Handle case where CorePOS app is not installed
            assertTrue(e is BindingException || e is PermissionDeniedException)
        }
    }
}
```